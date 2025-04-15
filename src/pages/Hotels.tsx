
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { ZeroRiskSection } from "@/components/hotels/ZeroRiskSection";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
import { HotelCards } from "@/components/hotels/HotelCards";
import { HotelFeatures } from "@/components/hotels/HotelFeatures";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { HotelBackground } from "@/components/hotels/HotelBackground";

export default function Hotels() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelBackground />
      <Navbar />
      
      <main className="flex-1 pt-16 relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col items-center">
          {/* Hero section with enhanced styling */}
          <div className="mb-16 text-center">
            <HotelSlogans />
          </div>
          
          {/* Accordion menu with enhanced styling */}
          <div className="max-w-4xl w-full backdrop-blur-md rounded-xl border border-fuchsia-400/30 
                          p-4 md:p-6 bg-gradient-to-b from-[#460F54]/50 to-[#300A38]/70 shadow-[0_10px_25px_rgba(93,4,120,0.25)] 
                          animate-fade-in z-20">
            <HotelAccordionMenu />
          </div>
          
          {/* Zero risk section */}
          <div className="my-16 w-full max-w-4xl">
            <ZeroRiskSection />
          </div>
          
          {/* Grid of cards with enhanced styling */}
          <div className="my-16 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gradient">
              Explore Our Exclusive Hotels
            </h2>
            <HotelCards />
          </div>
          
          {/* Features section with enhanced styling */}
          <div className="my-16 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gradient">
              Hotel Living Experience
            </h2>
            <HotelFeatures />
          </div>
          
          {/* Video Player section with enhanced styling */}
          <div className="w-full max-w-4xl mt-16 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gradient">
              See Our Hotels in Action
            </h2>
            <HotelVideoPlayer />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
