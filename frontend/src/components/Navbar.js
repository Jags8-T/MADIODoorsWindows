import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';
const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();
  const { theme }             = useTheme();
  const isLight               = theme === 'minimalist';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print"
      style={{
        background: scrolled ? 'var(--th-navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.15)' : 'none',
        borderBottom: scrolled ? '1px solid var(--th-border)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" data-testid="navbar-logo" className="flex items-center">
          <img src={LOGO} alt="Madio" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                data-testid={`nav-link-${label.toLowerCase()}`}
                className="text-sm font-manrope tracking-widest uppercase transition-colors duration-300"
                style={{
                  color: location.pathname === to ? 'var(--th-accent)' : 'var(--th-muted)',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/print"
            data-testid="navbar-print-cta"
            className="btn-gold text-[10px] px-4 py-2.5"
          >
            <BookOpen size={13} />
            Print Catalogue
          </Link>
          <Link
            to="/admin"
            data-testid="navbar-admin-btn"
            className="btn-outline-gold text-[10px] px-3 py-2.5"
            title="Admin — Generate PDF Brochure"
          >
            A4 Brochure
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden p-2 transition-colors"
          style={{ color: 'var(--th-text)' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="navbar-mobile-menu"
          className="md:hidden border-t px-6 py-6 flex flex-col gap-5"
          style={{ background: 'var(--th-card)', borderColor: 'var(--th-border)' }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}
              className="text-sm font-manrope tracking-widest uppercase"
              style={{ color: location.pathname === to ? 'var(--th-accent)' : 'var(--th-muted)' }}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link to="/print"  className="btn-gold text-[10px] px-3 py-2.5"><BookOpen size={12} />Print</Link>
            <Link to="/admin"  className="btn-outline-gold text-[10px] px-3 py-2.5">A4 Brochure</Link>
          </div>
        </div>
      )}
    </header>
  );
}
