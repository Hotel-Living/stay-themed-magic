
import { useState, useEffect } from "react";
import { 
  Calendar, 
  CreditCard, 
  History, 
  LayoutDashboard, 
  Settings, 
  User, 
  Building,
  Gift,
  Heart,
  Star,
  Bell,
  Crown
} from "lucide-react";
import { Footer } from "@/components/Footer";
import UserDashboardLayout from "@/components/dashboard/user/UserDashboardLayout";
import DashboardContent from "@/components/dashboard/user/tabs/DashboardContent";
import BookingsContent from "@/components/dashboard/user/tabs/BookingsContent";
import HistoryContent from "@/components/dashboard/user/tabs/HistoryContent";
import SavedContent from "@/components/dashboard/user/tabs/SavedContent";
import PaymentsContent from "@/components/dashboard/user/tabs/PaymentsContent";
import ProfileContent from "@/components/dashboard/user/tabs/ProfileContent";
import SettingsContent from "@/components/dashboard/user/tabs/SettingsContent";
import GetThreeNightsContent from "@/components/dashboard/user/tabs/GetThreeNightsContent";
import ExperienceContent from "@/components/dashboard/user/tabs/ExperienceContent";
import BecomeAmbassadorContent from "@/components/dashboard/user/tabs/BecomeAmbassadorContent";
import { NotificationsContent } from "@/components/dashboard/user/tabs/NotificationsContent";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  // Improved user dashboard with better session persistence
  const initializeDashboard = async () => {
    try {
      // Add delay to prevent race conditions when returning to tabs
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!user) {
        console.log("No user found, redirecting to sign-in");
        // Use setTimeout to prevent race conditions
        setTimeout(() => navigate('/sign-in'), 100);
        return;
      }
      
      console.log("User dashboard initialized for:", user.email);
      // No need for additional role validation here - let users access their dashboard
    } catch (error) {
      console.error('Error initializing dashboard:', error);
    }
  };

  // Run initialization once
  useEffect(() => {
    initializeDashboard();
  }, [user]);
  
  // Create tabs with language-specific labels
  const getTabLabel = (key: string) => {
    const translation = t(`userDashboard.tabs.${key}`);
    // If translation is not found (returns key), format it properly
    if (translation === `userDashboard.tabs.${key}`) {
      // Convert camelCase to proper capitalization with spaces
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
    return translation;
  };
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: getTabLabel("dashboard"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "bookings", label: getTabLabel("bookings"), icon: <Calendar className="w-5 h-5" /> },
    { id: "experience", label: getTabLabel("experience"), icon: <Star className="w-5 h-5" /> },
    { id: "getThreeNights", label: getTabLabel("getThreeNights"), icon: <Gift className="w-5 h-5" /> },
    { id: "becomeAmbassador", label: getTabLabel("becomeAmbassador"), icon: <Crown className="w-5 h-5" /> },
    { id: "history", label: getTabLabel("history"), icon: <History className="w-5 h-5" /> },
    { id: "payments", label: getTabLabel("payments"), icon: <CreditCard className="w-5 h-5" /> },
    { id: "profile", label: getTabLabel("profile"), icon: <User className="w-5 h-5" /> },
    { id: "settings", label: getTabLabel("settings"), icon: <Settings className="w-5 h-5" /> },
    { id: "notifications", label: getTabLabel("notifications"), icon: <Bell className="w-5 h-5" /> },
  ];
  
  const renderContent = () => {
    switch(activeTab) {
      case "dashboard": return <DashboardContent />;
      case "bookings": return <BookingsContent />;
      case "experience": return <ExperienceContent />;
      case "getThreeNights": return <GetThreeNightsContent />;
      case "becomeAmbassador": return <BecomeAmbassadorContent />;
      case "history": return <HistoryContent />;
      case "payments": return <PaymentsContent />;
      case "profile": return <ProfileContent />;
      case "settings": return <SettingsContent />;
      case "notifications": return <NotificationsContent />;
      default: return <DashboardContent />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <UserDashboardLayout
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </UserDashboardLayout>
      <Footer />
    </div>
  );
}
