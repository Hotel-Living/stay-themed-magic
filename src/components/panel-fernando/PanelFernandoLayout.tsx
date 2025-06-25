
import React, { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Hotel, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  MessageSquare, 
  Megaphone,
  Heart,
  Filter,
  Users,
  TrendingUp,
  ImageIcon,
  FileText,
  Clock,
  Building2,
  Image as ImageLucide
} from "lucide-react";

interface PanelFernandoLayoutProps {
  children: ReactNode;
}

interface FernandoTab {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
}

const fernandoTabs: FernandoTab[] = [
  {
    id: "hotels",
    label: "Hotels",
    path: "/panel-fernando/hotels",
    icon: Hotel
  },
  {
    id: "bookings",
    label: "Bookings", 
    path: "/panel-fernando/bookings",
    icon: Calendar
  },
  {
    id: "payments",
    label: "Payments",
    path: "/panel-fernando/payments", 
    icon: CreditCard
  },
  {
    id: "statistics",
    label: "Statistics",
    path: "/panel-fernando/statistics",
    icon: BarChart3
  },
  {
    id: "communications",
    label: "Communications",
    path: "/panel-fernando/communications",
    icon: MessageSquare
  },
  {
    id: "advertising",
    label: "Advertising", 
    path: "/panel-fernando/advertising",
    icon: Megaphone
  },
  {
    id: "affinities",
    label: "Affinities",
    path: "/panel-fernando/affinities",
    icon: Heart
  },
  {
    id: "filters", 
    label: "Filters",
    path: "/panel-fernando/filters",
    icon: Filter
  },
  {
    id: "user-roles",
    label: "User Roles",
    path: "/panel-fernando/user-roles", 
    icon: Users
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/panel-fernando/analytics",
    icon: TrendingUp
  },
  {
    id: "batch-images",
    label: "Batch Images",
    path: "/panel-fernando/batch-images",
    icon: ImageIcon
  },
  {
    id: "batch-text",
    label: "Batch Text",
    path: "/panel-fernando/batch-text",
    icon: FileText
  },
  {
    id: "batch-pending",
    label: "Batch Pending", 
    path: "/panel-fernando/batch-pending",
    icon: Clock
  },
  {
    id: "batch-create-hotels",
    label: "Batch Create Hotels",
    path: "/panel-fernando/batch-create-hotels",
    icon: Building2
  },
  {
    id: "32-day-hotels",
    label: "32-Day Hotels Creation",
    path: "/panel-fernando/32-day-hotels",
    icon: Calendar
  },
  {
    id: "batch-room-images",
    label: "Batch Room Images", 
    path: "/panel-fernando/batch-room-images",
    icon: ImageLucide
  }
];

export default function PanelFernandoLayout({ children }: PanelFernandoLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Fernando Admin Panel</h2>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {fernandoTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={isActiveTab(tab.path) ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 text-left ${
                        isActiveTab(tab.path) 
                          ? "bg-white/20 text-white" 
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => handleTabClick(tab.path)}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="glass-card rounded-2xl p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
