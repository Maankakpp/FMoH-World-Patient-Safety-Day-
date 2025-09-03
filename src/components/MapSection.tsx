import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">Event Location</h2>
            <p className="section-subtitle">
              Join us in Mogadishu, Somalia for World Patient Safety Day 2025
            </p>
          </div>

          {/* Map Container */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Map Header */}
                         <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-bold">Mogadishu, Somalia</h3>
                    <p className="text-blue-100 text-sm">Capital City of Somalia</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Navigation className="h-4 w-4" />
                  <span className="text-sm">2.0469° N, 45.3182° E</span>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="relative">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mogadishu,Somalia&zoom=12"
                  title="Mogadishu, Somalia - Event Location"
                  className="w-full h-full"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => {
                    const mapLoading = document.getElementById('map-loading');
                    if (mapLoading) {
                      mapLoading.style.display = 'none';
                    }
                  }}
                ></iframe>
              </div>
              
              {/* Loading Overlay */}
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center" id="map-loading">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading Map...</p>
                </div>
              </div>
            </div>

            {/* Map Info */}
            <div className="p-6 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-sm text-gray-600">Mogadishu, Somalia</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Navigation className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Coordinates</h4>
                  <p className="text-sm text-gray-600">2.0469° N, 45.3182° E</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Region</h4>
                  <p className="text-sm text-gray-600">Banaadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection; 