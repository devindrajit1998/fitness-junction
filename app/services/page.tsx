'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScrollingTicker from '@/components/ScrollingTicker';
import WhyChooseSection from '@/components/WhyChooseSection';
import GoalSection from '@/components/GoalSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import LeadModal from '@/components/LeadModal';
import ChatWidget from '@/components/ChatWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Lightbox from '@/components/Lightbox';
import { ArrowRight } from 'lucide-react';

const allServices = [
  {
    id: 1,
    title: 'Group Workout',
    description: 'High-energy, community-driven conditioning and HIIT classes designed for all fitness levels.',
    image: '/images/service-1.jpg',
    href: '/service-single',
  },
  {
    id: 2,
    title: 'Personal Training',
    description: 'One-on-one tailored coaching with certified experts to fast-track your hypertrophy and strength goals.',
    image: '/images/service-2.jpg',
    href: '/service-single',
  },
  {
    id: 3,
    title: 'Muscle Building',
    description: 'Hypertrophy protocols, progressive overload tracking, and Olympic barbell technique mastering.',
    image: '/images/service-3.jpg',
    href: '/service-single',
  },
  {
    id: 4,
    title: 'Nutrition Plans',
    description: 'Evidence-backed dietary blueprints, macro calculations, and meal plans for sustained fat loss and energy.',
    image: '/images/service-4.jpg',
    href: '/service-single',
  },
  {
    id: 5,
    title: 'Strength Training',
    description: 'Powerlifting, compound movements, and core stabilization routines to build functional endurance.',
    image: '/images/service-5.jpg',
    href: '/service-single',
  },
  {
    id: 6,
    title: 'Cardio Sessions',
    description: 'Sprint intervals, rowing drills, and aerobic conditioning designed to optimize your cardiovascular stamina.',
    image: '/images/service-6.jpg',
    href: '/service-single',
  },
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Claim Your SPARK GYM Membership');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');

  const openModal = (title?: string) => {
    setModalTitle(title || 'Claim Your SPARK GYM Membership');
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
        title="Our Services"
        subtitle="What We Offer"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      {/* Marquee Ticker */}
      <ScrollingTicker />

      {/* Page Services Grid */}
      <section className="py-20 md:py-28 bg-[#131824] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-2">
              Transformative Programs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase">
              Elevate Your Physique with <span className="text-[#6EFF8F]">Specialized Training</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#050505] border border-[#242424] rounded-2xl overflow-hidden group hover:border-[#6EFF8F]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(service.image, service.title)}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded bg-[#050505]/90 backdrop-blur-md text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-xs uppercase tracking-wider border border-[#242424]">
                        Fitness Class
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase group-hover:text-[#6EFF8F] transition-colors">
                      <Link href={service.href}>{service.title}</Link>
                    </h3>
                    <p className="text-sm text-[#A3A3A3] mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#242424]/80 mt-2">
                  <Link
                    href={service.href}
                    className="font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider text-[#6EFF8F] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openModal(`Enroll in ${service.title}`)}
                    className="text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded bg-[#1C2333] hover:bg-[#6EFF8F] hover:text-[#050505] text-[#A3A3A3] transition-colors border border-[#242424]"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseSection onImageClick={openLightbox} />

      {/* Our Goal Section */}
      <GoalSection onOpenModal={openModal} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQs Section */}
      <FaqSection />

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
