
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, UserPlus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";
import { EnhancedAvatarAssistant } from "@/components/avatars/EnhancedAvatarAssistant";

export default function HotelDashboardEN() {
  const [activeTab, setActiveTab] = useState<string>("welcome-overview");
  const { profile } = useAuth();
  
  // Create dashboard tabs configuration with English labels
  const tabs: DashboardTab[] = [
    {
      id: "welcome-overview",
      label: "Welcome Overview",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "rates-calculator",
      label: (
        <>
          Calculate Model
          <br />
          Rates and Profits
        </>
      ),
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: "properties",
      label: "Properties",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "add-property-2",
      label: "Add Property 2",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "advertising",
      label: "Advertising",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "guests",
      label: "Guests",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "messages",
      label: "Admin Messages",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "finances",
      label: "Finances",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "referrals",
      label: "🏨 Refer Hotels – Earn Commissions",
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: "terms-conditions",
      label: "Terms and Conditions",
      icon: <FileText className="w-5 h-5" />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardLayout 
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
      >
        <TabContentSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      </DashboardLayout>
      <Footer />
      
      {/* Persistent Martin avatar for hotel dashboard */}
      <EnhancedAvatarAssistant
        avatarId="martin"
        gif="https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif"
        position="bottom-right"
        showMessage={false}
      />
    </div>
  );
}
