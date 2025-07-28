
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
  Bell
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
  
  // Check if user is an admin
  const checkAdminStatus = async () => {
    if (user) {
      try {
        const { data: isAdmin, error } = await supabase.rpc('has_role', { role_name: 'admin' });
        if (!error && isAdmin) {
          console.log("Admin user detected in user dashboard, redirecting to admin dashboard");
          navigate('/admin/hotels');
          return;
        }
      } catch (error) {
        console.warn('Role check failed, continuing with user dashboard:', error);
        // Fallback: continue with user dashboard
      }
    }
  };

  // Run admin check once
  useEffect(() => {
    checkAdminStatus();
  }, [user]);
  
  // Create tabs with language-specific labels
  const getTabLabel = (key: string) => {
    return t(`dashboard.tabs.${key}`, key); // Fallback to key if translation missing
  };
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: getTabLabel("dashboard"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "experience", label: getTabLabel("experience"), icon: <Star className="w-5 h-5" /> },
    { id: "bookings", label: getTabLabel("bookings"), icon: <Calendar className="w-5 h-5" /> },
    { id: "history", label: getTabLabel("history"), icon: <History className="w-5 h-5" /> },
    { id: "saved", label: getTabLabel("saved"), icon: <Heart className="w-5 h-5" /> },
    { id: "payments", label: getTabLabel("payments"), icon: <CreditCard className="w-5 h-5" /> },
    { id: "getThreeNights", label: getTabLabel("getThreeNights"), icon: <Gift className="w-5 h-5" /> },
    { id: "profile", label: getTabLabel("profile"), icon: <User className="w-5 h-5" /> },
    { id: "settings", label: getTabLabel("settings"), icon: <Settings className="w-5 h-5" /> },
    { id: "notifications", label: getTabLabel("notifications"), icon: <Bell className="w-5 h-5" /> },
  ];
  
  const renderContent = () => {
    switch(activeTab) {
      case "dashboard": return <DashboardContent />;
      case "experience": return <ExperienceContent />;
      case "bookings": return <BookingsContent />;
      case "history": return <HistoryContent />;
      case "saved": return <SavedContent />;
      case "payments": return <PaymentsContent />;
      case "getThreeNights": return <GetThreeNightsContent />;
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
