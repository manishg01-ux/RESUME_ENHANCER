import React, { useState } from 'react';
import { ChevronDown, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onOpenAuth: (actionName?: string) => void;
  onSignOut: () => void;
  onNavigateHome: () => void;
  onNavigateBuilder: () => void;
  onNavigateScore: () => void;
  currentStep: 'landing' | 'upload' | 'score' | 'improved' | 'builder';
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onSignOut,
  onNavigateHome,
  onNavigateBuilder,
  onNavigateScore,
  currentStep
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Main Nav Dropdowns */}
        <div className="flex items-center gap-8">
          {/* Logo (Enhancv Style) */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 group cursor-pointer text-left transition-transform hover:scale-[1.01]"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#10b981] flex items-center justify-center text-white shadow-sm group-hover:bg-[#059669] transition-colors">
              <svg className="w-6 h-6 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-black text-[#0e0f0c] tracking-tight">
                Enhancv
              </span>
              <span className="text-[10px] font-black uppercase text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded ml-1.5 border border-[#10b981]/20">
                AI
              </span>
            </div>
          </button>

          {/* Navigation Dropdowns (Enhancv Style from Image 1) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-700">
            <button
              onClick={onNavigateBuilder}
              className="flex items-center gap-1 hover:text-[#10b981] transition-colors cursor-pointer"
            >
              <span>Resume</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={onNavigateScore}
              className="flex items-center gap-1 hover:text-[#10b981] transition-colors cursor-pointer"
            >
              <span>Tools (ATS Checker)</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            <div className="flex items-center gap-1 hover:text-[#10b981] transition-colors cursor-pointer">
              <span>Organizations</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </div>

            <button
              onClick={onNavigateHome}
              className="hover:text-[#10b981] transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right: Auth Buttons / User Profile */}
        <div className="flex items-center gap-3">
          
          {currentStep !== 'landing' && (
            <button
              onClick={onNavigateHome}
              className="hidden sm:block text-xs font-bold text-gray-600 hover:text-[#0e0f0c] px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
            >
              Home Page
            </button>
          )}

          {user && user.isLoggedIn ? (
            /* Logged In User State */
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white"
                />
                <span className="text-xs font-extrabold text-[#0e0f0c] max-w-[100px] truncate hidden sm:block">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-black text-[#0e0f0c] truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigateBuilder();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#10b981] transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>My Resumes</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Buttons (Exact match for Image 1) */
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('signing in')}
                className="px-5 py-2.5 rounded-xl border border-gray-300 hover:border-gray-900 text-[#0e0f0c] text-sm font-extrabold hover:bg-gray-50 transition-all cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('getting started')}
                className="px-6 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-sm font-black transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Get Started
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
