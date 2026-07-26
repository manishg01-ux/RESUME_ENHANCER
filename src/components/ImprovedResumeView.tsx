import React, { useEffect, useState } from 'react';
import { ImprovedResume, ExtractedFile } from '../types';
import { ResumeTemplateA4 } from './ResumeTemplateA4';
import { exportElementToPdf, captureElementToImage } from '../utils/pdfExporter';
import { Download, Copy, Check, ArrowLeft, TrendingUp, CheckCircle2, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImprovedResumeViewProps {
  improvedResume: ImprovedResume;
  originalText: string;
  extractedFile: ExtractedFile | null;
  onBackToScore: () => void;
  onStartOver: () => void;
}

export const ImprovedResumeView: React.FC<ImprovedResumeViewProps> = ({
  improvedResume,
  originalText,
  extractedFile,
  onBackToScore,
  onStartOver
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'image' | 'diff'>('image');
  const [onePageImgUrl, setOnePageImgUrl] = useState<string | null>(null);
  const [isRenderingImg, setIsRenderingImg] = useState<boolean>(true);

  // Capture one-page template to image for visual display
  useEffect(() => {
    let isMounted = true;
    async function captureImage() {
      setIsRenderingImg(true);
      // Brief delay to allow A4 template DOM to settle
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const dataUrl = await captureElementToImage('a4-resume-template-offscreen');
        if (isMounted) {
          setOnePageImgUrl(dataUrl);
        }
      } catch (err) {
        console.error('Error generating template image:', err);
      } finally {
        if (isMounted) {
          setIsRenderingImg(false);
        }
      }
    }

    captureImage();
    return () => {
      isMounted = false;
    };
  }, [improvedResume]);

  // Requirement 6: Download as PDF directly
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const safeName = (improvedResume.fullName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${safeName}_ATS_Optimized_Resume.pdf`;
      await exportElementToPdf('a4-resume-template-offscreen', filename);
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(improvedResume.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12">
      {/* Offscreen A4 element for html2canvas rendering & PDF export */}
      <div className="absolute top-0 left-0 opacity-0 pointer-events-none z-[-100] overflow-hidden w-[800px]" aria-hidden="true">
        <ResumeTemplateA4 resume={improvedResume} id="a4-resume-template-offscreen" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToScore}
              className="flex items-center gap-2 text-sm font-bold text-[#0e0f0c] bg-white px-4 py-2 rounded-full border border-[#0e0f0c]/10 hover:bg-[#e8ebe6] transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Score Audit</span>
            </button>
            <button
              onClick={onStartOver}
              className="text-xs font-bold text-[#868685] hover:text-[#0e0f0c] transition-colors"
            >
              Start Over
            </button>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-[#9fe870] text-[#0e0f0c] text-xs font-black uppercase tracking-wider">
            ✓ Real Facts Preserved • Single-Page Layout
          </span>
        </div>

        {/* Before vs After Score Banner */}
        <div className="bg-[#0e0f0c] text-white p-6 sm:p-8 rounded-[24px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9fe870]/20 text-[#9fe870] text-xs font-bold uppercase tracking-wider mb-2 border border-[#9fe870]/30">
              <TrendingUp className="w-3.5 h-3.5" />
              ATS Score Optimized
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Resume Improved for {improvedResume.fullName || 'Candidate'}
            </h2>
            <p className="text-xs text-zinc-400">
              All real employer names, job titles, dates, degrees, and core facts preserved strictly.
            </p>
          </div>

          {/* Score Badges */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3">
              <span className="block text-xs text-zinc-400 font-bold uppercase">Original</span>
              <span className="text-2xl font-black text-zinc-300">{improvedResume.beforeScore}/100</span>
            </div>
            <span className="text-[#9fe870] text-xl font-bold">→</span>
            <div className="text-center px-3">
              <span className="block text-xs text-[#9fe870] font-bold uppercase">Improved</span>
              <span className="text-3xl font-black text-[#9fe870]">{improvedResume.afterScore}/100</span>
            </div>
          </div>
        </div>

        {/* Main Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-[20px] border border-[#0e0f0c]/10 shadow-sm">
          {/* View Toggle Tabs */}
          <div className="flex items-center bg-[#e8ebe6] p-1 rounded-full border border-[#0e0f0c]/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-white text-[#0e0f0c] shadow-sm'
                  : 'text-[#868685] hover:text-[#0e0f0c]'
              }`}
            >
              One-Page Resume Image Preview
            </button>
            <button
              onClick={() => setActiveTab('diff')}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'diff'
                  ? 'bg-white text-[#0e0f0c] shadow-sm'
                  : 'text-[#868685] hover:text-[#0e0f0c]'
              }`}
            >
              Action Verb Changelog ({improvedResume.experienceBullets.filter(b => b.changed).length})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyText}
              className="flex-1 sm:flex-none px-4 py-3 rounded-full bg-[#e8ebe6] text-[#0e0f0c] text-xs font-bold hover:bg-[#d8dcd5] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#2ead4b]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Plain Text'}</span>
            </button>

            {/* Requirement 6: PDF Download */}
            <button
              disabled={isDownloading}
              onClick={handleDownloadPdf}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#9fe870] text-[#0e0f0c] text-sm font-black hover:bg-[#cdffad] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{isDownloading ? 'Exporting Single-Page PDF...' : 'Download Optimized Resume (.pdf)'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: One-Page Image Preview */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] border border-[#0e0f0c]/10 shadow-xl p-6 sm:p-10 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-4 border-b border-[#0e0f0c]/10 pb-3">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0e0f0c]">
                  <ImageIcon className="w-4 h-4 text-[#2ead4b]" />
                  Clean One-Page Resume Template Image
                </span>
                <span className="text-[11px] font-bold text-[#2ead4b] bg-[#2ead4b]/10 px-3 py-1 rounded-full border border-[#2ead4b]/20">
                  Single-Page A4 Proportion
                </span>
              </div>

              {isRenderingImg ? (
                <div className="h-[600px] w-full flex flex-col items-center justify-center gap-3 bg-[#e8ebe6]/30 rounded-2xl border border-dashed border-[#0e0f0c]/20">
                  <Loader2 className="w-8 h-8 text-[#2ead4b] animate-spin" />
                  <p className="text-xs font-bold text-[#0e0f0c]">
                    Rendering single-page resume template image via html2canvas...
                  </p>
                </div>
              ) : onePageImgUrl ? (
                <div className="w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden border border-gray-300 bg-gray-50 p-2">
                  <img
                    src={onePageImgUrl}
                    alt="One-Page ATS Optimized Resume Rendered Image"
                    className="w-full h-auto object-contain block rounded-sm shadow"
                  />
                </div>
              ) : (
                <div className="w-full max-w-[800px]">
                  <ResumeTemplateA4 resume={improvedResume} id="a4-resume-template-visible" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Action Verb Changelog */}
        {activeTab === 'diff' && (
          <div className="bg-white rounded-[24px] border border-[#0e0f0c]/10 shadow-lg p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#0e0f0c]">Line-by-Line Phrasing Enhancements</h3>
              <p className="text-xs text-[#868685] mt-0.5">
                Here is how weak verbs and passive phrasing were replaced with high-impact action verbs.
              </p>
            </div>

            <div className="space-y-4">
              {improvedResume.experienceBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
                    bullet.changed
                      ? 'bg-[#e2f6d5]/30 border-[#2ead4b]/30'
                      : 'bg-[#e8ebe6]/30 border-[#0e0f0c]/10'
                  }`}
                >
                  {bullet.changed ? (
                    <>
                      <div className="flex items-center justify-between font-bold text-[#2ead4b]">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Action Verb Upgraded</span>
                        </span>
                        {bullet.reason && <span className="text-[11px] text-[#868685] font-medium">{bullet.reason}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded-xl bg-[#d03238]/10 text-[#0e0f0c]">
                          <span className="block text-[10px] font-bold text-[#d03238] uppercase mb-0.5">Original Phrasing:</span>
                          <span className="line-through opacity-80">{bullet.original}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#2ead4b]/15 text-[#0e0f0c]">
                          <span className="block text-[10px] font-bold text-[#2ead4b] uppercase mb-0.5">Improved Phrasing:</span>
                          <span className="font-semibold">{bullet.improved}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-[#868685]">
                      <span>{bullet.improved}</span>
                      <span className="text-[10px] uppercase font-bold bg-[#e8ebe6] px-2 py-0.5 rounded-md text-[#868685]">Preserved</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
