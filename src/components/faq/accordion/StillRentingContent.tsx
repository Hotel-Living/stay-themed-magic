
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function StillRentingContent() {
  const { t } = useTranslation();
  
  const title = t('faq.accordionContent.stillRenting.title');
  const subtitle = t('faq.accordionContent.stillRenting.subtitle');
  const points = t('faq.accordionContent.stillRenting.points', { returnObjects: true }) as string[];

  return (
    <div className="space-y-8 text-white">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-[#FEF7CD]">{title}</h3>
        <p className="text-lg text-[#e3d6e9]">{subtitle}</p>
      </div>
      
      <div className="space-y-4">
        {points.map((point, index) => (
          <p key={index} className="text-base font-medium text-center">
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}
