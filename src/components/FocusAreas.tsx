import React from 'react';
import { Baby, Shield, Search as Research, Users, Heart, Stethoscope } from 'lucide-react';

const FocusAreas: React.FC = () => {
  const areas = [
    {
      icon: Baby,
      title: "Newborn & Child Safety",
      description: "Protecting Somalia's most vulnerable patients through evidence-based practices and culturally appropriate care protocols.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      icon: Shield,
      title: "Healthcare Professional Training",
      description: "One-week awareness campaigns at 5 selected hospitals in Mogadishu to strengthen healthcare worker capacity.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Research,
      title: "Community Awareness",
      description: "Multimedia campaigns using TV, radio, and social media with #PatientSafetyFromTheStart to educate families.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      icon: Users,
      title: "Parent & Family Engagement",
      description: "Empowering parents and communities through education and involvement in care decisions for their children.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Heart,
      title: "Policy & Advocacy",
      description: "National policy forums and advocacy activities to strengthen maternal and child health services in Somalia.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: Stethoscope,
      title: "Public Service Outreach",
      description: "Radio and TV public service announcements to improve safety awareness in newborn and child care.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="focus-areas" className="py-20 bg-gray-50">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Key Focus Areas for Somalia
          </h2>
          <p className="section-subtitle">
            Addressing critical areas of pediatric and newborn care safety across Somalia's healthcare system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {areas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div
                key={index}
                className={`card ${area.bgColor} group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center hover-lift`}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${area.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-who-blue mb-4 text-center">
                  {area.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;