
import { useState } from "react";
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
  Star
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
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is an admin
  const checkAdminStatus = async () => {
    if (user) {
      const { data: isAdmin, error } = await supabase.rpc('has_role', { role_name: 'admin' });
      if (!error && isAdmin) {
        console.log("Admin user detected in user dashboard, redirecting to admin dashboard");
        navigate('/admin/hotels');
        return;
      }
    }
  };

  // Run admin check once
  useState(() => {
    checkAdminStatus();
  });
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "experience", label: "My Experience", icon: <Star className="w-5 h-5" /> },
    { id: "bookings", label: "My Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "history", label: "Stay History", icon: <History className="w-5 h-5" /> },
    { id: "saved", label: "Saved Hotels", icon: <Heart className="w-5 h-5" /> },
    { id: "payments", label: "Payment Methods", icon: <CreditCard className="w-5 h-5" /> },
    { id: "getThreeNights", label: "Recommend a Hotel", icon: <Gift className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
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
