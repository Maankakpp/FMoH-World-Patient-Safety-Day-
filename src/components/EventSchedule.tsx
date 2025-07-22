import React, { useState } from 'react';
import { Clock, MapPin, Users, Download } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  type: 'ceremony' | 'workshop' | 'presentation' | 'panel';
  speaker?: string;
  location: string;
  description: string;
  duration: string;
}

const EventSchedule: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showCalendarOptions, setShowCalendarOptions] = React.useState(false);
  const event = {
    title: 'World Patient Safety Day 2025',
    details: 'Join healthcare leaders worldwide in our mission to eliminate preventable harm.',
    location: 'Virtual and In-Person',
    start: '20250917T090000Z',
    end: '20250917T170000Z',
  };
  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&startdt=2025-09-17T09:00:00Z&enddt=2025-09-17T17:00:00Z&allday=false&path=/calendar/view/Month`;
  const yahooUrl = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(event.title)}&st=20250917T090000Z&et=20250917T170000Z&desc=${encodeURIComponent(event.details)}&in_loc=${encodeURIComponent(event.location)}`;
  const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//World Patient Safety Day//EN\nBEGIN:VEVENT\nDTSTART:${event.start}\nDTEND:${event.end}\nSUMMARY:${event.title}\nDESCRIPTION:${event.details}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`;
  const downloadICS = () => {
    const blob = new Blob([icsData.replace(/\\n/g, '\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'patient-safety-day-2025.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const schedule: ScheduleItem[] = [
    {
      id: '1',
      time: '09:00 - 09:30',
      title: 'Official Opening Ceremony',
      type: 'ceremony',
      speaker: 'Hon. Minister of Health, Somalia',
      location: 'Ministry of Health Auditorium, Mogadishu',
      description: 'Official opening ceremony with keynote address on Somalia\'s commitment to newborn and child safety.',
      duration: '30 minutes'
    },
    {
      id: '2',
      time: '09:30 - 10:45',
      title: 'Newborn Safety in Somalia: Challenges & Solutions',
      type: 'presentation',
      speaker: 'Dr. Amina Hassan, Pediatric Safety Expert',
      location: 'Main Conference Hall',
      description: 'Overview of current challenges in newborn safety in Somalia and evidence-based solutions for improvement.',
      duration: '75 minutes'
    },
    {
      id: '3',
      time: '10:45 - 11:00',
      title: 'Networking Break',
      type: 'ceremony',
      location: 'Ministry Courtyard',
      description: 'Traditional Somali refreshments and networking opportunity for healthcare professionals.',
      duration: '15 minutes'
    },
    {
      id: '4',
      time: '11:00 - 12:30',
      title: 'Healthcare Worker Training Workshop',
      type: 'workshop',
      speaker: 'WHO Somalia & Ministry of Health Team',
      location: 'Training Center',
      description: 'Interactive workshop on implementing safety protocols for newborn and pediatric care in Somali healthcare facilities.',
      duration: '90 minutes'
    },
    {
      id: '5',
      time: '12:30 - 13:30',
      title: 'Community Lunch & Success Stories',
      type: 'ceremony',
      location: 'Community Hall',
      description: 'Community lunch featuring success stories from Somali healthcare facilities and patient safety improvements.',
      duration: '60 minutes'
    },
    {
      id: '6',
      time: '13:30 - 15:00',
      title: 'Panel: Somalia\'s Path Forward',
      type: 'panel',
      speaker: 'Ministry Officials, WHO, UNICEF, Local Experts',
      location: 'Ministry Auditorium',
      description: 'Panel discussion on Somalia\'s strategic plan for improving newborn and child safety across the healthcare system.',
      duration: '90 minutes'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ceremony': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-blue-100 text-blue-800';
      case 'panel': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!showCalendarOptions) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCalendarOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showCalendarOptions]);

  return (
    <section id="schedule" className="py-20 bg-white" aria-labelledby="schedule-heading">
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="schedule-heading" className="text-4xl font-bold text-who-blue mb-4 text-center">
            Event Schedule
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 text-center">
            A comprehensive day of learning, networking, and advancing patient safety
          </p>
          <div className="relative inline-block" ref={dropdownRef} aria-label="Add to Calendar Options">
            <button
              onClick={() => setShowCalendarOptions((v) => !v)}
              className="inline-flex items-center bg-gradient-to-r from-who-blue to-who-orange text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              aria-haspopup="listbox"
              aria-expanded={showCalendarOptions}
              aria-label="Add to Calendar"
            >
              <Download className="h-5 w-5 mr-2" aria-hidden="true" />
              Add to Calendar
            </button>
            {showCalendarOptions && (
              <div className="absolute z-10 mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[220px]" role="listbox">
                <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-who-blue hover:bg-who-blue/10" role="option">Google Calendar</a>
                <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-who-blue hover:bg-who-blue/10" role="option">Outlook</a>
                <a href={yahooUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-who-blue hover:bg-who-blue/10" role="option">Yahoo Calendar</a>
                <button onClick={downloadICS} className="block w-full text-left px-4 py-2 text-who-blue hover:bg-who-blue/10" role="option">Apple Calendar (.ics)</button>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {schedule.map((item) => (
              <div
                key={item.id}
                className={`card bg-gray-50 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 ${expandedItem === item.id ? 'ring-2 ring-who-blue' : ''}`}
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.time}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-who-blue mb-2 text-center">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      {item.speaker && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" aria-hidden="true" />
                          <span className="text-sm">{item.speaker}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedItem === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EventSchedule;