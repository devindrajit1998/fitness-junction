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
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone) return;

    try {
      const existingLeads = JSON.parse(localStorage.getItem('fitwell_leads') || '[]');
      const newLead = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        interest: formData.subject,
        message: formData.message,
        source: 'Contact Page Form',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('fitwell_leads', JSON.stringify([...existingLeads, newLead]));
    } catch {
      // ignore
    }

    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-['Rubik',sans-serif]">
      {/* Top Navbar */}
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        subtitle="Get In Touch"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      {/* Marquee Ticker */}
      <ScrollingTicker />

      {/* 3 Contact Info Cards */}
      <section className="py-16 md:py-24 bg-[#131824] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="bg-[#050505] border border-[#242424] hover:border-[#6EFF8F]/50 rounded-2xl p-8 text-center transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <div className="relative w-8 h-8">
                  <Image src="/images/icon-phone.svg" alt="Phone" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase mb-2">
                Call Us Directly
              </h3>
              <p className="text-sm text-[#A3A3A3] mb-4">Official phone for memberships & inquiries</p>
              <div className="space-y-1">
                <a
                  href="tel:+918240855067"
                  className="block text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-xl hover:underline"
                >
                  +91 82408 55067
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#050505] border border-[#242424] hover:border-[#6EFF8F]/50 rounded-2xl p-8 text-center transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <div className="relative w-8 h-8">
                  <Image src="/images/icon-clock.svg" alt="Clock" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase mb-2">
                Gym Timings
              </h3>
              <p className="text-sm text-[#A3A3A3] mb-4">Open all 7 days for workouts</p>
              <div className="space-y-1">
                <span className="block text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-xl">
                  06:00 AM – 10:00 PM
                </span>
                <span className="block text-[#A3A3A3] font-['Rajdhani',sans-serif] text-sm">
                  Unisex Gym & CrossFit
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#050505] border border-[#242424] hover:border-[#6EFF8F]/50 rounded-2xl p-8 text-center transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#6EFF8F]/10 border border-[#6EFF8F]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <div className="relative w-8 h-8">
                  <Image src="/images/icon-location.svg" alt="Location" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase mb-2">
                Our Location
              </h3>
              <p className="text-sm text-[#A3A3A3] mb-4">Chakdaha, Nadia, West Bengal</p>
              <address className="not-italic text-[#6EFF8F] font-['Rajdhani',sans-serif] font-semibold text-base leading-snug">
                Monorama Ultrascan Pvt. Ltd., C.B. Road<br />
                <span className="text-[#A3A3A3] text-sm font-normal">Beside Monorama Ultrascan, Lalpur, Chakdaha 741222</span>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-20 md:py-28 bg-[#050505] relative border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#131824] border border-[#242424] rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="mb-8">
                <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-widest block mb-1">
                  Send a Message
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase">
                  Leave Us <span className="text-[#6EFF8F]">A Message</span>
                </h2>
                <p className="text-[#A3A3A3] text-sm mt-2">
                  Have questions about pricing, membership options, or booking a trainer? Drop us a note.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#6EFF8F] mx-auto" />
                  <h3 className="text-2xl font-bold font-['Rajdhani',sans-serif] text-white uppercase">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#A3A3A3] text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.firstName}</strong>. Our front desk team has
                    received your inquiry and will follow up within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        phone: '',
                        email: '',
                        subject: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#1C2333] hover:bg-[#6EFF8F] hover:text-[#050505] text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+01 789 859 664"
                        className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                      Subject / Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#6EFF8F]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Plans">Membership Plans</option>
                      <option value="Personal Training Booking">Personal Training Booking</option>
                      <option value="Free Day Pass Request">Free Day Pass Request</option>
                      <option value="Corporate Wellness">Corporate Wellness</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your questions, timing preferences, or goals here..."
                      className="w-full bg-[#050505] border border-[#242424] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-base uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-[#6EFF8F]/20"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Embedded Map Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="h-[460px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#242424] shadow-2xl relative">
                <iframe
                  title="SPARK GYM Chakdaha Location"
                  src="https://maps.google.com/maps?q=Monorama+Ultrascan+Pvt+Ltd+Chakdaha+West+Bengal+741222&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Gym Operating Hours Card */}
              <div className="bg-[#131824] border border-[#242424] rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-['Rajdhani',sans-serif] font-bold text-lg text-white uppercase">
                    Gym Hours
                  </h4>
                  <p className="text-xs text-[#A3A3A3]">All 7 Days: 06:00 AM - 10:00 PM</p>
                  <p className="text-xs text-[#6EFF8F]/90">Unisex Gym & CrossFit Training</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#6EFF8F]/20 text-[#6EFF8F] text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">
                    Open Now
                  </span>
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
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Contact SPARK GYM Team" />
      <ChatWidget onOpenModal={() => setModalOpen(true)} />
      <ScrollToTop />
    </div>
  );
}
