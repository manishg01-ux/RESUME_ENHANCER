import React, { useState } from 'react';
import { TemplateId, EditableResumeData, ResumeTemplateMeta } from '../types';
import { TEMPLATES } from './HeroLanding';
import { exportElementToPdf, captureElementToImage } from '../utils/pdfExporter';
import {
  Download,
  Plus,
  Trash2,
  Palette,
  Layout,
  ArrowLeft,
  Sparkles,
  Check,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText,
  Copy,
  Loader2
} from 'lucide-react';

interface ResumeBuilderProps {
  initialTemplateId?: TemplateId;
  onBackToLanding: () => void;
}

const DEFAULT_RESUME_DATA: EditableResumeData = {
  fullName: 'Erin Schaefer',
  jobTitle: 'Senior Product & IT Manager',
  email: 'erin.schaefer@example.com',
  phone: '+1 (800) 555-0199',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/erinschaefer',
  website: 'erinschaefer.dev',
  summary: 'Results-oriented Product Manager with 6+ years of experience steering cloud platform engineering and agile product delivery. Proven track record of launching high-impact enterprise features that drove a 35% increase in user acquisition and retention.',
  accentColor: '#0d9488',
  roles: [
    {
      id: 'r1',
      company: 'Rover Games',
      title: 'Senior IT Product Manager',
      dates: '02/2019 - Present',
      location: 'San Francisco, CA',
      bullets: [
        'Accelerated outbound sales cycle by 390% by designing and deploying customer acquisition platforms.',
        'Led a cross-functional team of 12 developers to deliver critical infrastructure upgrades on time.',
        'Spearheaded automated testing workflows that reduced release regression bugs by 45%.'
      ]
    },
    {
      id: 'r2',
      company: 'Tesla Inc.',
      title: 'Associate Product Manager',
      dates: '05/2017 - 01/2019',
      location: 'Palo Alto, CA',
      bullets: [
        'Collaborated with engineering leads to streamline the vehicle telematics software release roadmap.',
        'Gathered user feedback from 500+ stakeholders to prioritize core UI usability enhancements.'
      ]
    }
  ],
  skills: [
    'Product Strategy',
    'Agile & Scrum',
    'Roadmap Planning',
    'Data Analytics',
    'User Experience Design',
    'API Integrations',
    'SQL & Tableau',
    'Stakeholder Management'
  ],
  education: [
    {
      id: 'e1',
      institution: 'Stanford University',
      degree: 'Master of Business Administration (MBA)',
      dates: '2015 - 2017'
    },
    {
      id: 'e2',
      institution: 'UC Berkeley',
      degree: 'B.S. in Computer Science',
      dates: '2011 - 2015'
    }
  ],
  certifications: [
    'Certified Scrum Master (CSM)',
    'AWS Certified Cloud Practitioner'
  ]
};

