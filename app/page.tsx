'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  date?: string;
  notes?: string;
  createdAt: string;
}

export default function FitwellHome() {
  // Preloader state
  const [loading, setLoading] = useState(true);

  // Sticky Header state & Scroll position
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials Slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Lead Capture Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('Claim Your THE FITNESS JUNCTION Membership');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Gym & Strength Training',
    date: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Chat Widget state is now handled by ChatWidget component

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider auto-play
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(slideTimer);
  }, []);

  const heroSlides = [
    {
      bgImage: '/images/real/1.jpg',
      tagline: 'THE FITNESS JUNCTION',
      title1: 'Train ',
      highlight: 'Strong.',
      title2: ' Live Stronger.',
      desc: "It's your mind that needs convincing. Push past your limits, stay committed, and watch as your body transforms into a powerhouse of strength and resilience. Book your free trial today!",
    },
    {
      bgImage: '/images/real/2.jpg',
      tagline: 'UNLEASH YOUR POWER',
      title1: 'Empower Your ',
      highlight: 'Strength, Elevate',
      title2: ' Your Life.',
      desc: 'Join our welcoming community and embark on a fitness journey tailored to your goals. Our expert trainers and state-of-the-art equipment will guide you every single step.',
    },
  ];

  const services = [
    {
      id: 1,
      title: 'Strength Training',
      category: 'Build Strength',
      img: '/images/service-1.jpg',
      desc: 'Build strength with modern equipment and expert guidance.',
    },
    {
      id: 2,
      title: 'Fat Loss',
      category: 'Results',
      img: '/images/service-2.jpg',
      desc: 'Structured workouts designed around your fitness goals.',
    },
    {
      id: 3,
      title: 'Muscle Building',
      category: 'Hypertrophy',
      img: '/images/service-3.jpg',
      desc: 'Progressive strength training with professional guidance.',
    },
    {
      id: 4,
      title: 'CrossFit',
      category: 'Endurance',
      img: '/images/service-4.jpg',
      desc: 'High-intensity functional fitness.',
    },
    {
      id: 5,
      title: 'Yoga',
      category: 'Flexibility',
      img: '/images/real/5.jpg',
      desc: 'Yoga and power yoga sessions.',
    },
    {
      id: 6,
      title: 'Zumba / Dance',
      category: 'Cardio',
      img: '/images/real/6.jpg',
      desc: 'Group fitness that keeps workouts enjoyable.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Weekly pass',
      price: 'Call Us',
      unit: '',
      highlighted: false,
      features: [
        'Fitness Floor & Cardio Area',
        '30-Minute Fitness Consultation',
        'Access to Club 360 Class',
        '50% Off On Guest Passes',
        'Staffed Hours Access Only',
      ],
    },
    {
      name: 'Monthly pass',
      price: 'Call Us',
      unit: '',
      highlighted: true,
      badge: 'MOST POPULAR',
      features: [
        'Full 24/7 Access to Gym Facilities',
        'Unlimited Fitness & Cardio Floor',
        'Weekly Personal Trainer Consultation',
        'Free Unlimited Guest Passes',
        'Complimentary Locker & Sauna Use',
      ],
    },
    {
      name: 'Yearly pass',
      price: 'Call Us',
      unit: '',
      highlighted: false,
      features: [
        'Full 365 Days VIP Access',
        'Dedicated Personal Strength Coach',
        'Complete Nutrition & Meal Blueprint',
        'Free Fitwell Merchandise & Bottle',
        'Complimentary Spa & Recovery Lounge',
      ],
    },
  ];

  const trainers = [
    {
      name: 'Darlene Robertson',
      role: 'fitness coach',
      img: '/images/team-1.jpg',
      specialty: 'Functional & HIIT',
    },
    {
      name: 'Savannah Nguyen',
      role: 'fitness coach',
      img: '/images/team-2.jpg',
      specialty: 'Strength & Conditioning',
    },
    {
      name: 'Cameron Williamson',
      role: 'fitness coach',
      img: '/images/team-3.jpg',
      specialty: 'Hypertrophy & Mobility',
    },
    {
      name: 'Leslie Alexander',
      role: 'fitness coach',
      img: '/images/team-4.jpg',
      specialty: 'Cardio & Agility',
    },
  ];

  const faqs = [
    {
      q: 'What should I bring to my first workout?',
      a: 'Bring comfortable workout clothes, supportive athletic sneakers, a water bottle, and a sweat towel. We provide lockers, sanitized equipment, and fresh towel stations upon arrival.',
    },
    {
      q: 'What are your standard gym opening hours?',
      a: 'We are open all 7 days from 06:00 AM to 10:00 PM at C.B. Road, beside Monorama Ultrascan Pvt. Ltd., Lalpur, Barasat.',
    },
    {
      q: 'Do you provide personal nutrition and diet counselling?',
      a: 'Yes! Public listings corroborate our comprehensive services: Regular Gym, CrossFit, Personal Training, Cardio Fitness, and dedicated Diet Counselling.',
    },
    {
      q: 'Is THE FITNESS JUNCTION suitable for both men and women?',
      a: 'Absolutely. THE FITNESS JUNCTION is a verified unisex fitness centre established in 2020 with certified trainers and a 4.8/5 rating across Google and Justdial.',
    },
    {
      q: 'How do I get in touch or book a consultation?',
      a: 'You can directly call us at +91 96811 25006 or visit our facility on C.B. Road, beside Monorama Ultrascan, Lalpur, Barasat.',
    },
  ];

  const testimonials = [
    {
      name: 'Subhasish Roy',
      role: 'Barasat Resident • Verified Member',
      img: '/images/author-1.jpg',
      text: "All equipments are there trainers are supportive",
    },
    {
      name: 'Rupayan Das',
      role: 'CrossFit & Strength Member',
      img: '/images/author-2.jpg',
      text: 'THE FITNESS JUNCTION in Barasat transformed my strength and stamina. The trainers guide every posture and workout progression with great dedication.',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Effective Exercises for Weight Loss',
      desc: 'Discover the best workouts to burn fat, boost metabolism, and achieve your weight loss goals faster without burnout.',
      img: '/images/post-1.jpg',
      date: 'May 14, 2025',
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Meal Preparing for Fitness Success',
      desc: 'Learn how to save time and eat healthier with science-backed batch cooking strategies.',
      img: '/images/post-2.jpg',
      date: 'May 18, 2025',
    },
    {
      id: 3,
      title: 'Top Benefits of Strength Training for All Ages',
      desc: 'Strength training is not just for bodybuilders! Discover bone density and longevity perks.',
      img: '/images/post-3.jpg',
      date: 'May 22, 2025',
    },
    {
      id: 4,
      title: 'How to Stay Motivated in Your Fitness Journey',
      desc: 'Struggling to stay consistent? Practical psychological tips to maintain your workout discipline.',
      img: '/images/post-4.jpg',
      date: 'May 26, 2025',
    },
  ];

  const openModal = (contextTitle?: string, defaultInterest?: string) => {
    setModalContext(contextTitle || 'General Enquiry');
    if (defaultInterest) {
      setFormData((prev) => ({ ...prev, interest: defaultInterest }));
    }
    setModalOpen(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: formData.interest,
      date: formData.date,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('fitwell_leads') || '[]');
      existing.push(newLead);
      localStorage.setItem('fitwell_leads', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: 'Monthly Pass (₹1500/mo)',
        date: '',
        notes: '',
      });
    }, 2400);
  };

  // Chat functions handled by ChatWidget component

  const openImageLightbox = (src: string, caption: string) => {
    setLightboxSrc(src);
    setLightboxCaption(caption);
    setLightboxOpen(true);
  };

  return (
    <main id="fitwell-root" className="min-h-screen bg-[#050505] text-[#FFFFFF] relative overflow-x-hidden">
      {/* 00. PRELOADER */}
      {loading && (
        <div
          id="preloader"
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-500"
        >
          <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-transparent border-t-[#6EFF8F] rounded-none animate-spin"></div>
            <img src="/images/logo.png" alt="THE FITNESS JUNCTION" className="w-14 h-14 object-contain" />
          </div>
          <p className="font-['Rajdhani'] font-bold tracking-widest text-[#6EFF8F] text-sm uppercase">
            Loading THE FITNESS JUNCTION...
          </p>
        </div>
      )}

      {/* 01. UNIFIED STICKY HEADER */}
      <Navbar onOpenModal={(ctx) => openModal(ctx || 'Claim Your THE FITNESS JUNCTION Membership')} />

      {/* 02. HERO SECTION WITH SLIDER */}
      {/* 02. HERO SECTION WITH SLIDER - SPLIT SCREEN */}
      <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Slide Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(23, 30, 46, 0.94) 25%, rgba(23, 30, 46, 0.72) 65%, rgba(23, 30, 46, 0.4) 100%), url(${slide.bgImage})`,
              }}
            />
          </div>
        ))}

        {/* Hero Decorative Background Shape */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'url(/images/hero-bg-shape.png)', backgroundSize: 'cover' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Slide Subtitle Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white/10 border border-white/15 text-[#6EFF8F] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-none bg-[#6EFF8F] animate-pulse" />
                {heroSlides[currentSlide].tagline}
              </div>

              {/* Main Animated Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none">
                {heroSlides[currentSlide].title1}
                <span className="text-[#6EFF8F] underline decoration-[#6EFF8F]/40 decoration-4">
                  {heroSlides[currentSlide].highlight}
                </span>
                {heroSlides[currentSlide].title2}
              </h1>

              {/* Description */}
              <p className="text-[#A3A3A3] text-base sm:text-lg max-w-2xl leading-relaxed">
                {heroSlides[currentSlide].desc}
              </p>

              {/* Hero Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-lg">
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#6EFF8F]">4.8 ★</h3>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] uppercase tracking-wider">Rating (278+ Reviews)</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#6EFF8F]">2020</h3>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] uppercase tracking-wider">Established In</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#6EFF8F]">100%</h3>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] uppercase tracking-wider">Unisex Facility</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-get-started-cta"
                  onClick={() => openModal('Claim Your Free Gym Trial')}
                  className="bg-[#6EFF8F] hover:bg-[#c4e600] text-[#050505] font-bold text-base px-8 py-4 rounded-none transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#6EFF8F]/25 flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
                <a
                  href="#about-section"
                  className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-base px-8 py-4 rounded-none transition-all duration-300"
                >
                  Explore More
                </a>
              </div>
            </div>

            {/* Slider Navigation Dots on Right / Bottom */}
            <div className="lg:col-span-4 flex lg:flex-col justify-end items-center gap-3 pt-6 lg:pt-0">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-3.5 h-3.5 rounded-none transition-all duration-300 ${currentSlide === 0 ? 'bg-[#6EFF8F] scale-125' : 'bg-white/30 hover:bg-white/60'
                  }`}
                aria-label="Slide 1"
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-3.5 h-3.5 rounded-none transition-all duration-300 ${currentSlide === 1 ? 'bg-[#6EFF8F] scale-125' : 'bg-white/30 hover:bg-white/60'
                  }`}
                aria-label="Slide 2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03. SCROLLING TICKER MARQUEE */}
      <div id="scrolling-ticker" className="bg-[#111111] border-y border-white/10 py-4 overflow-hidden relative">
        <div className="scrolling-ticker-track flex items-center gap-8 whitespace-nowrap text-sm sm:text-base font-bold uppercase tracking-widest text-white">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5 text-[#6EFF8F]" />
                personal trainers
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                live classes
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                outdoor & online trainers
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                body building
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                strength conditioning
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                cardio endurance
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                yoga & flexibility
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                healthy nutritions
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 04. ABOUT US SECTION */}
      <section id="about-section" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 3 Layered Images */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Image */}
                <div
                  className="rounded-none overflow-hidden border border-white/10 shadow-2xl relative cursor-pointer group"
                  onClick={() => openImageLightbox('/images/real/5.jpg', 'THE FITNESS JUNCTION Floor')}
                >
                  <img
                    src="/images/real/5.jpg"
                    alt="THE FITNESS JUNCTION Members & Training"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white text-sm font-semibold flex items-center gap-2">
                      <i className="bi bi-zoom-in text-[#6EFF8F]"></i> Click to inspect
                    </span>
                  </div>
                </div>

                {/* Sub Image 2 - Floating Bottom Left */}
                <div
                  className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 rounded-none overflow-hidden border-2 border-[#6EFF8F]/50 shadow-2xl z-10 cursor-pointer hidden sm:block"
                  onClick={() => openImageLightbox('/images/real/6.jpg', 'THE FITNESS JUNCTION Strength Machines')}
                >
                  <img
                    src="/images/real/6.jpg"
                    alt="THE FITNESS JUNCTION Strength Equipment"
                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Sub Image 3 - Floating Top Right */}
                <div
                  className="absolute -top-6 -right-6 sm:-right-8 w-36 sm:w-48 rounded-none overflow-hidden border-2 border-white/20 shadow-2xl z-10 cursor-pointer hidden sm:block"
                  onClick={() => openImageLightbox('/images/real/7.jpg', 'THE FITNESS JUNCTION Free Weights')}
                >
                  <img
                    src="/images/real/7.jpg"
                    alt="THE FITNESS JUNCTION Free Weights"
                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: About Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">About Us</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  Empowering you to achieve <span className="text-[#6EFF8F]">your fitness</span> goals
                </h2>
                <p className="text-[#A3A3A3] text-base leading-relaxed pt-2">
                  We believe fitness is more than just a workout—it&apos;s a lifestyle. With top-of-the-line facilities,
                  certified trainers, and a supportive community, we&apos;re here to inspire and guide you every step of the
                  way.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/40 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] text-xl mb-3">
                    <i className="bi bi-person-check"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">Personal Trainer</h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Achieve your fitness goals with the dedicated guidance of our certified coaches.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/40 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] text-xl mb-3">
                    <i className="bi bi-heart-pulse"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">Cardio Programs</h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    From steady-state endurance to high-intensity sprints on elite treadmills.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/40 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] text-xl mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">Quality Equipment</h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Our gym is fully equipped with calibrated plates, machines, and dumbells up to 150 lbs.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/40 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[#6EFF8F]/10 flex items-center justify-center text-[#6EFF8F] text-xl mb-3">
                    <i className="bi bi-cup-hot"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">Healthy Nutritions</h3>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Fuel your fitness journey with customized macronutrient and meal plans.
                  </p>
                </div>
              </div>

              {/* About Button */}
              <div className="pt-2">
                <button
                  id="about-learn-more-btn"
                  onClick={() => openModal('Book a Free Gym Consultation', 'Personal Trainer Consultation')}
                  className="inline-flex items-center gap-2 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#050505] font-bold text-sm px-8 py-4 rounded-none transition-all duration-300 transform hover:scale-105"
                >
                  <span>More About Us</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OUR TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">4.8 ⭐ Google Rating | 278+ Reviews</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Loved by 278+ Members on <span className="text-[#6EFF8F]">Google</span>
            </h2>
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-[#050505] rounded-none p-8 sm:p-10 border-t-2 border-[#6EFF8F] shadow-2xl relative text-left flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-[#6EFF8F]/10 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                  </svg>
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1.5 text-[#6EFF8F] text-sm mb-6">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed mb-8 relative z-10 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div
                    className="w-14 h-14 rounded-none overflow-hidden border border-[#6EFF8F] cursor-pointer shrink-0"
                    onClick={() => openImageLightbox(testimonial.img, testimonial.name)}
                  >
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">{testimonial.name}</h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 05. OUR SERVICES SECTION */}
      <section id="services-section" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">Fitness Classes</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Transform Your Body with Our <span className="text-[#6EFF8F]">Dynamic Fitness</span> Classes
            </h2>
            <p className="text-[#A3A3A3] text-base">
              Explore our comprehensive programs tailored for beginners, competitive athletes, and everyone in between.
            </p>
          </div>

          {/* Service Cards Slider */}
          <div className="relative">
            <style>{`
              #services-slider::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              id="services-slider"
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] snap-center shrink-0 bg-[#050505] rounded-none border border-white/10 overflow-hidden group hover:border-[#6EFF8F] transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  {/* Image */}
                  <div
                    className="relative h-56 overflow-hidden cursor-pointer"
                    onClick={() => openImageLightbox(svc.img, svc.title)}
                  >
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded-none text-xs font-semibold text-[#6EFF8F] border border-[#6EFF8F]/30">
                      {svc.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase group-hover:text-[#6EFF8F] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-sm text-[#A3A3A3] mt-2 line-clamp-3">{svc.desc}</p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => openModal(`Enquire: ${svc.title}`, svc.title)}
                        className="text-[#6EFF8F] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <span>Read More</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                      <span className="text-xs text-gray-500 font-mono">0{svc.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => {
                  const slider = document.getElementById('services-slider');
                  if (slider) slider.scrollBy({ left: -320, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-none border border-white/20 hover:border-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-black text-white flex items-center justify-center transition-all"
                aria-label="Previous class"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                onClick={() => {
                  const slider = document.getElementById('services-slider');
                  if (slider) slider.scrollBy({ left: 320, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-none border border-white/20 hover:border-[#6EFF8F] hover:bg-[#6EFF8F] hover:text-black text-white flex items-center justify-center transition-all"
                aria-label="Next class"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Section Footer Callout */}
          <div className="mt-12 text-center text-sm text-[#A3A3A3]">
            <p>
              Expert guidance for your fitness journey.{' '}
              <button
                onClick={() => openModal('Claim Your 7-Day Free Pass')}
                className="text-[#6EFF8F] hover:underline font-bold"
              >
                Join us today and start transforming!
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* 06. WHY CHOOSE US SECTION */}
      <section id="why-choose-section" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Why Choose Content & Steps */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">Why Choose Us</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mt-2">
                  Elevate fitness with the <span className="text-[#6EFF8F]">best way</span> possible
                </h2>
                <p className="text-[#A3A3A3] text-base mt-4 leading-relaxed">
                  We offer a fitness journey that&apos;s tailored to your goals, supported by professional trainers and a
                  welcoming community. Whether it&apos;s weight loss, strength building, or overall wellness, our proven
                  methods deliver results.
                </p>
              </div>

              {/* Steps 01, 02, 03 */}
              <div className="space-y-6">
                <div className="flex items-start gap-5 p-5 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/50 transition-colors">
                  <span className="text-3xl font-extrabold text-[#6EFF8F] font-['Rajdhani'] leading-none">01</span>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">Personalized Fitness Plans</h3>
                    <p className="text-sm text-[#A3A3A3] mt-1">
                      We tailor every workout to fit your unique goals and fitness level, ensuring you make the most
                      measurable progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/50 transition-colors">
                  <span className="text-3xl font-extrabold text-[#6EFF8F] font-['Rajdhani'] leading-none">02</span>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">Results-Driven Focus</h3>
                    <p className="text-sm text-[#A3A3A3] mt-1">
                      Everything we do is designed to help you achieve tangible physical results, whether you&apos;re aiming for
                      weight loss or hypertrophy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-none bg-[#111111] border border-white/10 hover:border-[#6EFF8F]/50 transition-colors">
                  <span className="text-3xl font-extrabold text-[#6EFF8F] font-['Rajdhani'] leading-none">03</span>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">State-of-the-Art Equipment</h3>
                    <p className="text-sm text-[#A3A3A3] mt-1">
                      We provide the latest in gym equipment, from premium cardio machines to free weights, supporting
                      every style of training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4-Photo Collage + Rotating Contact Circle */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-none overflow-hidden border border-white/10 cursor-pointer group"
                  onClick={() => openImageLightbox('/images/real/1.jpg', 'THE FITNESS JUNCTION Training Ground')}
                >
                  <img
                    src="/images/real/1.jpg"
                    alt="THE FITNESS JUNCTION Facility"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div
                  className="rounded-none overflow-hidden border border-white/10 cursor-pointer group mt-6"
                  onClick={() => openImageLightbox('/images/real/2.jpg', 'Free Weight & Strength Area')}
                >
                  <img
                    src="/images/real/2.jpg"
                    alt="Workout Equipment"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div
                  className="rounded-none overflow-hidden border border-white/10 cursor-pointer group"
                  onClick={() => openImageLightbox('/images/real/3.jpg', 'Cardio & Conditioning Floor')}
                >
                  <img
                    src="/images/real/3.jpg"
                    alt="Gym Equipment"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div
                  className="rounded-none overflow-hidden border border-white/10 cursor-pointer group mt-6"
                  onClick={() => openImageLightbox('/images/real/4.jpg', 'Training & Functional Area')}
                >
                  <img
                    src="/images/real/4.jpg"
                    alt="THE FITNESS JUNCTION Training Area"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Rotating Contact Circle Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <button
                  onClick={() => openModal('Contact Fitwell 24/7 Support')}
                  className="relative group block rounded-none"
                  aria-label="Contact Us Circle"
                >
                  <img
                    src="/images/contact-us-circle.svg"
                    alt="Contact Fitwell"
                    className="w-28 h-28 sm:w-36 sm:h-36 animate-spin-slow transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-none bg-[#6EFF8F] flex items-center justify-center text-[#050505] text-xl shadow-lg">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* 08. OUR TRAINERS SECTION */}
      <section id="trainers-section" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">Our Trainers</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Your Fitness Journey Starts with <span className="text-[#6EFF8F]">Our Expert</span> Trainers
            </h2>
            <p className="text-[#A3A3A3] text-base">
              Certified professionals dedicated to your technique, mental stamina, and physical transformation.
            </p>
          </div>

          {/* Trainers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((coach, idx) => (
              <div
                key={idx}
                className="bg-[#111111] rounded-none border border-white/10 overflow-hidden group hover:border-[#6EFF8F] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Photo */}
                <div
                  className="relative h-72 overflow-hidden cursor-pointer"
                  onClick={() => openImageLightbox(coach.img, `${coach.name} - ${coach.role}`)}
                >
                  <img
                    src={coach.img}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded-none text-xs font-semibold text-[#6EFF8F] border border-white/10">
                    {coach.specialty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center -mt-6 relative z-10">
                  <p className="text-xs uppercase tracking-widest text-[#6EFF8F] font-semibold">{coach.role}</p>
                  <h3 className="text-xl font-bold text-white uppercase mt-1">{coach.name}</h3>

                  {/* Social links */}
                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10 text-[#A3A3A3]">
                    <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Dribbble">
                      <i className="fa-brands fa-dribbble"></i>
                    </a>
                  </div>

                  <button
                    onClick={() => openModal(`Book Coach: ${coach.name}`, `Personal Session with ${coach.name}`)}
                    className="mt-4 w-full py-2.5 bg-white/10 hover:bg-[#6EFF8F] hover:text-[#050505] text-white text-xs font-bold rounded-none uppercase tracking-wider transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* 07. OUR PRICING SECTION */}
      <section id="pricing-section" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">Pricing Plan</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Affordable Plans Tailored To <span className="text-[#6EFF8F]">Your Needs</span>
            </h2>
            <p className="text-[#A3A3A3] text-base">
              Transparent, flexible memberships designed to get you the best value for your health investment.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-none p-8 flex flex-col justify-between transition-all duration-300 relative ${plan.highlighted
                    ? 'bg-[#050505] border-2 border-[#6EFF8F] shadow-2xl shadow-[#6EFF8F]/10 transform md:-translate-y-3'
                    : 'bg-[#050505] border border-white/10 hover:border-white/20 shadow-xl'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#6EFF8F] text-[#050505] font-bold text-xs px-4 py-1.5 rounded-none uppercase tracking-widest shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="pb-6 border-b border-white/10">
                    <h3 className="text-lg font-semibold uppercase text-[#A3A3A3] tracking-wider">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-5xl font-black text-white font-['Rajdhani']">{plan.price}</span>
                      <span className="text-[#A3A3A3] text-sm font-medium">{plan.unit}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 py-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm text-[#A3A3A3]">
                        <i className="bi bi-check-circle-fill text-[#6EFF8F] text-base"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openModal(`Get Membership: ${plan.name}`, `${plan.name} (${plan.price}${plan.unit})`)}
                  className={`w-full py-4 rounded-none font-bold text-sm uppercase tracking-wider transition-all duration-300 ${plan.highlighted
                      ? 'bg-[#6EFF8F] hover:bg-[#c4e600] text-[#050505] shadow-lg shadow-[#6EFF8F]/20'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                  Get Membership
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Benefit Badges */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 text-[#A3A3A3] text-sm font-medium">
              <img src="/images/icon-pricing-benefit-1.svg" alt="Trial" className="w-6 h-6" />
              <span>Get 30 day free trial included</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-[#A3A3A3] text-sm font-medium">
              <img src="/images/icon-pricing-benefit-2.svg" alt="No fees" className="w-6 h-6" />
              <span>No hidden setup fees or charges</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-[#A3A3A3] text-sm font-medium">
              <img src="/images/icon-pricing-benefit-3.svg" alt="Cancel" className="w-6 h-6" />
              <span>You can cancel anytime with 1-click</span>
            </div>
          </div>
        </div>
      </section>



      {/* 09. OUR FAQS SECTION */}
      <section id="faqs-section" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left FAQ Images */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div
                  className="rounded-none overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
                  onClick={() => openImageLightbox('/images/faq-img-1.jpg', 'Fitwell Training Atmosphere')}
                >
                  <img
                    src="/images/faq-img-1.jpg"
                    alt="Fitwell gym coaching"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div
                  className="absolute -bottom-8 -right-6 w-48 rounded-none overflow-hidden border-2 border-[#6EFF8F] shadow-2xl cursor-pointer hidden sm:block"
                  onClick={() => openImageLightbox('/images/faq-img-2.jpg', 'Fitwell Member Motivation')}
                >
                  <img
                    src="/images/faq-img-2.jpg"
                    alt="Fitwell athlete"
                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right FAQ Accordion */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">FAQs</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mt-2">
                  Frequently Asked <span className="text-[#6EFF8F]">Questions</span>
                </h2>
                <p className="text-[#A3A3A3] text-base mt-2">
                  Everything you need to know about joining Fitwell, membership tiers, and facility policies.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-none border border-white/10 bg-[#050505] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-[#6EFF8F] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#6EFF8F] text-lg font-mono">
                        {activeFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {activeFaq === idx && (
                      <div className="px-5 pb-5 text-sm text-[#A3A3A3] leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* 11. OUR BLOG SECTION */}
      <section id="blog-section" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[#6EFF8F] text-sm font-bold uppercase tracking-widest">Latest Post</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Stay Informed with <span className="text-[#6EFF8F]">Our Latest</span> Articles
            </h2>
            <p className="text-[#A3A3A3] text-base">
              Explore evidence-backed advice, workout routines, and nutritionist tips from our coaches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Left Post (post-1.jpg) */}
            <div className="lg:col-span-6 bg-[#050505] rounded-none border border-white/10 overflow-hidden group shadow-xl">
              <div
                className="relative h-72 sm:h-96 overflow-hidden cursor-pointer"
                onClick={() => openImageLightbox(blogPosts[0].img, blogPosts[0].title)}
              >
                <img
                  src={blogPosts[0].img}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#6EFF8F] text-[#050505] font-bold text-xs px-3 py-1 rounded-none uppercase tracking-wider">
                  Featured Insight
                </div>
              </div>
              <div className="p-8 space-y-4">
                <span className="text-xs text-[#A3A3A3]">{blogPosts[0].date}</span>
                <h3 className="text-2xl font-bold text-white uppercase group-hover:text-[#6EFF8F] transition-colors leading-tight">
                  {blogPosts[0].title}
                </h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{blogPosts[0].desc}</p>
                <button
                  onClick={() => openModal(`Read Article: ${blogPosts[0].title}`, blogPosts[0].title)}
                  className="inline-flex items-center gap-2 text-[#6EFF8F] hover:text-white font-bold text-sm uppercase tracking-wider transition-colors pt-2"
                >
                  <span>Learn More</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Right 3 Stacked Posts */}
            <div className="lg:col-span-6 space-y-4">
              {blogPosts.slice(1).map((post) => (
                <div
                  key={post.id}
                  className="bg-[#050505] rounded-none border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center group hover:border-[#6EFF8F]/50 transition-colors shadow-lg"
                >
                  <div
                    className="w-full sm:w-44 h-36 shrink-0 rounded-none overflow-hidden cursor-pointer"
                    onClick={() => openImageLightbox(post.img, post.title)}
                  >
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-xs text-[#A3A3A3]">{post.date}</span>
                    <h4 className="text-lg font-bold text-white uppercase group-hover:text-[#6EFF8F] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#A3A3A3] line-clamp-2">{post.desc}</p>
                    <button
                      onClick={() => openModal(`Read Article: ${post.title}`, post.title)}
                      className="inline-flex items-center gap-1 text-[#6EFF8F] hover:text-white font-semibold text-xs uppercase tracking-wider pt-1"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA BOX SECTION */}
      <section id="cta-section" className="py-20 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-none border border-white/10 p-8 sm:p-14 relative overflow-hidden shadow-2xl"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(23, 30, 46, 0.95) 0%, rgba(23, 30, 46, 0.85) 60%, rgba(23, 30, 46, 0.6) 100%), url(/images/cta-box-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Athlete cutout */}
              <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
                <img
                  src="/images/cta-box-image.png"
                  alt="Fitwell Athlete"
                  className="max-h-80 sm:max-h-96 w-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Offer and CTA */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <span className="inline-block bg-[#6EFF8F] text-[#050505] font-bold text-xs px-4 py-1.5 rounded-none uppercase tracking-widest">
                  Limited Time Promotion
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  Get <span className="text-[#6EFF8F]">30% Off</span> Your First 3 Months
                </h2>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex items-center gap-3">
                    <i className="bi bi-check-circle-fill text-[#6EFF8F] text-base"></i>
                    <span>Unlimited Access to All Gym Facilities & Sauna</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="bi bi-check-circle-fill text-[#6EFF8F] text-base"></i>
                    <span>Book a Complimentary 1-on-1 Personal Training Session</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="bi bi-check-circle-fill text-[#6EFF8F] text-base"></i>
                    <span>Experience World-Class Calibrated Strength Equipment</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <button
                    id="cta-box-get-membership"
                    onClick={() => openModal('Claim 30% Off Promotion', '30% Off Promotional Membership')}
                    className="bg-[#6EFF8F] hover:bg-[#c4e600] text-[#050505] font-bold text-sm px-8 py-4 rounded-none transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#6EFF8F]/25 uppercase tracking-wider"
                  >
                    Get Membership
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SECOND SCROLLING TICKER */}
      <div className="bg-[#111111] border-y border-white/10 py-4 overflow-hidden relative">
        <div className="scrolling-ticker-track flex items-center gap-8 whitespace-nowrap text-sm sm:text-base font-bold uppercase tracking-widest text-white">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5 text-[#6EFF8F]" />
                personal trainers
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                live classes
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                outdoor & online trainers
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                personal training
              </span>
              <span className="flex items-center gap-3">
                <img src="/images/star-icon.svg" alt="*" className="w-5 h-5" />
                cardio fitness
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 14. FOOTER MAIN */}
      <footer id="footer-section" className="bg-[#050505] pt-20 pb-12 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Col 1: Logo & Newsletter (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="THE FITNESS JUNCTION" className="h-11 w-auto object-contain" />
              </div>
              <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-sm">
                Unisex Gym & Fitness Centre in Barasat, Kolkata operating since 2020. Gym, CrossFit, personal training, and diet counselling.
              </p>

              {/* Newsletter Form */}
              <div className="pt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) {
                      setNewsletterSubscribed(true);
                      setTimeout(() => setNewsletterSubscribed(false), 3000);
                      setNewsletterEmail('');
                    }
                  }}
                  className="relative max-w-sm"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pr-12 rounded-none bg-[#111111] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-none bg-[#6EFF8F] flex items-center justify-center text-[#050505] hover:bg-[#c4e600] transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <img src="/images/arrow-black.svg" alt="Submit" className="w-4 h-4" />
                  </button>
                </form>
                {newsletterSubscribed && (
                  <p className="text-xs text-[#6EFF8F] mt-2">✓ Thank you for subscribing to THE FITNESS JUNCTION updates!</p>
                )}
              </div>
            </div>

            {/* Col 2: Contact Us (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg font-bold uppercase text-white tracking-wider">Contact Us</h3>
              <div className="space-y-4 text-sm text-[#A3A3A3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-[#111111] flex items-center justify-center text-[#6EFF8F] shrink-0 border border-white/10">
                    <img src="/images/icon-phone.svg" alt="Phone" className="w-4 h-4" />
                  </div>
                  <a href="tel:+919681125006" className="hover:text-[#6EFF8F] transition-colors">
                    +91 96811 25006
                  </a>
                </div>
              </div>
            </div>

            {/* Col 3: Gym Timing (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg font-bold uppercase text-white tracking-wider">Gym Timings</h3>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li>All 7 Days : 06:30 AM - 10:30 PM</li>
                <li className="text-xs text-[#6EFF8F] font-semibold pt-1">Unisex Gym & CrossFit Sessions</li>
              </ul>
            </div>

            {/* Col 4: Our Location (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold uppercase text-white tracking-wider">Our Location</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Monorama Ultrascan Pvt. Ltd., C.B. Road, beside Monorama Ultrascan, Lalpur, Barasat, West Bengal 741222
              </p>
            </div>
          </div>

          {/* Copyright Bar + Non-Negotiable Footer Credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
            <div>
              <p>
                Copyright © {new Date().getFullYear()} THE FITNESS JUNCTION Barasat. All Rights Reserved.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-[#A3A3A3] text-sm">
              <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-[#6EFF8F] transition-colors" aria-label="Dribbble">
                <i className="fa-brands fa-dribbble"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 15. UNIVERSAL LEAD CAPTURE MODAL */}
      {modalOpen && (
        <div
          id="universal-lead-modal"
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#111111] border border-white/15 rounded-none max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#A3A3A3] hover:text-white text-xl p-1"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-2 font-['Rajdhani']">
              {modalContext}
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mb-6">
              Complete your details below and our head fitness coach will contact you within 24 hours.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#A3A3A3] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-[#050505] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#A3A3A3] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-[#050505] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#A3A3A3] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-[#050505] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#A3A3A3] mb-1">Program of Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-[#050505] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                >
                  <option value="Monthly Pass (₹1500/mo)">Monthly Pass (₹1500/mo)</option>
                  <option value="Weekly Pass (₹500/wk)">Weekly Pass (₹500/wk)</option>
                  <option value="Yearly VIP Pass (₹15000/yr)">Yearly VIP Pass (₹15000/yr)</option>
                  <option value="Personal Training Coaching">Personal Training Coaching</option>
                  <option value="Group Workout Class">Group Workout Class</option>
                  <option value="Muscle Building Program">Muscle Building Program</option>
                  <option value="Nutrition Consultation">Nutrition Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#A3A3A3] mb-1">Goals or Questions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Weight loss, hypertrophy, schedule preference..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-[#050505] border border-white/15 text-white text-sm focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#6EFF8F] hover:bg-[#c4e600] text-[#050505] font-bold rounded-none uppercase tracking-wider text-sm transition-transform duration-200 active:scale-95 shadow-lg shadow-[#6EFF8F]/20"
              >
                Confirm & Submit Request
              </button>

              {formSubmitted && (
                <div className="p-3 rounded-none bg-[#6EFF8F]/15 border border-[#6EFF8F] text-[#6EFF8F] text-center text-xs font-semibold animate-fade-in">
                  🎉 Thank you! Your request has been registered. Our head trainer will contact you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 16. FLOATING CHAT WIDGET */}
      <ChatWidget onOpenModal={openModal} />

      {/* 17. SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          id="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 w-11 h-11 rounded-none bg-white/10 hover:bg-[#6EFF8F] hover:text-[#050505] text-white flex items-center justify-center text-lg border border-white/20 shadow-xl transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}

      {/* 18. IMAGE LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#6EFF8F] text-2xl p-1"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <img
              src={lightboxSrc}
              alt={lightboxCaption}
              className="max-h-[80vh] w-auto rounded-none border border-white/20 shadow-2xl object-contain"
            />
            {lightboxCaption && (
              <p className="mt-3 text-sm text-[#A3A3A3] font-medium tracking-wide">{lightboxCaption}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
