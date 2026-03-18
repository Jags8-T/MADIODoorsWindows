import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Catalogue from '@/pages/Catalogue';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrintCatalogue from '@/pages/PrintCatalogue';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Print route — no Navbar/Footer */}
          <Route path="/print" element={<PrintCatalogue />} />

          {/* Main app routes */}
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
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
