import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'about', name: 'About' },
    { id: 'focus-areas', name: 'Focus Areas' },
    { id: 'key-speakers', name: 'Key Speakers' },
    { id: 'schedule', name: 'Schedule' },
    { id: 'testimonials', name: 'Experts' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else {
        setActiveSection('');
      }
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
        isScrolled ? 'bg-white/80 shadow-lg backdrop-blur-lg' : 'bg-white/95 backdrop-blur-sm'
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
            <picture>
              <source srcSet="/wpsd-logo.webp" type="image/webp" />
              <img
                src="/wpsd-logo.png"
                alt="World Patient Safety Day Logo"
                className="h-16 w-auto max-w-[200px]"
                width="200"
                height="62"
                loading="lazy"
              />
            </picture>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2 bg-gray-100/80 rounded-full p-2 shadow-sm" aria-label="Main Navigation">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 font-bold tracking-wider uppercase rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-who-blue text-white shadow-md'
                  : 'text-who-blue hover:bg-who-blue/10'
              }`}
            >
              {section.name}
            </button>
          ))}
          <button
            onClick={() => {
              const el = document.getElementById('registration');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-who-blue to-who-orange text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ml-2"
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
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-3 text-lg font-bold tracking-wider uppercase rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-who-blue text-white'
                    : 'text-who-blue hover:bg-who-blue/10'
                }`}
              >
                {section.name}
              </button>
            ))}
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