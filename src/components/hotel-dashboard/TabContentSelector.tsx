
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
import AddProperty2Content from "@/components/dashboard/AddProperty2Content";
import { HotelReferralsContent } from "@/components/dashboard/HotelReferralsContent";
import { AvailabilityPackagesContent } from "@/components/dashboard/AvailabilityPackagesContent";

interface TabContentSelectorProps {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}

export default function TabContentSelector({ activeTab, setActiveTab }: TabContentSelectorProps) {
  switch (activeTab) {
    case "welcome-overview":
      return <WelcomeOverviewContent />;
    case "rates-calculator":
      return <RatesCalculatorContent />;
    case "dashboard":
      return <DashboardContent setActiveTab={setActiveTab} />;
    case "packages":
      return <AvailabilityPackagesContent />;
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
    case "referrals":
      return <HotelReferralsContent />;
    case "settings":
      return <SettingsContent />;
    case "terms-conditions":
      return <TermsConditionsContent />;
    case "add-property-2":
      return <AddProperty2Content />;
    default:
      return <DashboardContent setActiveTab={setActiveTab} />;
  }
}
