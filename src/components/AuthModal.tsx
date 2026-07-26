import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, ArrowRight, Check } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  targetAction?: string; // e.g. "building your resume" or "checking your resume score"
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  targetAction = 'continuing'
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const dummyUser: User = {
        id: 'usr_' + Date.now(),
        name: name || (email ? email.split('@')[0] : 'Erin Schaefer'),
        email: email || 'user@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        isLoggedIn: true
      };

      localStorage.setItem('enhancv_user', JSON.stringify(dummyUser));
      setIsLoading(false);
      onLoginSuccess(dummyUser);
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser: User = {
        id: 'usr_demo',
        name: 'Erin Schaefer',
        email: 'erin.schaefer@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        isLoggedIn: true
      };
      localStorage.setItem('enhancv_user', JSON.stringify(demoUser));
      setIsLoading(false);
      onLoginSuccess(demoUser);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0f0c]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 border border-[#0e0f0c]/10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#e8ebe6] hover:bg-[#d8dcd5] flex items-center justify-center text-[#0e0f0c] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2ead4b]/10 text-[#2ead4b] text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            Quick Sign In Required
          </div>
          <h3 className="text-2xl font-black text-[#0e0f0c]">
            {isSignUp ? 'Create your Account' : 'Sign In to Continue'}
          </h3>
          <p className="text-xs text-[#868685]">
            Sign in is required before <span className="font-bold text-[#0e0f0c]">{targetAction}</span>. (Dummy instant login)
          </p>
        </div>

        {/* Quick 1-Click Demo Login Button */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-full bg-[#9fe870] text-[#0e0f0c] font-black text-sm hover:bg-[#cdffad] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <Sparkles className="w-4 h-4 fill-[#0e0f0c]" />
            <span>{isLoading ? 'Signing in...' : 'Instant 1-Click Demo Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full border border-[#0e0f0c]/20 hover:bg-[#e8ebe6]/60 text-[#0e0f0c] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-[#0e0f0c]/10"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold text-[#868685] uppercase">
            Or with email
          </span>
          <div className="flex-grow border-t border-[#0e0f0c]/10"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-[#0e0f0c] mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#868685] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required={isSignUp}
                  placeholder="Erin Schaefer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#e8ebe6]/50 border border-[#0e0f0c]/15 rounded-full text-xs font-medium focus:outline-none focus:border-[#2ead4b] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0e0f0c] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#868685] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="erin.schaefer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#e8ebe6]/50 border border-[#0e0f0c]/15 rounded-full text-xs font-medium focus:outline-none focus:border-[#2ead4b] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0e0f0c] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#868685] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#e8ebe6]/50 border border-[#0e0f0c]/15 rounded-full text-xs font-medium focus:outline-none focus:border-[#2ead4b] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-[#0e0f0c] text-white font-bold text-xs rounded-full hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSignUp ? 'Create Free Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#868685] hover:text-[#0e0f0c] font-bold transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
};
