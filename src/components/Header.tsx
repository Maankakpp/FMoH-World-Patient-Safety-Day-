import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.location.reload()}
            className="focus:outline-none"
            aria-label="Refresh Home"
          >
            <img
              src="/wpsd-logo.png"
              alt="World Patient Safety Day Logo"
              className="h-14 w-auto max-w-[180px]"
              width="180"
              height="56"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 bg-white/80 rounded-full px-4 py-2 shadow-sm">
          <button
            onClick={() => scrollToSection('about')}
            className="text-who-blue px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:bg-who-blue/10 hover:underline hover:underline-offset-8 focus:outline-none"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('focus-areas')}
            className="text-who-blue px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:bg-who-blue/10 hover:underline hover:underline-offset-8 focus:outline-none"
          >
            Focus Areas
          </button>
          <button
            onClick={() => scrollToSection('schedule')}
            className="text-who-blue px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:bg-who-blue/10 hover:underline hover:underline-offset-8 focus:outline-none"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollToSection('voices')}
            className="text-who-blue px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:bg-who-blue/10 hover:underline hover:underline-offset-8 focus:outline-none"
          >
            Testimonials
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('registration');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-who-blue to-who-orange text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ml-2"
          >
            Register Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 py-6 border-t border-gray-200 bg-white/95 rounded-2xl shadow-xl">
          <nav className="flex flex-col space-y-4 px-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-who-blue text-lg font-medium px-4 py-3 rounded-lg hover:bg-who-blue/10 hover:underline hover:underline-offset-8 text-left transition-all duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('focus-areas')}
              className="text-who-blue text-lg font-medium px-4 py-3 rounded-lg hover:bg-who-blue/10 hover:underline hover:underline-offset-8 text-left transition-all duration-200"
            >
              Focus Areas
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-who-blue text-lg font-medium px-4 py-3 rounded-lg hover:bg-who-blue/10 hover:underline hover:underline-offset-8 text-left transition-all duration-200"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection('voices')}
              className="text-who-blue text-lg font-medium px-4 py-3 rounded-lg hover:bg-who-blue/10 hover:underline hover:underline-offset-8 text-left transition-all duration-200"
            >
              Testimonials
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('registration');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-who-blue to-who-orange text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Register Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;