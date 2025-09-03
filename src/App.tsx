import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FocusAreas from './components/FocusAreas';
import KeySpeakers from './components/KeySpeakers';
import EventSchedule from './components/EventSchedule';
const Testimonials = lazy(() => import('./components/Testimonials'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const Registration = lazy(() => import('./components/Registration'));
const SocialMediaSection = lazy(() => import('./components/SocialMediaSection'));
const SponsorsSection = lazy(() => import('./components/SponsorsSection'));
const MapSection = lazy(() => import('./components/MapSection'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfService = lazy(() => import('./TermsOfService'));
const CookiePolicy = lazy(() => import('./CookiePolicy'));
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


function MainSite() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" id="main-content">
        <Hero />
        <FocusAreas />
        <KeySpeakers />
        <EventSchedule />
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <Testimonials />
          <VideoSection />
          <Registration />
          <SponsorsSection />
          <SocialMediaSection />
          <MapSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/privacy" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><PrivacyPolicy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><TermsOfService /></Suspense>} />
        <Route path="/cookies" element={<Suspense fallback={<div className='text-center py-12'>Loading...</div>}><CookiePolicy /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;