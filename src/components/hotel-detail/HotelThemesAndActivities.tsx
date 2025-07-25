import React from "react";
import { HotelTheme } from "@/types/hotel";
import { useTranslation } from "@/hooks/useTranslation";
interface HotelThemesAndActivitiesProps {
  stayLengths: number[];
  hotelThemes: HotelTheme[];
  hotelActivities: string[];
}
export function HotelThemesAndActivities({
  stayLengths,
  hotelThemes,
  hotelActivities
}: HotelThemesAndActivitiesProps) {
  const { t } = useTranslation('hotel');
  
  return <>
      {stayLengths.length > 0 && <p className="text-white mt-3 text-base font-medium">
          {t('detail.hotelOffersStays')} {stayLengths.join(", ").replace(/, ([^,]*)$/, ` ${t('detail.and')} $1`)} {t('detail.days')}.
        </p>}
      
      {hotelThemes.length > 0 && <p className="text-white mt-1 text-base">
          {t('detail.affinitiesText')} {hotelThemes.map(theme => theme.name).join(", ").replace(/, ([^,]*)$/, ` ${t('detail.and')} $1`)}.
        </p>}
      
      {hotelActivities.length > 0 && <p className="text-white mt-1 text-base">
          {t('detail.activitiesText')} {hotelActivities.join(", ").replace(/, ([^,]*)$/, ` ${t('detail.and')} $1`)}.
        </p>}
    </>;
}