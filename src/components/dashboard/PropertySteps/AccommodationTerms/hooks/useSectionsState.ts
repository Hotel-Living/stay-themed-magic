
import { useState } from "react";

export const useSectionsState = () => {
  const [sectionsState, setSectionsState] = useState({
    weekday: false,
    stayLength: false,
    mealPlan: false,
    roomRates: false
  });

  const toggleSection = (section: keyof typeof sectionsState) => {
    setSectionsState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return {
    sectionsState,
    toggleSection
  };
};
