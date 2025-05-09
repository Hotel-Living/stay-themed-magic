
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";

export default function Videos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-8">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="glass-card rounded-2xl p-6 bg-[#7a0486]/80 mb-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-fuchsia-200">Featured: Themed Hotels Experience</h3>
                <HotelVideoPlayer />
                <p className="text-sm text-fuchsia-100/80 italic text-center mt-2">
                  Experience the magic of our themed hotels and discover a new way to stay.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="glass-card rounded-xl p-4 bg-[#5d0478]">
                  <h3 className="text-lg font-medium text-fuchsia-200 mb-3">
                    Coming Soon: Hotel Owner Stories
                  </h3>
                  <div className="aspect-video rounded-lg bg-[#460F54]/50 flex items-center justify-center">
                    <p className="text-fuchsia-300">Coming in June 2025</p>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-4 bg-[#5d0478]">
                  <h3 className="text-lg font-medium text-fuchsia-200 mb-3">
                    Coming Soon: Guest Experiences
                  </h3>
                  <div className="aspect-video rounded-lg bg-[#460F54]/50 flex items-center justify-center">
                    <p className="text-fuchsia-300">Coming in July 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
