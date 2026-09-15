'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScrollingTicker from '@/components/ScrollingTicker';
import GoalSection from '@/components/GoalSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CtaBox from '@/components/CtaBox';
import LeadModal from '@/components/LeadModal';
import ChatWidget from '@/components/ChatWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Lightbox from '@/components/Lightbox';
import {
  Dumbbell,
  HeartPulse,
  Award,
  Apple,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Claim Your THE FITNESS JUNCTION Membership');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');

  const openModal = (title?: string) => {
    setModalTitle(title || 'Claim Your THE FITNESS JUNCTION Membership');
    setModalOpen(true);
  };

  const openLightbox = (src: string, caption: string) => {
    setLightboxSrc(src);
    setLightboxCaption(caption);
    setLightboxOpen(true);
  };

  const trainers = [
    {
      name: 'Darlene Robertson',
      role: 'Head Fitness Coach',
      image: '/images/team-1.jpg',
      slug: 'team-single',
    },
    {
      name: 'Floyd Miles',
      role: 'Strength & Conditioning',
      image: '/images/team-2.jpg',
      slug: 'team-single',
    },
    {
      name: 'Darrell Steward',
      role: 'Cardio & Crossfit Specialist',
      image: '/images/team-3.jpg',
      slug: 'team-single',
    },
    {
      name: 'Arlene McCoy',
      role: 'Functional & Nutritionist',
      image: '/images/team-4.jpg',
      slug: 'team-single',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-['Rubik',sans-serif]">
      {/* Top Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Breadcrumb Header */}
      <PageHeader
        title="About Us"
        subtitle="Who We Are"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Marquee Ticker */}
      <ScrollingTicker />

      {/* About Us Section */}
      <section className="py-20 md:py-28 bg-[#131824] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: 3-Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                  onClick={() => openLightbox('/images/real/5.jpg', 'THE FITNESS JUNCTION Training Ground & Facilities')}
                >
                  <Image
                    src="/images/real/5.jpg"
                    alt="THE FITNESS JUNCTION Facility"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <div
                    className="relative h-32 sm:h-38 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                    onClick={() => openLightbox('/images/real/6.jpg', 'Workout Machinery & Equipment')}
                  >
                    <Image
                      src="/images/real/6.jpg"
                      alt="THE FITNESS JUNCTION Equipment"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="relative h-32 sm:h-38 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                    onClick={() => openLightbox('/images/real/7.jpg', 'Free Weights Area')}
                  >
                    <Image
                      src="/images/real/7.jpg"
                      alt="Free Weights Zone"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative & 4 Badges */}
            <div className="space-y-6">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Empowering you to achieve <span className="text-[#6EFF8F]">your fitness</span> goals
              </h2>
              <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
                We believe fitness is more than just a workout—it&apos;s a lifestyle. With top-of-the-line facilities,
                certified trainers, and an inclusive community, we&apos;re here to inspire and guide you every step of the
                way.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="w-10 h-10 rounded-lg bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] shrink-0">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-white uppercase text-base">
                      Personal Trainer
                    </h4>
                    <p className="text-xs text-[#A3A3A3]">1-on-1 Elite Guidance</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="w-10 h-10 rounded-lg bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] shrink-0">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-white uppercase text-base">
                      Cardio Programs
                    </h4>
                    <p className="text-xs text-[#A3A3A3]">High-Stamina Workouts</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="w-10 h-10 rounded-lg bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-white uppercase text-base">
                      Quality Equipment
                    </h4>
                    <p className="text-xs text-[#A3A3A3]">Olympic Standard</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="w-10 h-10 rounded-lg bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] shrink-0">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-white uppercase text-base">
                      Healthy Nutrition
                    </h4>
                    <p className="text-xs text-[#A3A3A3]">Diet & Macro Coaching</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#6EFF8F]/20"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 md:py-28 bg-[#050505] relative border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Col 1: Introduction */}
            <div className="space-y-5">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block">
                Method
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Our commitment to <span className="text-[#6EFF8F]">excellence</span>
              </h2>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">
                Top-quality training in a supportive environment tailored specifically to elevate your stamina,
                flexibility, and physique.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-transparent border border-[#6EFF8F] text-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-[#050505] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Col 2: Approach Center Image */}
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-sm h-80 rounded-2xl overflow-hidden border border-[#242424] shadow-2xl group cursor-pointer"
                onClick={() => openLightbox('/images/real/8.jpg', 'THE FITNESS JUNCTION Training Approach')}
              >
                <Image
                  src="/images/real/8.jpg"
                  alt="THE FITNESS JUNCTION Approach"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Col 3: Vision & Mission Cards */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#131824] border border-[#242424] hover:border-[#6EFF8F]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-4">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-vision.svg" alt="Vision" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">Our Vision</h3>
                <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
                  Our vision is to provide exceptional fitness experiences that motivate and transform individuals of
                  every fitness background.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#131824] border border-[#242424] hover:border-[#6EFF8F]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-4">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-mission.svg" alt="Mission" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">Our Mission</h3>
                <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
                  Our mission is to create a welcoming, high-energy environment equipped with world-class facilities and
                  coaching methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <GoalSection onOpenModal={openModal} />

      {/* Our Health Section */}
      <section className="py-20 md:py-28 bg-[#101520] relative border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: 2 Health Images + Rotating circle badge */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                  onClick={() => openLightbox('/images/health-img-1.jpg', 'Cardio Conditioning')}
                >
                  <Image
                    src="/images/health-img-1.jpg"
                    alt="Health & Cardio"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  className="relative h-64 sm:h-80 mt-8 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                  onClick={() => openLightbox('/images/health-img-2.jpg', 'Strength Building')}
                >
                  <Image
                    src="/images/health-img-2.jpg"
                    alt="Healthy Lifestyle"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Rotating Circle Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <Link
                  href="/contact"
                  className="block relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#6EFF8F] p-2 shadow-2xl border-4 border-[#050505] hover:scale-105 transition-transform"
                >
                  <div className="relative w-full h-full animate-spin-slow">
                    <Image src="/images/contact-us-circle.svg" alt="Contact Us" fill className="object-contain" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block">
                Health and Wellness
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                Maintain & improve <span className="text-[#6EFF8F]">your health daily</span>
              </h2>
              <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
                Maintaining your health is the foundation of a fulfilling life. With the right guidance and consistent
                efforts, you can achieve a balanced lifestyle that supports both physical vitality and mental clarity.
              </p>
              <div>
                <button
                  onClick={() => openModal('Claim Your Free Health Assessment')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#6EFF8F]/20"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 md:py-28 bg-[#050505] relative border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
              Built to Inspire
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase">
              Fueling your fitness <span className="text-[#6EFF8F]">journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Col: 2 Journey items */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#131824] border border-[#242424]">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-3">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-journey-1.svg" alt="progress" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                  Progress Tracking
                </h3>
                <p className="text-sm text-[#A3A3A3] mt-1">
                  Stay motivated with assessments, performance analytics, and milestone tracking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131824] border border-[#242424]">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-3">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-journey-2.svg" alt="stats" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                  Workout Stats
                </h3>
                <p className="text-sm text-[#A3A3A3] mt-1">
                  Monitor heart rates, calories burned, and lifting volume with precision metrics.
                </p>
              </div>
            </div>

            {/* Center: Journey Athlete Image */}
            <div className="flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96">
                <Image
                  src="/images/journey-image.png"
                  alt="Fitness Journey Athlete"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Col: 2 Journey items */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#131824] border border-[#242424]">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-3">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-journey-3.svg" alt="journey" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                  Fitness Journey
                </h3>
                <p className="text-sm text-[#A3A3A3] mt-1">
                  Follow a structured roadmap designed to take you from novice to elite physical stamina.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131824] border border-[#242424]">
                <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center mb-3">
                  <div className="relative w-6 h-6">
                    <Image src="/images/icon-journey-4.svg" alt="progress" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="font-['Rajdhani',sans-serif] text-xl font-bold text-white uppercase">
                  Daily Progress
                </h3>
                <p className="text-sm text-[#A3A3A3] mt-1">
                  Celebrate daily micro-wins that accumulate into lifelong habits and health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trainers Section */}
      <section className="py-20 md:py-28 bg-[#101520] relative border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
                Our Trainers
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase">
                Your Fitness Journey Starts with <span className="text-[#6EFF8F]">Our Expert Trainers</span>
              </h2>
            </div>
            <Link
              href="/team-single"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-transparent border border-[#6EFF8F] text-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-[#050505] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shrink-0"
            >
              <span>View Head Coach</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#050505] border border-[#242424] rounded-2xl overflow-hidden group hover:border-[#6EFF8F]/50 transition-all duration-300 shadow-xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-center gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-[#1C2333] text-white flex items-center justify-center hover:bg-[#6EFF8F] hover:text-[#050505] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-[#1C2333] text-white flex items-center justify-center hover:bg-[#6EFF8F] hover:text-[#050505] transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-[#1C2333] text-white flex items-center justify-center hover:bg-[#6EFF8F] hover:text-[#050505] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-[#1C2333] text-white flex items-center justify-center hover:bg-[#6EFF8F] hover:text-[#050505] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-['Rajdhani',sans-serif] font-bold text-xl text-white uppercase group-hover:text-[#6EFF8F] transition-colors">
                    <Link href={`/${t.slug}`}>{t.name}</Link>
                  </h3>
                  <p className="text-xs text-[#A3A3A3] mt-1 uppercase tracking-wider">{t.role}</p>
                  <div className="mt-4 pt-4 border-t border-[#242424]">
                    <button
                      onClick={() => openModal(`Book 1-on-1 with ${t.name}`)}
                      className="text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#6EFF8F] hover:underline"
                    >
                      Book Session &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseSection onImageClick={openLightbox} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQs */}
      <FaqSection />

      {/* CTA Box */}
      <CtaBox onOpenModal={openModal} />

      {/* Footer */}
      <Footer />

      {/* Global Utilities */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />
      <ChatWidget onOpenModal={openModal} />
      <ScrollToTop />
      <Lightbox isOpen={lightboxOpen} src={lightboxSrc} caption={lightboxCaption} onClose={() => setLightboxOpen(false)} />
    </div>
  );
}
