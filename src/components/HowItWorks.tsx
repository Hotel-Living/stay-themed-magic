
import React from 'react';

export const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Browse Hotels</h3>
            <p className="text-gray-300">Find your perfect extended stay accommodation</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Book Your Stay</h3>
            <p className="text-gray-300">Choose your duration and room type</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Enjoy Your Experience</h3>
            <p className="text-gray-300">Live comfortably with all amenities included</p>
          </div>
        </div>
      </div>
    </section>
  );
};
