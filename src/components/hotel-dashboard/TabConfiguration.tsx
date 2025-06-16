
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";
import { useTranslation } from "@/hooks/useTranslation";

export const getDashboardTabs = (): DashboardTab[] => {
  const { t, language } = useTranslation();
  
  return [
    {
      id: "welcome-overview",
      label: language === 'es' ? t('dashboard.welcomeOverview') : "Welcome & Overview", 
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "dashboard",
      label: language === 'es' ? t('dashboard.dashboard') : "Dashboard", 
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "rates-calculator",
      label: language === 'es' ? (
        <>
          {t('dashboard.calculateModel')}
          <br />
          {t('dashboard.ratesAndProfits')}
        </>
      ) : (
        <>
          Calculate Your Model
          <br />
          Rates and Profits
        </>
      ), 
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: "properties",
      label: language === 'es' ? t('dashboard.properties') : "Properties",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "advertising",
      label: language === 'es' ? t('dashboard.advertising') : "Advertising",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: language === 'es' ? t('dashboard.bookings') : "Bookings",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "guests",
      label: language === 'es' ? t('dashboard.guests') : "Guests",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "messages",
      label: language === 'es' ? t('dashboard.adminMessages') : "Messages from Admin",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "finances",
      label: language === 'es' ? t('dashboard.finances') : "Finances",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "reviews",
      label: language === 'es' ? t('dashboard.reviews') : "Reviews",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "analytics",
      label: language === 'es' ? t('dashboard.analytics') : "Analytics",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "settings",
      label: language === 'es' ? t('dashboard.settings') : "Settings",
      icon: <Settings className="w-5 h-5" />
    }
  ];
};
