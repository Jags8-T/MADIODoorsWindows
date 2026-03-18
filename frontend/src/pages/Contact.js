import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const INITIAL = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm]       = useState(INITIAL);
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]   = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form);
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrMsg(err?.response?.data?.detail || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main data-testid="contact-page" className="bg-[#050505] pt-20">

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#080808] border-b border-[var(--dark-border)] py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white">
            Contact <span className="text-gold">Madio</span>
          </h1>
          <span className="gold-line mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-16">

        {/* ── CONTACT INFO ────────────────────────────────────────────── */}
        <div>
          <h2 className="font-playfair text-2xl text-white mb-8">
            We'd love to hear from you
          </h2>
          <p className="text-[#A3A3A3] font-manrope text-sm leading-relaxed mb-10">
            Whether you're an architect specifying for a project, a builder sourcing materials, or a homeowner exploring premium window solutions — we're here to help.
          </p>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 border border-[var(--dark-border)] flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold font-manrope tracking-widest uppercase mb-1">Address</p>
                <p className="text-sm text-[#A3A3A3] font-manrope leading-relaxed">
                  1, Plot, Road, Hitex Road, Shilpa Layout,<br />
                  Weaker Section Colony, Izzathnagar,<br />
                  Shilpa Hills, Kondapur,<br />
                  Hyderabad, Telangana 500084
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 border border-[var(--dark-border)] flex items-center justify-center shrink-0">
                <Phone size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold font-manrope tracking-widest uppercase mb-1">Phone</p>
                <a
                  href="tel:+919948601899"
                  data-testid="contact-phone"
                  className="text-sm text-[#A3A3A3] hover:text-gold transition-colors duration-300 font-manrope"
                >
                  +91 99486 01899
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 border border-[var(--dark-border)] flex items-center justify-center shrink-0">
                <Mail size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold font-manrope tracking-widest uppercase mb-1">Email</p>
                <a
                  href="mailto:info@madiodoors.com"
                  data-testid="contact-email"
                  className="text-sm text-[#A3A3A3] hover:text-gold transition-colors duration-300 font-manrope"
                >
                  info@madiodoors.com
                </a>
              </div>
            </li>
          </ul>

          {/* Working hours */}
          <div className="mt-10 card-dark p-6">
            <p className="text-xs text-gold font-manrope tracking-widest uppercase mb-4">Business Hours</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-manrope">
                <span className="text-[#A3A3A3]">Monday – Saturday</span>
                <span className="text-white">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between text-sm font-manrope">
                <span className="text-[#A3A3A3]">Sunday</span>
                <span className="text-[#555]">By Appointment</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT FORM ────────────────────────────────────────────── */}
        <div>
          {status === 'success' ? (
            <div data-testid="contact-success" className="card-dark p-10 text-center flex flex-col items-center gap-4 justify-center h-full">
              <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
                <CheckCircle size={28} className="text-gold" />
              </div>
              <h3 className="font-playfair text-2xl text-white">Message Received</h3>
              <p className="text-sm text-[#A3A3A3] font-manrope leading-relaxed">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
              <button
                data-testid="contact-send-another"
                onClick={() => setStatus('idle')}
                className="btn-outline-gold mt-4 text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <h2 className="font-playfair text-2xl text-white mb-2">Send a Message</h2>

              {errMsg && (
                <div data-testid="contact-error" className="text-xs text-red-400 border border-red-900/40 bg-red-950/20 px-4 py-3 font-manrope">
                  {errMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-[10px]">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    data-testid="contact-name-input"
                    placeholder="Your name"
                    className="bg-[#111] border border-[var(--dark-border)] text-white text-sm px-4 py-3 font-manrope placeholder:text-[#555] focus:outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-[10px]">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    data-testid="contact-email-input"
                    placeholder="your@email.com"
                    className="bg-[#111] border border-[var(--dark-border)] text-white text-sm px-4 py-3 font-manrope placeholder:text-[#555] focus:outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="section-label text-[10px]">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  data-testid="contact-phone-input"
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-[#111] border border-[var(--dark-border)] text-white text-sm px-4 py-3 font-manrope placeholder:text-[#555] focus:outline-none focus:border-gold/50 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="section-label text-[10px]">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  data-testid="contact-message-input"
                  placeholder="Tell us about your project or enquiry..."
                  className="bg-[#111] border border-[var(--dark-border)] text-white text-sm px-4 py-3 font-manrope placeholder:text-[#555] focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={status === 'loading'}
                className={`btn-gold justify-center ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {status === 'loading' ? 'Sending...' : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
