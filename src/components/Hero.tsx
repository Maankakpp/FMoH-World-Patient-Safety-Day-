import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';

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
    <section id="about" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="h-4 w-4 mr-2" />
              {eventDateStr}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Safe care for every
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> newborn and child</span>
            </h1>
            
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-lg mb-6">
              <p className="text-lg font-semibold text-orange-800 mb-2">
                "Patient safety from the start!"
              </p>
              <p className="text-orange-700">
                World Patient Safety Day 2025 Theme
              </p>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              The Ministry of Health of Somalia, in collaboration with partners and health institutions, commemorates World Patient Safety Day 2025 focusing on the most vulnerable patients - newborns and children.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">
                  <span aria-live="polite" className="font-bold text-who-blue text-lg">{participants.toLocaleString()}</span>+ Participants Expected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700 font-medium">
                  <span aria-live="polite" className="font-bold text-who-orange text-lg">{speakers}+</span> Expert Speakers
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Countdown</h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-2xl font-bold p-4 rounded-xl">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 mt-2 capitalize">{unit}</div>
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
              className="group bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              Secure Your Spot Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-200 to-teal-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/hero-healthcare.jpg"
                alt="Healthcare professionals caring for newborns"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                width="800"
                height="384"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm text-gray-600">Making Healthcare Safer</p>
              <p className="font-bold text-gray-900">For Everyone, Everywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;