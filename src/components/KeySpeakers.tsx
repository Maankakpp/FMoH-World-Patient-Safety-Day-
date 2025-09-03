import React, { useState } from 'react';
import { Award, Building, Star, Linkedin, Twitter, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const KeySpeakers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Chief Medical Officer",
      organization: "Global Health Institute",
      image: "/speakers/speaker-1.jpg",
      bio: "Leading expert in patient safety with over 20 years of experience in healthcare quality improvement and neonatal care protocols.",
      expertise: ["Patient Safety", "Neonatal Care", "Quality Improvement"],
      social: {
        linkedin: "https://linkedin.com/in/sarah-johnson",
        twitter: "https://twitter.com/drsarahjohnson",
        website: "https://globalhealth.org"
      },
      featured: true
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Professor of Healthcare Management",
      organization: "University of Health Sciences",
      image: "/speakers/speaker-2.jpg",
      bio: "Researcher specializing in healthcare quality improvement and patient safety protocols with extensive experience in developing countries.",
      expertise: ["Healthcare Management", "Research", "Global Health"],
      social: {
        linkedin: "https://linkedin.com/in/michael-chen",
        twitter: "https://twitter.com/profchen",
        website: "https://uhs.edu"
      },
      featured: true
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Patient Safety Specialist",
      organization: "Safety First Healthcare",
      image: "/speakers/speaker-3.jpg",
      bio: "Certified patient safety professional with expertise in protocol development and implementation across diverse healthcare settings.",
      expertise: ["Patient Safety", "Protocol Development", "Training"],
      social: {
        linkedin: "https://linkedin.com/in/emily-rodriguez",
        website: "https://safetyfirsthealthcare.com"
      },
      featured: true
    },
    {
      id: 4,
      name: "Dr. Ahmed Hassan",
      title: "Director of Neonatal Care",
      organization: "Somalia Medical Association",
      image: "/speakers/speaker-4.jpg",
      bio: "Pioneering neonatal care specialist with deep understanding of healthcare challenges in Somalia and East Africa.",
      expertise: ["Neonatal Care", "East Africa Healthcare", "Medical Education"],
      social: {
        linkedin: "https://linkedin.com/in/ahmed-hassan",
        website: "https://somaliamedical.org"
      },
      featured: true
    }
  ];

  const visibleSpeakers = speakers.slice(currentIndex, currentIndex + 3);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex + 3 < speakers.length;

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section id="key-speakers" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="section-header">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-soft">
            <Award className="h-4 w-4" />
            Featured Speakers
          </div>
          <h2 className="section-title">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Key Speakers</span>
          </h2>
          <p className="section-subtitle">
            World-renowned healthcare professionals and patient safety experts sharing their insights and expertise
          </p>
        </div>

        {/* Featured Speakers - 3 in one line with navigation arrows */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Featured Speakers</h3>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Left Arrow */}
            <button 
              onClick={handlePrevious}
              disabled={!canGoLeft}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group ${
                canGoLeft 
                  ? 'bg-white hover:shadow-xl border-gray-200 hover:border-blue-300' 
                  : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className={`h-6 w-6 transition-colors duration-300 ${
                canGoLeft ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-400'
              }`} />
            </button>

            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              disabled={!canGoRight}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 rounded-full p-3 shadow-lg transition-all duration-300 border group ${
                canGoRight 
                  ? 'bg-white hover:shadow-xl border-gray-200 hover:border-blue-300' 
                  : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className={`h-6 w-6 transition-colors duration-300 ${
                canGoRight ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-400'
              }`} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleSpeakers.map((speaker) => (
                                 <div
                   key={speaker.id}
                   className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover-lift"
                 >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Speaker Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-blue-200 transition-all duration-300">
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=2563eb&color=fff&size=128`;
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-full shadow-lg">
                          <Star className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Speaker Info */}
                      <div className="flex-1 min-w-0 text-center">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {speaker.name}
                        </h4>
                        <p className="text-blue-600 font-semibold mb-1 text-sm">{speaker.title}</p>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                          <Building className="h-3 w-3" />
                          <span className="text-xs">{speaker.organization}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {speaker.bio}
                        </p>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {speaker.expertise.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3">
                          {speaker.social.linkedin && (
                            <a
                              href={speaker.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                            >
                              <Linkedin className="h-3 w-3" />
                            </a>
                          )}
                          {speaker.social.twitter && (
                            <a
                              href={speaker.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                            >
                              <Twitter className="h-3 w-3" />
                            </a>
                          )}
                          {speaker.social.website && (
                            <a
                              href={speaker.social.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join Our Distinguished Speakers</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of this transformative event and learn from healthcare leaders who are shaping the future of patient safety
            </p>
                         <a 
               href="#registration" 
               className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
             >
               Register now
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeySpeakers; 