
import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('hotels');
  
  return (
    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-purple-800/30 via-fuchsia-800/20 to-purple-900/30 backdrop-blur-sm border border-white/20 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white text-left">{t('atAGlance')}</h2>
      
      {/* Enhanced descriptive blocks with purple background and strong glow */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-[#791381] backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(121,19,129,0.6)] hover:shadow-[0_0_40px_rgba(121,19,129,0.8)] transition-shadow duration-300">
          <p className="text-white leading-relaxed">
            This {hotel.property_type ? hotel.property_type.toLowerCase() : "property"} is {hotel.style || "welcoming"} and offers extended stay options of {formatStayLengths()}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-[#791381] backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(121,19,129,0.6)] hover:shadow-[0_0_40px_rgba(121,19,129,0.8)] transition-shadow duration-300">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-purple-100">ES IDEAL PARA QUIENES DISFRUTAN DE</span> {lowercase(getIdealGuestsText())}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-[#791381] backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(121,19,129,0.6)] hover:shadow-[0_0_40px_rgba(121,19,129,0.8)] transition-shadow duration-300">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-purple-100">EL AMBIENTE ES</span> {lowercase(getAtmosphereText())}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-[#791381] backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(121,19,129,0.6)] hover:shadow-[0_0_40px_rgba(121,19,129,0.8)] transition-shadow duration-300">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-purple-100">LA UBICACIÓN ES PERFECTA PARA</span> {lowercase(getPerfectLocationText())}.
          </p>
        </div>
        
        {/* Description with enhanced styling */}
        {hotel.description && (
          <div className="p-4 rounded-lg bg-[#791381] backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(121,19,129,0.6)] hover:shadow-[0_0_40px_rgba(121,19,129,0.8)] transition-shadow duration-300">
            <p className="text-white leading-relaxed">
              {hotel.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
