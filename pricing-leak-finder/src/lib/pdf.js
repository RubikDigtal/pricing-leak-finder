import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// One section = one html2canvas capture. Every top-level child of the
// report container (each Card, each diagram row, the CTA block, etc.) is
// screenshotted separately, then placed onto the PDF one at a time by a
// loop that checks whether it fits in the space left on the current page.
// If it doesn't, a new page starts first. Because each section is already
// a single, complete canvas by the time it reaches the placement loop, a
// section can never be split — there's no "cut point" to find or get
// wrong, unlike capturing the whole report as one tall image and slicing
// it afterward.
const MARGIN = 40; // pt, applied on every side, every coordinate — never hard-coded elsewhere
const SECTION_GAP = 14; // pt, breathing room between stacked sections on the same page
const SCALE = 2; // minimum for crisp text at PDF zoom

export async function exportReportToPDF(elementId, filename = 'pricing-leak-report.pdf') {
  const root = document.getElementById(elementId);
  if (!root) {
    console.error(`Could not find element #${elementId} to export.`);
    return;
  }

  // Elements marked no-print (the unlock CTA button, the "confirming your
  // unlock" message, etc.) are excluded from the section list below, but we
  // still hide them defensively in case anything unmarked briefly overlaps.
  const hiddenNodes = root.querySelectorAll('.no-print');
  hiddenNodes.forEach((n) => (n.style.display = 'none'));

  try {
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pageWidth - MARGIN * 2;

    // cursorY tracks where the next section will be drawn on the current
    // page. It starts at MARGIN (not 0) and is reset to MARGIN every time
    // addPage() runs, so content is never flush against any edge.
    let cursorY = MARGIN;

    const sections = Array.from(root.children).filter(
      (el) => !el.classList.contains('no-print') && el.offsetHeight > 0
    );

    for (const section of sections) {
      const canvas = await html2canvas(section, {
        scale: SCALE,
        backgroundColor: '#F6F0E3',
        useCORS: true,
      });

      const imgWidthPt = contentWidth;
      const imgHeightPt = (canvas.height * imgWidthPt) / canvas.width;

      // Does this section fit in what's left on the current page?
      const remaining = pageHeight - MARGIN - cursorY;
      if (imgHeightPt > remaining) {
        pdf.addPage();
        cursorY = MARGIN; // reset on every new page — never 0
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      pdf.addImage(imgData, 'JPEG', MARGIN, cursorY, imgWidthPt, imgHeightPt);

      cursorY += imgHeightPt + SECTION_GAP;
    }

    pdf.save(filename);
  } finally {
    hiddenNodes.forEach((n) => (n.style.display = ''));
  }
}
