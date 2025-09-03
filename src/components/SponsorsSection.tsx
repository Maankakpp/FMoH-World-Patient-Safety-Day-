import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sponsors = [
  {
    name: 'World Health Organization (WHO)',
    logo: '/who-logo.png',
    webp: '/who-logo.webp',
    website: 'https://www.who.int'
  },
  {
    name: 'UNICEF',
    logo: '/unicef-logo.png',
    webp: '/unicef-logo.png',
    website: 'https://www.unicef.org'
  },
  {
    name: 'Ministry of Health Somalia',
    logo: '/sponsor-generic.jpg',
    webp: '/sponsor-generic.webp',
    website: '#'
  },
  {
    name: 'Global Health Partners',
    logo: '/sponsor-generic.jpg',
    webp: '/sponsor-generic.webp',
    website: '#'
  },
  {
    name: 'Patient Safety Alliance',
    logo: '/sponsor-generic.jpg',
    webp: '/sponsor-generic.webp',
    website: '#'
  },
  {
    name: 'Somalia Medical Association',
    logo: '/sponsor-generic.jpg',
    webp: '/sponsor-generic.webp',
    website: '#'
  }
];

const SponsorsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const totalPages = Math.ceil(sponsors.length / 6);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(sponsors.length / 6)) % Math.ceil(sponsors.length / 6));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(sponsors.length / 6));
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Get visible sponsors for current page
  const getVisibleSponsors = () => {
    const startIndex = currentIndex * 6;
    return sponsors.slice(startIndex, startIndex + 6);
  };

  const visibleSponsors = getVisibleSponsors();
  const totalPages = Math.ceil(sponsors.length / 6);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < totalPages - 1;

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" aria-label="Event Sponsors">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="section-header">
          <h2 className="section-title">Our Sponsors & Partners</h2>
          <p className="section-subtitle">
            Working together with global health organizations to improve patient safety in Somalia
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Desktop Grid Layout with Navigation */}
          <div className="hidden lg:block">
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Arrows for Desktop */}
              <button 
                onClick={handlePrevious}
                disabled={!canGoLeft}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group ${
                  canGoLeft 
                    ? 'bg-white hover:shadow-xl border-gray-200 hover:border-blue-300' 
                    : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className={`h-6 w-6 transition-colors duration-300 ${
                  canGoLeft ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-400'
                }`} />
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!canGoRight}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group ${
                  canGoRight 
                    ? 'bg-white hover:shadow-xl border-gray-200 hover:border-blue-300' 
                    : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className={`h-6 w-6 transition-colors duration-300 ${
                  canGoRight ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-400'
                }`} />
              </button>

              {/* Desktop Grid */}
              <div className="grid grid-cols-3 xl:grid-cols-6 gap-8 items-center px-8">
                {visibleSponsors.map((sponsor, idx) => (
                  <div key={sponsor.name + idx} className="flex flex-col items-center group">
                    <a 
                      href={sponsor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 hover-lift"
                    >
                      <picture>
                        <source srcSet={sponsor.webp} type="image/webp" />
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name + ' Logo'}
                          className="h-16 w-auto object-contain max-w-full"
                          width="120"
                          height="64"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.alt = 'Logo unavailable';
                          }}
                        />
                      </picture>
                    </a>
                    <p className="text-sm text-gray-600 mt-3 text-center font-medium">{sponsor.name}</p>
                  </div>
                ))}
              </div>

              {/* Dots Indicator for Desktop */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden">
            <div 
              className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 hover:text-blue-600" />
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 hover:text-blue-600" />
              </button>

              {/* Carousel Container */}
              <div className="flex transition-transform duration-500 ease-in-out" ref={sliderRef}>
                {sponsors.map((sponsor, idx) => (
                  <div 
                    key={sponsor.name + idx} 
                    className="flex-shrink-0 w-full px-8 py-8"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <div className="flex flex-col items-center">
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
                      >
                        <picture>
                          <source srcSet={sponsor.webp} type="image/webp" />
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name + ' Logo'}
                            className="h-20 w-auto object-contain max-w-full"
                            width="160"
                            height="80"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.alt = 'Logo unavailable';
                            }}
                          />
                        </picture>
                      </a>
                      <p className="text-sm text-gray-600 mt-4 text-center font-medium">{sponsor.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sponsors.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection; 