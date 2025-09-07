import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'About World Patient Safety Day', href: '#about' },
    { label: 'Focus Areas', href: '#focus-areas' },
    { label: 'Event Schedule', href: '#schedule' },
    { label: 'Registration', href: '#registration' },
    { label: 'Past Events', href: 'https://www.who.int/campaigns/world-patient-safety-day' },
    { label: 'Resources', href: '#' }
  ];

  const [showResourcesModal, setShowResourcesModal] = React.useState(false);

  // Focus trap and Escape key for modals
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (showResourcesModal) {
        // Escape closes modal
        if (e.key === 'Escape') {
          setShowResourcesModal(false);
        }
        // Focus trap
        const modalSelector = '[aria-label="Resources Modal"]';
        const modal = document.querySelector(modalSelector);
        if (modal) {
          const focusable = modal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
          const first = focusable[0] as HTMLElement;
          const last = focusable[focusable.length - 1] as HTMLElement;
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }
        }
      }
    }
    if (showResourcesModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first focusable element in modal
      setTimeout(() => {
        const modalSelector = '[aria-label="Resources Modal"]';
        const modal = document.querySelector(modalSelector);
        if (modal) {
          const focusable = modal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
          if (focusable.length) (focusable[0] as HTMLElement).focus();
        }
      }, 0);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showResourcesModal]);

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700" role="contentinfo" aria-label="Site Footer">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <button
                  onClick={() => window.location.reload()}
                  className="focus:outline-none"
                  aria-label="Refresh Home"
                >
                  <img
                    src="/Logo.png"
                    alt="Health Day Logo"
                    className="h-14 w-auto max-w-[200px]"
                    width="180"
                    height="48"
                    loading="lazy"
                  />
                </button>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The Ministry of Health of Somalia and its partners are committed to ensuring safe and quality care for every newborn and child. <span className="text-who-orange font-semibold">Patient safety is a key part of quality health care.</span>
              </p>
            </div>

            {/* Quick Links */}
            <nav className="flex flex-col" aria-label="Footer Quick Links">
              <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {link.label === 'Resources' ? (
                      <button
                        type="button"
                        onClick={() => setShowResourcesModal(true)}
                        className="text-gray-300 hover:text-white hover:underline transition-colors focus:outline-none"
                      >
                        {link.label}
                      </button>
                    ) : link.label === 'Past Events' ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-colors focus:outline-none">
                        {link.label}
                      </a>
                    ) : (
                      <a href={link.href} className="text-gray-300 hover:text-white hover:underline transition-colors focus:outline-none">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <address className="flex flex-col not-italic" aria-label="Contact Information">
              <h4 className="text-lg font-semibold mb-6 text-amber-400">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <a href="mailto:qualityassurance@moh.gov.so" className="text-gray-300 hover:text-white hover:underline">qualityassurance@moh.gov.so</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-amber-400" />
                  <a href="tel:+252616053380" className="text-gray-300 hover:text-white hover:underline">+252 61 6053380</a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-amber-400 mt-1" />
                  <span className="text-gray-300">
                    Shangani, Mogadishu<br />
                    Somalia
                  </span>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2025 World Patient Safety Day. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <nav className="flex space-x-6 text-sm" aria-label="Footer Legal Links">
              <Link to="/privacy" className="text-gray-300 hover:text-white hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white hover:underline transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-white hover:underline transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Resources Modal */}
      {showResourcesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true" aria-label="Resources Modal">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-xs w-full relative border border-who-blue">
            <div className="rounded-t-2xl bg-gradient-to-r from-who-blue to-who-orange px-6 py-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Resources</h3>
              <button
                className="text-white text-2xl font-bold focus:outline-none hover:text-who-orange transition-colors"
                onClick={() => setShowResourcesModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <ul className="space-y-2 px-4 py-4">
              <li>
                <a href="/concept-note.pdf" download className="flex items-start gap-3 p-2 rounded-lg hover:bg-who-blue/10 transition">
                  <span className="flex-shrink-0 mt-1 text-who-blue">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  </span>
                  <span>
                    <span className="font-semibold text-who-blue">Concept Note</span>
                    <span className="block text-xs text-gray-500">PDF &middot; 2024-09-01</span>
                    <span className="block text-gray-600 text-xs">Overview of the event's objectives, themes, and key messages.</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/event-agenda.pdf" download className="flex items-start gap-3 p-2 rounded-lg hover:bg-who-blue/10 transition">
                  <span className="flex-shrink-0 mt-1 text-who-blue">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  </span>
                  <span>
                    <span className="font-semibold text-who-blue">Agenda</span>
                    <span className="block text-xs text-gray-500">PDF &middot; 2.1 MB &middot; 2024-09-01</span>
                    <span className="block text-gray-600 text-xs">Detailed schedule of sessions, speakers, and activities.</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/event-printed-materials.pdf" download className="flex items-start gap-3 p-2 rounded-lg hover:bg-who-blue/10 transition">
                  <span className="flex-shrink-0 mt-1 text-who-blue">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  </span>
                  <span>
                    <span className="font-semibold text-who-blue">Event Printed Materials</span>
                    <span className="block text-xs text-gray-500">PDF &middot; 5.8 MB &middot; 2024-09-01</span>
                    <span className="block text-gray-600 text-xs">Flyers, posters, and handouts for event participants.</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;