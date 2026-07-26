# Resume Enhancer & ATS Score Checker

A modern web application built with **React**, **TypeScript**, **Vite**, and **TailwindCSS** to help job seekers optimize their resumes, pass Applicant Tracking Systems (ATS), rewrite resume bullets with AI, and build professional resumes.

---

## 🚀 Features

- **📊 ATS Compatibility Audit**: Scans resume content against ATS algorithm standards and highlights key improvements.
- **📄 In-Browser Document Parsing**: Client-side parsing for PDF and DOCX documents with privacy-first processing.
- **⚡ AI Bullet Enhancer**: Powered by Gemini API integration to rewrite bullet points using action verbs and impact metrics.
- **🛠️ Resume Builder & Customization**: Create, format, and export tailored, professional resumes.
- **🔒 Privacy & Safety First**: All document processing occurs locally in the browser; credentials and environment keys remain safe.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS, Lucide Icons
- **Document Parsing**: `pdfjs-dist`, `mammoth`

---

## 📦 Setup & Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm, yarn, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manishg01-ux/RESUME_ENHANCER.git
   cd RESUME_ENHANCER
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Gemini API key (optional for AI feature enhancements):
   ```bash
   cp .env.example .env.local
   ```
   Add your key inside `.env.local`:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
