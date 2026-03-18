import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print ${
        scrolled ? 'bg-[#050505]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
          <img
            src={LOGO}
            alt="Madio Doors & Windows"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                data-testid={`nav-link-${label.toLowerCase()}`}
                className={`text-sm font-manrope tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === to
                    ? 'text-gold'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
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
            className="btn-gold text-xs px-4 py-2.5"
          >
            <BookOpen size={14} />
            Print Catalogue
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="navbar-mobile-menu"
          className="md:hidden bg-[#0d0d0d] border-t border-[var(--dark-border)] px-6 py-6 flex flex-col gap-5"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              data-testid={`mobile-nav-${label.toLowerCase()}`}
              className={`text-sm font-manrope tracking-widest uppercase ${
                location.pathname === to ? 'text-gold' : 'text-[#A3A3A3]'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/print"
            data-testid="mobile-print-cta"
            className="btn-gold text-xs self-start mt-2"
          >
            <BookOpen size={14} />
            Print Catalogue
          </Link>
        </div>
      )}
    </header>
  );
}
