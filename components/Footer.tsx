'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#101520] border-t border-[#242424] text-[#A3A3A3] font-['Rubik',sans-serif] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-[#050505] border border-[#242424] rounded-none p-8 mb-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-sm tracking-widest uppercase">
              Start Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase mt-1">
              Push harder, go further. Your fitness journey starts today!
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919681125006"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-transparent border border-[#6EFF8F] text-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-[#050505] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>+91 96811 25006</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#6EFF8F]/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo.png" alt="THE FITNESS JUNCTION" width={42} height={42} className="object-contain" />
            </Link>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Premier unisex fitness centre in Barasat, Nadia established in 2020. Providing regular gym, CrossFit, cardio, personal training, and diet consultation.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-none bg-[#1C2333] border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-none bg-[#1C2333] border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-none bg-[#1C2333] border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-none bg-[#1C2333] border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-lg font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-[#242424]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Our Services
                </Link>
              </li>
              <li>
                <Link href="/service-single" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Service Details
                </Link>
              </li>
              <li>
                <Link href="/team-single" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Team Details
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#6EFF8F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#6EFF8F] text-xs">›</span> Staff / Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Gym Operating Hours & Contact */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-lg font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-[#242424]">
              Operating Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#6EFF8F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">All 7 Days:</span>
                  <span className="text-[#A3A3A3]">06:30 AM - 10:30 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#6EFF8F] shrink-0 mt-0.5" />
                <span className="text-[#A3A3A3] text-xs leading-relaxed">
                  Monorama Ultrascan Pvt. Ltd., C.B. Road, beside Monorama Ultrascan, Lalpur, Barasat, West Bengal 741222
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-lg font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-[#242424]">
              Stay Updated
            </h4>
            <p className="text-sm text-[#A3A3A3] mb-4">
              Subscribe to get gym schedules, training routines, and nutrition advice directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#050505] border border-[#242424] rounded-md py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#6EFF8F] text-[#050505] rounded hover:bg-[#50D878] transition-colors flex items-center justify-center font-bold"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#6EFF8F] pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar with Required Indrajit Credit */}
        <div className="pt-8 border-t border-[#242424]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} THE FITNESS JUNCTION Barasat. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
