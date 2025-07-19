
import React from 'react';
import { MapKeyTest } from '@/components/test/MapKeyTest';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TestMaps() {
  return (
    <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Google Maps API Test
          </h1>
          
          <div className="flex justify-center">
            <MapKeyTest />
          </div>
          
          <div className="mt-8 p-4 bg-purple-900/30 rounded-lg border border-purple-400/20">
            <h2 className="text-lg font-semibold text-[#f9d3f6] mb-2">Next Steps:</h2>
            <ol className="text-white/80 space-y-1 list-decimal list-inside">
              <li>Test the edge function above</li>
              <li>If successful, clear Cloudflare cache</li>
              <li>Check if hotel-living.com loads properly</li>
              <li>Verify Google Maps components work on hotel pages</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
