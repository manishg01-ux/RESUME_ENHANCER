import React from 'react';
import { FileCheck, Shield, Lock, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e0f0c] text-[#e8ebe6] pt-16 pb-12 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-[#9fe870] flex items-center justify-center text-[#0e0f0c]">
                <FileCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Resume<span className="text-[#9fe870]">Enhancer</span>
              </span>
            </div>
            <p className="text-sm text-[#e8ebe6]/70 max-w-md leading-relaxed">
              Empowering candidates with client-side ATS score audits, action-verb bullet optimization, and downloadable DOCX templates without server storage or privacy compromises.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#9fe870] pt-2">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> 100% In-Browser Parsing</span>
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4" /> Hard-Capped Score Formula (83 Max)</span>
            </div>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#9fe870] mb-4">Core Engine</h4>
            <ul className="space-y-2 text-sm text-[#e8ebe6]/80">
              <li>• Mammot.js DOCX Parser</li>
              <li>• PDF.js Client Reader</li>
              <li>• 6-Metric ATS Audit</li>
              <li>• Weak Verb Transformer</li>
              <li>• Real DOCX Generator</li>
            </ul>
          </div>

          {/* Privacy & Standard */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#9fe870] mb-4">ATS Compatibility</h4>
            <p className="text-xs text-[#e8ebe6]/70 leading-relaxed mb-4">
              Tested against standard ATS algorithms including Taleo, Greenhouse, Lever, Workday, and iCIMS.
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-[#e8ebe6]/90">
              Score Band Legend:<br />
              <span className="text-[#2ead4b] font-bold">80-83</span>: Strong | <span className="text-[#ffb020] font-bold">60-79</span>: Moderate | <span className="text-[#d03238] font-bold">0-59</span>: Critical
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#e8ebe6]/60 gap-4">
          <p>© {new Date().getFullYear()} Resume Enhancer. All resume processing executes strictly client-side.</p>
          <div className="flex items-center gap-6">
            <span>Client-Side React SPA</span>
            <span>Zero Data Collection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
