import React, { useRef, useEffect } from 'react';

const sponsors = [
  {
    name: 'World Health Organization (WHO)',
    logo: '/who-logo.png',
  },
  {
    name: 'UNICEF',
    logo: '/unicef-logo.png',
  },
  {
    name: 'Global Health Partners',
    logo: '/sponsor-generic.jpg',
  },
  {
    name: 'Patient Safety Alliance',
    logo: '/sponsor-generic.jpg',
  },
  // Add more sponsors as needed
];

const SponsorsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationFrame: number;
    const speed = 1; // px per frame

    function animate() {
      if (!slider) return;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    slider.scrollLeft = 0;
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate sponsors for infinite loop effect
  const allSponsors = [...sponsors, ...sponsors];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-who-blue mb-8">Our Sponsors & Partners</h2>
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-8 py-4 justify-start items-center scrollbar-hide relative whitespace-nowrap select-none"
            style={{ scrollBehavior: 'auto' }}
          >
            {allSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 bg-white border-2 border-who-blue rounded-xl shadow-md p-4 flex flex-col items-center min-w-[140px] max-w-[180px] mx-2"
                style={{ transition: 'transform 0.3s' }}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name + ' Logo'}
                  className="h-16 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  width="64"
                  height="64"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Event Location Map */}
      <div className="container mt-8">
        <div className="bg-white/60 rounded-2xl p-4 mb-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', opacity: 0.7 }}>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden mx-auto">
            <iframe
              title="Event Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.96496424649!2d45.318162!3d2.046934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d5841e2e2e2e2e2%3A0x123456789abcdef!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sso!4v1710000000000!5m2!1sen!2sso"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorsSection; 