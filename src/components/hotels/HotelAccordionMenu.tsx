
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelAccordionMenuEN } from "./HotelAccordionMenu.en";
import { HotelAccordionMenuES } from "./HotelAccordionMenu.es";
import { HotelAccordionMenuPT } from "./HotelAccordionMenu.pt";

export function HotelAccordionMenu() {
  const { language } = useTranslation();
  
  // Route to the appropriate language-specific component
  switch (language) {
    case 'es':
      return <HotelAccordionMenuES />;
    case 'pt':
      return <HotelAccordionMenuPT />;
    case 'en':
    default:
      return <HotelAccordionMenuEN />;
  }
}
