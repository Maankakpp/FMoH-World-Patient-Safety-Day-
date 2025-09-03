import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [participants, setParticipants] = useState(2000);
  const [speakers, setSpeakers] = useState(50);

  // Calculate the next September 17 date
  const today = new Date();
  const currentYear = today.getFullYear();
  const sept17ThisYear = new Date(currentYear, 8, 17); // Month is 0-indexed
  const eventYear = today > sept17ThisYear ? currentYear + 1 : currentYear;
  const eventDateStr = `September 17, ${eventYear}`;

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
      <section id="about" className="relative hero-responsive bg-cover bg-center pt-20" style={{backgroundImage: "url(/Bannerimage.png)"}}>
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {/* Content */}
            <div className="space-y-8 max-w-3xl">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
                <Calendar className="h-4 w-4 mr-2 text-who-lightblue" />
                {eventDateStr}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                Safe care for every
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-who-lightblue to-who-orange"> newborn and child</span>
              </h1>
              
              <div className="bg-white/20 backdrop-blur-sm border-l-4 border-who-orange p-4 rounded-lg mb-6 shadow-soft">
                <p className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                  "Patient safety from the start!"
                </p>
                <p className="text-orange-100 drop-shadow-md">
                  World Patient Safety Day 2025 Theme
                </p>
              </div>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-4 drop-shadow-md">
                The Ministry of Health of Somalia, in collaboration with partners and health institutions, commemorates World Patient Safety Day 2025 focusing on the most vulnerable patients - newborns and children.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-who-lightblue" />
                  <span className="text-white font-medium">
                    <span aria-live="polite" className="font-bold text-lg">{participants.toLocaleString()}</span>+ Participants Expected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-who-orange" />
                  <span className="text-white font-medium">
                    <span aria-live="polite" className="font-bold text-lg">{speakers}+</span> Expert Speakers
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 drop-shadow-md">Event Countdown</h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-gradient-to-br from-who-blue to-who-orange text-white text-2xl font-bold p-4 rounded-xl">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-200 mt-2 capitalize">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const el = document.getElementById('registration');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-gradient-to-r from-who-blue to-who-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Secure Your Spot Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;