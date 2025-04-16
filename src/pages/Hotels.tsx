
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { ZeroRiskSection } from "@/components/hotels/ZeroRiskSection";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
import { HotelCards } from "@/components/hotels/HotelCards";
import { HotelFeatures } from "@/components/hotels/HotelFeatures";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";

export default function Hotels() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center">
          {/* Main content */}
          <HotelSlogans />
          
          <div className="max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60 z-20">
            <HotelAccordionMenu />
          </div>
          
          {/* Grid of cards */}
          <HotelCards />
          
          {/* Features section */}
          <HotelFeatures />
          
          {/* Video Player section */}
          <div className="w-full max-w-2xl mt-16 mb-12">
            <HotelVideoPlayer />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
