'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScrollingTicker from '@/components/ScrollingTicker';
import LeadModal from '@/components/LeadModal';
import ChatWidget from '@/components/ChatWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Lightbox from '@/components/Lightbox';
import {
  Check,
  Phone,
  FileText,
  Download,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

const serviceCategories = [
  { name: 'Group Workout', href: '/services' },
  { name: 'Personal Training', href: '/service-single', active: true },
  { name: 'Muscle Building', href: '/services' },
  { name: 'Nutrition Plans', href: '/services' },
  { name: 'Strength Training', href: '/services' },
  { name: 'Cardio Sessions', href: '/services' },
];

const serviceFaqs = [
  {
    question: 'How often should I attend personal training sessions?',
    answer:
      'For maximum hypertrophy and body recomposition, we recommend 3 to 4 focused sessions per week combined with 1–2 active recovery days.',
  },
  {
    question: 'Is customized meal planning included in personal training?',
    answer:
      'Yes! Every personal training package comes with an in-depth macro assessment, grocery guide, and bi-weekly diet adjustments.',
  },
  {
    question: 'Can beginners join the personal training program?',
    answer:
      'Absolutely. Our certified trainers specialize in baseline movement mechanics, injury prevention, and building confidence with free weights from day one.',
  },
];

export default function ServiceSinglePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Claim Your Fitwell Membership');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openModal = (title?: string) => {
    setModalTitle(title || 'Book 1-on-1 Personal Training');
    setModalOpen(true);
  };

  const openLightbox = (src: string, caption: string) => {
    setLightboxSrc(src);
    setLightboxCaption(caption);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-['Rubik',sans-serif]">
      {/* Top Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Page Header */}
      <PageHeader
        title="Personal Training"
        subtitle="Service Details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Personal Training' },
        ]}
      />

      {/* Marquee Ticker */}
      <ScrollingTicker />

      {/* Main Service Content */}
      <section className="py-20 md:py-28 bg-[#131824] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left/Main Column: 8 Cols */}
            <div className="lg:col-span-8 space-y-8">
              {/* Main Service Featured Image */}
              <div
                className="relative h-80 sm:h-[460px] rounded-2xl overflow-hidden border border-[#242424] shadow-2xl cursor-pointer group"
                onClick={() =>
                  openLightbox('/images/service-single-img.jpg', 'Personal Training Session with Certified Coach')
                }
              >
                <Image
                  src="/images/service-single-img.jpg"
                  alt="Personal Training"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block">
                  Elite 1-on-1 Coaching
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                  Personal training for <span className="text-[#6EFF8F]">optimal fitness</span> and health
                </h2>
                <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
                  Personal training at Fitwell goes far beyond simple rep counting. Our certified trainers perform a
                  comprehensive bio-mechanical assessment, analyze your postural alignment, and architect an individualized
                  program engineered for maximum strength, metabolic conditioning, and physique sculpting.
                </p>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">
                  Whether your ambition is stepping onto a bodybuilding stage, preparing for a competitive sports season,
                  or simply revitalizing your daily energy and mobility, our coaches keep you accountable, safe, and
                  performing at your highest genetic potential.
                </p>
              </div>

              {/* 2 Feature Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#050505] border border-[#242424] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center shrink-0">
                    <div className="relative w-6 h-6">
                      <Image src="/images/icon-service-1.svg" alt="plan" fill className="object-contain" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-lg text-white uppercase">
                      Personalized Fitness Programs
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed">
                      Custom workout cycles calibrated to your current strength baseline, recovery speed, and specific targets.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#050505] border border-[#242424] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6EFF8F]/10 flex items-center justify-center shrink-0">
                    <div className="relative w-6 h-6">
                      <Image src="/images/icon-service-2.svg" alt="tracking" fill className="object-contain" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-['Rajdhani',sans-serif] font-bold text-lg text-white uppercase">
                      Comprehensive Wellness Tracking
                    </h4>
                    <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed">
                      Continuous InBody scan analytics, heart rate variability monitoring, and progressive overload metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Image & Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4">
                <div
                  className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#242424] shadow-xl cursor-pointer group"
                  onClick={() =>
                    openLightbox('/images/service-single-img-2.jpg', 'Targeted Muscle Group Conditioning')
                  }
                >
                  <Image
                    src="/images/service-single-img-2.jpg"
                    alt="Strength Training Routine"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-['Rajdhani',sans-serif] text-2xl font-bold text-white uppercase">
                    Key Program Benefits
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#A3A3A3]">
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>One-on-one attention with zero distractions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Injury prevention through strict movement mechanics</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Targeted metabolic conditioning for swift fat loss</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#6EFF8F] text-[#050505] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Weekly nutrition check-in and macro recalibration</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service FAQ Accordion */}
              <div className="pt-8 border-t border-[#242424] space-y-4">
                <h3 className="text-2xl font-bold font-['Rajdhani',sans-serif] text-white uppercase mb-4">
                  Frequently Asked Questions
                </h3>
                {serviceFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#242424] rounded-xl bg-[#050505] overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-['Rajdhani',sans-serif] font-bold text-lg uppercase text-white hover:text-[#6EFF8F] transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#6EFF8F] transition-transform duration-300 shrink-0 ml-4 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-[#A3A3A3] font-['Rubik',sans-serif] leading-relaxed border-t border-[#242424]/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => openModal('Book a Personal Training Session')}
                  className="w-full sm:w-auto px-8 py-4 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-base uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#6EFF8F]/20"
                >
                  <span>Book a 1-on-1 Session</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: 4 Cols Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Category Widget */}
              <div className="bg-[#050505] border border-[#242424] rounded-2xl p-6 shadow-xl">
                <h3 className="font-['Rajdhani',sans-serif] font-bold text-xl text-white uppercase pb-4 mb-4 border-b border-[#242424]">
                  All Services
                </h3>
                <div className="space-y-2">
                  {serviceCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                        cat.active
                          ? 'bg-[#6EFF8F] text-[#050505]'
                          : 'bg-[#131824] text-[#A3A3A3] hover:bg-[#1f293d] hover:text-[#6EFF8F]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Need Help Box */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C2333] to-[#101520] border border-[#6EFF8F]/30 p-8 shadow-2xl text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#6EFF8F]/20 text-[#6EFF8F] flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase">
                    Need Any Help?
                  </h4>
                  <p className="text-[#A3A3A3] text-xs mt-1">
                    Call our head coaching desk directly for advice on schedule and packages.
                  </p>
                </div>
                <div className="text-xl font-extrabold font-['Rajdhani',sans-serif] text-[#6EFF8F]">
                  <a href="tel:+01789859664" className="hover:underline">
                    +01 789 859 664
                  </a>
                </div>
                <Link
                  href="/contact"
                  className="block w-full py-3 rounded bg-transparent border border-[#6EFF8F] text-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-[#050505] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Download Brochure Box */}
              <div className="bg-[#050505] border border-[#242424] rounded-2xl p-6 shadow-xl space-y-4">
                <h4 className="font-['Rajdhani',sans-serif] font-bold text-xl text-white uppercase">
                  Service Brochure
                </h4>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  Download our detailed fitness curriculum, trainer roster, and pricing options in PDF format.
                </p>
                <button
                  onClick={() => openModal('Download Personal Training Brochure')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#131824] hover:bg-[#1f293d] border border-[#242424] text-white font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-[#6EFF8F]" />
                    <span>Download PDF</span>
                  </div>
                  <Download className="w-4 h-4 text-[#6EFF8F]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals & Helpers */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />
      <ChatWidget onOpenModal={openModal} />
      <ScrollToTop />
      <Lightbox isOpen={lightboxOpen} src={lightboxSrc} caption={lightboxCaption} onClose={() => setLightboxOpen(false)} />
    </div>
  );
}
