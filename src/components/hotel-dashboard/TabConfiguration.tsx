
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

export const getDashboardTabs = (): DashboardTab[] => [
  {
    id: "rates-calculator",
    label: "Rates Calculator", 
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: "dashboard",
    label: "Dashboard", 
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: "properties",
    label: "Properties",
    icon: <Building className="w-5 h-5" />
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
    label: "Messages from Admin",
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
    id: "advertising",
    label: "Advertising",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />
  }
];
