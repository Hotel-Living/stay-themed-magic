
import { 
  Calendar, 
  LayoutDashboard, 
  Building, 
  CreditCard, 
  Users, 
  MessageSquare, 
  Star, 
  BarChart, 
  HelpCircle 
} from "lucide-react";
import { DashboardTab } from "@/types/dashboard";
import { useTranslation } from "@/hooks/useTranslation";

export const getDashboardTabs = (): DashboardTab[] => {
  const { t } = useTranslation();
  
  return [
    { 
      id: "welcome-overview", 
      label: t('hotelTabs.welcomeOverview'), 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      id: "properties", 
      label: t('hotelTabs.properties'), 
      icon: <Building className="w-5 h-5" /> 
    },
    { 
      id: "bookings", 
      label: t('hotelTabs.bookings'), 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      id: "calendar", 
      label: t('hotelTabs.calendar'), 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      id: "finances", 
      label: t('hotelTabs.finances'), 
      icon: <CreditCard className="w-5 h-5" /> 
    },
    { 
      id: "guests", 
      label: t('hotelTabs.guests'), 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: "messages", 
      label: t('hotelTabs.messages'), 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
    { 
      id: "reviews", 
      label: t('hotelTabs.reviews'), 
      icon: <Star className="w-5 h-5" /> 
    },
    { 
      id: "analytics", 
      label: t('hotelTabs.analytics'), 
      icon: <BarChart className="w-5 h-5" /> 
    },
    { 
      id: "support", 
      label: t('hotelTabs.support'), 
      icon: <HelpCircle className="w-5 h-5" /> 
    }
  ];
};
