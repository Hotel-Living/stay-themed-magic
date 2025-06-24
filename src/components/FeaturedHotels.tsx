
import React from 'react';

export const FeaturedHotels = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Featured Hotels
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Sample Hotel 1</h3>
            <p className="text-gray-300">Experience luxury and comfort</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Sample Hotel 2</h3>
            <p className="text-gray-300">Modern amenities and great location</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Sample Hotel 3</h3>
            <p className="text-gray-300">Perfect for extended stays</p>
          </div>
        </div>
      </div>
    </section>
  );
};
