import React from 'react';
import { Code2, LineChart, Briefcase, CheckCircle2, Kanban, Megaphone } from 'lucide-react';

export const RoleShowcase: React.FC = () => {
  const roles = [
    {
      icon: Code2,
      title: 'Java / Backend Developer',
      skills: ['Java 17', 'Spring Boot', 'Microservices', 'Kafka', 'PostgreSQL', 'Docker']
    },
    {
      icon: LineChart,
      title: 'Data & Analytics',
      skills: ['SQL', 'Power BI', 'Tableau', 'Python', 'Snowflake', 'ETL Pipelines']
    },
    {
      icon: Briefcase,
      title: 'Business Analyst',
      skills: ['Requirements Gathering', 'Process Mapping', 'UAT', 'Jira', 'User Stories']
    },
    {
      icon: CheckCircle2,
      title: 'QA & Test Automation',
      skills: ['Selenium', 'Playwright', 'API Testing', 'Postman', 'CI/CD Pipelines']
    },
    {
      icon: Kanban,
      title: 'Project Manager',
      skills: ['Agile / Scrum', 'Risk Management', 'Stakeholder Comms', 'Sprint Planning']
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      skills: ['SEO / SEM', 'Google Analytics', 'A/B Testing', 'HubSpot', 'Conversion Optimization']
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#e2f6d5] text-[#0e0f0c] text-xs font-black uppercase tracking-widest border border-[#2ead4b]/20">
            Tailored Domain Rules
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0e0f0c] tracking-tight mt-3">
            Tuned for Industry Job Profiles
          </h2>
          <p className="text-[#454745] text-base mt-2">
            Recognizes specialized skill sets across top engineering, analytical, and business categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-[24px] border border-[#0e0f0c]/5 shadow-sm hover:border-[#9fe870] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[14px] bg-[#9fe870] text-[#0e0f0c] flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="font-bold text-[#0e0f0c] text-base">{role.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-[#e8ebe6] text-[#0e0f0c] text-xs font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
