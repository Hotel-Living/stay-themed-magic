
import React from "react";
import { Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useFilterTranslations } from "@/hooks/useFilterTranslations";

interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}

export function HotelFeaturesInfo({ hotelFeatures, roomFeatures }: HotelFeaturesInfoProps) {
  const { t } = useTranslation('hotel');
  const { translateHotelFeatures, translateRoomFeatures, loading } = useFilterTranslations();
  
  if (!hotelFeatures?.length && !roomFeatures?.length) return null;

  // Show loading state while translations are being fetched
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-white">{t('detail.hotelFeatures')}</h2>
        <div className="animate-pulse text-white">Loading features...</div>
      </div>
    );
  }

  const translatedHotelFeatures = translateHotelFeatures(hotelFeatures || []);
  const translatedRoomFeatures = translateRoomFeatures(roomFeatures || []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-6 text-white">Features & Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelFeatures?.length > 0 && (
          <div className="p-6 rounded-xl bg-[#6000B3] backdrop-blur-sm border border-white/20 shadow-[0_0_50px_rgba(96,0,179,0.8),0_0_80px_rgba(96,0,179,0.4)] hover:shadow-[0_0_60px_rgba(96,0,179,1),0_0_100px_rgba(96,0,179,0.6)] transition-all duration-300 transform hover:scale-[1.02]">
            <h3 className="text-lg font-bold mb-4 text-white text-center">{t('detail.hotelFeatures')}</h3>
            <div className="space-y-3">
              {translatedHotelFeatures.map((feature, index) => (
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
            <h3 className="text-lg font-bold mb-4 text-white text-center">{t('detail.roomFeatures')}</h3>
            <div className="space-y-3">
              {translatedRoomFeatures.map((feature, index) => (
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
