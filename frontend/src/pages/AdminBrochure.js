import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Settings, FileText, ChevronRight, Eye, EyeOff, CheckSquare, Square, Printer } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';

const ADMIN_PIN = 'MADIO24';
const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const BROCHURE_THEMES = [
  { id: 'prestige',     label: 'Prestige Dark',      desc: 'Charcoal cover · Gold accents',   coverBg: '#0a0a0a', accent: '#D4AF37' },
  { id: 'professional', label: 'Professional Navy',  desc: 'Navy cover · Clean white pages',  coverBg: '#1B3A6B', accent: '#D4AF37' },
  { id: 'bold',         label: 'Bold Industrial',    desc: 'Black cover · Orange accents',    coverBg: '#0A0A0A', accent: '#F97316' },
];

export default function AdminBrochure() {
  const navigate  = useNavigate();
  const [pin, setPin]     = useState('');
  const [showPin, setShowPin] = useState(false);
  const [authed, setAuthed]   = useState(false);
  const [pinErr, setPinErr]   = useState('');

  // Config state
  const [brochureTheme, setBrochureTheme]   = useState('prestige');
  const [selectedIds, setSelectedIds]       = useState(PRODUCTS.map(p => p.id));
  const [coverTitle, setCoverTitle]         = useState('Product Catalogue');
  const [coverSubtitle, setCoverSubtitle]   = useState('Architectural Precision. Timeless Luxury.');
  const [preparedFor, setPreparedFor]       = useState('');
  const [includeSpecs, setIncludeSpecs]     = useState(true);
  const [includeFeatures, setIncludeFeatures] = useState(true);
  const [showAboutPage, setShowAboutPage]   = useState(true);

  const verify = () => {
    if (pin.toUpperCase() === ADMIN_PIN) { setAuthed(true); setPinErr(''); }
    else setPinErr('Incorrect PIN. Try: MADIO24');
  };

  const toggleProduct = (id) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selectCategory = (catId) => {
    const ids = catId === 'all'
      ? PRODUCTS.map(p => p.id)
      : PRODUCTS.filter(p => p.category === catId).map(p => p.id);
    setSelectedIds(prev => {
      const alreadyAll = ids.every(id => prev.includes(id));
      return alreadyAll
        ? prev.filter(id => !ids.includes(id))
        : [...new Set([...prev, ...ids])];
    });
  };

  const generateBrochure = () => {
    const config = {
      brochureTheme, selectedIds, coverTitle, coverSubtitle,
      preparedFor, includeSpecs, includeFeatures, showAboutPage,
      generatedAt: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' }),
    };
    sessionStorage.setItem('madio-brochure-config', JSON.stringify(config));
    navigate('/brochure-preview');
  };

  /* ── LOGIN SCREEN ───────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="w-full max-w-sm p-8 border" style={{ background: '#111', borderColor: 'rgba(212,175,55,0.2)' }}>
          <div className="text-center mb-8">
            <img src={LOGO} alt="Madio" className="h-12 mx-auto mb-4" />
            <p className="text-xs font-manrope tracking-widest uppercase" style={{ color: '#D4AF37' }}>Admin Access</p>
            <h1 className="font-playfair text-2xl text-white mt-1">Brochure Generator</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#555' }} />
              <input
                data-testid="admin-pin-input"
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={e => setPin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && verify()}
                placeholder="Enter admin PIN"
                className="w-full pl-9 pr-10 py-3 text-sm font-manrope"
                style={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', color: '#F5F5F5', outline: 'none' }}
              />
              <button onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#555' }}>
                {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {pinErr && <p data-testid="pin-error" className="text-xs text-red-400 font-manrope">{pinErr}</p>}
            <button data-testid="admin-login-btn" onClick={verify} className="btn-gold w-full justify-center py-3">
              <Lock size={14} />
              Access Admin Panel
            </button>
            <p className="text-[10px] text-center font-manrope" style={{ color: '#333' }}>
              Default PIN: MADIO24
            </p>
          </div>
          <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
            <Link to="/" className="text-xs font-manrope" style={{ color: '#555' }}>← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── ADMIN PANEL ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(5,5,5,0.97)', borderColor: 'rgba(212,175,55,0.15)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Madio" className="h-8" />
          <div>
            <p className="text-xs font-manrope tracking-widest uppercase" style={{ color: '#D4AF37' }}>Admin Panel</p>
            <p className="text-[10px] font-manrope" style={{ color: '#555' }}>A4 Brochure Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-manrope" style={{ color: '#555' }}>{selectedIds.length} products selected</span>
          <button
            data-testid="generate-brochure-btn"
            onClick={generateBrochure}
            disabled={selectedIds.length === 0}
            className="btn-gold text-xs px-5 py-2.5 disabled:opacity-40"
          >
            <Printer size={14} />
            Generate A4 Brochure
          </button>
          <Link to="/" className="btn-outline-gold text-[10px] px-4 py-2.5">← Website</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

        {/* ── LEFT: Cover + Settings ─────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-6">

          {/* Brochure Theme */}
          <div className="border p-6" style={{ background: '#111', borderColor: 'rgba(212,175,55,0.15)' }}>
            <p className="section-label mb-4">Brochure Theme</p>
            <div className="flex flex-col gap-3">
              {BROCHURE_THEMES.map(t => (
                <button
                  key={t.id}
                  data-testid={`brochure-theme-${t.id}`}
                  onClick={() => setBrochureTheme(t.id)}
                  className="flex items-center gap-3 p-3 border transition-colors text-left"
                  style={{
                    borderColor: brochureTheme === t.id ? t.accent : 'rgba(212,175,55,0.1)',
                    background: brochureTheme === t.id ? 'rgba(212,175,55,0.05)' : 'transparent',
                  }}
                >
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-5 h-5 rounded-sm" style={{ background: t.coverBg, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <span className="w-5 h-5 rounded-sm" style={{ background: t.accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-manrope font-semibold text-white">{t.label}</p>
                    <p className="text-[10px] font-manrope" style={{ color: '#666' }}>{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cover Page Settings */}
          <div className="border p-6" style={{ background: '#111', borderColor: 'rgba(212,175,55,0.15)' }}>
            <p className="section-label mb-4">Cover Page</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-manrope tracking-widest uppercase mb-1.5 block" style={{ color: '#D4AF37' }}>Title</label>
                <input
                  data-testid="cover-title-input"
                  value={coverTitle}
                  onChange={e => setCoverTitle(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-manrope"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.15)', color: '#F5F5F5', outline: 'none' }}
                />
              </div>
              <div>
                <label className="text-[10px] font-manrope tracking-widest uppercase mb-1.5 block" style={{ color: '#D4AF37' }}>Tagline</label>
                <input
                  data-testid="cover-subtitle-input"
                  value={coverSubtitle}
                  onChange={e => setCoverSubtitle(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-manrope"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.15)', color: '#F5F5F5', outline: 'none' }}
                />
              </div>
              <div>
                <label className="text-[10px] font-manrope tracking-widest uppercase mb-1.5 block" style={{ color: '#D4AF37' }}>Prepared For <span style={{ color: '#555' }}>(optional)</span></label>
                <input
                  data-testid="prepared-for-input"
                  value={preparedFor}
                  onChange={e => setPreparedFor(e.target.value)}
                  placeholder="e.g. ABC Architects, Mr. Sharma..."
                  className="w-full px-3 py-2.5 text-sm font-manrope"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.15)', color: '#F5F5F5', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Content Options */}
          <div className="border p-6" style={{ background: '#111', borderColor: 'rgba(212,175,55,0.15)' }}>
            <p className="section-label mb-4">Content Options</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Include About Madio page', value: showAboutPage,    setter: setShowAboutPage },
                { label: 'Show technical specs',     value: includeSpecs,     setter: setIncludeSpecs },
                { label: 'Show key features',        value: includeFeatures,  setter: setIncludeFeatures },
              ].map(({ label, value, setter }) => (
                <button key={label} onClick={() => setter(!value)}
                  className="flex items-center gap-3 text-xs font-manrope text-left"
                  style={{ color: value ? '#F5F5F5' : '#555' }}>
                  {value
                    ? <CheckSquare size={16} style={{ color: '#D4AF37' }} />
                    : <Square size={16} style={{ color: '#555' }} />}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Selector ────────────────────────── */}
        <div className="lg:col-span-2 border" style={{ background: '#111', borderColor: 'rgba(212,175,55,0.15)' }}>
          <div className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
            <p className="section-label">Select Products</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSelectedIds(PRODUCTS.map(p => p.id))}
                className="text-[10px] font-manrope px-3 py-1.5 border transition-colors"
                style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.3)' }}>
                All
              </button>
              <button onClick={() => setSelectedIds([])}
                className="text-[10px] font-manrope px-3 py-1.5 border transition-colors"
                style={{ color: '#555', borderColor: 'rgba(255,255,255,0.1)' }}>
                None
              </button>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button key={cat.id} onClick={() => selectCategory(cat.id)}
                  className="text-[10px] font-manrope px-3 py-1.5 border transition-colors"
                  style={{ color: '#A3A3A3', borderColor: 'rgba(212,175,55,0.15)' }}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
              const catProducts = PRODUCTS.filter(p => p.category === cat.id);
              return (
                <div key={cat.id} className="mb-6 last:mb-0">
                  <p className="section-label mb-3">{cat.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {catProducts.map(p => {
                      const checked = selectedIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          data-testid={`product-select-${p.id}`}
                          onClick={() => toggleProduct(p.id)}
                          className="flex items-center gap-3 p-3 border text-left transition-colors"
                          style={{
                            borderColor: checked ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.08)',
                            background: checked ? 'rgba(212,175,55,0.05)' : 'transparent',
                          }}
                        >
                          {checked
                            ? <CheckSquare size={14} style={{ color: '#D4AF37', shrink: 0 }} />
                            : <Square size={14} style={{ color: '#333', shrink: 0 }} />}
                          <div className="min-w-0">
                            <p className="text-xs font-manrope font-semibold text-white truncate">{p.name}</p>
                            <p className="text-[10px] font-manrope truncate" style={{ color: '#666' }}>{p.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generate CTA bottom */}
          <div className="px-6 py-4 border-t flex items-center justify-between"
            style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
            <p className="text-xs font-manrope" style={{ color: '#555' }}>
              {selectedIds.length} of {PRODUCTS.length} products · {Math.ceil(selectedIds.length / 2) + (showAboutPage ? 2 : 1)} pages est.
            </p>
            <button
              data-testid="generate-brochure-bottom-btn"
              onClick={generateBrochure}
              disabled={selectedIds.length === 0}
              className="btn-gold text-xs px-6 py-3 disabled:opacity-40"
            >
              <FileText size={14} />
              Generate & Preview
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
