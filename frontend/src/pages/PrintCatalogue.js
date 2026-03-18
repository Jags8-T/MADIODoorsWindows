import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Printer, ChevronLeft, Shield, Phone, MapPin } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const CATEGORY_GROUPS = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
  ...cat,
  products: PRODUCTS.filter(p => p.category === cat.id),
}));

export default function PrintCatalogue() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-white font-manrope">

      {/* ── PRINT CONTROLS (hidden in print) ─────────────────────────── */}
      <div className="no-print sticky top-0 z-50 bg-[#050505] border-b border-[var(--dark-border)] px-6 py-4 flex items-center justify-between">
        <Link to="/catalogue" data-testid="print-back-btn" className="flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-gold transition-colors duration-300">
          <ChevronLeft size={16} />
          Back to Catalogue
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#555] font-manrope">Ready to print or save as PDF</span>
          <button
            data-testid="print-trigger-btn"
            onClick={handlePrint}
            className="btn-gold text-xs px-5 py-2.5"
          >
            <Printer size={14} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── COVER PAGE ───────────────────────────────────────────────── */}
      <div
        data-testid="print-cover"
        className="print-avoid-break relative"
        style={{
          background: '#0a0a0a',
          minHeight: '297mm',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pageBreakAfter: 'always',
        }}
      >
        {/* Gold top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

        <div className="text-center px-12 py-20">
          <img src={LOGO} alt="Madio Doors & Windows" style={{ height: '120px', margin: '0 auto 40px' }} />
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '0 auto 32px' }} />
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: '#F5F5F5', lineHeight: 1.1, marginBottom: '16px' }}>
            Product Catalogue
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', color: '#A3A3A3', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '48px' }}>
            Architectural Precision. Timeless Luxury.
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', maxWidth: '600px', margin: '0 auto 56px' }}>
            {[
              { v: '18+', l: 'Product Systems' },
              { v: '15Y', l: 'Max Warranty' },
              { v: '6063', l: 'Alloy Grade' },
              { v: '4800MM', l: 'Max Height' },
            ].map(({ v, l }) => (
              <div key={v} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#D4AF37', fontWeight: 700 }}>{v}</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '32px', marginTop: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A3A3A3', fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem' }}>
                <span style={{ color: '#D4AF37', fontSize: '0.75rem' }}>&#9679;</span>
                1, Plot, Road, Hitex Road, Shilpa Layout, Kondapur, Hyderabad, Telangana 500084
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A3A3A3', fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem' }}>
                <span style={{ color: '#D4AF37', fontSize: '0.75rem' }}>&#9679;</span>
                +91 99486 01899
              </div>
            </div>
          </div>
        </div>

        {/* Gold bottom border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      </div>

      {/* ── PRODUCT PAGES ─────────────────────────────────────────────── */}
      {CATEGORY_GROUPS.map((group, gi) => (
        <div key={group.id} style={{ pageBreakBefore: gi === 0 ? 'always' : 'auto' }}>

          {/* Category header */}
          <div
            data-testid={`print-category-${group.id}`}
            style={{
              background: '#0a0a0a',
              padding: '48px 48px 32px',
              borderBottom: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.65rem', color: '#D4AF37', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {group.products.length} Systems Available
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#F5F5F5', marginBottom: '12px' }}>
              {group.label}
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>

          {/* Products grid — 2 per row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0', background: '#080808' }}>
            {group.products.map((product, pi) => (
              <div
                key={product.id}
                data-testid={`print-product-${product.id}`}
                className="print-avoid-break print-card"
                style={{
                  background: pi % 2 === 0 ? '#0d0d0d' : '#101010',
                  border: '1px solid rgba(212,175,55,0.1)',
                  padding: '28px',
                  pageBreakInside: 'avoid',
                }}
              >
                {/* Product image */}
                <div style={{ marginBottom: '16px', overflow: 'hidden', height: '160px', position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: '8px', left: '8px',
                      background: 'rgba(212,175,55,0.15)', color: '#D4AF37',
                      border: '1px solid rgba(212,175,55,0.4)',
                      padding: '2px 8px', fontSize: '0.55rem',
                      fontFamily: 'Manrope, sans-serif', letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}>{product.badge}</span>
                  )}
                </div>

                {/* Header */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {product.categoryLabel}
                  </p>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: '#F5F5F5', marginBottom: '2px' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.7rem', color: '#A3A3A3' }}>
                    {product.subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ width: '40px', height: '1px', background: '#D4AF37', marginBottom: '12px' }} />

                {/* Specs table */}
                {product.specs && product.specs.length > 0 && (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
                    <tbody>
                      {product.specs.map((spec, si) => (
                        <tr key={si} style={{ background: si % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                          <td style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', color: '#A3A3A3', padding: '4px 6px', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                            {spec.key}
                          </td>
                          <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#D4AF37', padding: '4px 6px', textAlign: 'right', borderBottom: '1px solid rgba(212,175,55,0.08)', fontWeight: 500 }}>
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {product.features.map((feat, fi) => (
                      <span key={fi} style={{
                        fontFamily: 'Manrope, sans-serif', fontSize: '0.55rem', color: '#A3A3A3',
                        border: '1px solid rgba(212,175,55,0.15)', padding: '2px 6px',
                      }}>
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── BACK COVER ───────────────────────────────────────────────── */}
      <div
        data-testid="print-back-cover"
        style={{
          background: '#0a0a0a',
          padding: '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderTop: '1px solid rgba(212,175,55,0.2)',
          pageBreakBefore: 'always',
          minHeight: '200px',
        }}
      >
        <img src={LOGO} alt="Madio" style={{ height: '60px', marginBottom: '24px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', maxWidth: '500px' }}>
          <div>
            <MapPin size={14} style={{ color: '#D4AF37', margin: '0 auto 8px' }} />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.65rem', color: '#A3A3A3', lineHeight: 1.6 }}>
              1, Plot, Hitex Road<br />Kondapur, Hyderabad<br />Telangana 500084
            </p>
          </div>
          <div>
            <Phone size={14} style={{ color: '#D4AF37', margin: '0 auto 8px' }} />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.65rem', color: '#A3A3A3', lineHeight: 1.6 }}>
              +91 99486 01899
            </p>
          </div>
          <div>
            <Shield size={14} style={{ color: '#D4AF37', margin: '0 auto 8px' }} />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.65rem', color: '#A3A3A3', lineHeight: 1.6 }}>
              Up to 15 Years<br />Warranty
            </p>
          </div>
        </div>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.55rem', color: '#333', marginTop: '32px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Madio Doors & Windows — Architectural Precision. Timeless Luxury.
        </p>
      </div>
    </div>
  );
}
