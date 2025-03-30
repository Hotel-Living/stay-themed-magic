
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calculator,
  PlusCircle,
  Building, 
  Calendar, 
  CreditCard,
  Users,
  BarChart3,
  MessageSquare, 
  Settings
} from "lucide-react";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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
import { useAuth } from "@/context/AuthContext";
import { DashboardTab } from "@/types/dashboard";

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated and is a hotel owner
  useEffect(() => {
    if (!user || !session) {
      console.log("No authenticated user detected in hotel dashboard, redirecting to login");
      window.location.href = "/login";
      return;
    }
    
    if (profile && profile.is_hotel_owner === false) {
      console.log("Non-hotel owner detected in hotel dashboard, redirecting to user dashboard");
      navigate('/user-dashboard');
    }
  }, [user, profile, session, navigate]);
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "calculator", label: "Hotel-Living Calculator", icon: <Calculator className="w-5 h-5" /> },
    { id: "addProperty", label: "+ A Property", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "properties", label: "My Properties", icon: <Building className="w-5 h-5" /> },
    { id: "bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "guests", label: "Guests", icon: <Users className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "finances", label: "Finances", icon: <CreditCard className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const renderContent = () => {
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
  
  // If not authenticated, don't render anything
  if (!user || !session) {
    return null;
  }
  
  return (
    <DashboardLayout 
      activeTab={activeTab}
      tabs={tabs}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
