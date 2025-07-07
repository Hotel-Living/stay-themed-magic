import React from "react";
import { HotelTheme } from "@/types/hotel";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('hotels');
  
  return <>
      {stayLengths.length > 0 && <p className="text-white mt-3 text-base font-medium">
          {t('extendedStayOptions', { 
            stayLengths: stayLengths.join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`) 
          })}
        </p>}
      
      {hotelThemes.length > 0 && <p className="text-white mt-1 text-base">
          {t('welcomingPlaceForGuests', {
            themes: hotelThemes.map(theme => theme.name).join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`)
          })}
        </p>}
      
      {hotelActivities.length > 0 && <p className="text-white mt-1 text-base">
          {t('guestsCanEnjoyActivities', {
            activities: hotelActivities.join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`)
          })}
        </p>}
    </>;
}