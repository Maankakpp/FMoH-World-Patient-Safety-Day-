import React, { useEffect, useRef } from 'react';
import { Play, Globe, Users, Heart } from 'lucide-react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Video is visible, ensure it's playing
        const currentSrc = videoRef.current.src;
        if (!currentSrc.includes('autoplay=1')) {
          videoRef.current.src = currentSrc + '&autoplay=1&mute=1';
        }
      } else {
        // Video is not visible, pause it
        const currentSrc = videoRef.current.src;
        if (currentSrc.includes('autoplay=1')) {
          videoRef.current.src = currentSrc.replace('&autoplay=1&mute=1', '');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            World Patient Safety Day
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            World Patient Safety Day: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Engaging patients for patient safety</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Documenting our progress in making healthcare safer for everyone. Watch our comprehensive overview of patient safety initiatives and achievements.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                ref={videoRef}
                src="https://www.youtube.com/embed/8P9ABYMsTuE?rel=0&modestbranding=1&start=0&autoplay=1&mute=1&vq=hd1080"
                title="World Patient Safety Day 2025 - Engaging patients for patient safety"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                id="video-iframe"
              ></iframe>
            </div>
            
            {/* Video Overlay Info */}
            <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">World Patient Safety Day 2025</h3>
                  <p className="text-orange-100">Official overview of patient safety initiatives and achievements</p>
                </div>
                <div className="flex items-center gap-4 text-orange-100">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Global Initiative</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Healthcare Professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Patient Safety</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Global Impact</h3>
              </div>
              <p className="text-gray-600">
                Learn about the worldwide impact of patient safety initiatives and how they're transforming healthcare delivery.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Healthcare Professionals</h3>
              </div>
              <p className="text-gray-600">
                Discover how healthcare workers are implementing safety protocols and improving patient outcomes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Patient Safety</h3>
              </div>
              <p className="text-gray-600">
                Explore the latest developments in patient safety and how they're protecting vulnerable populations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 