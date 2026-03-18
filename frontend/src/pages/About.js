import React, { useRef } from 'react';
import { Shield, Users, Target, Eye, Award, Cpu } from 'lucide-react';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const VALUES = [
  { icon: Shield, title: 'Uncompromising Quality',  desc: 'Every profile is manufactured to the highest tolerance using aerospace-grade 6063 aluminium alloy.' },
  { icon: Cpu,    title: 'Technical Excellence',    desc: 'Our engineering team brings decades of precision manufacturing experience to every product line.' },
  { icon: Award,  title: 'Warranty Backed',         desc: 'Up to 15 years warranty on glass partitions and 12 years on all window systems — our promise to you.' },
  { icon: Users,  title: 'Customer First',          desc: 'From specification to installation, we partner with architects, designers, and builders every step of the way.' },
];

export default function About() {
  return (
    <main data-testid="about-page" className="bg-[#050505] pt-20">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#080808] border-b border-[var(--dark-border)] py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">About Us</p>
            <h1 className="font-playfair text-4xl md:text-5xl text-white mb-6 leading-tight">
              Crafting Spaces with<br />
              <span className="text-gold">Precision & Elegance</span>
            </h1>
            <span className="gold-line mb-6" />
            <p className="text-[#A3A3A3] font-manrope text-base leading-relaxed mb-6">
              Madio Doors & Windows is a premium aluminium solutions brand specialising in designing and supplying high-quality modular windows, doors, and glass partition systems.
            </p>
            <p className="text-[#A3A3A3] font-manrope text-base leading-relaxed">
              We deliver products that blend durability with modern design — serving residential, commercial, and industrial projects with the same dedication to detail.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80"
              alt="Modern architecture"
              className="w-full aspect-[4/3] object-cover"
              style={{ borderRadius: '2px' }}
            />
            <div className="absolute inset-0 border border-[var(--dark-border)]" style={{ borderRadius: '2px' }} />
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div data-testid="mission-card" className="card-dark p-10">
            <div className="flex items-center gap-3 mb-6">
              <Target size={20} className="text-gold" />
              <h2 className="font-playfair text-2xl text-white">Our Mission</h2>
            </div>
            <span className="gold-line mb-6" />
            <p className="text-[#A3A3A3] font-manrope text-base leading-relaxed">
              To make high-quality aluminium window profiles and glass partition solutions accessible to homes, offices, and industries — expanding our reach across India while upholding our standards of precision engineering.
            </p>
          </div>
          <div data-testid="vision-card" className="card-dark p-10">
            <div className="flex items-center gap-3 mb-6">
              <Eye size={20} className="text-gold" />
              <h2 className="font-playfair text-2xl text-white">Our Vision</h2>
            </div>
            <span className="gold-line mb-6" />
            <p className="text-[#A3A3A3] font-manrope text-base leading-relaxed">
              To deliver best-in-class aluminium solutions that enrich and elevate the value of every living and working space — becoming the preferred partner for architects and builders who demand uncompromising quality.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--dark-border)] py-24 px-6 lg:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p className="section-label mb-3">Why Madio</p>
            <h2 className="font-playfair text-4xl text-white">
              Our <span className="text-gold">Core Values</span>
            </h2>
            <span className="gold-line-center mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} data-testid={`value-card-${i}`} className="card-dark p-8 flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--dark-border)]">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-playfair text-lg text-white">{title}</h3>
                <p className="text-sm text-[#A3A3A3] font-manrope leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT RANGE OVERVIEW ────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="section-label mb-3">What We Offer</p>
          <h2 className="font-playfair text-4xl text-white">
            Product <span className="text-gold">Range</span>
          </h2>
          <span className="gold-line mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--dark-border)]">
          {[
            { label: 'Sliding & Folding Windows', count: '7 Systems',   note: 'Heights up to 4800MM' },
            { label: 'Casement Windows',          count: '2 Systems',   note: 'For high-rise & coastal' },
            { label: 'Glass Partitions',           count: '8 Systems',   note: '82MM to 100MM profiles' },
            { label: 'Premium Hardware',           count: 'Collection',  note: 'Locks, handles & rollers' },
          ].map(({ label, count, note }, i) => (
            <div key={i} data-testid={`range-item-${i}`} className="bg-[#080808] p-8 hover:bg-[#0d0d0d] transition-colors duration-300">
              <p className="font-playfair text-2xl text-gold font-bold mb-1">{count}</p>
              <p className="text-sm text-white font-manrope font-medium mb-2">{label}</p>
              <p className="text-xs text-[#555] font-manrope">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
