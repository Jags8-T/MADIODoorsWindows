import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Printer, ChevronLeft, Shield, Phone, MapPin, Mail } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const THEME_STYLES = {
  prestige: {
    coverBg: '#0a0a0a', coverText: '#F5F5F5', accent: '#D4AF37',
    accentText: '#000', dividerColor: '#D4AF37',
    headerBg: '#111111', headerText: '#F5F5F5',
    pageBg: '#ffffff', pageText: '#1a1a1a', mutedText: '#555',
    specRowOdd: '#F9F9F9', borderColor: '#e0e0e0',
  },
  professional: {
    coverBg: '#1B3A6B', coverText: '#FFFFFF', accent: '#D4AF37',
    accentText: '#000', dividerColor: '#D4AF37',
    headerBg: '#1B3A6B', headerText: '#FFFFFF',
    pageBg: '#ffffff', pageText: '#0F172A', mutedText: '#475569',
    specRowOdd: '#F8FAFC', borderColor: '#E2E8F0',
  },
  bold: {
    coverBg: '#0A0A0A', coverText: '#F5F5F5', accent: '#F97316',
    accentText: '#fff', dividerColor: '#F97316',
    headerBg: '#1a1a1a', headerText: '#F5F5F5',
    pageBg: '#ffffff', pageText: '#1a1a1a', mutedText: '#555',
    specRowOdd: '#FFF8F5', borderColor: '#e8ddd8',
  },
};

const DEFAULT_CONFIG = {
  brochureTheme: 'prestige',
  selectedIds: PRODUCTS.map(p => p.id),
  coverTitle: 'Product Catalogue',
  coverSubtitle: 'Architectural Precision. Timeless Luxury.',
  preparedFor: '',
  includeSpecs: true,
  includeFeatures: true,
  showAboutPage: true,
  generatedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
};

/* ── A4 Page wrapper ─────────────────────────────────────────── */
function Page({ children, style }) {
  return (
    <div className="brochure-page" style={style}>
      {children}
    </div>
  );
}

/* ── Cover Page ──────────────────────────────────────────────── */
function CoverPage({ config, t }) {
  return (
    <Page style={{ background: t.coverBg }}>
      {/* Top accent bar */}
      <div style={{ height: '6px', background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '297mm', padding: '20mm', textAlign: 'center' }}>
        <img src={LOGO} alt="Madio" style={{ height: '80px', marginBottom: '24px' }} />

        <div style={{ width: '80px', height: '2px', background: t.accent, margin: '0 auto 28px' }} />

        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: t.accent, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Premium Aluminium Solutions
        </p>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '38px', color: t.coverText, lineHeight: 1.1, marginBottom: '14px', fontWeight: 700 }}>
          {config.coverTitle}
        </h1>

        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: t.accent, letterSpacing: '0.12em', marginBottom: '40px' }}>
          {config.coverSubtitle}
        </p>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '520px', margin: '0 auto 48px', border: `1px solid ${t.accent}30`, padding: '20px 16px' }}>
          {[['18+','Products'],['15Y','Max Warranty'],['6063','Alloy'],['4800MM','Max Height']].map(([v,l]) => (
            <div key={v} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: t.accent, fontWeight: 700 }}>{v}</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: `${t.coverText}88`, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{l}</p>
            </div>
          ))}
        </div>

        {config.preparedFor && (
          <div style={{ border: `1px solid ${t.accent}40`, padding: '12px 24px', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px', color: t.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Prepared For</p>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: t.coverText }}>{config.preparedFor}</p>
          </div>
        )}

        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px', color: `${t.coverText}55`, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {config.generatedAt}
        </p>
      </div>

      {/* Bottom contact bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20mm', background: `${t.accent}15`, borderTop: `1px solid ${t.accent}25`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: `${t.coverText}77` }}>
          1, Hitex Road, Kondapur, Hyderabad 500084
        </p>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: t.accent }}>+91 99486 01899</p>
      </div>

      {/* Bottom accent bar */}
      <div style={{ height: '6px', background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, position: 'absolute', bottom: '35px', left: 0, right: 0 }} />
    </Page>
  );
}

