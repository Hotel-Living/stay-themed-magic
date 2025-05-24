import React from "react";
import { HotelTheme } from "@/types/hotel";
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
  return <>
      {stayLengths.length > 0 && <p className="text-white mt-3 text-base font-medium">
          This hotel offers extended stay options of {stayLengths.join(", ").replace(/, ([^,]*)$/, " and $1")} nights.
        </p>}
      
      {hotelThemes.length > 0 && <p className="text-white mt-1 text-base">
          This is a welcoming place for guests with a passion for {hotelThemes.map(theme => theme.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>}
      
      {hotelActivities.length > 0 && <p className="text-white mt-1 text-base">
          Guests can enjoy activities such as {hotelActivities.join(", ").replace(/, ([^,]*)$/, " and $1")} right from the hotel or nearby.
        </p>}
    </>;
}