const ACCENT_COLORS = [
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Navy', hex: '#1e293b' },
  { name: 'Emerald', hex: '#16a34a' },
  { name: 'Purple', hex: '#9333ea' },
  { name: 'Coral', hex: '#ea580c' },
  { name: 'Dark', hex: '#0f172a' }
];

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  initialTemplateId = 'modern-teal',
  onBackToLanding
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(initialTemplateId);
  const [data, setData] = useState<EditableResumeData>(DEFAULT_RESUME_DATA);
  const [activeTab, setActiveTab] = useState<'contact' | 'summary' | 'experience' | 'skills' | 'education'>('contact');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>('');

  // Get current template meta
  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const safeName = data.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Resume';
      await exportElementToPdf('builder-resume-canvas', `${safeName}_Resume.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Add role
  const handleAddRole = () => {
    const newRole = {
      id: 'role_' + Date.now(),
      company: 'New Company',
      title: 'Job Title',
      dates: '2022 - Present',
      location: 'City, State',
      bullets: ['Describe your core responsibility or quantified achievement.']
    };
    setData({ ...data, roles: [...data.roles, newRole] });
  };

  // Remove role
  const handleRemoveRole = (id: string) => {
    setData({ ...data, roles: data.roles.filter(r => r.id !== id) });
  };

  // Update role bullet
  const handleUpdateBullet = (roleId: string, bulletIdx: number, val: string) => {
    const updatedRoles = data.roles.map(r => {
      if (r.id !== roleId) return r;
      const bullets = [...r.bullets];
      bullets[bulletIdx] = val;
      return { ...r, bullets };
    });
    setData({ ...data, roles: updatedRoles });
  };

  // Add bullet
  const handleAddBullet = (roleId: string) => {
    const updatedRoles = data.roles.map(r => {
      if (r.id !== roleId) return r;
      return { ...r, bullets: [...r.bullets, 'New key metric or responsibility bullet.'] };
    });
    setData({ ...data, roles: updatedRoles });
  };

  // Add skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setData({ ...data, skills: [...data.skills, newSkill.trim()] });
    setNewSkill('');
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setData({ ...data, skills: data.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 text-xs font-bold text-[#0e0f0c] bg-[#e8ebe6] px-4 py-2 rounded-full hover:bg-[#d8dcd5] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-sm font-extrabold text-[#0e0f0c]">
              Interactive Resume Builder
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#10b981] text-white text-xs font-black hover:bg-[#059669] transition-all shadow flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExporting ? 'Exporting PDF...' : 'Download Resume PDF'}</span>
            </button>
          </div>
        </div>

        {/* Template & Color Selector Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Template Selector */}
          <div className="space-y-1.5 w-full md:w-auto">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5" />
              Select Resume Layout Template:
            </span>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl.id);
                    setData({ ...data, accentColor: tmpl.accentColor });
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    selectedTemplate === tmpl.id
                      ? 'bg-[#0e0f0c] text-white shadow'
                      : 'bg-[#e8ebe6] text-[#0e0f0c] hover:bg-gray-200'
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-1.5 w-full md:w-auto">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Accent Theme Color:
            </span>
            <div className="flex items-center gap-2">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setData({ ...data, accentColor: c.hex })}
                  className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                    data.accentColor === c.hex ? 'scale-125 ring-2 ring-offset-2 ring-black' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {data.accentColor === c.hex && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Main 2-Column Split: Form Editor (Left) & Live A4 Resume Canvas (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-[#e8ebe6] p-1 rounded-xl overflow-x-auto">
              {[
                { id: 'contact', label: 'Contact', icon: User },
                { id: 'summary', label: 'Summary', icon: FileText },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'skills', label: 'Skills', icon: Wrench },
                { id: 'education', label: 'Education', icon: GraduationCap }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white text-[#0e0f0c] shadow-sm'
                        : 'text-gray-500 hover:text-[#0e0f0c]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Contact Details */}
            {activeTab === 'contact' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={data.jobTitle}
                    onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => setData({ ...data, location: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={data.linkedin}
                      onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Professional Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-3 text-xs">
                <label className="block font-bold text-gray-700">Executive Summary</label>
                <textarea
                  rows={6}
                  value={data.summary}
                  onChange={(e) => setData({ ...data, summary: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium focus:bg-white focus:outline-none focus:border-[#10b981] leading-relaxed"
                />
              </div>
            )}

            {/* Tab 3: Experience Roles */}
            {activeTab === 'experience' && (
              <div className="space-y-6 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#0e0f0c]">Work History ({data.roles.length})</span>
                  <button
                    onClick={handleAddRole}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full hover:bg-[#10b981]/20 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Position</span>
                  </button>
                </div>

                {data.roles.map((role, idx) => (
                  <div key={role.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveRole(role.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-600 mb-0.5">Company</label>
                        <input
                          type="text"
                          value={role.company}
                          onChange={(e) => {
                            const updated = data.roles.map(r => r.id === role.id ? { ...r, company: e.target.value } : r);
                            setData({ ...data, roles: updated });
                          }}
                          className="w-full p-2 bg-white border border-gray-200 rounded font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-600 mb-0.5">Job Title</label>
                        <input
                          type="text"
                          value={role.title}
                          onChange={(e) => {
                            const updated = data.roles.map(r => r.id === role.id ? { ...r, title: e.target.value } : r);
                            setData({ ...data, roles: updated });
                          }}
                          className="w-full p-2 bg-white border border-gray-200 rounded font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-600 mb-0.5">Dates</label>
                        <input
                          type="text"
                          value={role.dates}
                          onChange={(e) => {
                            const updated = data.roles.map(r => r.id === role.id ? { ...r, dates: e.target.value } : r);
                            setData({ ...data, roles: updated });
                          }}
                          className="w-full p-2 bg-white border border-gray-200 rounded font-medium"
                        />
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-gray-600">Achievement Bullets</label>
                        <button
                          onClick={() => handleAddBullet(role.id)}
                          className="text-[10px] text-[#10b981] font-bold hover:underline cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>

                      {role.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <textarea
                            rows={2}
                            value={b}
                            onChange={(e) => handleUpdateBullet(role.id, bIdx, e.target.value)}
                            className="flex-1 p-2 bg-white border border-gray-200 rounded font-medium text-[11px]"
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4 text-xs">
                <label className="block font-bold text-gray-700">Core Skills & Competencies</label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add skill (e.g. React, Product Analytics)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-medium"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#e8ebe6] text-[#0e0f0c] font-bold rounded-full flex items-center gap-1.5 text-xs"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-gray-400 hover:text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Education */}
            {activeTab === 'education' && (
              <div className="space-y-4 text-xs">
                <label className="block font-bold text-gray-700">Education Credentials</label>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...data.education];
                        updated[idx].degree = e.target.value;
                        setData({ ...data, education: updated });
                      }}
                      className="w-full p-2 bg-white border border-gray-200 rounded font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[idx].institution = e.target.value;
                          setData({ ...data, education: updated });
                        }}
                        className="p-2 bg-white border border-gray-200 rounded font-medium"
                      />
                      <input
                        type="text"
                        value={edu.dates}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[idx].dates = e.target.value;
                          setData({ ...data, education: updated });
                        }}
                        className="p-2 bg-white border border-gray-200 rounded font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Live A4 Resume Canvas */}
          <div className="lg:col-span-7 flex justify-center sticky top-24">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-300 p-8 w-full max-w-[700px] min-h-[900px] text-[#0e0f0c] space-y-6 font-sans text-xs" id="builder-resume-canvas">
              
              {/* Layout Template Variations */}
              {selectedTemplate === 'modern-teal' || selectedTemplate === 'creative-emerald' ? (
                /* Header Bar Accent Layout */
                <div className="space-y-6">
                  <div className="p-6 text-white rounded-xl shadow-md" style={{ backgroundColor: data.accentColor }}>
                    <h1 className="text-2xl font-black">{data.fullName || 'Your Name'}</h1>
                    <p className="text-sm font-extrabold opacity-90 mt-0.5">{data.jobTitle}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium opacity-85 mt-3 pt-3 border-t border-white/20">
                      <span>{data.email}</span>
                      <span>• {data.phone}</span>
                      <span>• {data.location}</span>
                      {data.linkedin && <span>• {data.linkedin}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b-2" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                      Professional Summary
                    </h3>
                    <p className="text-[#333] leading-relaxed">{data.summary}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b-2" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                      Work Experience
                    </h3>
                    {data.roles.map((role) => (
                      <div key={role.id} className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>{role.title} — <span style={{ color: data.accentColor }}>{role.company}</span></span>
                          <span className="text-gray-500 font-normal">{role.dates}</span>
                        </div>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1 leading-snug">
                          {role.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b-2" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                        Skills & Competencies
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {data.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b-2" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                        Education
                      </h3>
                      {data.education.map((edu) => (
                        <div key={edu.id} className="text-[11px]">
                          <p className="font-bold">{edu.degree}</p>
                          <p className="text-gray-600">{edu.institution} ({edu.dates})</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : selectedTemplate === 'impact-navy' ? (
                /* Two-Column Sidebar Layout */
                <div className="grid grid-cols-12 gap-6 h-full">
                  <div className="col-span-4 p-5 text-white rounded-xl space-y-6" style={{ backgroundColor: data.accentColor }}>
                    <div>
                      <h1 className="text-xl font-black">{data.fullName}</h1>
                      <p className="text-xs opacity-90">{data.jobTitle}</p>
                    </div>

                    <div className="space-y-2 text-[10px] opacity-85">
                      <p className="font-bold uppercase tracking-wider opacity-60">Contact</p>
                      <p>{data.email}</p>
                      <p>{data.phone}</p>
                      <p>{data.location}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold uppercase tracking-wider text-[10px] opacity-60">Core Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 space-y-5">
                    <div>
                      <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                        Summary
                      </h3>
                      <p className="text-gray-700 leading-snug mt-1">{data.summary}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider pb-1 border-b" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                        Experience
                      </h3>
                      {data.roles.map((role) => (
                        <div key={role.id} className="space-y-1">
                          <p className="font-bold">{role.title} • {role.company}</p>
                          <p className="text-[10px] text-gray-400">{role.dates}</p>
                          <ul className="list-disc pl-4 text-gray-700 space-y-1">
                            {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Classic Executive Centered Layout */
                <div className="space-y-6 text-center sm:text-left">
                  <div className="text-center border-b pb-4 space-y-1" style={{ borderColor: data.accentColor }}>
                    <h1 className="text-3xl font-black" style={{ color: data.accentColor }}>{data.fullName}</h1>
                    <p className="text-sm font-bold text-gray-600">{data.jobTitle}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {data.email} | {data.phone} | {data.location}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-left border-b pb-0.5" style={{ color: data.accentColor }}>
                      Professional Summary
                    </h3>
                    <p className="text-gray-700 text-left leading-relaxed">{data.summary}</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider border-b pb-0.5" style={{ color: data.accentColor }}>
                      Experience History
                    </h3>
                    {data.roles.map((role) => (
                      <div key={role.id} className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>{role.title}, {role.company}</span>
                          <span className="text-gray-500 font-normal">{role.dates}</span>
                        </div>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1">
                          {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="text-left space-y-2">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider border-b pb-0.5" style={{ color: data.accentColor }}>
                      Skills
                    </h3>
                    <p className="text-gray-700 font-medium">{data.skills.join(' • ')}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
