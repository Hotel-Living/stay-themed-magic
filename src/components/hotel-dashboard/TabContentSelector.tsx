import React from "react";
import { Hotel } from "@/integrations/supabase/types-custom";

interface TabContentSelectorProps {
  activeTab: string;
  hotel?: Hotel;
  onEdit?: () => void;
}

export const TabContentSelector: React.FC<TabContentSelectorProps> = ({ 
  activeTab, 
  hotel, 
  onEdit 
}) => {
  switch (activeTab) {
    case "dashboard":
      return <DashboardContent />;
    case "calculator":
      return <CalculatorContent />;
    case "addProperty":
      return <AddProperty />;
    case "properties":
      return <PropertiesContent />;
    case "bookings":
      return <BookingsContent />;
    case "guests":
      return <GuestsContent />;
    case "analytics":
      return <AnalyticsContent />;
    case "reviews":
      return <ReviewsContent />;
    case "finances":
      return <FinancesContent />;
    case "settings":
      return <SettingsContent />;
    default:
      return <DashboardContent />;
  }
};

export default TabContentSelector;
