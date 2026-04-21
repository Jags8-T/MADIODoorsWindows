import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Sleek Modern',
    desc: 'Charcoal + Gold',
    swatches: ['#1a1a1a', '#D4AF37'],
  },
  minimalist: {
    id: 'minimalist',
    label: 'Clean Minimalist',
    desc: 'White + Navy',
    swatches: ['#F8FAFC', '#1B3A6B'],
  },
  industrial: {
    id: 'industrial',
    label: 'Bold Industrial',
    desc: 'Black + Orange',
    swatches: ['#141414', '#F97316'],
  },
};

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('madio-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('madio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
