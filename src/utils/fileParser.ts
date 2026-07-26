import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { ExtractedFile } from '../types';

// Set up worker for PDF.js matching exact installed pdfjs-dist version
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

export async function parseResumeFile(file: File): Promise<ExtractedFile> {
  const fileName = file.name;
  const fileSize = file.size;
  const fileExt = fileName.split('.').pop()?.toLowerCase();

  const arrayBuffer = await file.arrayBuffer();

  let extractedText = '';

  if (fileExt === 'docx') {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer.slice(0) });
      extractedText = result.value || '';
      if (!extractedText.trim()) {
        throw new Error('No readable text found in .docx file.');
      }
    } catch (err: any) {
      console.error('DOCX parsing error:', err);
      throw new Error(
        `Couldn't read this .docx file — ${err.message || 'try re-saving it or copying text directly'}`
      );
    }
  } else if (fileExt === 'pdf') {
    try {
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .filter(Boolean);
        fullText += pageStrings.join(' ') + '\n';
      }

      extractedText = fullText;

      if (!extractedText.trim()) {
        throw new Error('PDF appears to be scanned or image-only without selectable text.');
      }
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      throw new Error(
        `Couldn't read this PDF file — ${err.message || 'it might be image-based or password protected. Try re-saving as .docx'}`
      );
    }
  } else {
    throw new Error('Unsupported file format. Please upload a .docx or .pdf file.');
  }

  // Clean up excessive whitespace
  const cleanText = extractedText
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const previewText = cleanText.slice(0, 300) + (cleanText.length > 300 ? '...' : '');

  return {
    name: fileName,
    size: fileSize,
    type: fileExt,
    text: cleanText,
    previewText,
    fileBuffer: arrayBuffer.slice(0)
  };
}
