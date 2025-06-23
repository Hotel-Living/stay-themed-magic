
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelAccordionMenuEN } from "./HotelAccordionMenu.en";

export function HotelAccordionMenu() {
  const { i18n } = useTranslation();
  
  // For now, we'll use the English version since the others don't exist
  // In a real implementation, you'd have language-specific versions
  return <HotelAccordionMenuEN />;
}
