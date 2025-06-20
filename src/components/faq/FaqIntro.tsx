
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/useTranslation";

export function FaqIntro() {
  const isMobile = useIsMobile();
  const { t } = useTranslation('faq');
  
  const introItems = [
    {
      icon: "🏨",
      text: t('intro.hotelsNeedPeople')
    },
    {
      icon: "👥", 
      text: t('intro.peopleNeedBetterLiving')
    },
    {
      icon: "🌍",
      text: t('intro.societyNeedsUpdate') 
    },
    {
      icon: "🚀",
      text: t('intro.hotelLivingChangesThat')
    }
  ];

  return (
    <div className="mb-16">
      <h2 className={`text-center font-bold ${isMobile ? "text-3xl" : "text-4xl"} mb-6 text-[#FFF9B0]`}>
        {t('intro.whyHotelLivingTitle')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {introItems.map((item, index) => (
          <div key={index} className="glass-card bg-[#460F54]/30 backdrop-blur-md rounded-xl p-6 border border-fuchsia-500/30 text-center">
            <div className="text-4xl mb-4">{item.icon}</div>
            <p className="text-[#FFF9B0] font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
