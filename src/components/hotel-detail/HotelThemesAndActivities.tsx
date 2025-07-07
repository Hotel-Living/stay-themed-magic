import React from "react";
import { HotelTheme } from "@/types/hotel";
import { useTranslation } from "react-i18next";
import { useThemesWithTranslationsES } from "@/hooks/useThemesWithTranslations.es";
import { useThemesWithTranslationsPT } from "@/hooks/useThemesWithTranslations.pt";
import { useThemesWithTranslationsRO } from "@/hooks/useThemesWithTranslations.ro";
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
  const { t, i18n } = useTranslation('hotels');
  
  // Get translated themes based on current language
  const { data: themesES } = useThemesWithTranslationsES();
  const { data: themesPT } = useThemesWithTranslationsPT();
  const { data: themesRO } = useThemesWithTranslationsRO();
  
  // Get appropriate theme translations based on current language
  const getTranslatedThemeName = (themeName: string): string => {
    if (i18n.language === 'es' && themesES) {
      const translatedTheme = themesES.find(t => t.name.toLowerCase() === themeName.toLowerCase());
      return translatedTheme?.name || themeName;
    } else if (i18n.language === 'pt' && themesPT) {
      const translatedTheme = themesPT.find(t => t.name.toLowerCase() === themeName.toLowerCase());
      return translatedTheme?.name || themeName;
    } else if (i18n.language === 'ro' && themesRO) {
      const translatedTheme = themesRO.find(t => t.name.toLowerCase() === themeName.toLowerCase());
      return translatedTheme?.name || themeName;
    }
    return themeName;
  };
  
  return <>
      {stayLengths.length > 0 && <p className="text-white mt-3 text-base font-medium">
          {t('extendedStayOptions', { 
            stayLengths: stayLengths.join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`) 
          })}
        </p>}
      
      {hotelThemes.length > 0 && <p className="text-white mt-1 text-base">
          {t('welcomingPlaceForGuests', {
            themes: hotelThemes.map(theme => getTranslatedThemeName(theme.name)).join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`)
          })}
        </p>}
      
      {hotelActivities.length > 0 && <p className="text-white mt-1 text-base">
          {t('guestsCanEnjoyActivities', {
            activities: hotelActivities.join(", ").replace(/, ([^,]*)$/, ` ${t('and')} $1`)
          })}
        </p>}
    </>;
}