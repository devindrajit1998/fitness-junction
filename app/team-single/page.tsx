'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScrollingTicker from '@/components/ScrollingTicker';
import FaqSection from '@/components/FaqSection';
import LeadModal from '@/components/LeadModal';
import ChatWidget from '@/components/ChatWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Lightbox from '@/components/Lightbox';
import {
  Phone,
  Mail,
  Award,
  Calendar,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from 'lucide-react';

const coachSkills = [
  { name: 'Personal Training & Biomechanics', percentage: 95 },
  { name: 'Hypertrophy & Strength Protocols', percentage: 92 },
  { name: 'Metabolic Conditioning & Cardio', percentage: 88 },
  { name: 'Nutritional Coaching & Macro Profiling', percentage: 90 },
];

const certifications = [
  {
    title: 'Certified Strength & Conditioning Specialist (CSCS)',
    issuer: 'National Strength and Conditioning Association',
    year: '2016',
  },
  {
    title: 'Master Fitness Trainer & Precision Nutrition L2',
    issuer: 'Precision Nutrition Academy',
    year: '2018',
  },
  {
    title: 'Olympic Weightlifting & Powerlifting Coach',
    issuer: 'USA Weightlifting (USAW)',
    year: '2020',
  },
];

export default function TeamSinglePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-['Rubik',sans-serif]">
      {/* Top Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Page Header */}
      <PageHeader
        title="Darlene Robertson"
        subtitle="Head Fitness Coach"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Trainers', href: '/about' },
          { label: 'Darlene Robertson' },
        ]}
      />

      {/* Marquee Ticker */}
      <ScrollingTicker />

      {/* Main Profile Section */}
      <section className="py-20 md:py-28 bg-[#131824] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Trainer Photo & Details Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#242424] shadow-2xl group cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src="/images/team-1.jpg"
                  alt="Darlene Robertson"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {/* Social Bar Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#101520]/80 backdrop-blur-md border border-[#242424] rounded-2xl p-3.5 flex items-center justify-center gap-4">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-[#1C2333] hover:bg-[#6EFF8F] text-white hover:text-[#050505] flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-[#1C2333] hover:bg-[#6EFF8F] text-white hover:text-[#050505] flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="w-9 h-9 rounded-full bg-[#1C2333] hover:bg-[#6EFF8F] text-white hover:text-[#050505] flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-[#1C2333] hover:bg-[#6EFF8F] text-white hover:text-[#050505] flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Quick Contact Info Box */}
              <div className="bg-[#050505] border border-[#242424] rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="font-['Rajdhani',sans-serif] font-bold text-xl text-white uppercase pb-3 border-b border-[#242424]">
                  Coach Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-[#A3A3A3]">
                    <Phone className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                    <span>Direct: +01 789 859 664</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A3A3A3]">
                    <Mail className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                    <span>darlene@fitwellgym.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A3A3A3]">
                    <Award className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                    <span>Experience: 10+ Years Competitive & Coaching</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A3A3A3]">
                    <Calendar className="w-4 h-4 text-[#6EFF8F] shrink-0" />
                    <span>Availability: Mon - Sat (Morning & Evening)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openModal}
                    className="w-full py-3.5 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#6EFF8F]/20 flex items-center justify-center gap-2"
                  >
                    <span>Book 1-on-1 with Darlene</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Skills & Certifications (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Header Details */}
              <div className="space-y-3">
                <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block">
                  Meet Your Coach
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase leading-tight">
                  Darlene <span className="text-[#6EFF8F]">Robertson</span>
                </h2>
                <p className="text-base text-[#A3A3A3] font-semibold font-['Rajdhani',sans-serif] uppercase tracking-wider">
                  Lead Certified Master Trainer • Body Sculpting & Athletic Conditioning
                </p>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-4 text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
                <p>
                  Darlene Robertson has spent over a decade transforming athletes, corporate leaders, and fitness
                  beginners into their strongest, most confident versions. Holding a Master of Science in Exercise
                  Physiology and an NSCA-CSCS certification, her approach blends scientific biomechanics with motivational
                  discipline.
                </p>
                <p>
                  Specializing in progressive resistance training, metabolic circuits, and metabolic reset nutrition,
                  Darlene has personally mentored over 450 individuals to reach podium placements, marathon finishes, and
                  dramatic body transformations.
                </p>
              </div>

              {/* Training Philosophy Quote */}
              <div className="p-6 rounded-2xl bg-[#050505] border-l-4 border-[#6EFF8F] border-y border-r border-[#242424]">
                <p className="text-gray-200 italic text-base leading-relaxed">
                  &ldquo;True strength is forged when discipline overcomes hesitation. We don&apos;t chase quick fixes; we
                  engineer enduring, daily habits that redefine what your mind and body can achieve.&rdquo;
                </p>
                <span className="block mt-3 text-xs font-['Rajdhani',sans-serif] font-bold uppercase text-[#6EFF8F] tracking-widest">
                  — Darlene Robertson
                </span>
              </div>

              {/* Professional Skills / Progress Bars */}
              <div className="space-y-5 pt-2">
                <h3 className="text-2xl font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                  Coaching Expertise & Skills
                </h3>
                <div className="space-y-4">
                  {coachSkills.map((skill, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-[#6EFF8F]">{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#050505] border border-[#242424] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6EFF8F] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Education */}
              <div className="space-y-4 pt-4 border-t border-[#242424]">
                <h3 className="text-2xl font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                  Education & Credentials
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#050505] border border-[#242424]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#6EFF8F] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-['Rajdhani',sans-serif] font-bold text-white uppercase text-base">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-[#A3A3A3] mt-0.5">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Helpers */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Book a Session with Darlene Robertson" defaultInterest="Personal Training" />
      <ChatWidget onOpenModal={openModal} />
      <ScrollToTop />
      <Lightbox isOpen={lightboxOpen} src="/images/team-1.jpg" caption="Darlene Robertson - Head Coach" onClose={() => setLightboxOpen(false)} />
    </div>
  );
}
