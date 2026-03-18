import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const LOGO = 'https://customer-assets.emergentagent.com/job_madio-static-dynamic/artifacts/03yjhqyn_image.png';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[var(--dark-border)] no-print">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <img src={LOGO} alt="Madio Doors & Windows" className="h-14 w-auto mb-5" />
          <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
            Precision-engineered aluminium windows, doors, and glass partitions crafted for discerning spaces.
          </p>
          <span className="gold-line" />
          <p className="mt-4 text-xs text-[#555] font-manrope tracking-wider uppercase">
            Architectural Precision. Timeless Luxury.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-playfair text-lg text-white mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { to: '/',          label: 'Home' },
              { to: '/catalogue', label: 'Product Catalogue' },
              { to: '/about',     label: 'About Madio' },
              { to: '/contact',   label: 'Contact Us' },
              { to: '/print',     label: 'Print Catalogue' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-gold transition-colors duration-300"
                >
                  <ArrowRight size={12} className="text-gold" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-lg text-white mb-5">Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-[#A3A3A3]">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <span>1, Plot, Road, Hitex Road, Shilpa Layout, Kondapur,<br />Hyderabad, Telangana 500084</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+919948601899" className="text-[#A3A3A3] hover:text-gold transition-colors duration-300">
                +91 99486 01899
              </a>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:info@madiodoors.com" className="text-[#A3A3A3] hover:text-gold transition-colors duration-300">
                info@madiodoors.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--dark-border)] px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#555] font-manrope">
          &copy; {new Date().getFullYear()} Madio Doors & Windows. All rights reserved.
        </p>
        <p className="text-xs text-[#555] font-manrope tracking-widest uppercase">
          Premium Aluminium Solutions
        </p>
      </div>
    </footer>
  );
}
