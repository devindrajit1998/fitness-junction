'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WhyChooseSectionProps {
  onImageClick?: (src: string, caption: string) => void;
}

export default function WhyChooseSection({ onImageClick }: WhyChooseSectionProps) {
  const collageImages = [
    { src: '/images/real/1.jpg', caption: 'THE FITNESS JUNCTION training ground & equipment' },
    { src: '/images/real/2.jpg', caption: 'State-of-the-art strength & workout stations' },
    { src: '/images/real/3.jpg', caption: 'Dedicated free-weight and dumbbell area' },
    { src: '/images/real/4.jpg', caption: 'Functional fitness and conditioning floor' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#101520] relative overflow-hidden border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: 4-Image Grid Collage + Rotating Contact Badge */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {collageImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => onImageClick && onImageClick(img.src, img.caption)}
                  className="relative h-44 sm:h-56 rounded-2xl overflow-hidden group cursor-pointer border border-[#242424] shadow-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs text-[#6EFF8F] font-['Rajdhani',sans-serif] uppercase font-bold tracking-wider">
                      Zoom Photo
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rotating Circular Contact Us Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <Link
                href="/contact"
                className="block relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#6EFF8F] p-2 shadow-2xl border-4 border-[#050505] hover:scale-105 transition-transform"
                title="Contact THE FITNESS JUNCTION"
              >
                <div className="relative w-full h-full animate-spin-slow">
                  <Image
                    src="/images/contact-us-circle.svg"
                    alt="Contact Us"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Narrative and 3-Step Highlights */}
          <div>
            <div className="mb-8">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Elevate fitness with the <span className="text-[#6EFF8F]">best way</span> possible
              </h2>
              <p className="text-[#A3A3A3] text-sm sm:text-base mt-4 leading-relaxed">
                We offer a fitness journey that&apos;s tailored to your goals, supported by professional trainers and a
                welcoming community. Whether it&apos;s weight loss, strength building, or overall wellness, our proven
                methods deliver results.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {/* Step 01 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#050505] border border-[#242424]">
                <span className="text-3xl font-extrabold font-['Rajdhani',sans-serif] text-[#6EFF8F] shrink-0 w-10">
                  01
                </span>
                <div>
                  <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                    Personalized Fitness Plans
                  </h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Work with certified mentors who build tailored workouts, macro nutrition splits, and milestones.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#050505] border border-[#242424]">
                <span className="text-3xl font-extrabold font-['Rajdhani',sans-serif] text-[#6EFF8F] shrink-0 w-10">
                  02
                </span>
                <div>
                  <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                    Quality Training Environment
                  </h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Air-conditioned facility with premium free weights, turf tracks, showers, and dedicated stretching bays.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#050505] border border-[#242424]">
                <span className="text-3xl font-extrabold font-['Rajdhani',sans-serif] text-[#6EFF8F] shrink-0 w-10">
                  03
                </span>
                <div>
                  <h3 className="text-lg font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                    Results-Driven Focus
                  </h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Everything we do is designed to help you achieve tangible physical results, whether you&apos;re aiming for
                    weight loss or hypertrophy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
