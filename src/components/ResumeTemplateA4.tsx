import React from 'react';
import { ImprovedResume } from '../types';

interface ResumeTemplateA4Props {
  resume: ImprovedResume;
  id?: string;
}

export const ResumeTemplateA4: React.FC<ResumeTemplateA4Props> = ({ resume, id = 'a4-resume-template' }) => {
  return (
    <div
      id={id}
      className="bg-white text-[#111827] font-sans p-10 max-w-[800px] w-full mx-auto shadow-2xl rounded-sm border border-gray-200"
      style={{
        width: '794px',
        minHeight: '1123px',
        boxSizing: 'border-box',
        color: '#111827'
      }}
    >
      {/* 1. Candidate Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-5 space-y-1">
        <h1 className="text-2xl font-black uppercase tracking-wider text-gray-900">
          {resume.fullName || 'Candidate Name'}
        </h1>
        <p className="text-xs font-medium text-gray-600 tracking-wide">
          {resume.contactInfo}
        </p>
      </div>

      {/* 2. Professional Summary */}
      {resume.summary && (
        <div className="mb-5 space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-[11.5px] leading-relaxed text-gray-800 text-justify">
            {resume.summary}
          </p>
        </div>
      )}

      {/* 3. Core Competencies & Technical Skills */}
      {resume.skillsList && resume.skillsList.length > 0 && (
        <div className="mb-5 space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1">
            Core Competencies & Technical Skills
          </h2>
          <p className="text-[11px] font-medium text-gray-800 leading-relaxed">
            {resume.skillsList.join('  •  ')}
          </p>
        </div>
      )}

      {/* 4. Professional Experience */}
      <div className="mb-5 space-y-3.5">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1">
          Professional Experience
        </h2>

        {resume.roles && resume.roles.length > 0 ? (
          resume.roles.map((role, idx) => (
            <div key={idx} className="space-y-1">
              {(role.title || role.company) && (
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-gray-900">
                  <span>
                    {role.title} {role.company ? <span className="font-semibold text-gray-700">| {role.company}</span> : ''}
                  </span>
                  {role.dates && (
                    <span className="text-[10.5px] text-gray-500 font-medium">{role.dates}</span>
                  )}
                </div>
              )}
              <ul className="list-disc list-outside pl-4 space-y-1">
                {role.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="text-[11px] leading-tight text-gray-800">
                    {b.improved.replace(/^•\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="list-disc list-outside pl-4 space-y-1">
            {resume.experienceBullets.map((b, bIdx) => (
              <li key={bIdx} className="text-[11px] leading-tight text-gray-800">
                {b.improved.replace(/^•\s*/, '')}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 5. Education */}
      {resume.educationList && resume.educationList.length > 0 && (
        <div className="mb-5 space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1">
            Education
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-0.5">
            {resume.educationList.map((edu, eIdx) => (
              <li key={eIdx} className="text-[11px] font-medium text-gray-800">
                {edu.replace(/^[•*-]\s*/, '')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Certifications & Credentials */}
      {resume.certificationsList && resume.certificationsList.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1">
            Certifications & Credentials
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-0.5">
            {resume.certificationsList.map((cert, cIdx) => (
              <li key={cIdx} className="text-[11px] font-medium text-gray-800">
                {cert.replace(/^[•*-]\s*/, '')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
