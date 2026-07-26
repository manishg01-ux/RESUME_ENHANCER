import React from 'react';
import { UploadCloud, BarChart3, FileText, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Upload Resume',
      desc: 'Select your .docx or .pdf resume. Mammot.js and PDF.js extract raw text entirely in your browser memory.'
    },
    {
      num: '02',
      icon: BarChart3,
      title: 'Get Capped Score Audit',
      desc: 'Our rule-based engine computes a 6-metric breakdown and caps the final score at 83 for realistic ATS standards.'
    },
    {
      num: '03',
      icon: FileText,
      title: 'Generate & Download DOCX',
      desc: 'Weak verbs are replaced and layout is reformatted. Download an optimized .docx file ready for submission.'
    }
  ];

  return (
    <section className="py-16 bg-[#e2f6d5]/40 border-y border-[#0e0f0c]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-white text-[#0e0f0c] text-xs font-black uppercase tracking-widest border border-[#0e0f0c]/10">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0e0f0c] tracking-tight mt-3">
            How Resume Enhancer Works
          </h2>
          <p className="text-[#454745] text-base mt-2">
            No signup, no server uploads, no privacy risk — instant browser optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-[24px] border border-[#0e0f0c]/10 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#9fe870] bg-[#0e0f0c] w-12 h-12 rounded-[16px] flex items-center justify-center">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#e2f6d5] flex items-center justify-center text-[#0e0f0c]">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0e0f0c] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#454745] leading-relaxed">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-[#2ead4b]">
                    <ArrowRight className="w-6 h-6 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
