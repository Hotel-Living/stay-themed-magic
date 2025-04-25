
import React from "react";
import { Hotel } from "@/integrations/supabase/types-custom";

// Import all required components
import DashboardContent from "@/components/dashboard/DashboardContent";
import AddProperty from "@/components/dashboard/AddProperty";
import CalculatorContent from "@/components/dashboard/Calculator";
import PropertiesContent from "@/components/dashboard/PropertiesContent";
import BookingsContent from "@/components/dashboard/BookingsContent";
import GuestsContent from "@/components/dashboard/GuestsContent";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";
import ReviewsContent from "@/components/dashboard/ReviewsContent";
import FinancesContent from "@/components/dashboard/FinancesContent";
import SettingsContent from "@/components/dashboard/SettingsContent";

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
