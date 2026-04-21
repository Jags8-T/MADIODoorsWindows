import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme, THEMES } from '@/context/ThemeContext';

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[300] no-print flex flex-col items-end gap-3">
      {/* Theme Panel */}
      {open && (
        <div
          data-testid="theme-picker-panel"
          className="rounded-sm overflow-hidden shadow-2xl border"
          style={{
            background: 'var(--th-card)',
            borderColor: 'var(--th-border)',
            width: '220px',
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--th-border)' }}>
            <span className="text-xs font-manrope tracking-widest uppercase" style={{ color: 'var(--th-accent)' }}>
              Colour Theme
            </span>
            <button onClick={() => setOpen(false)} style={{ color: 'var(--th-muted)' }}>
              <X size={14} />
            </button>
          </div>
          <div className="py-2">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                data-testid={`theme-option-${t.id}`}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 text-left"
                style={{
                  background: theme === t.id ? 'var(--th-border)' : 'transparent',
                }}
              >
                {/* Swatches */}
                <div className="flex gap-1 shrink-0">
                  {t.swatches.map((s, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-white/10"
                      style={{ background: s }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold font-manrope" style={{ color: 'var(--th-text)' }}>
                    {t.label}
                  </p>
                  <p className="text-[10px] font-manrope" style={{ color: 'var(--th-muted)' }}>
                    {t.desc}
                  </p>
                </div>
                {theme === t.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--th-accent)' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        data-testid="theme-picker-btn"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: 'var(--th-gradient)',
          color: 'var(--th-accent-text)',
        }}
        title="Change Theme"
      >
        <Palette size={18} />
      </button>
    </div>
  );
}
