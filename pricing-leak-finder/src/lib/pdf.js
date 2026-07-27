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
const BRAND_BG_RGB = [250, 246, 240]; // RGB values for setFillColor

function setPDFPageBackground(pdf, pageWidth, pageHeight) {
  // Set the entire page background to cream (Part 4.5), not white.
  // Called after creating each new page so every page has the brand background.
  pdf.setFillColor(...BRAND_BG_RGB);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F'); // F = fill
}

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

    // Extra buffer to let the DOM fully settle after font load and ensure
    // line-height/letter-spacing is fully applied before screenshot
    await new Promise(resolve => setTimeout(resolve, 200));

    const pdf = new jsPDF({ 
      orientation: 'p', 
      unit: 'pt', 
      format: 'a4', 
      compress: true 
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pageWidth - MARGIN * 2;

    // Set background on the first page before adding any content
    setPDFPageBackground(pdf, pageWidth, pageHeight);

    // cursorY tracks where the next section will be drawn on the current
    // page. It starts at MARGIN (not 0) and is reset to MARGIN every time
    // addPage() runs, so content is never flush against any edge.
    let cursorY = MARGIN;
    let isFirstPage = true;

    const sections = Array.from(root.children).filter(
      (el) => !el.classList.contains('no-print') && el.offsetHeight > 0
    );

    for (const section of sections) {
      // BACKGROUND COLOR FIX: Ensure each section has the cream-family background
      // before capture. This guarantees the PDF matches the web app's look (Part 4.5).
      // Store the original so we can restore it after capture (don't mutate the live DOM).
      const originalBg = section.style.backgroundColor;
      section.style.backgroundColor = BRAND_BG;

      // ENSURE PROPER TEXT RENDERING: Apply CSS styles that guarantee line-height
      // and letter-spacing are preserved during capture
      const originalLineHeight = section.style.lineHeight;
      const originalLetterSpacing = section.style.letterSpacing;
      section.style.lineHeight = '1.6';
      section.style.letterSpacing = 'normal';

      const canvas = await html2canvas(section, {
        scale: SCALE,
        backgroundColor: BRAND_BG,
        useCORS: true,
        allowTaint: true, // allows rendering to proceed even with cross-origin issues
        logging: false, // suppress console spam from html2canvas
        textRendering: 'optimizeLegibility', // better text rendering quality
      });

      // Restore the section's original styles so the live page isn't affected
      section.style.backgroundColor = originalBg;
      section.style.lineHeight = originalLineHeight;
      section.style.letterSpacing = originalLetterSpacing;

      const imgWidthPt = contentWidth;
      const imgHeightPt = (canvas.height * imgWidthPt) / canvas.width;

      // Guard: warn if a single section is taller than one full page
      // (rare, but flag it rather than silently letting it overflow)
      const maxHeightPerPage = pageHeight - MARGIN * 2;
      if (imgHeightPt > maxHeightPerPage) {
        console.warn(
          `Section exceeds one page height (${Math.round(imgHeightPt)}pt). ` +
          `Consider shortening this section's content.`
        );
      }

      // Does this section fit in what's left on the current page?
      const remaining = pageHeight - MARGIN - cursorY;
      if (imgHeightPt > remaining && !isFirstPage) {
        // Section doesn't fit; start a new page
        pdf.addPage();
        setPDFPageBackground(pdf, pageWidth, pageHeight); // background on every new page
        cursorY = MARGIN; // reset to top margin, never 0
      }

      // Use PNG instead of JPEG to preserve quality and spacing consistency
      // (JPEG compression can subtly affect text rendering; PNG is lossless)
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', MARGIN, cursorY, imgWidthPt, imgHeightPt);

      cursorY += imgHeightPt + SECTION_GAP;
      isFirstPage = false;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('Failed to export PDF. Please try again.');
  } finally {
    hiddenNodes.forEach((n) => (n.style.display = ''));
  }
}
