export interface SectionHeadingGroup {
  key: string;
  label: string;
  aliases: string[];
}

export const SECTION_HEADINGS: SectionHeadingGroup[] = [
  {
    key: 'summary',
    label: 'Professional Summary',
    aliases: [
      'summary',
      'professional summary',
      'executive summary',
      'profile',
      'professional profile',
      'career summary',
      'about me',
      'objective',
      'career objective'
    ]
  },
  {
    key: 'experience',
    label: 'Professional Experience',
    aliases: [
      'experience',
      'work experience',
      'professional experience',
      'employment history',
      'career history',
      'work history',
      'relevant experience',
      'professional background'
    ]
  },
  {
    key: 'skills',
    label: 'Skills & Core Competencies',
    aliases: [
      'skills',
      'technical skills',
      'core competencies',
      'skills & tools',
      'technologies',
      'key skills',
      'expertise',
      'technical expertise',
      'skills summary'
    ]
  },
  {
    key: 'education',
    label: 'Education & Credentials',
    aliases: [
      'education',
      'academic history',
      'qualifications',
      'education & certifications',
      'academic background',
      'degrees & certifications',
      'certifications'
    ]
  },
  {
    key: 'projects',
    label: 'Key Projects',
    aliases: [
      'projects',
      'key projects',
      'selected projects',
      'personal projects',
      'academic projects'
    ]
  }
];
