
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
      
      {/* Enhanced descriptive blocks with distinct colored backgrounds */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-600/60 via-blue-600/50 to-purple-600/60 backdrop-blur-sm border border-indigo-300/40 shadow-xl">
          <p className="text-white leading-relaxed">
            This {hotel.property_type ? hotel.property_type.toLowerCase() : "property"} is {hotel.style || "welcoming"} and offers extended stay options of {formatStayLengths()}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-600/60 via-teal-600/50 to-cyan-600/60 backdrop-blur-sm border border-emerald-300/40 shadow-xl">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-emerald-100">ES IDEAL PARA QUIENES DISFRUTAN DE</span> {lowercase(getIdealGuestsText())}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-rose-600/60 via-pink-600/50 to-purple-600/60 backdrop-blur-sm border border-rose-300/40 shadow-xl">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-rose-100">EL AMBIENTE ES</span> {lowercase(getAtmosphereText())}.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-amber-600/60 via-orange-600/50 to-red-600/60 backdrop-blur-sm border border-amber-300/40 shadow-xl">
          <p className="text-white leading-relaxed">
            <span className="font-bold text-amber-100">LA UBICACIÓN ES PERFECTA PARA</span> {lowercase(getPerfectLocationText())}.
          </p>
        </div>
        
        {/* Description with enhanced styling */}
        {hotel.description && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-violet-600/60 via-purple-600/50 to-fuchsia-600/60 backdrop-blur-sm border border-violet-300/40 shadow-xl">
            <p className="text-white leading-relaxed">
              {hotel.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
