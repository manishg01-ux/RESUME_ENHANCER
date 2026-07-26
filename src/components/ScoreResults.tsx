import React from 'react';
import { Gauge } from './Gauge';
import { OriginalResumePreview } from './OriginalResumePreview';
import { ATSResult, ExtractedFile } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowLeft, Target, Key, Database, FileText } from 'lucide-react';

interface ScoreResultsProps {
  result: ATSResult;
  extractedFile: ExtractedFile | null;
  resumeText: string;
  onGenerateImproved: () => void;
  onBack: () => void;
}

export const ScoreResults: React.FC<ScoreResultsProps> = ({
  result,
  extractedFile,
  resumeText,
  onGenerateImproved,
  onBack
}) => {
  const metrics = [
    { label: 'Keyword Match Index', val: result.breakdown.keywordScore, weight: '35%' },
    { label: 'Section Structure & Completeness', val: result.breakdown.sectionScore, weight: '15%' },
    { label: 'Formatting & Bullet Layout', val: result.breakdown.formattingScore, weight: '15%' },
    { label: 'Action Verb Impact Ratio', val: result.breakdown.verbScore, weight: '15%' },
    { label: 'Metric Quantification', val: result.breakdown.quantScore, weight: '10%' },
    { label: 'Contact Header Hygiene', val: result.breakdown.contactScore, weight: '10%' }
  ];

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Bar with Back Button & Reference Dataset Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-[#0e0f0c] bg-white px-4 py-2 rounded-full border border-[#0e0f0c]/10 hover:bg-[#e8ebe6] transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload New Resume</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-[#0e0f0c] text-[#9fe870]">
              <Database className="w-3.5 h-3.5" />
              200+ Resume Corpus Reference Benchmark
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#2ead4b]/10 text-[#2ead4b] border border-[#2ead4b]/30">
              0-100 Scale • 82 Cap
            </span>
          </div>
        </div>

        {/* Main Score Overview Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#0e0f0c]/10 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Gauge Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#e8ebe6]/30 rounded-[20px] border border-[#0e0f0c]/5">
            <Gauge
              score={result.finalScore}
              maxScore={100}
              color={result.color}
              label={result.label}
              size={220}
            />
          </div>

          {/* Score Insights Summary Column */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#868685]">Audit Summary</span>
              <h2 className="text-3xl font-black text-[#0e0f0c] tracking-tight">
                ATS Readiness Rating: <span style={{ color: result.color }}>{result.finalScore}/100</span>
              </h2>
              <p className="text-xs font-bold text-[#868685] mt-1">
                Deterministic ceiling cap applied at 82/100 maximum
              </p>
            </div>

            <p className="text-sm text-[#454745] leading-relaxed font-normal">
              {result.finalScore >= 80
                ? 'Your resume demonstrates high keyword density and strong structural alignment against our reference dataset. Minor action-verb enhancements will solidify top-tier parsing.'
                : result.finalScore >= 60
                ? 'Your resume passes basic parsing but contains passive phrasing or missing keywords. Generating our optimized rewrite will raise your score toward the 82 benchmark ceiling.'
                : 'Your resume faces high rejection risk due to weak verbs, missing section labels, or insufficient quantified metrics. Use our rewriter below to resolve these issues immediately.'}
            </p>

            <div className="pt-2">
              <button
                onClick={onGenerateImproved}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9fe870] text-[#0e0f0c] font-black text-base hover:bg-[#cdffad] transition-all shadow-md flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer"
              >
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
                <span>Generate Improved Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Original Uploaded Resume Image Visual Preview Section */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#0e0f0c]/10 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#0e0f0c]/10 pb-3">
            <h3 className="text-xl font-black text-[#0e0f0c] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2ead4b]" />
              <span>Uploaded Original Resume Document View</span>
            </h3>
            <span className="text-xs text-[#868685] font-semibold">Rendered Document Image</span>
          </div>

          <OriginalResumePreview
            extractedFile={extractedFile}
            rawText={resumeText}
          />
        </div>

        {/* 6 Metric Breakdown Bars Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#0e0f0c]/10 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#0e0f0c] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#2ead4b]" />
              <span>6-Metric Breakdown Audit</span>
            </h3>
            <span className="text-xs text-[#868685] font-semibold">Weighted Scoring Index</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#0e0f0c]">
                    {m.label} <span className="text-[#868685] font-normal">({m.weight})</span>
                  </span>
                  <span className="text-[#0e0f0c] font-black">{m.val}/100</span>
                </div>
                <div className="h-3 w-full bg-[#e8ebe6] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${m.val}%`,
                      backgroundColor: m.val >= 75 ? '#2ead4b' : m.val >= 50 ? '#ffb020' : '#d03238'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pros and Cons Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pros Column */}
          <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-[#0e0f0c]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#e2f6d5] text-[#2ead4b] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0e0f0c]">Strengths ({result.pros.length})</h4>
            </div>

            <div className="space-y-2.5">
              {result.pros.map((pro, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#e2f6d5]/50 border border-[#2ead4b]/20 text-xs font-semibold text-[#0e0f0c] flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2ead4b] mt-1 shrink-0" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cons Column */}
          <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-[#0e0f0c]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#d03238]/10 text-[#d03238] flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0e0f0c]">Gaps & Fixes ({result.cons.length})</h4>
            </div>

            <div className="space-y-2.5">
              {result.cons.map((con, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#d03238]/10 border border-[#d03238]/20 text-xs font-semibold text-[#0e0f0c] flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#d03238] mt-1 shrink-0" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Missing Keywords Grid */}
        {result.missingKeywords.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-[#0e0f0c]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[#0e0f0c] flex items-center gap-2">
                <Key className="w-5 h-5 text-[#ffb020]" />
                <span>Missing Skill Keywords ({result.missingKeywords.length})</span>
              </h4>
              <span className="text-xs text-[#868685] font-semibold">Recommended to include</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-[#d03238]/10 text-[#d03238] border border-[#d03238]/20 text-xs font-bold"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div className="bg-[#0e0f0c] p-8 rounded-[24px] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-black text-white">Ready to Boost Your ATS Score?</h4>
            <p className="text-xs text-[#e8ebe6]/80 mt-1">
              Transform weak phrases into action verbs while preserving your real candidate facts and experience.
            </p>
          </div>
          <button
            onClick={onGenerateImproved}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9fe870] text-[#0e0f0c] font-black text-base hover:bg-[#cdffad] transition-all shrink-0 cursor-pointer"
          >
            Generate Improved Resume
          </button>
        </div>

      </div>
    </section>
  );
};
