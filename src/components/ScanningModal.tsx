import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, Database, FileText, Cpu, Sparkles, Binary } from 'lucide-react';

interface ScanningModalProps {
  onComplete: () => void;
}

const PHASES = [
  { id: 0, label: 'Reading document structure & formatting...', icon: FileText, startSec: 0, endSec: 4 },
  { id: 1, label: 'Extracting skills and keywords...', icon: Database, startSec: 4, endSec: 8 },
  { id: 2, label: 'Checking formatting compliance...', icon: ShieldCheck, startSec: 8, endSec: 12 },
  { id: 3, label: 'Comparing against job market keywords...', icon: Cpu, startSec: 12, endSec: 16 },
  { id: 4, label: 'Calculating final score...', icon: Sparkles, startSec: 16, endSec: 20 }
];

export const ScanningModal: React.FC<ScanningModalProps> = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    // Explicitly lock scroll while mounted and unlock in cleanup function
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const duration = 20000; // 20 seconds total

    const interval = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - startTime;
      setElapsed(timeElapsed);

      if (timeElapsed >= duration) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, [onComplete]);

  const elapsedSeconds = elapsed / 1000;
  const progressPercent = Math.min(100, (elapsed / 20000) * 100);

  // Current active phase index (0 to 4)
  const currentPhaseIndex = Math.min(4, Math.floor(elapsedSeconds / 4));
  const currentPhase = PHASES[currentPhaseIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0f0c]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#171916] text-white w-full max-w-xl rounded-[28px] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        {/* Paper Document Visual Component with Sweeping Scan Line */}
        <div className="relative w-48 h-60 bg-[#1e201b] rounded-2xl border border-white/20 p-4 shadow-2xl mb-6 flex flex-col justify-between overflow-hidden group">
          
          {/* Document Content Skeleton Visual */}
          <div className="space-y-2.5">
            {/* Candidate Header */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <div className="w-8 h-8 rounded-full bg-[#9fe870]/20 border border-[#9fe870]/40 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#9fe870]" />
              </div>
              <div className="space-y-1 w-full">
                <div className="w-24 h-2.5 bg-white/40 rounded-sm" />
                <div className="w-16 h-1.5 bg-white/20 rounded-sm" />
              </div>
            </div>

            {/* Summary Lines */}
            <div className="space-y-1 pt-1">
              <div className="w-20 h-2 bg-[#9fe870]/50 rounded-sm mb-1.5" />
              <div className="w-full h-1.5 bg-white/20 rounded-sm" />
              <div className="w-11/12 h-1.5 bg-white/20 rounded-sm" />
              <div className="w-4/5 h-1.5 bg-white/20 rounded-sm" />
            </div>

            {/* Experience Bullets */}
            <div className="space-y-1.5 pt-1">
              <div className="w-24 h-2 bg-[#9fe870]/50 rounded-sm mb-1.5" />
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#9fe870]" />
                <div className="w-full h-1.5 bg-white/30 rounded-sm" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#9fe870]" />
                <div className="w-5/6 h-1.5 bg-white/20 rounded-sm" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#9fe870]" />
                <div className="w-3/4 h-1.5 bg-white/20 rounded-sm" />
              </div>
            </div>

            {/* Skills Badges */}
            <div className="flex gap-1 pt-1">
              <div className="w-8 h-2 bg-white/20 rounded-sm" />
              <div className="w-10 h-2 bg-white/20 rounded-sm" />
              <div className="w-6 h-2 bg-white/20 rounded-sm" />
            </div>
          </div>

          {/* Sweeping Green Laser Scan Line with Blur Trail & Floating Particle Glows */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9fe870] to-transparent shadow-[0_0_20px_#9fe870] animate-[scan_2.8s_ease-in-out_infinite]" />
          <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#9fe870]/20 to-transparent pointer-events-none animate-[scanTrail_2.8s_ease-in-out_infinite]" />
          
          {/* Particle dots along scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-6 w-1.5 h-1.5 rounded-full bg-[#9fe870] animate-ping" />
            <div className="absolute top-2/4 right-8 w-2 h-2 rounded-full bg-[#cdffad] animate-pulse" />
            <div className="absolute top-3/4 left-12 w-1.5 h-1.5 rounded-full bg-[#9fe870] animate-ping" />
          </div>

          {/* Live Scanner Watermark Footer */}
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono border-t border-white/10 pt-1.5">
            <span className="flex items-center gap-1 text-[#9fe870]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9fe870] animate-ping" />
              ATS SCAN
            </span>
            <span>20.0s Audit</span>
          </div>
        </div>

        {/* Dynamic Phase Status Header */}
        <div className="text-center mb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9fe870]/15 text-[#9fe870] text-xs font-black uppercase tracking-wider border border-[#9fe870]/30 transition-all duration-300">
            <Search className="w-3.5 h-3.5 animate-pulse" />
            <span>Phase {currentPhaseIndex + 1} of 5</span>
          </div>
          
          {/* Animated Active Phase Label with Fade transition */}
          <div className="h-10 flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight animate-[fadeIn_0.4s_ease-in-out]">
              {currentPhase.label}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-medium">
            Benchmarking against 200+ resume reference dataset
          </p>
        </div>

        {/* Smooth 20s Progress Bar */}
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-6 relative border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#2ead4b] via-[#9fe870] to-[#cdffad] transition-all duration-100 ease-linear rounded-full shadow-[0_0_15px_#9fe870]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 5 Visible Phase Steps List */}
        <div className="w-full space-y-2">
          {PHASES.map((phase) => {
            const isCompleted = elapsedSeconds >= phase.endSec;
            const isActive = currentPhaseIndex === phase.id && !isCompleted;
            const Icon = phase.icon;

            return (
              <div
                key={phase.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#9fe870]/10 border-[#9fe870]/30 text-white font-bold'
                    : isActive
                    ? 'bg-white/10 border-[#9fe870]/50 text-[#9fe870] font-extrabold shadow-sm'
                    : 'bg-white/5 border-white/5 text-zinc-500 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-[#9fe870] text-[#0e0f0c]'
                      : isActive
                      ? 'bg-[#9fe870]/20 text-[#9fe870] animate-pulse'
                      : 'bg-white/10 text-zinc-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span>{phase.label}</span>
                </div>

                <span className="text-[11px] font-mono shrink-0">
                  {isCompleted ? '100%' : isActive ? `${Math.round(((elapsedSeconds - phase.startSec) / 4) * 100)}%` : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Timer Footer */}
        <div className="mt-6 flex items-center justify-between w-full text-[11px] text-zinc-400 font-mono border-t border-white/10 pt-3">
          <span>Deterministic Audit Algorithm</span>
          <span className="font-bold text-[#9fe870]">
            {(20 - elapsedSeconds).toFixed(1)}s remaining
          </span>
        </div>

      </div>

      {/* Keyframe animation definitions */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 95%; }
          100% { top: 0%; }
        }
        @keyframes scanTrail {
          0% { top: 0%; }
          50% { top: 85%; }
          100% { top: 0%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
