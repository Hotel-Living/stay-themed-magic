
import React from 'react';
import WelcomeOverview from "@/components/dashboard/WelcomeOverview";
import PropertiesContent from "@/components/dashboard/properties/PropertiesContent";
import BookingsContent from "@/components/dashboard/BookingsContent";
import CalendarContent from "@/components/dashboard/CalendarContent";
import FinancesContent from "@/components/dashboard/FinancesContent";
import GuestsContent from "@/components/dashboard/GuestsContent";
import MessagesContent from "@/components/dashboard/MessagesContent";
import ReviewsContent from "@/components/dashboard/ReviewsContent";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";
import SupportContent from "@/components/dashboard/SupportContent";

interface TabContentSelectorProps {
  activeTab: string;
}

export default function TabContentSelector({ activeTab }: TabContentSelectorProps) {
  const renderContent = () => {
    switch(activeTab) {
      case "welcome-overview": return <WelcomeOverview />;
      case "properties": return <PropertiesContent />;
      case "bookings": return <BookingsContent />;
      case "calendar": return <CalendarContent />;
      case "finances": return <FinancesContent />;
      case "guests": return <GuestsContent />;
      case "messages": return <MessagesContent />;
      case "reviews": return <ReviewsContent />;
      case "analytics": return <AnalyticsContent />;
      case "support": return <SupportContent />;
      default: return <WelcomeOverview />;
    }
  };

  return <>{renderContent()}</>;
}
