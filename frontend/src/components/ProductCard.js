import React from 'react';
import { Eye, CheckCircle } from 'lucide-react';

export default function ProductCard({ product, onView }) {
  const BADGE_STYLES = {
    Signature:     { background: 'rgba(212,175,55,0.15)', color: 'var(--th-accent)', border: '1px solid var(--th-accent)' },
    Premium:       { background: 'rgba(180,120,30,0.12)', color: '#FCD34D', border: '1px solid rgba(252,211,77,0.4)' },
    'Most Popular':{ background: 'rgba(59,130,246,0.12)', color: '#93C5FD', border: '1px solid rgba(147,197,253,0.4)' },
    'Heavy Duty':  { background: 'rgba(120,113,108,0.12)', color: '#D6D3D1', border: '1px solid rgba(214,211,209,0.4)' },
    New:           { background: 'rgba(16,185,129,0.12)', color: '#6EE7B7', border: '1px solid rgba(110,231,183,0.4)' },
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="card-dark group flex flex-col overflow-hidden cursor-pointer"
      style={{ borderRadius: '2px' }}
      onClick={() => onView(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1758565811178-6341e9999f48?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] px-2 py-0.5 font-manrope font-semibold tracking-wider uppercase"
            style={BADGE_STYLES[product.badge] || BADGE_STYLES['Signature']}
          >
            {product.badge}
          </span>
        )}

        <span className="absolute bottom-3 left-3 section-label bg-black/50 px-2 py-0.5 backdrop-blur-sm text-[9px]">
          {product.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3
            data-testid={`product-name-${product.id}`}
            className="font-playfair text-lg leading-tight mb-1 transition-colors duration-300"
            style={{ color: 'var(--th-text)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--th-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--th-text)'}
          >
            {product.name}
          </h3>
          <p className="text-xs font-manrope" style={{ color: 'var(--th-muted)' }}>{product.subtitle}</p>
        </div>

        {product.features && (
          <div className="flex flex-wrap gap-1.5">
            {product.features.slice(0, 2).map((f, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] font-manrope border px-2 py-1"
                style={{ color: 'var(--th-muted)', borderColor: 'var(--th-border)' }}>
                <CheckCircle size={8} style={{ color: 'var(--th-accent)' }} />
                {f}
              </span>
            ))}
          </div>
        )}

        {product.specs?.[0] && (
          <div className="flex items-center justify-between py-2 border-t"
            style={{ borderColor: 'var(--th-border)' }}>
            <span className="text-[10px] font-manrope" style={{ color: 'var(--th-deep)' }}>{product.specs[0].key}</span>
            <span className="text-[11px] font-mono-md font-medium" style={{ color: 'var(--th-accent)' }}>{product.specs[0].value}</span>
          </div>
        )}

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
