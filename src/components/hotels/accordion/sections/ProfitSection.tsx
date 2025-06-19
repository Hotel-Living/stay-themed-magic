
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function ProfitSection() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-left py-6">
      <p className="text-base font-semibold py-0">4.1 – {t('hotels.accordion.profitMissing.section1.title')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section1.point1')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section1.point2')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section1.point3')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section1.point4')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section1.point5')}</p>
      
      <p className="text-base font-semibold mt-14 py-[9px] text-[#FFF9B0]">4.2 – {t('hotels.accordion.profitMissing.section2.title')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section2.point1')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section2.point2')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section2.point3')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section2.point4')}</p>
      
      <p className="text-base font-semibold mt-14 py-[17px] text-[#FFF9B0]">4.3 – {t('hotels.accordion.profitMissing.section3.title')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section3.point1')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section3.point2')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section3.point3')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section3.point4')}</p>
      <p className="text-base flex items-start text-[#FFF9B0] pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.profitMissing.section3.point5')}</p>
    </div>
  );
}
