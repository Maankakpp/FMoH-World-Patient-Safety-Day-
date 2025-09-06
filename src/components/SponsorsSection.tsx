import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Data for Sponsors ---
// This array holds the information for each sponsor.
const sponsors = [
  { name: 'World Health Organization (WHO)', logo: '/who-logo.png', website: 'https://www.who.int' },
  { name: 'UNICEF', logo: '/unicef-logo.png', website: 'https://www.unicef.org' },
  { name: 'Wadajir Hospital', logo: '/wadajirh.png', website: '#' },
  { name: 'Xamar Hospital', logo: '/Xamarh.png', website: '#' },
  { name: 'Royal Hospital', logo: '/Royalh.png', website: '#' },
  { name: 'Save the Children', logo: '/SavetheChildren.png', website: 'https://www.savethechildren.org/' },
  { name: 'SOS Children\'s Villages', logo: '/SOS.png', website: 'https://www.sos-childrensvillages.org/' },
  { name: 'International Rescue Committee', logo: '/IRC.png', website: 'https://www.rescue.org/' },
  { name: 'Population Services International', logo: '/PSI.png', website: 'https://www.psi.org/' },
  { name: 'Action Against Hunger', logo: '/AAH.png', website: 'https://www.actionagainsthunger.org/' },

];

const SponsorsSection: React.FC = () => {
  // --- State Management ---
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  // --- Constants for Layout ---
  const SPONSORS_PER_PAGE = 6;
  const totalPages = Math.ceil(sponsors.length / SPONSORS_PER_PAGE);

  // --- Navigation Logic ---
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // --- Touch Swipe Logic for Mobile ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swiped left
      handleNext();
    } else if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right
      handlePrevious();
    }
  };

  // --- Data Slicing for Desktop View ---
  const getVisibleSponsors = () => {
    const startIndex = currentIndex * SPONSORS_PER_PAGE;
    return sponsors.slice(startIndex, startIndex + SPONSORS_PER_PAGE);
  };

  const visibleSponsors = getVisibleSponsors();

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" aria-label="Event Sponsors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight sm:text-5xl">Our Sponsors & Partners</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Working together with global health organizations to improve patient safety in Somalia.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* --- Desktop Grid Layout (Visible on lg screens and up) --- */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Previous Button */}
              <button 
                onClick={handlePrevious}
                aria-label="Previous sponsors"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group bg-white hover:bg-blue-50"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>
              
              {/* Next Button */}
              <button 
                onClick={handleNext}
                aria-label="Next sponsors"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group bg-white hover:bg-blue-50"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>

              {/* Sponsors Grid */}
              <div className="grid grid-cols-3 xl:grid-cols-6 gap-8 items-center">
                {visibleSponsors.map((sponsor) => (
                  <a 
                    key={sponsor.name}
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex justify-center items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    title={sponsor.name}
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} Logo`}
                      className="h-16 w-auto object-contain max-w-full transition-transform duration-300 group-hover:scale-110"
                      width="120"
                      height="64"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- Mobile/Tablet Carousel (Hidden on lg screens and up) --- */}
          <div className="lg:hidden">
            <div 
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Carousel Container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {/* Create pages for the carousel */}
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 px-2">
                    {sponsors.slice(pageIndex * SPONSORS_PER_PAGE, (pageIndex + 1) * SPONSORS_PER_PAGE).map((sponsor) => (
                       <a 
                         key={sponsor.name}
                         href={sponsor.website} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group flex justify-center items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                         title={sponsor.name}
                       >
                         <img
                           src={sponsor.logo}
                           alt={`${sponsor.name} Logo`}
                           className="h-14 w-auto object-contain max-w-full"
                           width="120"
                           height="56"
                           loading="lazy"
                         />
                       </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
             {/* Carousel Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${ 
                      currentIndex === idx ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
