
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HotelRegistrationPrompt from "@/components/hotel-dashboard/HotelRegistrationPrompt";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { getDashboardTabs } from "@/components/hotel-dashboard/TabConfiguration";

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();
  
  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Get dashboard tabs configuration
  const tabs = getDashboardTabs();
  
  // Check if user is authenticated and is a hotel owner
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    
    if (!user || !session) {
      console.log("No authenticated user detected in hotel dashboard");
      // Don't redirect immediately, we'll show a registration prompt instead
      return;
    }
    
    if (profile && profile.is_hotel_owner === false) {
      console.log("Non-hotel owner detected in hotel dashboard, redirecting to user dashboard");
      navigate('/user-dashboard');
    }
  }, [user, profile, session, navigate, isDevelopment]);
  
  // If not authenticated and not in development mode, show registration options
  if (!user && !session && !isDevelopment) {
    return (
      <div className="min-h-screen flex flex-col">
        <HotelRegistrationPrompt />
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }
  
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
