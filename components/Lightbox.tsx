'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  src: string;
  caption?: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, src, caption, onClose }: LightboxProps) {
  if (!isOpen || !src) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
    >
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center cursor-default"
      >
        <div className="relative w-full h-[70vh] rounded-lg overflow-hidden border border-[#242424] shadow-2xl">
          <Image
            src={src}
            alt={caption || 'Fitwell Preview'}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        {caption && (
          <p className="mt-4 text-center text-sm font-['Rajdhani',sans-serif] uppercase tracking-wider text-[#A3A3A3]">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
