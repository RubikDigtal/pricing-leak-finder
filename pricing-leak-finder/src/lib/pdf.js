import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Captures the DOM node with the given id and saves it as a multi-page PDF.
//
// Three things this addresses versus a naive screenshot-to-PDF approach:
//
// 1. File size: each page gets its OWN cropped slice of the canvas, drawn
//    onto a small offscreen canvas and compressed as JPEG, instead of the
//    entire full-height canvas being re-embedded on every page (the
//    previous bug that produced 100+ MB files).
//
// 2. Page margins: the image is drawn inset from all four edges by MARGIN_PT,
//    not stretched edge-to-edge at (0,0). This was missing entirely before —
//    the content had zero padding on any side.
//
// 3. Clean page breaks: reads the real position of each card/section in the
//    live page before capturing, and snaps each page break to the nearest
//    one of those boundaries so a page doesn't end mid-section.
//
// Honest limitation: #2 and #3 can't be verified by static code review the
// way the file-size fix could — they depend on how html2canvas actually
// renders your specific content in a real browser, which isn't something
// that can be checked outside one. Worth a real export-and-open test after
// deploying, and flagging back if either still looks off.
const MARGIN_PT = 36; // half an inch on every side

export async function exportReportToPDF(elementId, filename = 'pricing-leak-report.pdf') {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`Could not find element #${elementId} to export.`);
    return;
  }

  const hidden = el.querySelectorAll('.no-print');
  hidden.forEach((node) => (node.style.display = 'none'));

  try {
    // Read natural break points (the top of each card-like block) from the
    // real, unscaled DOM before capturing.
    const rootRect = el.getBoundingClientRect();
    const breakEls = el.querySelectorAll('.card, .diagram-row, .diagram-chip-row');
    const breakPointsCss = Array.from(breakEls).map((node) => node.getBoundingClientRect().top - rootRect.top);

    const fullCanvas = await html2canvas(el, {
      scale: 1.5, // enough for crisp text without ballooning file size
      backgroundColor: '#F6F0E3',
      useCORS: true,
    });

    const scaleRatio = fullCanvas.width / el.offsetWidth; // canvas px per real CSS px
    const breakPointsPx = breakPointsCss.map((v) => v * scaleRatio).sort((a, b) => a - b);

    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
    const pageWidthPt = pdf.internal.pageSize.getWidth();
    const pageHeightPt = pdf.internal.pageSize.getHeight();

    // The drawable area is the page minus margins on every side — the image
    // gets scaled to fit THIS width, not the full page width.
    const contentWidthPt = pageWidthPt - MARGIN_PT * 2;
    const contentHeightPt = pageHeightPt - MARGIN_PT * 2;

    const pxPerPt = fullCanvas.width / contentWidthPt;
    const idealPageHeightPx = contentHeightPt * pxPerPt;

    let cursor = 0;
    let page = 0;

    while (cursor < fullCanvas.height) {
      let sliceEnd = Math.min(cursor + idealPageHeightPx, fullCanvas.height);

      // If this isn't the final page, try to snap the cut to the nearest
      // break point in the back half of this page's range, so we don't
      // slice through the middle of a section.
      if (sliceEnd < fullCanvas.height) {
        const candidates = breakPointsPx.filter((bp) => bp > cursor + idealPageHeightPx * 0.5 && bp <= sliceEnd);
        if (candidates.length) sliceEnd = candidates[candidates.length - 1];
      }

      const sliceHeightPx = Math.round(sliceEnd - cursor);
      if (sliceHeightPx <= 0) break; // safety net against an infinite loop

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = fullCanvas.width;
      pageCanvas.height = sliceHeightPx;
      const ctx = pageCanvas.getContext('2d');
      ctx.drawImage(
        fullCanvas,
        0, cursor, fullCanvas.width, sliceHeightPx,
        0, 0, fullCanvas.width, sliceHeightPx
      );

      // JPEG at high-but-not-max quality compresses dramatically better than
      // PNG for a screenshot-like image, with no visible quality loss here.
      const imgData = pageCanvas.toDataURL('image/jpeg', 0.88);
      const renderedHeightPt = sliceHeightPx / pxPerPt;

      if (page > 0) pdf.addPage();
      // Drawn inset by MARGIN_PT on all sides — this is the actual fix for
      // the "no padding" problem. Previously this line was:
      //   pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthPt, renderedHeightPt)
      // which stretched the image to the full page with zero margin.
      pdf.addImage(imgData, 'JPEG', MARGIN_PT, MARGIN_PT, contentWidthPt, renderedHeightPt);

      cursor = sliceEnd;
      page += 1;
    }

    pdf.save(filename);
  } finally {
    hidden.forEach((node) => (node.style.display = ''));
  }
}
