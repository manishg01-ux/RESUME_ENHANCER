export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}

export type TemplateId = 'modern-teal' | 'classic-corporate' | 'impact-navy' | 'creative-emerald' | 'tech-minimal';

export interface ResumeTemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  badge?: string;
  accentColor: string;
  previewImage?: string;
}

export interface EditableResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  accentColor: string;
  roles: {
    id: string;
    company: string;
    title: string;
    dates: string;
    location: string;
    bullets: string[];
  }[];
  skills: string[];
  education: {
    id: string;
    institution: string;
    degree: string;
    dates: string;
  }[];
  certifications: string[];
  projects?: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface ScoreBreakdown {
  keywordScore: number;      // 0-100
  sectionScore: number;      // 0-100
  formattingScore: number;   // 0-100
  verbScore: number;         // 0-100
  quantScore: number;        // 0-100
  contactScore: number;      // 0-100
}

export interface ATSResult {
  finalScore: number;        // 70 - 83 range
  rawWeightedScore: number;  // 0-100 raw weighted
  color: string;             // '#d03238' | '#ffb020' | '#2ead4b'
  label: string;             
  breakdown: ScoreBreakdown;
  pros: string[];
  cons: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedSections: string[];
  weakVerbsFound: string[];
  quantifiedBulletsCount: number;
  totalBulletsCount: number;
}

export interface SampleJD {
  id: string;
  title: string;
  category: string;
  companyType: string;
  description: string;
  keySkills: string[];
}

export interface ExtractedFile {
  name: string;
  size: number; // in bytes
  type: string;
  text: string;
  previewText: string;
  fileBuffer?: ArrayBuffer;
  originalImage?: string;
}

export interface ExperienceRole {
  company: string;
  title: string;
  dates: string;
  bullets: { original: string; improved: string; changed: boolean; reason?: string }[];
}

export interface ImprovedResume {
  fullName: string;
  contactInfo: string;
  summary: string;
  originalSummary: string;
  roles: ExperienceRole[];
  experienceBullets: { original: string; improved: string; changed: boolean; reason?: string }[];
  skillsList: string[];
  educationList: string[];
  certificationsList: string[];
  fullText: string;
  beforeScore: number;
  afterScore: number;
  originalImage?: string;
}


