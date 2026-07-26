import React, { useEffect, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';
import html2canvas from 'html2canvas';
import * as pdfjsLib from 'pdfjs-dist';
import { ExtractedFile } from '../types';
import { FileText, Image as ImageIcon, Loader2, FileCheck, Info } from 'lucide-react';

// Configure pdfjs worker to match exact installed pdfjs-dist version
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

interface OriginalResumePreviewProps {
  extractedFile: ExtractedFile | null;
  rawText?: string;
}

export const OriginalResumePreview: React.FC<OriginalResumePreviewProps> = ({
  extractedFile,
  rawText
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [renderSource, setRenderSource] = useState<'pdf-canvas' | 'docx-approximation' | 'text-template'>('text-template');
  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function processAndCapture() {
      setIsRendering(true);

      if (extractedFile && extractedFile.fileBuffer && extractedFile.type === 'pdf') {
        // PDF: Render direct page canvas via pdfjs-dist
        try {
          const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(extractedFile.fileBuffer.slice(0)) });
          const pdfDoc = await loadingTask.promise;
          const page = await pdfDoc.getPage(1);

          const scale = 2.0; // High DPI 2x scale
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
              canvas: canvas
            } as any).promise;

            const dataUrl = canvas.toDataURL('image/png', 0.95);
            if (isMounted) {
              setImageUrl(dataUrl);
              setRenderSource('pdf-canvas');
              setIsRendering(false);
              return;
            }
          }
        } catch (pdfErr) {
          console.error('PDF.js render error, falling back:', pdfErr);
        }
      }

      // DOCX or fallback text
      if (!hiddenContainerRef.current) return;
      const container = hiddenContainerRef.current;
      container.innerHTML = '';

      try {
        if (extractedFile && extractedFile.fileBuffer && extractedFile.type === 'docx') {
          setRenderSource('docx-approximation');
          await renderAsync(extractedFile.fileBuffer, container, undefined, {
            inWrapper: false,
            ignoreWidth: false,
            ignoreHeight: false,
            experimental: true
          });
        } else {
          setRenderSource('text-template');
          const textContent = extractedFile?.text || rawText || 'Original Resume Content';
          const lines = textContent.split('\n').filter(Boolean);

          const paperDoc = document.createElement('div');
          paperDoc.style.width = '700px';
          paperDoc.style.padding = '40px';
          paperDoc.style.backgroundColor = '#ffffff';
          paperDoc.style.color = '#1f2937';
          paperDoc.style.fontFamily = 'Calibri, Arial, sans-serif';
          paperDoc.style.fontSize = '12px';
          paperDoc.style.lineHeight = '1.5';

          lines.forEach((line, index) => {
            const p = document.createElement('p');
            p.style.margin = '0 0 6px 0';
            if (index === 0 && line.length < 40) {
              p.style.fontSize = '22px';
              p.style.fontWeight = 'bold';
              p.style.textAlign = 'center';
              p.style.color = '#111827';
              p.style.textTransform = 'uppercase';
            } else if (/experience|education|skills|summary|projects/i.test(line) && line.length < 30) {
              p.style.fontSize = '14px';
              p.style.fontWeight = 'bold';
              p.style.borderBottom = '1px solid #d1d5db';
              p.style.paddingBottom = '2px';
              p.style.marginTop = '16px';
              p.style.color = '#1f2937';
              p.style.textTransform = 'uppercase';
            }
            p.innerText = line;
            paperDoc.appendChild(p);
          });

          container.appendChild(paperDoc);
        }

        await new Promise((resolve) => setTimeout(resolve, 150));

        const canvas = await html2canvas(container, {
          scale: 2.0,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc, clonedElement) => {
            try {
              const styleTags = clonedDoc.querySelectorAll('style');
              styleTags.forEach((s) => {
                if (s.textContent?.includes('oklch')) {
                  s.textContent = s.textContent.replace(/oklch\([^)]+\)/g, '#4b5563');
                }
              });
            } catch (e) {}
            if (clonedElement) {
              clonedElement.style.position = 'static';
              clonedElement.style.opacity = '1';
              clonedElement.style.visibility = 'visible';
            }
          }
        });

        const dataUrl = canvas.toDataURL('image/png', 0.95);
        if (isMounted) {
          setImageUrl(dataUrl);
        }
      } catch (err) {
        console.error('Fallback render error:', err);
      } finally {
        if (isMounted) {
          setIsRendering(false);
        }
      }
    }

    processAndCapture();

    return () => {
      isMounted = false;
    };
  }, [extractedFile, rawText]);

  return (
    <div className="space-y-3">
      {/* Off-screen render container used by docx-preview & html2canvas */}
      <div
        ref={hiddenContainerRef}
        className="absolute top-0 left-0 w-[750px] bg-white p-6 opacity-0 pointer-events-none z-[-100] overflow-hidden"
        aria-hidden="true"
      />

      {/* Rendered Document Image Preview Card */}
      <div className="bg-white rounded-[20px] p-4 border border-[#0e0f0c]/10 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0e0f0c]/10 pb-3">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0e0f0c]">
            <ImageIcon className="w-4 h-4 text-[#2ead4b]" />
            Original Uploaded Resume Image
          </span>

          {renderSource === 'pdf-canvas' ? (
            <span className="text-[11px] font-bold text-[#2ead4b] bg-[#2ead4b]/10 px-3 py-1 rounded-full border border-[#2ead4b]/30 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              Pixel-Accurate PDF Image (pdf.js)
            </span>
          ) : renderSource === 'docx-approximation' ? (
            <span className="text-[11px] font-bold text-[#ffb020] bg-[#ffb020]/10 px-3 py-1 rounded-full border border-[#ffb020]/30 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Word DOCX Browser Approximation (Upload PDF for pixel-exact image)
            </span>
          ) : (
            <span className="text-[11px] font-bold text-[#868685] bg-[#e8ebe6] px-2.5 py-1 rounded-full">
              Structured Document Render
            </span>
          )}
        </div>

        {isRendering ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 bg-[#e8ebe6]/40 rounded-xl border border-dashed border-[#0e0f0c]/20">
            <Loader2 className="w-8 h-8 text-[#2ead4b] animate-spin" />
            <p className="text-xs font-bold text-[#0e0f0c]">
              Rendering uploaded document image via pdf.js canvas...
            </p>
          </div>
        ) : imageUrl ? (
          <div className="relative rounded-xl border border-gray-200 bg-white p-2 flex justify-center">
            <img
              src={imageUrl}
              alt="Original Uploaded Resume Rendered Document"
              className="max-w-full h-auto rounded shadow-lg object-top block border border-gray-100"
            />
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-[#868685]">
            Original document image unavailable.
          </div>
        )}
      </div>
    </div>
  );
};
