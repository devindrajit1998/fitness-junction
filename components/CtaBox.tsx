'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface CtaBoxProps {
  onOpenModal?: (title?: string) => void;
}

export default function CtaBox({ onOpenModal }: CtaBoxProps) {
  return (
    <section className="py-16 md:py-24 bg-[#101520] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden bg-cover bg-center border border-[#242424] shadow-2xl p-8 sm:p-12 lg:p-16"
          style={{ backgroundImage: "url('/images/cta-box-bg.jpg')" }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/40" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#6EFF8F]/20 border border-[#6EFF8F]/40 text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-xs uppercase tracking-widest">
                Special Limited Offer • Save 30%
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Unlimited access to all <span className="text-[#6EFF8F]">gym facilities</span>
              </h2>

              <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed max-w-xl">
                Book a consultation today and claim unlimited access to Olympic free weights, cardio theaters, sauna
                amenities, and a personalized 1-on-1 assessment with our head trainers.
              </p>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-['Rajdhani',sans-serif] uppercase font-bold text-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Free Locker & Towel Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>No Lock-In Long Term Contracts</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenModal ? onOpenModal('Claim 30% Off SPARK GYM Pass') : undefined}
                  className="px-8 py-4 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-base uppercase tracking-wider inline-flex items-center gap-2 transition-all duration-300 shadow-xl shadow-[#6EFF8F]/30"
                >
                  <span>Claim 30% Discount</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Athlete Graphic */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-72 h-80 sm:w-88 sm:h-96">
                <Image
                  src="/images/cta-box-image.png"
                  alt="Fit Athlete"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
