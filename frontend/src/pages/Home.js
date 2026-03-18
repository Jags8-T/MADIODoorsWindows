import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Wind, Palette, Zap, BookOpen, ArrowRight } from 'lucide-react';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1660949329162-d1571fc55d02?auto=format&fit=crop&w=1920&q=80';

const FEATURES = [
  { icon: Wind,    label: 'Sound Insulation',   desc: 'Precision-sealed profiles for acoustic comfort' },
  { icon: Zap,     label: 'Impact Resistance',  desc: 'Alloy 6063 aluminium for structural strength' },
  { icon: Palette, label: 'Colour Choice',      desc: 'Powder coat finishes in any RAL colour' },
  { icon: Shield,  label: '12–15 Yr Warranty',  desc: 'Industry-leading guarantee on all products' },
];

const CATEGORIES = [
  {
    id: 'sliding',
    label: 'Sliding & Folding',
    subtitle: '7 Systems',
    desc: 'From compact 29mm to heavy-duty 40mm — seamless large-format openings.',
    image: 'https://images.unsplash.com/photo-1660949329162-d1571fc55d02?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'casement',
    label: 'Casement Windows',
    subtitle: '2 Systems',
    desc: 'Classic outward-opening windows with precision 45° joints and superior sealing.',
    image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'partition',
    label: 'Glass Partitions',
    subtitle: '8 Systems',
    desc: 'Single & double glass partitions from ultra-slim 16x25mm to grand 100mm profiles.',
    image: 'https://images.unsplash.com/photo-1770048532712-4fde5ef7eb90?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    subtitle: 'Collection',
    desc: 'Premium locks, handles and rollers engineered for longevity and smooth operation.',
    image: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1e?auto=format&fit=crop&w=700&q=80',
  },
];

const STATS = [
  { value: '18+',  label: 'Product Systems' },
  { value: '15',   label: 'Years Max Warranty' },
  { value: '6063', label: 'Alloy Standard' },
  { value: '4800', label: 'Max Height (MM)' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function Home() {
  const [featRef, featInView]     = useInView();
  const [catRef,  catInView]      = useInView();
  const [statRef, statInView]     = useInView();

  return (
    <main data-testid="home-page" className="bg-[#050505]">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section data-testid="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Luxury architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505]" />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden lg:block" />
        <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden lg:block" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p className="section-label mb-6 animate-fade-up">
            Premium Aluminium Solutions — Hyderabad, India
          </p>

          {/* Logo large */}
          <div className="flex justify-center mb-8 animate-fade-up stagger-1">
            <img src={LOGO} alt="Madio Doors & Windows" className="h-24 md:h-32 w-auto" />
          </div>

          {/* Tagline */}
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-none mb-4 animate-fade-up stagger-2">
            Architectural Precision.
            <br />
            <span className="gold-gradient">Timeless Luxury.</span>
          </h1>

          <p className="text-[#A3A3A3] text-base md:text-lg max-w-xl mx-auto mb-10 font-manrope leading-relaxed animate-fade-up stagger-3">
            Precision-engineered aluminium windows, doors and glass partitions — crafted for spaces that demand excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-4">
            <Link to="/catalogue" data-testid="hero-explore-btn" className="btn-gold">
              Explore Catalogue
              <ChevronRight size={16} />
            </Link>
            <Link to="/print" data-testid="hero-download-btn" className="btn-outline-gold">
              <BookOpen size={15} />
              Download PDF
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-[#555] font-manrope tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
        </div>
      </section>

      {/* ── FEATURES STRIP ────────────────────────────────────────────────── */}
      <section
        ref={featRef}
        data-testid="features-section"
        className="border-y border-[var(--dark-border)] bg-[#080808]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, label, desc }, i) => (
            <div
              key={i}
              className={`flex flex-col gap-3 ${featInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--dark-border)] bg-[#0d0d0d]">
                <Icon size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-manrope">{label}</p>
                <p className="text-xs text-[#A3A3A3] font-manrope mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ────────────────────────────────────────────── */}
      <section ref={catRef} data-testid="categories-section" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className={`mb-14 ${catInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="section-label mb-3">Our Range</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">
            Product <span className="text-gold">Categories</span>
          </h2>
          <span className="gold-line mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalogue?category=${cat.id}`}
              data-testid={`category-card-${cat.id}`}
              className={`relative group overflow-hidden aspect-[16/9] block ${catInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.12}s`, borderRadius: '2px' }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/40 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="section-label mb-1">{cat.subtitle}</p>
                <h3 className="font-playfair text-xl md:text-2xl text-white mb-2">{cat.label}</h3>
                <p className="text-xs text-[#A3A3A3] font-manrope leading-relaxed mb-4">{cat.desc}</p>
                <span className="flex items-center gap-2 text-xs text-gold font-manrope tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                  Browse Products <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section ref={statRef} data-testid="stats-section" className="border-y border-[var(--dark-border)] bg-[#080808] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              className={`text-center ${statInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-playfair text-4xl md:text-5xl gold-gradient font-bold mb-2">{value}</p>
              <p className="text-xs text-[#A3A3A3] font-manrope tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section data-testid="cta-section" className="py-24 px-6 text-center max-w-3xl mx-auto">
        <p className="section-label mb-4">Ready to Elevate Your Space?</p>
        <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">
          Explore the Complete <span className="text-gold">Madio Collection</span>
        </h2>
        <p className="text-[#A3A3A3] text-sm font-manrope mb-10 leading-relaxed">
          Browse all 18+ product systems — from ultra-slim sliding profiles to grand glass partitions — with full technical specifications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/catalogue" data-testid="cta-catalogue-btn" className="btn-gold">
            View All Products
            <ChevronRight size={16} />
          </Link>
          <Link to="/contact" data-testid="cta-contact-btn" className="btn-outline-gold">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
