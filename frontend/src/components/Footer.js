import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

export default function Footer() {
  return (
    <footer
      className="no-print border-t"
      style={{ background: 'var(--th-surface)', borderColor: 'var(--th-border)' }}
    >
      {/* Gold accent line */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--th-accent), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <img src={LOGO} alt="Madio" className="h-12 w-auto mb-5" />
          <p className="text-sm leading-relaxed mb-6 font-manrope" style={{ color: 'var(--th-muted)' }}>
            Precision-engineered aluminium windows, doors and glass partitions crafted for discerning spaces.
          </p>
          <span className="gold-line" />
          <p className="mt-4 text-xs font-manrope tracking-wider uppercase" style={{ color: 'var(--th-deep)' }}>
            Architectural Precision. Timeless Luxury.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-playfair text-lg mb-5" style={{ color: 'var(--th-text)' }}>Quick Links</h4>
          <ul className="space-y-3">
            {[
              { to: '/',          label: 'Home' },
              { to: '/catalogue', label: 'Product Catalogue' },
              { to: '/about',     label: 'About Madio' },
              { to: '/contact',   label: 'Contact Us' },
              { to: '/print',     label: 'Print Catalogue' },
              { to: '/admin',     label: 'Admin — A4 Brochure' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="flex items-center gap-2 text-sm font-manrope transition-colors duration-300 hover:opacity-80"
                  style={{ color: 'var(--th-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--th-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--th-muted)'}
                >
                  <ArrowRight size={12} style={{ color: 'var(--th-accent)' }} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-lg mb-5" style={{ color: 'var(--th-text)' }}>Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm font-manrope" style={{ color: 'var(--th-muted)' }}>
              <MapPin size={16} style={{ color: 'var(--th-accent)' }} className="shrink-0 mt-0.5" />
              <span>1, Plot, Road, Hitex Road, Shilpa Layout,<br />Kondapur, Hyderabad, Telangana 500084</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Phone size={16} style={{ color: 'var(--th-accent)' }} className="shrink-0" />
              <a href="tel:+919948601899" className="font-manrope transition-colors hover:opacity-80"
                style={{ color: 'var(--th-muted)' }}>+91 99486 01899</a>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail size={16} style={{ color: 'var(--th-accent)' }} className="shrink-0" />
              <a href="mailto:info@madiodoors.com" className="font-manrope transition-colors hover:opacity-80"
                style={{ color: 'var(--th-muted)' }}>info@madiodoors.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: 'var(--th-border)' }}>
        <p className="text-xs font-manrope" style={{ color: 'var(--th-deep)' }}>
          &copy; {new Date().getFullYear()} Madio Doors & Windows. All rights reserved.
        </p>
        <p className="text-xs font-manrope tracking-widest uppercase" style={{ color: 'var(--th-deep)' }}>
          Premium Aluminium Solutions
        </p>
      </div>
    </footer>
  );
}
