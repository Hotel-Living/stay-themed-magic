
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";
import { getDashboardTabs } from "@/components/hotel-dashboard/TabConfiguration";

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("rates-calculator");
  const { profile } = useAuth();
  
  // Get dashboard tabs configuration
  const tabs = getDashboardTabs();
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardLayout 
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
      >
        <TabContentSelector activeTab={activeTab} />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
