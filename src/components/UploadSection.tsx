import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, EyeOff, Loader2, Sparkles, FileType } from 'lucide-react';
import { parseResumeFile } from '../utils/fileParser';
import { SAMPLE_JDS } from '../data/sampleJDs';
import { ExtractedFile, SampleJD } from '../types';

interface UploadSectionProps {
  onScanResume: (resumeText: string, jobDescription: string, extractedFile?: ExtractedFile) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onScanResume }) => {
  const [extractedFile, setExtractedFile] = useState<ExtractedFile | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [jobDescription, setJobDescription] = useState<string>('');
  const [selectedJdId, setSelectedJdId] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File handling
  const handleFileProcess = async (file: File) => {
    setParseError(null);
    setIsParsing(true);
    try {
      const parsed = await parseResumeFile(file);
      setExtractedFile(parsed);
    } catch (err: any) {
      console.error('Parsing failure:', err);
      setParseError(err.message || "Couldn't read this file — try re-saving it as .docx and uploading again");
      setExtractedFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Sample JD Selector
  const handleSelectSampleJd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedJdId(id);
    if (id) {
      const found = SAMPLE_JDS.find(j => j.id === id);
      if (found) {
        setJobDescription(found.description);
      }
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section Banner */}
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-[#9fe870] text-[#0e0f0c] text-xs font-black uppercase tracking-widest inline-block shadow-sm mb-4">
            Deterministic ATS Audit Engine
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0e0f0c] tracking-tight leading-none mb-4">
            Know Your Resume's <span className="text-[#2ead4b]">ATS Score</span> Before You Apply
          </h1>
          <p className="text-lg text-[#454745] max-w-2xl mx-auto font-normal">
            Upload your .docx or .pdf resume to get a 0–100 scale ATS score (capped at 82 max benchmark), detailed action-verb breakdown, and downloadable rewritten resume using real candidate facts.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#0e0f0c]/10 shadow-xl space-y-8">
          
          {/* STEP 1: Drag & Drop Zone */}
          <div>
            <label className="block text-sm font-bold text-[#0e0f0c] mb-3 uppercase tracking-wider">
              Step 1: Upload Your Resume (.docx or .pdf)
            </label>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[20px] p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 ${
                isDragOver
                  ? 'border-[#2ead4b] bg-[#e2f6d5]'
                  : extractedFile
                  ? 'border-[#2ead4b]/60 bg-[#e2f6d5]/30'
                  : 'border-[#0e0f0c]/20 bg-[#e8ebe6]/40 hover:bg-[#e8ebe6] hover:border-[#0e0f0c]/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {isParsing ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-[#2ead4b] animate-spin" />
                  <span className="font-bold text-[#0e0f0c] text-base">Reading file in browser memory...</span>
                  <span className="text-xs text-[#868685]">Extracting text via Mammoth / PDF.js</span>
                </div>
              ) : extractedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#9fe870] flex items-center justify-center text-[#0e0f0c] shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="font-black text-lg text-[#0e0f0c]">{extractedFile.name}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0e0f0c] text-white">
                    {(extractedFile.size / 1024).toFixed(1)} KB • {extractedFile.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#2ead4b] font-bold mt-1">
                    ✓ File text extracted successfully! Click to change file.
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-[#9fe870] flex items-center justify-center text-[#0e0f0c] shadow-md">
                    <UploadCloud className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#0e0f0c]">
                      Drag and drop your resume here, or <span className="text-[#2ead4b] underline">browse files</span>
                    </p>
                    <p className="text-xs text-[#868685] mt-1 font-medium">
                      Supports Word (.docx) and PDF (.pdf) documents
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Parsing error alert */}
            {parseError && (
              <div className="mt-4 p-4 rounded-xl bg-[#d03238]/10 border border-[#d03238]/30 flex items-start gap-3 text-xs text-[#d03238] font-semibold">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">File Extraction Failed</p>
                  <p className="mt-0.5">{parseError}</p>
                </div>
              </div>
            )}

            {/* STEP 4: Preview Extracted Text */}
            {extractedFile && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(!showPreview);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-[#0e0f0c] hover:text-[#2ead4b] transition-colors py-1"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showPreview ? 'Hide extracted text preview' : 'Preview extracted text (verification step)'}</span>
                </button>

                {showPreview && (
                  <div className="mt-2 p-4 rounded-xl bg-[#e8ebe6] border border-[#0e0f0c]/10 text-xs font-mono text-[#0e0f0c]/80 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {extractedFile.previewText}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 2: Target Job Description (Optional but recommended) */}
          <div className="pt-4 border-t border-[#0e0f0c]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="block text-sm font-bold text-[#0e0f0c] uppercase tracking-wider">
                Step 2: Target Job Description (Optional)
              </label>

              {/* Sample JDs Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#868685]">Or choose sample JD:</span>
                <select
                  value={selectedJdId}
                  onChange={handleSelectSampleJd}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#e8ebe6] border border-[#0e0f0c]/10 text-[#0e0f0c] focus:outline-none focus:ring-2 focus:ring-[#2ead4b]"
                >
                  <option value="">-- Choose Sample Job --</option>
                  {SAMPLE_JDS.map((jd) => (
                    <option key={jd.id} value={jd.id}>
                      {jd.title} ({jd.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to compare skill keywords, or select one from the dropdown above..."
              className="w-full p-4 rounded-[12px] bg-[#e8ebe6]/50 border border-[#0e0f0c]/10 text-sm text-[#0e0f0c] focus:outline-none focus:ring-2 focus:ring-[#2ead4b] focus:bg-white transition-all placeholder-[#868685]"
            />
          </div>

          {/* STEP 5: Scan Resume CTA Button */}
          <div className="pt-2">
            <button
              disabled={!extractedFile || isParsing}
              onClick={() => extractedFile && onScanResume(extractedFile.text, jobDescription, extractedFile)}
              className={`w-full py-4 px-8 rounded-full font-black text-lg tracking-wide transition-all shadow-md flex items-center justify-center gap-3 ${
                extractedFile && !isParsing
                  ? 'bg-[#9fe870] text-[#0e0f0c] hover:bg-[#cdffad] hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-[#e8ebe6] text-[#868685] cursor-not-allowed border border-[#0e0f0c]/10'
              }`}
            >
              <Sparkles className="w-6 h-6 stroke-[2.5]" />
              <span>Scan Resume & Get ATS Score</span>
            </button>
            {!extractedFile && (
              <p className="text-center text-xs text-[#868685] font-semibold mt-2">
                Upload a .docx or .pdf file above to enable scanning
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
