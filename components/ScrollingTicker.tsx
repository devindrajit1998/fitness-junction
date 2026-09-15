'use client';

import React from 'react';
import Image from 'next/image';

const tickerItems = [
  'Personal Trainers',
  'Live Classes',
  'Outdoor & Online Trainers',
  'Body Building',
  'Cardio Endurance',
  'Healthy Nutrition',
  'Strength Training',
  'HIIT Workouts',
];

export default function ScrollingTicker() {
  return (
    <div className="bg-[#6EFF8F] py-3.5 overflow-hidden select-none border-y border-[#c5e600] z-20 relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="text-[#050505] font-['Rajdhani',sans-serif] font-black text-lg md:text-xl uppercase tracking-wider">
              {item}
            </span>
            <div className="relative w-5 h-5 ml-6 opacity-90">
              <Image src="/images/star-icon.svg" alt="star" fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
