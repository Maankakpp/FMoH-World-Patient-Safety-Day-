import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';
import RegisterButton from './RegisterButton';
import { Helmet } from 'react-helmet-async';

const images = ['/Bannerimage.png', '/WPSD2025.webp', '/WPSD20251.webp', '/wpsdmsg2.webp'];

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [participants, setParticipants] = useState(2000);
  const [speakers, setSpeakers] = useState(50);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate the next September 17 date
  const today = new Date();
  const currentYear = today.getFullYear();
  const sept17ThisYear = new Date(currentYear, 8, 17); // Month is 0-indexed
  const eventYear = today > sept17ThisYear ? currentYear + 1 : currentYear;
  const eventDateStr = `September 17, ${eventYear}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Set event date - September 17, 2025
    const eventDate = new Date('2025-09-17T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate counters up to target values
    let p = 0;
    let s = 0;
    const pTarget = 2000;
    const sTarget = 50;
    const pStep = Math.ceil(pTarget / 60);
    const sStep = Math.ceil(sTarget / 60);
    const interval = setInterval(() => {
      p = Math.min(p + pStep, pTarget);
      s = Math.min(s + sStep, sTarget);
      setParticipants(p);
      setSpeakers(s);
      if (p === pTarget && s === sTarget) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>World Patient Safety Day 2025 Somalia - Safe care for every newborn and child</title>
        <meta name="description" content="Join World Patient Safety Day 2025 - Unite with healthcare professionals worldwide to eliminate preventable harm and ensure safer care for every patient." />
        <meta property="og:title" content="World Patient Safety Day 2025 Somalia - Safe care for every newborn and child" />
        <meta property="og:description" content="Ministry of Health Somalia commemorates World Patient Safety Day 2025 with the theme 'Safe care for every newborn and child' - Patient safety from the start!" />
        <meta property="og:image" content="/hero-healthcare.webp" />
        <meta property="og:url" content="https://patientsafetyday2025.somalia.gov.so" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section id="about" className="bg-gray-100 text-gray-800 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                <Calendar className="h-4 w-4 mr-2 text-who-lightblue" />
                {eventDateStr}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mt-6 leading-tight drop-shadow-sm">
                Safe care for every
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-who-lightblue to-who-orange"> newborn and child</span>
              </h1>
              
              <div className="bg-white border-l-4 border-who-orange p-4 rounded-lg mt-6 shadow-lg">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  "Patient safety from the start!"
                </p>
                <p className="text-orange-600">
                  World Patient Safety Day 2025 Theme
                </p>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mt-6">
                The Ministry of Health of Somalia, in collaboration with partners and health institutions, commemorates World Patient Safety Day 2025 focusing on the most vulnerable patients - newborns and children.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                  <Users className="h-6 w-6 text-who-lightblue" />
                  <span className="font-medium">
                    <span aria-live="polite" className="font-bold text-xl">{participants.toLocaleString()}</span>+
                    <span className="block text-sm text-gray-500">Participants Expected</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                  <Award className="h-6 w-6 text-who-orange" />
                  <span className="font-medium">
                    <span aria-live="polite" className="font-bold text-xl">{speakers}+</span>
                    <span className="block text-sm text-gray-500">Expert Speakers</span>
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Event Countdown</h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-gradient-to-br from-who-blue to-who-orange text-white text-2xl font-bold p-4 rounded-xl">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-500 mt-2 capitalize">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <RegisterButton className="px-8 py-4 text-lg">
                  Secure Your Spot Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </RegisterButton>
              </div>
            </div>

            {/* Right Column: Image Slideshow */}
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              {images.map((image, index) => (
                <div
                  key={image}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <img
                    src={image}
                    alt="Hero background blur"
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={image}
                    alt="Hero background"
                    className="relative w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;