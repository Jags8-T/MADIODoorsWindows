import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemePicker from '@/components/ThemePicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Catalogue from '@/pages/Catalogue';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrintCatalogue from '@/pages/PrintCatalogue';
import AdminBrochure from '@/pages/AdminBrochure';
import BrochurePreview from '@/pages/BrochurePreview';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Print — no chrome */}
            <Route path="/print"              element={<PrintCatalogue />} />
            {/* Admin brochure — no chrome */}
            <Route path="/admin"              element={<AdminBrochure />} />
            {/* A4 PDF brochure preview */}
            <Route path="/brochure-preview"   element={<BrochurePreview />} />

            {/* Main layout */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/"          element={<Home />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/contact"   element={<Contact />} />
                  </Routes>
                  <Footer />
                  <ThemePicker />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
