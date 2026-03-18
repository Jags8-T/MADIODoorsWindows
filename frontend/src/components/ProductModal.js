import React from 'react';
import { X, Shield, CheckCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919948601899';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const BADGE_COLORS = {
  Signature:     'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40',
  Premium:       'bg-amber-900/30 text-amber-300 border-amber-600/40',
  'Most Popular':'bg-blue-900/30 text-blue-300 border-blue-600/40',
  'Heavy Duty':  'bg-stone-900/30 text-stone-300 border-stone-600/40',
  New:           'bg-emerald-900/30 text-emerald-300 border-emerald-600/40',
  'Best Seller': 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40',
};

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const waText = encodeURIComponent(
    `Hi, I'm interested in ${product.name} – ${product.subtitle}. Could you please share more details and pricing?`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

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
        {/* Close */}
        <button
          data-testid="product-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#A3A3A3] hover:text-[#D4AF37] transition-colors duration-300 bg-black/40 p-2 rounded-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1758565811178-6341e9999f48?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/30" />
            <div className="absolute bottom-4 left-4">
              <span className="section-label bg-black/60 px-3 py-1 backdrop-blur-sm text-[10px]">
                {product.categoryLabel}
              </span>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-8 flex flex-col gap-5">
            {/* Header */}
            <div>
              {product.badge && (
                <span className={`inline-block text-[10px] border px-2 py-0.5 mb-2 font-manrope tracking-wider uppercase ${BADGE_COLORS[product.badge] || 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'}`}>
                  {product.badge}
                </span>
              )}
              <h2 data-testid="product-modal-name" className="font-playfair text-2xl md:text-3xl text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-[#A3A3A3] text-sm mt-1 font-manrope">{product.subtitle}</p>
              <span className="gold-line mt-3" />
            </div>

            {/* Description */}
            <p className="text-[#A3A3A3] text-sm leading-relaxed font-manrope">
              {product.description}
            </p>

            {/* Features */}
            {product.features?.length > 0 && (
              <div>
                <h4 className="section-label mb-2.5">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feat, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[var(--dark-border)] text-[#A3A3A3] font-manrope">
                      <CheckCircle size={10} className="text-[#D4AF37]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs */}
            {product.specs?.length > 0 && (
              <div>
                <h4 className="section-label mb-2.5">Technical Specifications</h4>
                <div className="border border-[var(--dark-border)]">
                  {product.specs.map((spec, i) => (
                    <div key={i} className={`spec-row flex items-center justify-between px-4 py-2.5 border-b border-[var(--dark-border)] last:border-b-0`}>
                      <span className="text-xs text-[#A3A3A3] font-manrope">{spec.key}</span>
                      <span className="text-xs font-mono-md text-[#D4AF37] font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warranty */}
            <div className="flex items-center gap-2 text-xs text-[#555] font-manrope border-t border-[var(--dark-border)] pt-3">
              <Shield size={12} className="text-[#D4AF37]" />
              {product.category === 'partition' ? '15 Years Warranty' : '12 Years Warranty'} — Madio Quality Assurance
            </div>

            {/* WhatsApp Enquiry Button */}
            <a
              data-testid="whatsapp-enquiry-btn"
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 font-manrope font-semibold text-sm text-white tracking-wide transition-opacity duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', borderRadius: '2px' }}
            >
              <WhatsAppIcon />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
