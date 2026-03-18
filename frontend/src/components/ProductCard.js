import React from 'react';
import { Eye, CheckCircle } from 'lucide-react';

const badgeColors = {
  Signature: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40',
  Premium: 'bg-amber-900/30 text-amber-300 border-amber-600/40',
  'Most Popular': 'bg-blue-900/30 text-blue-300 border-blue-600/40',
  'Heavy Duty': 'bg-stone-900/30 text-stone-300 border-stone-600/40',
  New: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/40',
  'Best Seller': 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40',
};

export default function ProductCard({ product, onView }) {
  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="card-dark group flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onView(product)}
      style={{ borderRadius: '2px' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1660949329162-d1571fc55d02?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] border px-2 py-0.5 font-manrope tracking-wider uppercase ${badgeColors[product.badge] || 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'}`}>
            {product.badge}
          </span>
        )}

        {/* Category */}
        <span className="absolute bottom-3 left-3 section-label bg-black/50 px-2 py-0.5 backdrop-blur-sm text-[10px]">
          {product.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name */}
        <div>
          <h3 data-testid={`product-name-${product.id}`} className="font-playfair text-lg text-white leading-tight mb-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-[#A3A3A3] font-manrope">{product.subtitle}</p>
        </div>

        {/* Top 2 features */}
        {product.features && (
          <div className="flex flex-wrap gap-1.5">
            {product.features.slice(0, 2).map((f, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-[#A3A3A3] font-manrope border border-[var(--dark-border)] px-2 py-1">
                <CheckCircle size={8} className="text-gold" />
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Top spec */}
        {product.specs && product.specs[0] && (
          <div className="flex items-center justify-between py-2 border-t border-[var(--dark-border)]">
            <span className="text-[10px] text-[#555] font-manrope">{product.specs[0].key}</span>
            <span className="text-[11px] font-mono-md text-gold">{product.specs[0].value}</span>
          </div>
        )}

        {/* CTA */}
        <button
          data-testid={`product-view-btn-${product.id}`}
          className="mt-auto btn-outline-gold text-[10px] py-2 justify-center"
          onClick={(e) => { e.stopPropagation(); onView(product); }}
        >
          <Eye size={12} />
          View Specifications
        </button>
      </div>
    </article>
  );
}
