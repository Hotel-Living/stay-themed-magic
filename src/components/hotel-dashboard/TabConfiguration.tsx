
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
import { DashboardTab } from "@/types/dashboard";

// Define the dashboard tabs configuration
export const getDashboardTabs = (): DashboardTab[] => [
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

export default getDashboardTabs;
