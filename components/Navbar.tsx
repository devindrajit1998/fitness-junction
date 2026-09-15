'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  onOpenModal?: (context?: string) => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleCtaClick = () => {
    if (onOpenModal) {
      onOpenModal('Claim Your The Fitness Junction Membership');
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        id="main-header"
        className={`w-full z-50 transition-all duration-300 ${isHome
            ? scrolled
              ? 'fixed top-0 left-0 bg-[#131824]/95 backdrop-blur-md py-3.5 shadow-2xl border-b border-white/10'
              : 'fixed top-0 left-0 bg-transparent py-5 border-b border-white/10'
            : 'sticky top-0 bg-[#131824]/95 backdrop-blur-md py-3.5 shadow-xl border-b border-[#242424]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              id="header-logo"
              className="flex items-center justify-center lg:w-1/3 group relative z-10 py-1"
            >
              <img
                src="/images/logo.png"
                alt="THE FITNESS JUNCTION"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation (Left) */}
            <nav
              id="desktop-navigation"
              className="hidden lg:flex items-center gap-7 xl:gap-8 font-['Rajdhani',sans-serif] text-[15px] font-bold uppercase tracking-wider text-white lg:w-1/3 lg:-order-1"
            >
              {/* Home */}
              <Link
                href="/"
                className={`transition-colors duration-200 hover:text-[#6EFF8F] ${isActive('/') ? 'text-[#6EFF8F]' : 'text-gray-200'
                  }`}
              >
                Home
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                className={`transition-colors duration-200 hover:text-[#6EFF8F] ${isActive('/about') ? 'text-[#6EFF8F]' : 'text-gray-200'
                  }`}
              >
                About Us
              </Link>

              {/* Services */}
              <Link
                href="/services"
                className={`transition-colors duration-200 hover:text-[#6EFF8F] ${isActive('/services') ? 'text-[#6EFF8F]' : 'text-gray-200'
                  }`}
              >
                Services
              </Link>
            </nav>

            {/* Desktop CTA & Contact (Right) */}
            <div className="hidden lg:flex items-center justify-end gap-6 lg:w-1/3">
              {/* Contact Us Link */}
              <Link
                href="/contact"
                className={`transition-colors duration-200 hover:text-[#6EFF8F] font-['Rajdhani',sans-serif] text-[15px] font-bold uppercase tracking-wider ${isActive('/contact') ? 'text-[#6EFF8F]' : 'text-gray-200'
                  }`}
              >
                Contact Us
              </Link>
              <button
                id="navbar-cta-button"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2 bg-[#6EFF8F] hover:bg-[#50D878] text-[#050505] font-extrabold font-['Rajdhani',sans-serif] uppercase tracking-wider text-sm px-6 py-2.5 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#6EFF8F]/20"
              >
                <span>Book Trial</span>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={handleCtaClick}
                className="px-4 py-2 text-xs font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider text-[#050505] bg-[#6EFF8F] rounded-none hover:bg-[#50D878] transition-colors"
              >
                Get Started
              </button>
              <button
                id="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm text-gray-200 hover:text-[#6EFF8F] hover:bg-gray-800/60 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#6EFF8F]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== OFF-CANVAS MOBILE DRAWER ===== */}
      <div
        id="offcanvas-mobile-drawer"
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-[#050505] border-l border-[#242424] p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out shadow-2xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div>
            {/* Header with Logo & Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-[#242424]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <img src="/images/logo.png" alt="THE FITNESS JUNCTION" className="h-8 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-sm text-[#A3A3A3] hover:text-[#6EFF8F] hover:bg-gray-800 transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="mt-6 flex flex-col space-y-1 font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-wider">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-3 rounded-sm border-b border-[#242424]/40 hover:text-[#6EFF8F] hover:bg-[#1C2333] transition-colors ${isActive('/') ? 'text-[#6EFF8F] bg-[#1C2333]/50' : 'text-gray-200'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-3 rounded-sm border-b border-[#242424]/40 hover:text-[#6EFF8F] hover:bg-[#1C2333] transition-colors ${isActive('/about') ? 'text-[#6EFF8F] bg-[#1C2333]/50' : 'text-gray-200'
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-3 rounded-sm border-b border-[#242424]/40 hover:text-[#6EFF8F] hover:bg-[#1C2333] transition-colors ${isActive('/services') ? 'text-[#6EFF8F] bg-[#1C2333]/50' : 'text-gray-200'
                  }`}
              >
                Services
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-3 rounded-sm border-b border-[#242424]/40 hover:text-[#6EFF8F] hover:bg-[#1C2333] transition-colors ${isActive('/contact') ? 'text-[#6EFF8F] bg-[#1C2333]/50' : 'text-gray-200'
                  }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Quick Contact Info */}
            <div className="mt-6 pt-5 border-t border-[#242424] text-sm text-[#A3A3A3] space-y-2.5">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                <a href="tel:+919681125006" className="hover:text-[#6EFF8F] text-[#A3A3A3]">
                  +91 96811 25006
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                <span>Mon-Sat: 6:30 AM - 10:30 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#6EFF8F] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">Monorama Ultrascan Pvt. Ltd., C.B. Road, beside Monorama Ultrascan, Lalpur, Barasat, West Bengal 741222</span>
              </div>
            </div>

            {/* CTA Button in Mobile Menu */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick();
                }}
                className="w-full py-3 text-center text-sm font-extrabold font-['Rajdhani',sans-serif] uppercase tracking-wider text-[#050505] bg-[#6EFF8F] rounded-none hover:bg-[#50D878] transition-colors shadow-lg shadow-[#6EFF8F]/20"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Non-negotiable Footer Credit */}
          <div className="pt-5 mt-6 border-t border-[#242424] text-center text-xs text-[#A3A3A3]">
            <p className="mb-1">THE FITNESS JUNCTION Barasat © 2026</p>

          </div>
        </div>
      </div>
    </>
  );
}
