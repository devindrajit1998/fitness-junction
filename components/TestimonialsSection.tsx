'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'CrossFit Athlete',
    image: '/images/author-1.jpg',
    rating: 5,
    text: 'Joining this gym has been life-changing! The trainers pushed me past barriers I never thought I could break. In six months, I gained 8 lbs of lean muscle and cut my 5k time by 4 minutes.',
  },
  {
    name: 'Marcus Vance',
    role: 'Corporate Executive',
    image: '/images/author-2.jpg',
    rating: 5,
    text: 'Between 60-hour work weeks and travel, staying fit felt impossible. THE FITNESS JUNCTION custom-designed a high-output routine that restored my stamina and reduced my daily stress levels completely.',
  },
  {
    name: 'Elena Rostova',
    role: 'Marathon Runner',
    image: '/images/author-1.jpg',
    rating: 5,
    text: 'The equipment here is world-class, clean, and never overcrowded. The personal nutrition counseling alone gave me the exact carb-cycling blueprint I needed to finish my first ultra.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-[#101520] relative overflow-hidden border-t border-[#242424]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
          Client Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase mb-12">
          Inspiring Journeys: <span className="text-[#6EFF8F]">Client Stories</span>
        </h2>

        <div className="bg-[#050505] border border-[#242424] rounded-3xl p-8 sm:p-12 relative shadow-2xl">
          {/* Big Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center mx-auto mb-6 text-[#6EFF8F]">
            <Quote className="w-6 h-6" />
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6 text-[#6EFF8F]">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#6EFF8F]" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-lg sm:text-2xl text-gray-200 font-light italic leading-relaxed max-w-2xl mx-auto mb-8">
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#6EFF8F]">
              <Image src={t.image} alt={t.name} fill sizes="60px" className="object-cover" />
            </div>
            <div className="text-left">
              <h4 className="font-['Rajdhani',sans-serif] font-bold text-lg text-white uppercase tracking-wider">
                {t.name}
              </h4>
              <p className="text-xs text-[#A3A3A3] uppercase tracking-widest">{t.role}</p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-[#242424]">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#050505] hover:bg-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === current ? 'bg-[#6EFF8F] w-6' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-[#242424] flex items-center justify-center text-[#A3A3A3] hover:text-[#050505] hover:bg-[#6EFF8F] hover:border-[#6EFF8F] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
