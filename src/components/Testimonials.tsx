
import React from 'react';

export const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          What Our Guests Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              "Amazing experience! The extended stay was exactly what I needed for my work assignment."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full mr-4"></div>
              <div>
                <h4 className="text-white font-semibold">John Smith</h4>
                <p className="text-gray-400 text-sm">Business Traveler</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              "Perfect for digital nomads. Great amenities and fantastic service throughout my stay."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full mr-4"></div>
              <div>
                <h4 className="text-white font-semibold">Sarah Johnson</h4>
                <p className="text-gray-400 text-sm">Digital Nomad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
