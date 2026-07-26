import React, { useState } from 'react';
import { Sparkles, Star, MessageSquare, ArrowRight, Check, Palette, Eye, FileText, Award } from 'lucide-react';
import { TemplateId, ResumeTemplateMeta } from '../types';

interface HeroLandingProps {
  onBuildResume: () => void;
  onGetScore: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: 'modern-teal',
    name: 'Carrie Jones',
    description: 'Product Manager | Strategy & Innovation',
    badge: 'Popular & ATS Approved',
    accentColor: '#0d9488', // Teal
  },
  {
    id: 'classic-corporate',
    name: 'Abigail Hall',
    description: 'Senior Business Analyst | Data Expert',
    badge: 'Clean & Executive',
    accentColor: '#2563eb', // Blue
  },
  {
    id: 'impact-navy',
    name: 'Aiden Williams',
    description: 'Senior Project Manager | Treasury Specialist',
    badge: 'High Impact Sidebar',
    accentColor: '#1e293b', // Navy
  },
  {
    id: 'creative-emerald',
    name: 'Maeve Dempsey',
    description: 'Strategic Sourcing Specialist | Supply Chain',
    badge: 'Modern Visuals',
    accentColor: '#16a34a', // Emerald
  },
  {
    id: 'tech-minimal',
    name: 'Alex Rivera',
    description: 'Full Stack Engineer | Technical Architect',
    badge: 'Tech & Grid Focus',
    accentColor: '#9333ea', // Purple
  }
];

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onBuildResume,
  onGetScore,
  onSelectTemplate
}) => {
  const [activeColor, setActiveColor] = useState<string>('#2563eb');
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateId | null>('modern-teal');

  const colorSwatches = [
    '#2563eb', '#0d9488', '#ea580c', '#9333ea', '#0284c7',
    '#0f172a', '#334155', '#1d4ed8', '#d97706', '#854d0e'
  ];

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* 1. Main Hero Banner Section (Enhancv Style) */}
      <section className="relative pt-10 lg:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Call To Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0e0f0c] tracking-tight leading-[1.1]">
                Land more interviews with Enhancv's{' '}
                <span className="relative inline-block text-[#5b21b6] px-3 py-0.5 rounded-2xl bg-[#f3e8ff] border border-[#d8b4fe]/50">
                  Resume Builder
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#525252] font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBuildResume}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#10b981] text-white text-lg font-black hover:bg-[#059669] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Build Your Resume</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={onGetScore}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0e0f0c] text-lg font-black border-2 border-[#0e0f0c]/20 hover:border-[#0e0f0c] hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Your Resume Score</span>
              </button>
            </div>

            {/* Social Proof & Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#0e0f0c] font-bold">
              {/* Star Rating */}
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-[#0e0f0c]/10 shadow-sm">
                <div className="flex items-center text-[#10b981]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#10b981]" />
                  ))}
                </div>
                <span className="text-xs font-black">5,304 Reviews</span>
              </div>

              {/* Hired Metrics */}
              <div className="flex items-center gap-2.5 bg-white/80 px-4 py-2 rounded-full border border-[#0e0f0c]/10 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                  <MessageSquare className="w-4 h-4 fill-[#0284c7]" />
                </div>
                <span className="text-xs font-black">
                  <span className="text-[#0e0f0c]">28,452 users</span> landed interviews last month
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Graphic Mockup (Matching Enhancv Hero Image) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Floating "HIRED" Badge */}
              <div className="absolute -top-4 left-4 z-20 bg-white border-2 border-[#10b981] px-4 py-1 rounded-full text-[#10b981] text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 animate-bounce">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>HIRED</span>
              </div>

              {/* Main Stacked Resume Graphic */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4 transition-all hover:shadow-3xl">
                
                {/* Candidate Header with Photo Avatar */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Erin Schaefer"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-[#10b981]/30"
                  />
                  <div>
                    <h4 className="text-lg font-extrabold text-[#0e0f0c]">Erin Schaefer</h4>
                    <p className="text-xs font-bold text-[#10b981]" style={{ color: activeColor }}>
                      Experienced Project Manager
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">+1-800-000-0000 • erin.schaefer@example.com</span>
                  </div>
                </div>

                {/* Summary snippet */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Summary</span>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Results-oriented project team leader with 5+ years of experience steering project delivery and product management. Proven ability to meet business goals while scaling engineering outputs by 35%.
                  </p>
                </div>

                {/* Experience snippet */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Experience</span>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-[#0e0f0c]">Senior IT Product Manager</span>
                      <span className="text-[10px] text-gray-400">02/2019 - Present</span>
                    </div>
                    <span className="text-[11px] font-bold block" style={{ color: activeColor }}>
                      Rover Games
                    </span>
                    <ul className="text-[10px] text-gray-600 space-y-1 list-disc pl-3">
                      <li>Accelerated outbound sales cycle by 390% by designing and launching custom acquisition platforms.</li>
                      <li>Led cross-functional team of 10 developers to build scalable mobile infrastructure.</li>
                    </ul>
                  </div>
                </div>

                {/* Color Selector Popover (Matches image 1 "COLORS" widget) */}
                <div className="absolute -bottom-6 -right-2 sm:-right-6 z-30 bg-white rounded-2xl p-4 shadow-2xl border border-gray-200 w-56 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-gray-500" />
                      COLORS
                    </span>
                    <span className="text-[9px] font-bold text-[#10b981]">Live Theme</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {colorSwatches.map((color) => (
                      <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                          activeColor === color ? 'scale-110 ring-2 ring-offset-2 ring-gray-900' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {activeColor === color && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </button>
                    ))}
                  </div>

                  <div className="text-center pt-1">
                    <span className="text-[11px] font-bold text-[#2563eb] hover:underline cursor-pointer">
                      Use custom color
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Template Picker Carousel Section (Exact Match for Image 2) */}
      <section className="bg-white/60 py-12 border-y border-[#0e0f0c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight">
              Pick a template and build your resume in minutes!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Choose from recruiter-approved, ATS-friendly templates crafted for top industry roles.
            </p>
          </div>

          {/* Template Gallery Horizontal Scroll / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onMouseEnter={() => setHoveredTemplate(tmpl.id)}
                className={`group relative bg-white rounded-2xl p-4 border-2 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                  hoveredTemplate === tmpl.id
                    ? 'border-[#10b981] scale-[1.02] ring-4 ring-[#10b981]/15'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Badge */}
                {tmpl.badge && (
                  <div className="absolute top-3 right-3 z-10 bg-[#0e0f0c] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow">
                    {tmpl.badge}
                  </div>
                )}

                {/* Template Visual Preview Card */}
                <div className="relative aspect-[1/1.3] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-3 space-y-2 flex flex-col justify-between group-hover:bg-gray-100/50 transition-colors">
                  {/* Decorative Header Bar */}
                  <div className="h-3 rounded-md w-full" style={{ backgroundColor: tmpl.accentColor }}></div>

                  {/* Mock Layout Body */}
                  <div className="space-y-1.5 flex-1 pt-1">
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
                    <div className="pt-2 space-y-1">
                      <div className="h-1 bg-gray-200 rounded w-full"></div>
                      <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-200 rounded w-4/6"></div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 space-y-1">
                      <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-1 bg-gray-200 rounded w-full"></div>
                      <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Hover overlay button "Start With This Template" */}
                  <div className="absolute inset-0 bg-[#0e0f0c]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => onSelectTemplate(tmpl.id)}
                      className="px-4 py-2.5 rounded-full bg-[#10b981] text-white text-xs font-black shadow-lg hover:bg-[#059669] transition-all cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      Start With This Template
                    </button>
                  </div>
                </div>

                {/* Template Details */}
                <div className="mt-4 pt-2 border-t border-gray-100 space-y-1">
                  <h4 className="font-extrabold text-[#0e0f0c] text-sm group-hover:text-[#10b981] transition-colors">
                    {tmpl.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">{tmpl.description}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
