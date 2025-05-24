

import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building, ClipboardList, Users, CreditCard, Filter, Calendar, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const adminTabs: DashboardTab[] = [
  {
    id: "pending",
    label: "Pending Hotels",
    icon: <Building className="w-5 h-5" />
  },
  {
    id: "all",
    label: "All Hotels",
    icon: <ClipboardList className="w-5 h-5" />
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: "payments",
    label: "Payments",
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    id: "affinities",
    label: "Affinities",
    icon: <Search className="w-5 h-5" />
  },
  {
    id: "filters",
    label: "Filters",
    icon: <Filter className="w-5 h-5" />
  }
];

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { signOut, user } = useAuth();
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
          <h1 className="text-3xl font-bold mb-8">ADMIN DASHBOARD</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8 sticky top-24">
                <nav className="p-2 bg-[#7a0486]">
                  {adminTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.id === "pending" ? "/admin" : 
                                          tab.id === "all" ? "/admin/hotels" : 
                                          `/admin/${tab.id}`)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-white",
                        (tab.id === "pending" && location.pathname === "/admin") ||
                        (tab.id === "all" && location.pathname.includes("/admin/hotels")) ||
                        (tab.id !== "pending" && tab.id !== "all" && location.pathname === `/admin/${tab.id}`)
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
              
              <div className="glass-card rounded-2xl p-5 bg-[#7a0486]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A1876]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold text-white">Need Help?</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Contact support if you need assistance with admin functions.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#5A1876] hover:bg-[#6B1F8A]">
                  Contact Support
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

