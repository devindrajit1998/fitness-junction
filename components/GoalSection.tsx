'use client';

import React from 'react';
import Image from 'next/image';

interface GoalSectionProps {
  onOpenModal?: (title?: string) => void;
}

export default function GoalSection({ onOpenModal }: GoalSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#131824] relative overflow-hidden border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div>
            <div className="mb-8">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
                Fitness Goal
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Why we&apos;re your top <span className="text-[#6EFF8F]">fitness choice</span>
              </h2>
              <p className="text-[#A3A3A3] text-sm sm:text-base mt-4 leading-relaxed">
                We combine science-driven workout regimens with state-of-the-art gym equipment and certified personal
                mentors to ensure you reach your ideal physique sustainably.
              </p>
            </div>

            {/* Goal Content List */}
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#050505] border border-[#242424]/80 hover:border-[#6EFF8F]/40 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center shrink-0">
                  <div className="relative w-8 h-8">
                    <Image src="/images/icon-goal-1.svg" alt="equipment" fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                    State of the art equipment
                  </h3>
                  <p className="text-sm text-[#A3A3A3] mt-1 leading-relaxed">
                    Experience cutting-edge fitness machinery, Olympic lifting bars, power racks, and precision cardio
                    monitors tailored for peak safety and output.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#050505] border border-[#242424]/80 hover:border-[#6EFF8F]/40 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center shrink-0">
                  <div className="relative w-8 h-8">
                    <Image src="/images/icon-goal-2.svg" alt="plan" fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                    Personalized workout plans
                  </h3>
                  <p className="text-sm text-[#A3A3A3] mt-1 leading-relaxed">
                    Tailored coaching based on your body composition, stamina levels, and metabolic rates to fast-track
                    hypertrophy or fat loss.
                  </p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-8">
              <button
                onClick={() => onOpenModal ? onOpenModal('Claim Your Fitness Consultation') : undefined}
                className="inline-flex items-center px-8 py-3.5 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#6EFF8F]/20"
              >
                <span>Get Started Now</span>
                <span className="ml-2 font-bold">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Goal Image with floating stats */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-md h-[460px] sm:h-[520px]">
              <Image
                src="/images/goal-image.png"
                alt="Goal Athlete"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl z-10"
              />

              {/* Floating Stat Badge 1 */}
              <div className="absolute top-12 left-0 sm:-left-4 z-20 bg-[#1C2333]/90 backdrop-blur-md border border-[#6EFF8F]/30 rounded-xl p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#6EFF8F] flex items-center justify-center text-[#050505] font-bold">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-goal-info.svg" alt="diet" fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold font-['Rajdhani',sans-serif] text-white">85%</h4>
                  <p className="text-xs text-[#A3A3A3]">Custom Programs</p>
                </div>
              </div>

              {/* Floating Stat Badge 2 */}
              <div className="absolute bottom-10 right-0 sm:-right-4 z-20 bg-[#1C2333]/90 backdrop-blur-md border border-[#6EFF8F]/30 rounded-xl p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#6EFF8F] flex items-center justify-center text-[#050505] font-bold">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-goal-info.svg" alt="diet" fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold font-['Rajdhani',sans-serif] text-white">30%</h4>
                  <p className="text-xs text-[#A3A3A3]">Balanced Diet Plans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
