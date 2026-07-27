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
const BRAND_BG = '#FAF6F0'; // cream-family background, matches web app (Part 4.5)

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
    // FONT LOADING FIX: Wait for all web fonts to load before capturing.
    // This prevents text spacing collapse ("writtentogether" instead of "written together").
    // html2canvas captures what the browser renders *right now* — if fonts haven't
    // loaded yet, it falls back to system fonts at different widths, crushing spacing.
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Extra buffer to let the DOM fully settle after font load
    await new Promise(resolve => setTimeout(resolve, 150));

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
      // BACKGROUND COLOR FIX: Ensure each section has the cream-family background
      // before capture. This guarantees the PDF matches the web app's look (Part 4.5).
      // Store the original so we can restore it after capture (don't mutate the live DOM).
      const originalBg = section.style.backgroundColor;
      section.style.backgroundColor = BRAND_BG;

      const canvas = await html2canvas(section, {
        scale: SCALE,
        backgroundColor: BRAND_BG, // explicit fallback in case inline style doesn't apply
        useCORS: true,
        allowTaint: true, // allows rendering to proceed even with cross-origin issues
      });

      // Restore the section's original background so the live page isn't affected
      section.style.backgroundColor = originalBg;

      const imgWidthPt = contentWidth;
      const imgHeightPt = (canvas.height * imgWidthPt) / canvas.width;

      // Does this section fit in what's left on the current page?
      const remaining = pageHeight - MARGIN - cursorY;
      if (imgHeightPt > remaining) {
        pdf.addPage();
        cursorY = MARGIN; // reset on every new page — never 0
      }

      // Use PNG instead of JPEG to preserve quality and spacing consistency
      // (JPEG compression can subtly affect text rendering; PNG is lossless)
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', MARGIN, cursorY, imgWidthPt, imgHeightPt);

      cursorY += imgHeightPt + SECTION_GAP;
    }

    pdf.save(filename);
  } finally {
    hiddenNodes.forEach((n) => (n.style.display = ''));
  }
}