/* ── About Page ──────────────────────────────────────────────── */
function AboutPage({ t }) {
  return (
    <Page style={{ background: t.pageBg }}>
      {/* Header band */}
      <div style={{ background: t.headerBg, padding: '12mm 15mm 10mm', borderBottom: `3px solid ${t.accent}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={LOGO} alt="Madio" style={{ height: '36px' }} />
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: t.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>About Madio</p>
        </div>
      </div>

      <div style={{ padding: '12mm 15mm' }}>
        <div style={{ width: '50px', height: '3px', background: t.accent, marginBottom: '16px' }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', color: t.pageText, marginBottom: '16px', lineHeight: 1.2 }}>
          Crafting Spaces with Precision & Elegance
        </h2>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: t.mutedText, lineHeight: 1.7, marginBottom: '20px' }}>
          Madio Doors & Windows is a premium aluminium solutions brand specialising in designing and supplying high-quality modular windows, doors, and glass partition systems. We deliver products that blend durability with modern design — serving residential, commercial, and industrial projects with the same dedication to detail.
        </p>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: t.mutedText, lineHeight: 1.7, marginBottom: '28px' }}>
          Our product range is engineered using aerospace-grade Alloy 6063 aluminium with precision multi-point locking systems, EPDM seals, and premium powder-coated finishes. Each system is tested to international standards and backed by up to 15 years warranty.
        </p>

        {/* 4 Value cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { title: 'Premium Alloy 6063',   desc: 'Aerospace-grade aluminium for structural excellence and long-term durability.' },
            { title: '12–15 Year Warranty',  desc: 'Industry-leading guarantee backed by engineering confidence.' },
            { title: 'Powder Coat Finish',   desc: 'UV & corrosion resistant coating available in any RAL colour.' },
            { title: 'End-to-End Service',   desc: 'From product selection to precision installation and after-sales support.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ border: `1px solid ${t.borderColor}`, padding: '14px', borderLeft: `3px solid ${t.accent}` }}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', fontWeight: 700, color: t.pageText, marginBottom: '5px' }}>{title}</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px', color: t.mutedText, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Product summary */}
        <div style={{ background: t.headerBg, padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[['7','Sliding & Folding'],['2','Casement Windows'],['8','Glass Partitions'],['1','Hardware Collection']].map(([n, l]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: t.accent, fontWeight: 700 }}>{n}</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7.5px', color: t.headerText === '#F5F5F5' ? '#A3A3A3' : t.mutedText, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <PageFooter t={t} pageNum={2} total="—" />
    </Page>
  );
}

/* ── Product Page (2 products per page) ──────────────────────── */
function ProductsPage({ products, t, pageNum, config }) {
  return (
    <Page style={{ background: t.pageBg }}>
      {/* Header */}
      <div style={{ background: t.headerBg, padding: '8mm 15mm', borderBottom: `3px solid ${t.accent}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={LOGO} alt="Madio" style={{ height: '28px' }} />
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: t.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {products[0]?.categoryLabel}
        </p>
      </div>

      {/* 2 Products */}
      <div style={{ padding: '8mm 15mm', display: 'flex', flexDirection: 'column', gap: '8mm', flex: 1 }}>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', gap: '6mm', border: `1px solid ${t.borderColor}`, overflow: 'hidden', flex: 1 }}>
            {/* Image */}
            <div style={{ width: '62mm', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {product.badge && (
                <span style={{
                  position: 'absolute', top: '8px', left: '8px',
                  background: t.accent, color: t.accentText,
                  fontFamily: 'Manrope, sans-serif', fontSize: '7px',
                  padding: '2px 7px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
                }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '10px 12px 10px 4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7.5px', color: t.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  {product.categoryLabel}
                </p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', color: t.pageText, lineHeight: 1.1, marginBottom: '3px' }}>
                  {product.name}
                </h3>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px', color: t.mutedText }}>
                  {product.subtitle}
                </p>
                <div style={{ width: '36px', height: '2px', background: t.accent, marginTop: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: config.includeSpecs && config.includeFeatures ? '1fr 1fr' : '1fr', gap: '12px', flex: 1 }}>
                {/* Specs */}
                {config.includeSpecs && product.specs?.length > 0 && (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8px' }}>
                    <tbody>
                      {product.specs.slice(0, 6).map((spec, si) => (
                        <tr key={si} style={{ background: si % 2 === 0 ? t.specRowOdd : 'transparent' }}>
                          <td style={{ fontFamily: 'Manrope, sans-serif', color: t.mutedText, padding: '3px 6px', borderBottom: `1px solid ${t.borderColor}` }}>{spec.key}</td>
                          <td style={{ fontFamily: 'JetBrains Mono, monospace', color: t.accent, padding: '3px 6px', textAlign: 'right', borderBottom: `1px solid ${t.borderColor}`, fontWeight: 600 }}>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Features */}
                {config.includeFeatures && product.features?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Key Features</p>
                    {product.features.map((feat, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: t.mutedText }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageFooter t={t} pageNum={pageNum} />
    </Page>
  );
}

/* ── Back Cover ───────────────────────────────────────────────── */
function BackCover({ t }) {
  return (
    <Page style={{ background: t.coverBg }}>
      <div style={{ height: '6px', background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '297mm', padding: '20mm', textAlign: 'center', gap: '20px' }}>
        <img src={LOGO} alt="Madio" style={{ height: '60px' }} />
        <div style={{ width: '60px', height: '2px', background: t.accent }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: t.coverText, marginBottom: '8px' }}>
          Get in Touch
        </h2>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: `${t.coverText}88`, maxWidth: '320px', lineHeight: 1.7 }}>
          Ready to elevate your space? Contact us for product demos, custom measurements, and project consultations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '16px', maxWidth: '460px' }}>
          {[
            { Icon: MapPin,  label: 'Visit Us',     value: '1, Hitex Road,\nKondapur, Hyderabad\nTelangana 500084' },
            { Icon: Phone,   label: 'Call Us',      value: '+91 99486 01899' },
            { Icon: Mail,    label: 'Email Us',      value: 'info@madiodoors.com' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '8px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px', color: `${t.coverText}99`, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7px', color: `${t.coverText}44`, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Madio Doors & Windows — Architectural Precision. Timeless Luxury.
        </p>
      </div>
      <div style={{ height: '6px', background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </Page>
  );
}

/* ── Page Footer ──────────────────────────────────────────────── */
function PageFooter({ t, pageNum }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '5mm 15mm',
      borderTop: `1px solid ${t.borderColor}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: t.pageBg,
    }}>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7px', color: t.mutedText }}>
        Madio Doors & Windows — madio.in
      </p>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '7px', color: t.accent }}>{pageNum}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function BrochurePreview() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('madio-brochure-config');
      if (saved) setConfig(JSON.parse(saved));
    } catch {}
  }, []);

  const t = THEME_STYLES[config.brochureTheme] || THEME_STYLES.prestige;
  const selectedProducts = PRODUCTS.filter(p => config.selectedIds.includes(p.id));

  // Group products into pages of 2
  const productPages = [];
  for (let i = 0; i < selectedProducts.length; i += 2) {
    productPages.push(selectedProducts.slice(i, i + 2));
  }

  let pageCounter = config.showAboutPage ? 3 : 2;

  return (
    <div style={{ minHeight: '100vh', background: '#e0e0e0' }}>
      {/* Print controls */}
      <div className="no-print sticky top-0 z-50 border-b px-6 py-3 flex items-center justify-between"
        style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}>
        <div className="flex items-center gap-4">
          <Link to="/admin" data-testid="back-to-admin-btn"
            className="flex items-center gap-2 text-sm font-manrope transition-colors"
            style={{ color: '#A3A3A3' }}>
            <ChevronLeft size={16} /> Back to Admin
          </Link>
          <span style={{ color: '#333' }}>|</span>
          <p className="text-xs font-manrope" style={{ color: '#555' }}>
            {productPages.length + (config.showAboutPage ? 1 : 0) + 2} pages · A4 210×297mm
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-manrope" style={{ color: '#555' }}>
            Open browser Print dialog → Save as PDF
          </span>
          <button
            data-testid="print-brochure-btn"
            onClick={() => window.print()}
            className="btn-gold text-xs px-5 py-2.5"
          >
            <Printer size={14} />
            Print / Save A4 PDF
          </button>
        </div>
      </div>

      {/* Brochure pages */}
      <div className="brochure-wrapper py-8">
        {/* Cover */}
        <CoverPage config={config} t={t} />

        {/* About */}
        {config.showAboutPage && <AboutPage t={t} />}

        {/* Product pages */}
        {productPages.map((pair, i) => (
          <ProductsPage
            key={i}
            products={pair}
            t={t}
            pageNum={pageCounter + i}
            config={config}
          />
        ))}

        {/* Back cover */}
        <BackCover t={t} />
      </div>
    </div>
  );
}
