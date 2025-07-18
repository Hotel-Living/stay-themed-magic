
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
  
  // Create tabs with language-specific labels
  const getTabLabel = (key: string) => {
    if (language === 'pt') {
      const portugueseLabels: Record<string, string> = {
        dashboard: "Painel",
        experience: "Minha Experiência",
        bookings: "Minhas Reservas",
        history: "Histórico de Estadias",
        saved: "Hotéis Salvos",
        payments: "Métodos de Pagamento",
        getThreeNights: "Recomendar um Hotel",
        profile: "Perfil",
        settings: "Configurações",
        notifications: "Alertas"
      };
      return portugueseLabels[key] || key;
    }
    
    if (language === 'ro') {
      const romanianLabels: Record<string, string> = {
        dashboard: "Tablou de bord",
        experience: "Experiența Mea",
        bookings: "Rezervările Mele",
        history: "Istoricul Șederilor",
        saved: "Hoteluri Salvate",
        payments: "Metode de Plată",
        getThreeNights: "Recomandă un Hotel",
        profile: "Profil",
        settings: "Setări",
        notifications: "Alerte"
      };
      return romanianLabels[key] || key;
    }
    
    if (language === 'es') {
      const spanishLabels: Record<string, string> = {
        dashboard: "Tablero",
        experience: "Mi Experiencia",
        bookings: "Mis Reservas",
        history: "Historial de Estadías",
        saved: "Hoteles Guardados",
        payments: "Métodos de Pago",
        getThreeNights: "Recomendar un Hotel",
        profile: "Perfil",
        settings: "Configuración",
        notifications: "Alertas"
      };
      return spanishLabels[key] || key;
    }
    
    // Default English labels
    const englishLabels: Record<string, string> = {
      dashboard: "Dashboard",
      experience: "My Experience",
      bookings: "My Bookings",
      history: "Stay History",
      saved: "Saved Hotels",
      payments: "Payment Methods",
      getThreeNights: "Recommend a Hotel",
      profile: "Profile",
      settings: "Settings",
      notifications: "Alerts"
    };
    return englishLabels[key] || key;
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
