'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'What types of fitness classes do you offer?',
    answer:
      'We offer a wide variety of fitness classes including High-Intensity Interval Training (HIIT), Vinyasa yoga, spin cycling, Olympic strength training, functional conditioning, and Zumba dance cardio for all levels.',
  },
  {
    question: 'Do I need to be a member to attend a class?',
    answer:
      'While members get unlimited class access included in their monthly plans, we also offer convenient drop-in day passes and 10-class punch cards for visitors and guests.',
  },
  {
    question: 'What should I bring to my first workout?',
    answer:
      'Please bring comfortable athletic attire, clean indoor training shoes, a water bottle, and a sweat towel. We provide secure lockers, shower facilities, and hydration stations.',
  },
  {
    question: 'What is your cancellation policy for classes?',
    answer:
      'Memberships can be frozen or canceled with a simple 7-day advance notice without hidden termination fees. Class reservations can be rescheduled up to 2 hours before the start time.',
  },
  {
    question: 'Do you have any special offers for new members?',
    answer:
      'Yes! First-time visitors receive a free 1-day pass, a complimentary body composition analysis, and a 30% discount on initial personal training packages.',
  },
];

interface FaqSectionProps {
  faqs?: FaqItem[];
  showImages?: boolean;
}

export default function FaqSection({ faqs = defaultFaqs, showImages = true }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${showImages ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          {/* Left Column: Visual Collage (if showImages) */}
          {showImages && (
            <div className="relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#242424] shadow-2xl">
                  <Image
                    src="/images/faq-img-1.jpg"
                    alt="Fitness Member"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 sm:h-80 mt-8 rounded-2xl overflow-hidden border border-[#242424] shadow-2xl">
                  <Image
                    src="/images/faq-img-2.jpg"
                    alt="Fitness Coach"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#6EFF8F]/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          )}

          {/* Right Column: FAQ Accordion */}
          <div>
            <div className="mb-8">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Answers to your <span className="text-[#6EFF8F]">most common</span> questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-[#242424] rounded-xl bg-[#131824] overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left font-['Rajdhani',sans-serif] font-bold text-lg sm:text-xl uppercase text-white hover:text-[#6EFF8F] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#6EFF8F] transition-transform duration-300 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#A3A3A3] font-['Rubik',sans-serif] leading-relaxed border-t border-[#242424]/60 pt-3 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
