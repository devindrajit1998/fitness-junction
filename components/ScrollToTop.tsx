'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-6 sm:bottom-6 sm:right-24 z-40 w-12 h-12 rounded-full bg-[#1C2333] border border-[#6EFF8F]/40 text-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-[#050505] shadow-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
