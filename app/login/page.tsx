'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Dumbbell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DataStore } from '@/lib/dataStore';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If already authenticated, redirect straight to admin
  useEffect(() => {
    if (DataStore.auth.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your work email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const ok = DataStore.auth.login(email, password);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin');
        }, 900);
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Use demo: admin@fitwell.com / admin123');
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('admin@fitwell.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#131824] text-white flex flex-col justify-between selection:bg-[#6EFF8F] selection:text-[#131824] font-['Rubik',sans-serif]">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6EFF8F]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#6EFF8F]/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Bar / Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="THE FITNESS JUNCTION"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-wider font-semibold text-[#A3A3A3] hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5"
        >
          <span>← Back to Website</span>
        </Link>
      </header>

      {/* Main Login Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#050505] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/60 relative backdrop-blur-sm">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#6EFF8F] to-transparent" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/30 text-[#6EFF8F] mb-4 shadow-lg shadow-[#6EFF8F]/10">
              <Dumbbell className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Rajdhani',sans-serif] uppercase tracking-wide text-white">
              Management Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
              Sign in to manage members, leads, classes, and site content
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="mb-6 p-3.5 bg-[#131824] rounded-xl border border-white/5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#A3A3A3]">
              <ShieldCheck className="w-4 h-4 text-[#6EFF8F] shrink-0" />
              <div>
                <span className="text-white font-medium">Demo Access:</span>{' '}
                <span className="text-[#A3A3A3]">admin@fitwell.com / admin123</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 bg-[#6EFF8F]/15 hover:bg-[#6EFF8F] text-[#6EFF8F] hover:text-[#131824] font-semibold rounded-md transition-all text-[11px] shrink-0"
            >
              Fill Demo
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-xs text-red-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3 bg-[#6EFF8F]/15 border border-[#6EFF8F]/30 rounded-xl flex items-center gap-2.5 text-xs text-[#6EFF8F] animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#6EFF8F] shrink-0" />
              <span>Authentication verified. Redirecting to admin dashboard...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#A3A3A3] mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fitwell.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#131824] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#A3A3A3]">
                  Security Password
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-[#A3A3A3] hover:text-[#6EFF8F] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#131824] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-[#A3A3A3] pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#131824] border border-white/20 text-[#6EFF8F] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#6EFF8F]"
                />
                <span>Remember session on this device</span>
              </label>
              <span className="text-gray-500">v1.2.0</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-2 py-3.5 px-6 bg-[#6EFF8F] hover:bg-[#c4e600] disabled:bg-[#6EFF8F]/50 text-[#131824] font-bold text-sm font-['Rajdhani',sans-serif] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#6EFF8F]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#131824] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Support Footnote */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
            Protected by Fitwell Role-Based Authorization. Need an account? Contact the club director.
          </div>
        </div>
      </main>

      {/* Footer with Mandatory Credit */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 border-t border-white/5">
        <p>© 2025 Fitwell Fitness & Athletics Club. All rights reserved.</p>

      </footer>
    </div>
  );
}
