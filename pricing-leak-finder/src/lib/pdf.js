import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Captures the DOM node with the given id and saves it as a multi-page PDF.
// Elements with the "no-print" class (buttons, the unlock CTA, etc.) are
// hidden automatically via the @media print rule in index.css, and this
// function respects the same intent by temporarily hiding them too, since
// html2canvas doesn't run inside an actual print context.
export async function exportReportToPDF(elementId, filename = 'pricing-leak-report.pdf') {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`Could not find element #${elementId} to export.`);
    return;
  }

  const hidden = el.querySelectorAll('.no-print');
  hidden.forEach((node) => (node.style.display = 'none'));

  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: '#F6F0E3',
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } finally {
    hidden.forEach((node) => (node.style.display = ''));
  }
}
