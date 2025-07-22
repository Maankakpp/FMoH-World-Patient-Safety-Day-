import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'About World Patient Safety Day', href: '#about' },
    { label: 'Focus Areas', href: '#focus-areas' },
    { label: 'Event Schedule', href: '#schedule' },
    { label: 'Registration', href: '#registration' },
    { label: 'Past Events', href: '#' },
    { label: 'Resources', href: '#' }
  ];

  const [showResourcesModal, setShowResourcesModal] = React.useState(false);
  const [showPastEventsModal, setShowPastEventsModal] = React.useState(false);
  const [pastEventsAutoplay, setPastEventsAutoplay] = React.useState(true);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <button
                  onClick={() => window.location.reload()}
                  className="focus:outline-none"
                  aria-label="Refresh Home"
                >
                  <img
                    src="/wpsd-logo.png"
                    alt="World Patient Safety Day Logo"
                    className="h-12 w-auto max-w-[180px]"
                  />
                </button>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The Ministry of Health of Somalia and its partners are committed to ensuring safe and quality care for every newborn and child. <span className="text-who-orange font-semibold">Patient safety is a key part of quality health care.</span>
              </p>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-who-blue hover:text-who-orange transition-colors p-2 rounded-full bg-white border border-who-blue shadow-sm" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-who-blue hover:text-who-orange transition-colors p-2 rounded-full bg-white border border-who-blue shadow-sm" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-who-blue hover:text-who-orange transition-colors p-2 rounded-full bg-white border border-who-blue shadow-sm" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-who-blue hover:text-who-orange transition-colors p-2 rounded-full bg-white border border-who-blue shadow-sm" aria-label="YouTube">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-6 text-who-blue text-center">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {link.label === 'Resources' ? (
                      <button
                        type="button"
                        onClick={() => setShowResourcesModal(true)}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                      >
                        {link.label}
                      </button>
                    ) : link.label === 'Past Events' ? (
                      <button
                        type="button"
                        onClick={() => setShowPastEventsModal(true)}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white hover:underline transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-6 text-who-blue text-center">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">qualityassurance@moh.gov.so</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">+252 61 6053380</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <span className="text-gray-400">
                    Shangani, Mogadishu<br />
                    Somalia
                  </span>
                </div>
              </div>
            </div>

            {/* Event Statement */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-6 text-who-blue text-center">About the Event</h4>
              <p className="text-gray-400 leading-relaxed max-w-xs mb-4">
                World Patient Safety Day, observed on 17 September, is a global initiative to raise awareness and drive action for safer healthcare for all—especially for newborns and children.
              </p>
            </div>

            {/* Partners */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 World Patient Safety Day. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white hover:underline transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white hover:underline transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Modal */}
      {showResourcesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
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
                    <span className="block text-xs text-gray-500">PDF &middot; 2024-09-01</span>
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
                    <span className="block text-xs text-gray-500">PDF &middot; 2024-09-01</span>
                    <span className="block text-gray-600 text-xs">Flyers, posters, and handouts for event participants.</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Past Events Modal */}
      {showPastEventsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-lg w-full relative border border-who-blue">
            <div
              className="rounded-t-2xl bg-gradient-to-r from-who-blue to-who-orange px-6 py-3 flex items-center justify-between cursor-pointer"
              onMouseEnter={() => setPastEventsAutoplay(true)}
              onMouseLeave={() => setPastEventsAutoplay(false)}
            >
              <h3 className="text-lg font-bold text-white">World Patient Safety Day : Engaging patients for patient safety</h3>
              <button
                className="text-white text-2xl font-bold focus:outline-none hover:text-who-orange transition-colors"
                onClick={() => setShowPastEventsModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="px-4 py-4">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/8P9ABYMsTuE?autoplay=${pastEventsAutoplay ? '1' : '0'}&loop=1&playlist=8P9ABYMsTuE`}
                  title="Past Event Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;