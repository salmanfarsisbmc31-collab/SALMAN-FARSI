import React, { useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { VideoPortfolio } from './components/VideoPortfolio';
import { DesignPortfolio } from './components/DesignPortfolio';
import { AboutDetailed } from './components/About';
import { ContactDetailed } from './components/Contact';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

// --- Home Page ---
const Home = () => {
  return (
    <main>
      <Hero />
      <Showreel />
      <VideoPortfolio preview={true} />
      <DesignPortfolio preview={true} />
      <AboutDetailed />
      <ContactDetailed />
    </main>
  );
};

// --- ScrollToTop Component ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- App Component ---
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-800 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video-editing" element={<VideoPortfolio preview={false} />} />
          <Route path="/graphic-design" element={<DesignPortfolio preview={false} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutDetailed />} />
          <Route path="/contact" element={<ContactDetailed />} />
        </Routes>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </div>
    </Router>
  );
}
