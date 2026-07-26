import React from 'react';
import { Target, Layers, Zap, Search } from 'lucide-react';

export const WhyAtsMatters: React.FC = () => {
  const cards = [
    {
      icon: Search,
      title: 'Keyword Match Index',
      description: 'ATS parsers scan for exact skill matches against job requirements. Missing key terms flags your resume as unqualified.'
    },
    {
      icon: Layers,
      title: 'Section Hierarchy',
      description: 'Non-standard headers like "My Journey" confuse parsers. Standard sections like "Professional Experience" pass clean.'
    },
    {
      icon: Zap,
      title: 'Action-Verb Velocity',
      description: 'Starting points with "Responsible for" or "Worked on" reduces impact. Strong verbs like "Spearheaded" score higher.'
    },
    {
      icon: Target,
      title: 'Quantified Metric Ratio',
      description: 'ATS algorithms favor bullet points with percentages, revenue figures, and team sizes to verify real business impact.'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#e2f6d5] text-[#0e0f0c] text-xs font-black uppercase tracking-widest border border-[#2ead4b]/20">
            ATS Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0e0f0c] tracking-tight mt-3">
            Why Your ATS Score Matters
          </h2>
          <p className="text-[#454745] text-base mt-2">
            75% of qualified resumes are rejected by applicant tracking software before human eyes ever see them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-[24px] border border-[#0e0f0c]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-[16px] bg-[#e2f6d5] text-[#0e0f0c] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-[#0e0f0c] mb-2">{card.title}</h3>
                <p className="text-sm text-[#454745] leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
