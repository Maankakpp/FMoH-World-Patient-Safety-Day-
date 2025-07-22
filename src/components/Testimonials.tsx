import React from 'react';
import { Star, Quote, Users, Building, Globe, CalendarCheck } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Fadumo Ahmed",
      role: "Chief of Pediatrics, Banadir Hospital, Mogadishu",
      image: "/testimonial-1.jpg",
      content: "World Patient Safety Day initiatives have transformed our approach to newborn care. The training and protocols have significantly reduced preventable complications in our NICU.",
      rating: 5
    },
    {
      id: 2,
      name: "Dr. Mohamed Hassan",
      role: "Patient Safety Coordinator, Medina Hospital",
      image: "/testimonial-2.jpg",
      content: "The Ministry's patient safety campaign has helped us implement life-saving protocols. Our staff now feels more confident in providing safe care for Somalia's children.",
      rating: 5
    },
    {
      id: 3,
      name: "Nurse Halima Omar",
      role: "Neonatal Care Specialist, Digfer Hospital",
      image: "/testimonial-3.jpg",
      content: "The awareness campaigns have empowered our nursing team with knowledge and tools to provide safer care for newborns. Every child deserves this level of protection.",
      rating: 5
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "Healthcare Professionals in Somalia Trained",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      gradient: "from-blue-100 to-blue-300",
      ring: "ring-blue-200"
    },
    {
      number: "5",
      label: "Major Hospitals in Mogadishu Participating",
      icon: <Building className="h-8 w-8 text-teal-600" />,
      gradient: "from-teal-100 to-teal-300",
      ring: "ring-teal-200"
    },
    {
      number: "18",
      label: "Regions Across Somalia Engaged",
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      gradient: "from-orange-100 to-orange-300",
      ring: "ring-orange-200"
    },
    {
      number: "2025",
      label: "Year of Renewed Commitment",
      icon: <CalendarCheck className="h-8 w-8 text-purple-600" />,
      gradient: "from-purple-100 to-purple-300",
      ring: "ring-purple-200"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container">
        {/* Statistics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-who-blue mb-4 text-center">
              Patient Safety: The Foundation of Quality Health Care
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center">
              Healthcare professionals across Somalia are committed to making care safer for every newborn and child
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`card relative group bg-gradient-to-br ${stat.gradient} text-center border-t-4 border-b-4 border-white/60 hover:scale-105 transition-all duration-300`}
              >
                <div className={`mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg ring-4 ${stat.ring} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-700 font-medium text-center">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 id="voices" className="text-3xl font-bold text-who-blue mb-4 text-center">
              Voices from Somalia's Healthcare Experts
            </h3>
            <p className="text-lg text-gray-700">
              Hear from Somali healthcare professionals making a difference in patient safety
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="card shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              >
                <div className="flex items-center mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic text-center">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}, ${testimonial.role}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div className="ml-4 text-center">
                    <div className="font-bold text-who-blue">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Section */}
        <div className="card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              World Patient Safety Day: Engaging patients for patient safety
            </h3>
            <p className="text-gray-700">
              Documenting our progress in making healthcare safer for everyone
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-lg mx-auto">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/8P9ABYMsTuE?autoplay=1&mute=1&loop=1&playlist=8P9ABYMsTuE"
              title="World Patient Safety Day: Engaging patients for patient safety"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ minHeight: '300px', background: '#000' }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;