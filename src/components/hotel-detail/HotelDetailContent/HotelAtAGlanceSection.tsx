
import React from "react";
import { HotelDetailProps } from "@/types/hotel";

interface HotelAtAGlanceSectionProps {
  hotel: HotelDetailProps;
  formatStayLengths: () => string;
  getIdealGuestsText: () => string;
  getPerfectLocationText: () => string;
  getAtmosphereText: () => string;
  lowercase: (text: string | null | undefined) => string;
}

export function HotelAtAGlanceSection({ 
  hotel, 
  formatStayLengths, 
  getIdealGuestsText, 
  getPerfectLocationText, 
  getAtmosphereText, 
  lowercase 
}: HotelAtAGlanceSectionProps) {
  return (
    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-purple-800/30 via-fuchsia-800/20 to-purple-900/30 backdrop-blur-sm border border-white/20 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white text-left">AT A GLANCE...</h2>
      
      {/* Content with diagonal purple-to-gold animated backgrounds */}
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s' }}>
          <p className="text-white">
            This {hotel.property_type ? hotel.property_type.toLowerCase() : "property"} is {hotel.style || "welcoming"} and offers extended stay options of {formatStayLengths()}.
          </p>
        </div>
        
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '0.4s' }}>
          <p className="text-white">
            It's ideal for guests who enjoy {lowercase(getIdealGuestsText())}.
          </p>
        </div>
        
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '0.8s' }}>
          <p className="text-white">
            The vibe of this hotel is {lowercase(getAtmosphereText())}.
          </p>
        </div>
        
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '1.2s' }}>
          <p className="text-white">
            Our location is perfect for {lowercase(getPerfectLocationText())}.
          </p>
        </div>
        
        {/* Description with enhanced styling - NOW WITH SAME ANIMATED BACKGROUND */}
        {hotel.description && (
          <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '1.6s' }}>
            <p className="text-white leading-relaxed">
              {hotel.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
