
import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building, ClipboardList, CreditCard, BarChart3, MessageCircle, Megaphone, ArrowLeft, Heart, Filter, Users, Image, Type, Settings, Plus, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

interface PanelFernandoLayoutProps {
  children: ReactNode;
}

const fernandoTabs = [
  {
    id: "hotels",
    label: "Hotels",
    icon: <Building className="w-5 h-5" />,
    path: "/panel-fernando/hotels"
  },
  {
    id: "bookings", 
    label: "Bookings",
    icon: <ClipboardList className="w-5 h-5" />,
    path: "/panel-fernando/bookings"
  },
  {
    id: "payments",
    label: "Payments", 
    icon: <CreditCard className="w-5 h-5" />,
    path: "/panel-fernando/payments"
  },
  {
    id: "statistics",
    label: "Statistics",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/panel-fernando/statistics"
  },
  {
    id: "communications",
    label: "Communications",
    icon: <MessageCircle className="w-5 h-5" />,
    path: "/panel-fernando/communications"
  },
  {
    id: "advertising",
    label: "Advertising",
    icon: <Megaphone className="w-5 h-5" />,
    path: "/panel-fernando/advertising"
  },
  {
    id: "affinities",
    label: "Affinities",
    icon: <Heart className="w-5 h-5" />,
    path: "/panel-fernando/affinities"
  },
  {
    id: "filters",
    label: "Filters",
    icon: <Filter className="w-5 h-5" />,
    path: "/panel-fernando/filters"
  },
  {
    id: "user-roles",
    label: "User Roles",
    icon: <Users className="w-5 h-5" />,
    path: "/panel-fernando/user-roles"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/panel-fernando/analytics"
  },
  {
    id: "batch-images",
    label: "Batch Images",
    icon: <Image className="w-5 h-5" />,
    path: "/panel-fernando/batch-images"
  },
  {
    id: "batch-text",
    label: "Batch Text",
    icon: <Type className="w-5 h-5" />,
    path: "/panel-fernando/batch-text"
  },
  {
    id: "batch-pending",
    label: "Batch Pending",
    icon: <Settings className="w-5 h-5" />,
    path: "/panel-fernando/batch-pending"
  },
  {
    id: "batch-create-hotels",
    label: "Batch Create Hotels",
    icon: <Plus className="w-5 h-5" />,
    path: "/panel-fernando/batch-create-hotels"
  },
  {
    id: "batch-room-images",
    label: "Batch Room Images",
    icon: <Camera className="w-5 h-5" />,
    path: "/panel-fernando/batch-room-images"
  }
];

export default function PanelFernandoLayout({ children }: PanelFernandoLayoutProps) {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        description: "Redirecting to login page..."
      });
      navigate('/login');
    } catch (error) {
      toast({
        description: "Could not log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">PANEL FERNANDO</h1>
              <p className="text-white/60">Advanced Admin Control Panel</p>
            </div>
            
            {/* Back to Admin Button */}
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Back to Admin</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden mb-8 sticky top-24 bg-[#7a0486]">
                <nav className="p-2">
                  {fernandoTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.path)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-white",
                        location.pathname === tab.path
                          ? "bg-[#5A1876]/50"
                          : "hover:bg-[#5A1876]/30"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-[#5A1876]/30 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </nav>
              </div>
              
              <div className="rounded-2xl p-5 bg-[#7a0486]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A1876]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold text-white">Panel Fernando</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Advanced administrative tools and comprehensive platform management.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#5A1876] hover:bg-[#6B1F8A]">
                  Documentation
                </button>
              </div>
            </aside>
            
            <div className="lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
