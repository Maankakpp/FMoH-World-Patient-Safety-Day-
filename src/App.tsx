import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FocusAreas from './components/FocusAreas';
import EventSchedule from './components/EventSchedule';
const Testimonials = lazy(() => import('./components/Testimonials'));
const SponsorsSection = lazy(() => import('./components/SponsorsSection'));
const Registration = lazy(() => import('./components/Registration'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfService = lazy(() => import('./TermsOfService'));
const CookiePolicy = lazy(() => import('./CookiePolicy'));
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';


function MainSite() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FocusAreas />
      <EventSchedule />
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <Testimonials />
        <Registration />
        <SponsorsSection />
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/privacy" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><PrivacyPolicy /></Suspense>} />
      <Route path="/terms" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><TermsOfService /></Suspense>} />
      <Route path="/cookies" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><CookiePolicy /></Suspense>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;