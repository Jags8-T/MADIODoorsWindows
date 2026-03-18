import React from 'react';
import { X, Shield, Star, CheckCircle } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const badgeColors = {
    Signature: 'bg-gold/20 text-gold border-gold/40',
    Premium: 'bg-amber-900/30 text-amber-300 border-amber-600/40',
    'Most Popular': 'bg-blue-900/30 text-blue-300 border-blue-600/40',
    'Heavy Duty': 'bg-stone-900/30 text-stone-300 border-stone-600/40',
    New: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/40',
    'Best Seller': 'bg-gold/20 text-gold border-gold/40',
  };

  return (
    <div
      data-testid="product-modal-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        data-testid="product-modal"
        className="bg-[#111111] border border-[var(--dark-border)] w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-up relative"
        style={{ borderRadius: '2px' }}
      >
        {/* Close button */}
        <button
          data-testid="product-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#A3A3A3] hover:text-gold transition-colors duration-300 bg-black/40 p-2 rounded-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1660949329162-d1571fc55d02?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/20" />
            {/* Category label bottom */}
            <div className="absolute bottom-4 left-4">
              <span className="section-label bg-black/60 px-3 py-1 backdrop-blur-sm">
                {product.categoryLabel}
              </span>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-8 flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  {product.badge && (
                    <span className={`inline-block text-xs border px-2 py-0.5 mb-2 font-manrope tracking-wider uppercase ${badgeColors[product.badge] || 'bg-gold/20 text-gold border-gold/40'}`}>
                      {product.badge}
                    </span>
                  )}
                  <h2 data-testid="product-modal-name" className="font-playfair text-2xl md:text-3xl text-white leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-[#A3A3A3] text-sm mt-1 font-manrope">{product.subtitle}</p>
                </div>
              </div>
              <span className="gold-line" />
            </div>

            {/* Description */}
            <p className="text-[#A3A3A3] text-sm leading-relaxed font-manrope">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="section-label mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feat, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[var(--dark-border)] text-[#A3A3A3] font-manrope"
                    >
                      <CheckCircle size={10} className="text-gold" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h4 className="section-label mb-3">Technical Specifications</h4>
                <div className="border border-[var(--dark-border)]">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`spec-row flex items-center justify-between px-4 py-2.5 border-b border-[var(--dark-border)] last:border-b-0`}
                    >
                      <span className="text-xs text-[#A3A3A3] font-manrope">{spec.key}</span>
                      <span className="text-xs font-mono-md text-gold font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warranty note */}
            <div className="flex items-center gap-2 text-xs text-[#555] font-manrope border-t border-[var(--dark-border)] pt-4">
              <Shield size={12} className="text-gold" />
              {product.category === 'partition' ? '15 Years Warranty' : '12 Years Warranty'} — Madio Quality Assurance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
