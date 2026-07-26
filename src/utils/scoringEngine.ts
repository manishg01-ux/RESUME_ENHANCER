import { ATSResult, ScoreBreakdown } from '../types';
import { SKILLS_DATASET } from '../data/skillsDataset';
import { ACTION_VERBS } from '../data/actionVerbs';
import { SECTION_HEADINGS } from '../data/sectionHeadings';

export function calculateATSScore(resumeText: string, jobDescription: string = ''): ATSResult {
  const lowerResume = resumeText.toLowerCase();
  const lowerJD = jobDescription.toLowerCase();

  // 1. Keyword Score (0-100)
  const matchedKeywordsSet = new Set<string>();
  const missingKeywordsSet = new Set<string>();

  // Extract target keywords: if JD exists, search JD for skills & domain words; else use dataset top skills
  const targetSkills = new Set<string>();
  
  if (lowerJD.trim()) {
    SKILLS_DATASET.forEach(item => {
      if (lowerJD.includes(item.skill.toLowerCase())) {
        targetSkills.add(item.skill);
      }
    });

    // Also extract important technical / domain terms from JD (words > 4 chars)
    const jdWords = lowerJD
      .replace(/[^a-z0-9\s#+-]/gi, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3);

    const wordFreqMap = new Map<string, number>();
    jdWords.forEach(w => wordFreqMap.set(w, (wordFreqMap.get(w) || 0) + 1));

    // Add top frequent domain terms to target
    Array.from(wordFreqMap.entries())
      .filter(([_, count]) => count >= 2)
      .slice(0, 20)
      .forEach(([word]) => {
        const titleCase = word.charAt(0).toUpperCase() + word.slice(1);
        targetSkills.add(titleCase);
      });
  } else {
    // Default top 30 skills if no JD provided
    SKILLS_DATASET.slice(0, 30).forEach(s => targetSkills.add(s.skill));
  }

  targetSkills.forEach(skill => {
    if (lowerResume.includes(skill.toLowerCase())) {
      matchedKeywordsSet.add(skill);
    } else {
      missingKeywordsSet.add(skill);
    }
  });

  const matchedKeywords = Array.from(matchedKeywordsSet);
  const missingKeywords = Array.from(missingKeywordsSet);

  const totalTargetCount = targetSkills.size || 1;
  const rawKeywordMatchRatio = matchedKeywords.length / totalTargetCount;
  const keywordScore = Math.min(100, Math.round(rawKeywordMatchRatio * 100));

  // 2. Section Score (0-100)
  const detectedSections: string[] = [];
  SECTION_HEADINGS.forEach(group => {
    const found = group.aliases.some(alias => {
      const regex = new RegExp(`(^|\\n|\\r)\\s*${alias}\\b`, 'i');
      return regex.test(lowerResume);
    });
    if (found) {
      detectedSections.push(group.label);
    }
  });

  // Base core 4 sections: Summary, Experience, Skills, Education
  let sectionScore = Math.round((detectedSections.length / 4) * 100);
  if (sectionScore > 100) sectionScore = 100;

  // 3. Formatting Score (0-100)
  let formattingScore = 70; // baseline
  const textLength = resumeText.length;
  if (textLength > 400 && textLength < 8000) formattingScore += 15;
  
  // Check for bullet indicators
  const bulletCount = (resumeText.match(/(•|\*|-|\d+\.)/g) || []).length;
  if (bulletCount >= 5) formattingScore += 15;
  if (formattingScore > 100) formattingScore = 100;

  // 4. Action Verb Score (0-100)
  const lines = resumeText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  let strongVerbCount = 0;
  let weakVerbCount = 0;
  const weakVerbsFound: string[] = [];

  ACTION_VERBS.weak.forEach(weakPhrase => {
    if (lowerResume.includes(weakPhrase.toLowerCase())) {
      weakVerbCount++;
      if (!weakVerbsFound.includes(weakPhrase)) {
        weakVerbsFound.push(weakPhrase);
      }
    }
  });

  ACTION_VERBS.strong.forEach(strongVerb => {
    const regex = new RegExp(`\\b${strongVerb}\\b`, 'i');
    if (regex.test(resumeText)) {
      strongVerbCount++;
    }
  });

  let verbScore = 50; // default medium
  if (strongVerbCount > 0 || weakVerbCount > 0) {
    const ratio = strongVerbCount / Math.max(1, strongVerbCount + weakVerbCount);
    verbScore = Math.round(ratio * 100);
  }

  // 5. Quantification Score (0-100)
  // Check for numbers, %, $, metrics
  let quantifiedBulletsCount = 0;
  const bulletLines = lines.filter(line => /^(•|\*|-|\d+\.)/.test(line) || line.length > 25);
  const totalBulletsCount = bulletLines.length || 1;

  const quantRegex = /(\b\d+(\.\d+)?%|\$\d+|\b\d+\+|\b\d+x\b|\b\d+\s*(percent|users|clients|team|projects|million|k|m|billion)\b|\bincreased\b|\bdecreased\b|\breduced\b|\bsaved\b)/i;

  bulletLines.forEach(line => {
    if (quantRegex.test(line)) {
      quantifiedBulletsCount++;
    }
  });

  const quantRatio = quantifiedBulletsCount / totalBulletsCount;
  const quantScore = Math.min(100, Math.round(quantRatio * 100 + 20)); // slight boost

  // 6. Contact Hygiene Score (0-100)
  let contactScore = 0;
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText)) contactScore += 35; // email
  if (/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(resumeText) || /\d{10}/.test(resumeText)) contactScore += 35; // phone
  if (/linkedin\.com/i.test(resumeText) || /github\.com/i.test(resumeText)) contactScore += 30; // linkedin / github

  const breakdown: ScoreBreakdown = {
    keywordScore,
    sectionScore,
    formattingScore,
    verbScore,
    quantScore,
    contactScore
  };

  // Weighted formula:
  const rawWeighted = (
    keywordScore   * 0.35 +
    sectionScore   * 0.15 +
    formattingScore* 0.15 +
    verbScore      * 0.15 +
    quantScore     * 0.10 +
    contactScore   * 0.10
  );

  // Remap raw weighted score (0-100) into 70 to 83 range
  const finalScore = Math.min(83, Math.max(70, Math.round(70 + (rawWeighted / 100) * 13)));

  let color = '#ffb020'; // orange for 70-83 band
  let label = 'ATS Benchmark Range';

  if (finalScore >= 80) {
    label = 'Strong — Benchmark Top Band';
  } else if (finalScore >= 75) {
    label = 'Good — Average Benchmark';
  } else {
    label = 'Fair — Baseline Band';
  }

  // Pros and Cons rule-based generation
  const pros: string[] = [];
  const cons: string[] = [];

  // Keyword rules
  if (keywordScore >= 70) {
    pros.push(`Matches ${matchedKeywords.length} key skills & domain requirements.`);
  } else if (keywordScore < 40) {
    cons.push(`Missing critical job-related keywords (${missingKeywords.slice(0, 4).join(', ') || 'key skills'}).`);
  } else {
    cons.push(`Only partial skill match. ${missingKeywords.length} relevant terms were not found.`);
  }

  // Section rules
  if (sectionScore >= 75) {
    pros.push(`Includes clear, standard section headings (${detectedSections.slice(0, 3).join(', ')}).`);
  } else {
    cons.push(`Missing clearly labeled ATS sections (e.g. Summary, Skills, or Professional Experience).`);
  }

  // Verb rules
  if (verbScore >= 70) {
    pros.push(`Strong use of impactful action verbs at the start of experience points.`);
  } else if (weakVerbCount > 0) {
    cons.push(`Contains weak passive phrasing like "${weakVerbsFound.slice(0, 2).map(w => `'${w}'`).join(' and ')}".`);
  }

  // Quant rules
  if (quantScore >= 60) {
    pros.push(`Quantifies achievements with metrics, percentages, or dollar amounts (${quantifiedBulletsCount} bullet points).`);
  } else {
    cons.push(`Lacks quantified metrics — add percentages, team size, or revenue numbers to show impact.`);
  }

  // Contact rules
  if (contactScore >= 80) {
    pros.push(`Complete contact header with email, phone, and professional profile link.`);
  } else {
    cons.push(`Incomplete contact header. Ensure email, phone, and LinkedIn URL are clearly visible at top.`);
  }

  // Formatting rules
  if (formattingScore >= 80) {
    pros.push(`Clean bulleted structure suitable for ATS parsing algorithms.`);
  } else {
    cons.push(`Format may present ATS parsing issues — use standard bullet points and consistent line breaks.`);
  }

  return {
    finalScore,
    rawWeightedScore: Math.round(rawWeighted),
    color,
    label,
    breakdown,
    pros,
    cons,
    matchedKeywords,
    missingKeywords,
    detectedSections,
    weakVerbsFound,
    quantifiedBulletsCount,
    totalBulletsCount
  };
}
