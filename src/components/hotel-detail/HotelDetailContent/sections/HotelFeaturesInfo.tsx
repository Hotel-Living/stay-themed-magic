
import React from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}

export function HotelFeaturesInfo({ hotelFeatures, roomFeatures }: HotelFeaturesInfoProps) {
  const { t } = useTranslation('hotels');
  
  if (!hotelFeatures?.length && !roomFeatures?.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-6 text-white">{t('featuresAndAmenities')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelFeatures?.length > 0 && (
          <div className="p-6 rounded-xl bg-[#6000B3] backdrop-blur-sm border border-white/20 shadow-[0_0_50px_rgba(96,0,179,0.8),0_0_80px_rgba(96,0,179,0.4)] hover:shadow-[0_0_60px_rgba(96,0,179,1),0_0_100px_rgba(96,0,179,0.6)] transition-all duration-300 transform hover:scale-[1.02]">
            <h3 className="text-lg font-bold mb-4 text-white text-center">{t('hotelFeatures')}</h3>
            <div className="space-y-3">
              {hotelFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <Check size={18} className="text-emerald-300 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {roomFeatures?.length > 0 && (
          <div className="p-6 rounded-xl bg-[#6000B3] backdrop-blur-sm border border-white/20 shadow-[0_0_50px_rgba(96,0,179,0.8),0_0_80px_rgba(96,0,179,0.4)] hover:shadow-[0_0_60px_rgba(96,0,179,1),0_0_100px_rgba(96,0,179,0.6)] transition-all duration-300 transform hover:scale-[1.02]">
            <h3 className="text-lg font-bold mb-4 text-white text-center">{t('roomFeatures')}</h3>
            <div className="space-y-3">
              {roomFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <Check size={18} className="text-emerald-300 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
