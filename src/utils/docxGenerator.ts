import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { ImprovedResume } from '../types';

export async function generateDocxBlob(resume: ImprovedResume): Promise<Blob> {
  const children: Paragraph[] = [];

  // Candidate Name Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: resume.fullName.toUpperCase(),
          bold: true,
          size: 32, // 16pt
          font: 'Arial'
        })
      ]
    })
  );

  // Sub-header contact details
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: resume.contactInfo,
          size: 20, // 10pt
          color: '444444',
          font: 'Arial'
        })
      ],
      spacing: { after: 240 }
    })
  );

  // Helper for Section Headings
  const createSectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 24, // 12pt
          color: '1F497D', // Professional deep navy
          font: 'Arial'
        })
      ],
      spacing: { before: 200, after: 100 }
    });
  };

  // 1. PROFESSIONAL SUMMARY
  children.push(createSectionHeading('Professional Summary'));
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.summary,
          size: 20,
          font: 'Arial'
        })
      ],
      spacing: { after: 180 }
    })
  );

  // 2. SKILLS & CORE COMPETENCIES
  if (resume.skillsList && resume.skillsList.length > 0) {
    children.push(createSectionHeading('Technical Skills & Core Competencies'));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resume.skillsList.join('  •  '),
            size: 20,
            font: 'Arial'
          })
        ],
        spacing: { after: 180 }
      })
    );
  }

  // 3. PROFESSIONAL EXPERIENCE
  children.push(createSectionHeading('Professional Experience'));

  if (resume.roles && resume.roles.length > 0) {
    resume.roles.forEach(role => {
      // Role Header (Title | Company | Dates)
      if (role.title || role.company) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${role.title} `,
                bold: true,
                size: 21,
                font: 'Arial'
              }),
              new TextRun({
                text: role.company ? `| ${role.company} ` : '',
                bold: true,
                color: '333333',
                size: 21,
                font: 'Arial'
              }),
              new TextRun({
                text: role.dates ? `(${role.dates})` : '',
                italics: true,
                color: '666666',
                size: 20,
                font: 'Arial'
              })
            ],
            spacing: { before: 120, after: 60 }
          })
        );
      }

      role.bullets.forEach(bullet => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: bullet.improved.replace(/^•\s*/, '• '),
                size: 20,
                font: 'Arial'
              })
            ],
            spacing: { after: 60 }
          })
        );
      });
    });
  } else {
    resume.experienceBullets.forEach(bullet => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: bullet.improved.replace(/^•\s*/, '• '),
              size: 20,
              font: 'Arial'
            })
          ],
          spacing: { after: 60 }
        })
      );
    });
  }

  // 4. EDUCATION
  if (resume.educationList && resume.educationList.length > 0) {
    children.push(createSectionHeading('Education'));
    resume.educationList.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${edu.replace(/^[•*-]\s*/, '')}`,
              size: 20,
              font: 'Arial'
            })
          ],
          spacing: { after: 60 }
        })
      );
    });
  }

  // 5. CERTIFICATIONS
  if (resume.certificationsList && resume.certificationsList.length > 0) {
    children.push(createSectionHeading('Certifications & Credentials'));
    resume.certificationsList.forEach(cert => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${cert.replace(/^[•*-]\s*/, '')}`,
              size: 20,
              font: 'Arial'
            })
          ],
          spacing: { after: 60 }
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,    // 0.5 inch margins for clean 1-page standard layout
              bottom: 720,
              left: 720,
              right: 720
            }
          }
        },
        children
      }
    ]
  });

  return await Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
