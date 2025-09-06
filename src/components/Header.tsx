import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import RegisterButton from './RegisterButton';

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
  }, [sections]);

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
        isScrolled ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="focus:outline-none" aria-label="Go to homepage">
          <picture>
            <source srcSet="/wpsd-logo.webp" type="image/webp" />
            <img
              src="/wpsd-logo.png"
              alt="World Patient Safety Day Logo"
              className="h-14 w-auto transition-all duration-300 hover:opacity-80"
              width="175"
              height="54"
              loading="lazy"
            />
          </picture>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4" aria-label="Main Navigation">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-3 py-2 font-medium text-gray-700 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-who-blue after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 focus:outline-none ${
                activeSection === section.id ? 'after:scale-x-100' : ''
              }`}
            >
              {section.name}
            </button>
          ))}
          <RegisterButton className="px-5 py-2 rounded-md ml-4" />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700"
        >
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 py-4 bg-white/95 rounded-lg shadow-xl backdrop-blur-md">
          <nav className="flex flex-col space-y-2 px-4">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-3 text-base font-semibold tracking-wide rounded-md text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-who-blue/10 text-who-blue'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.name}
              </button>
            ))}
            <div className="pt-2">
              <RegisterButton className="w-full px-6 py-3 rounded-md" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;