
import React from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import PropertiesContent from "@/components/dashboard/PropertiesContent";
import { BookingsContent } from "@/components/dashboard/BookingsContent";
import { GuestsContent } from "@/components/dashboard/GuestsContent";
import { AdminMessagesContent } from "@/components/dashboard/hotel-messages/AdminMessagesContent";
import { FinancesContent } from "@/components/dashboard/FinancesContent";
import { ReviewsContent } from "@/components/dashboard/ReviewsContent";
import AdvertisingContent from "@/components/dashboard/AdvertisingContent";
import { AnalyticsContent } from "@/components/dashboard/AnalyticsContent";
import SettingsContent from "@/components/dashboard/SettingsContent";
import { RatesCalculatorContent } from "@/components/dashboard/RatesCalculatorContent";
import { WelcomeOverviewContent } from "@/components/dashboard/WelcomeOverviewContent";
import { TermsConditionsContent } from "@/components/dashboard/TermsConditionsContent";

interface TabContentSelectorProps {
  activeTab: string;
}

export default function TabContentSelector({ activeTab }: TabContentSelectorProps) {
  switch (activeTab) {
    case "welcome-overview":
      return <WelcomeOverviewContent />;
    case "rates-calculator":
      return <RatesCalculatorContent />;
    case "dashboard":
      return <DashboardContent />;
    case "properties":
      return <PropertiesContent />;
    case "bookings":
      return <BookingsContent />;
    case "guests":
      return <GuestsContent />;
    case "messages":
      return <AdminMessagesContent />;
    case "finances":
      return <FinancesContent />;
    case "reviews":
      return <ReviewsContent />;
    case "advertising":
      return <AdvertisingContent />;
    case "analytics":
      return <AnalyticsContent />;
    case "settings":
      return <SettingsContent />;
    case "terms-conditions":
      return <TermsConditionsContent />;
    default:
      return <DashboardContent />;
  }
}
