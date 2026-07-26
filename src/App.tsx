import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroLanding } from './components/HeroLanding';
import { ResumeBuilder } from './components/ResumeBuilder';
import { AuthModal } from './components/AuthModal';
import { UploadSection } from './components/UploadSection';
import { ScoreResults } from './components/ScoreResults';
import { ImprovedResumeView } from './components/ImprovedResumeView';
import { WhyAtsMatters } from './components/WhyAtsMatters';
import { HowItWorks } from './components/HowItWorks';
import { RoleShowcase } from './components/RoleShowcase';
import { ScanningModal } from './components/ScanningModal';
import { calculateATSScore } from './utils/scoringEngine';
import { rewriteResume } from './utils/rewriterEngine';
import { ATSResult, ImprovedResume, ExtractedFile, User, TemplateId } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'upload' | 'score' | 'improved' | 'builder'>('landing');
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>('modern-teal');
  
  // User Authentication State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('enhancv_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authTargetAction, setAuthTargetAction] = useState<string>('continuing');
  const [pendingNextStep, setPendingNextStep] = useState<('upload' | 'builder') | null>(null);

  // Resume Scanner & Audit State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [extractedFileObj, setExtractedFileObj] = useState<ExtractedFile | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [scoreResult, setScoreResult] = useState<ATSResult | null>(null);
  const [improvedResume, setImprovedResume] = useState<ImprovedResume | null>(null);

  // Auth Protection Helper
  const requireAuth = (actionDescription: string, nextStep: 'upload' | 'builder'): boolean => {
    if (user && user.isLoggedIn) {
      return true;
    }
    setAuthTargetAction(actionDescription);
    setPendingNextStep(nextStep);
    setIsAuthOpen(true);
    return false;
  };

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    if (pendingNextStep) {
      setCurrentStep(pendingNextStep);
      setPendingNextStep(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('enhancv_user');
    setUser(null);
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Actions
  const handleActionBuildResume = (templateId?: TemplateId) => {
    if (templateId) {
      setSelectedTemplateId(templateId);
    }
    if (requireAuth('building your resume', 'builder')) {
      setCurrentStep('builder');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleActionGetScore = () => {
    if (requireAuth('checking your resume score', 'upload')) {
      setCurrentStep('upload');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Scan Resume action - starts 20s paper scanner animation
  const handleScanResume = (text: string, jd: string, fileObj?: ExtractedFile) => {
    if (!requireAuth('calculating your ATS score', 'upload')) {
      return;
    }
    setResumeText(text);
    setJobDescription(jd);
    if (fileObj) {
      setExtractedFileObj(fileObj);
    }
    const result = calculateATSScore(text, jd);
    setScoreResult(result);
    setIsScanning(true);
  };

  // Called when 20s ScanningModal completes
  const handleScanningComplete = () => {
    setIsScanning(false);
    setCurrentStep('score');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Generate Improved Resume action
  const handleGenerateImproved = () => {
    if (!resumeText) return;
    const improved = rewriteResume(resumeText, jobDescription);
    setImprovedResume(improved);
    setCurrentStep('improved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset / Navigate Home
  const handleNavigateHome = () => {
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-[#0e0f0c] selection:bg-[#10b981] selection:text-white font-sans">
      {/* 20-Second Live Scanning Modal Overlay */}
      {isScanning && <ScanningModal onComplete={handleScanningComplete} />}

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        targetAction={authTargetAction}
      />

      {/* Top Navigation Header */}
      <Header
        user={user}
        onOpenAuth={(actionName) => {
          setAuthTargetAction(actionName || 'accessing features');
          setIsAuthOpen(true);
        }}
        onSignOut={handleSignOut}
        onNavigateHome={handleNavigateHome}
        onNavigateBuilder={() => handleActionBuildResume()}
        onNavigateScore={handleActionGetScore}
        currentStep={currentStep}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Step 1: Enhancv Landing Page */}
        {currentStep === 'landing' && (
          <>
            <HeroLanding
              onBuildResume={() => handleActionBuildResume()}
              onGetScore={handleActionGetScore}
              onSelectTemplate={(tmplId) => handleActionBuildResume(tmplId)}
            />
            <HowItWorks />
            <WhyAtsMatters />
            <RoleShowcase />
          </>
        )}

        {/* Step 2: Interactive Resume Builder */}
        {currentStep === 'builder' && (
          <ResumeBuilder
            initialTemplateId={selectedTemplateId}
            onBackToLanding={handleNavigateHome}
          />
        )}

        {/* Step 3: ATS Resume Upload Section */}
        {currentStep === 'upload' && (
          <>
            <UploadSection onScanResume={handleScanResume} />
            <WhyAtsMatters />
            <HowItWorks />
          </>
        )}

        {/* Step 4: ATS Score Audit View */}
        {currentStep === 'score' && scoreResult && (
          <ScoreResults
            result={scoreResult}
            extractedFile={extractedFileObj}
            resumeText={resumeText}
            onGenerateImproved={handleGenerateImproved}
            onBack={() => setCurrentStep('upload')}
          />
        )}

        {/* Step 5: Improved Action-Verb Resume View */}
        {currentStep === 'improved' && improvedResume && (
          <ImprovedResumeView
            improvedResume={improvedResume}
            originalText={resumeText}
            extractedFile={extractedFileObj}
            onBackToScore={() => setCurrentStep('score')}
            onStartOver={handleNavigateHome}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
