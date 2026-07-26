import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function sanitizeOklchColors(clonedDoc: Document) {
  try {
    const styleTags = clonedDoc.querySelectorAll('style');
    styleTags.forEach((styleTag) => {
      if (styleTag.textContent && styleTag.textContent.includes('oklch')) {
        styleTag.textContent = styleTag.textContent.replace(/oklch\([^)]+\)/g, '#4b5563');
      }
    });

    const allElements = clonedDoc.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style && htmlEl.style.cssText && htmlEl.style.cssText.includes('oklch')) {
        htmlEl.style.cssText = htmlEl.style.cssText.replace(/oklch\([^)]+\)/g, '#4b5563');
      }
    });
  } catch (e) {
    console.warn('oklch sanitization note:', e);
  }
}

export async function exportElementToPdf(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found for PDF export.`);
  }

  // Render element to canvas at high DPI (scale: 2)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 1200,
    onclone: (clonedDoc, clonedElement) => {
      sanitizeOklchColors(clonedDoc);
      if (clonedElement) {
        clonedElement.style.position = 'static';
        clonedElement.style.left = '0';
        clonedElement.style.top = '0';
        clonedElement.style.opacity = '1';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.transform = 'none';
        if (clonedElement.parentElement) {
          clonedElement.parentElement.style.position = 'static';
          clonedElement.parentElement.style.opacity = '1';
          clonedElement.parentElement.style.visibility = 'visible';
        }
      }
    }
  });

  const imgData = canvas.toDataURL('image/png', 1.0);

  // Initialize A4 page PDF in portrait mode
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();   // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Add canvas image to fit standard single-page A4 exactly
  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');

  // Save PDF file directly
  pdf.save(filename);
}

export async function captureElementToImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found.`);
  }

  const canvas = await html2canvas(element, {
    scale: 2.5, // High crispness rendering
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (clonedDoc, clonedElement) => {
      sanitizeOklchColors(clonedDoc);
      if (clonedElement) {
        clonedElement.style.position = 'static';
        clonedElement.style.left = '0';
        clonedElement.style.top = '0';
        clonedElement.style.opacity = '1';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.transform = 'none';
        if (clonedElement.parentElement) {
          clonedElement.parentElement.style.position = 'static';
          clonedElement.parentElement.style.opacity = '1';
          clonedElement.parentElement.style.visibility = 'visible';
        }
      }
    }
  });

  return canvas.toDataURL('image/png', 0.98);
}
