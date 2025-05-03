
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
  return (
    <>
      {stayLengths.length > 0 && (
        <p className="text-sm text-amber-400 mt-3">
          This hotel offers extended stay options of {stayLengths.join(", ").replace(/, ([^,]*)$/, " and $1")} nights.
        </p>
      )}
      
      {hotelThemes.length > 0 && (
        <>
          <p className="mt-2 text-purple-300">
            <span className="font-semibold text-purple-100">Affinities:</span> {hotelThemes.map(theme => theme.name).join(" · ")}
          </p>
          <p className="text-sm text-purple-400 mt-1">
            A welcoming place for guests with a passion for {hotelThemes.map(theme => theme.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
        </>
      )}
      
      {hotelActivities.length > 0 && (
        <>
          <p className="mt-2 text-purple-300">
            <span className="font-semibold text-purple-100">Activities:</span> {hotelActivities.join(" · ")}
          </p>
          <p className="text-sm text-purple-400 mt-1">
            Guests can enjoy activities such as {hotelActivities.join(", ").replace(/, ([^,]*)$/, " and $1")} right from the hotel or nearby.
          </p>
        </>
      )}
    </>
  );
}
