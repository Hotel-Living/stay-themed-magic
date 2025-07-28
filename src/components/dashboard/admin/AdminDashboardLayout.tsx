import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building, ClipboardList, Users, CreditCard, Filter, Calendar, Search, UserCog, MessageCircle, Megaphone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useIsAdmin } from "@/hooks/useIsAdmin";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const baseAdminTabs: DashboardTab[] = [
  {
    id: "hotels",
    label: "All Hotels",
    icon: <Building className="w-5 h-5" />
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
    id: "communications",
    label: "Hotel Communications",
    icon: <MessageCircle className="w-5 h-5" />
  },
  {
    id: "advertising",
    label: "Advertising",
    icon: <Megaphone className="w-5 h-5" />
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
  },
  {
    id: "roles",
    label: "User Roles",
    icon: <Users className="w-5 h-5" />
  }
];

const adminOnlyTabs: DashboardTab[] = [
  {
    id: "manage-roles",
    label: "Manage User Roles",
    icon: <UserCog className="w-5 h-5" />
  }
];

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { signOut, user, session, profile, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useIsAdmin();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated AND has correct admin role
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    
    // Only check if auth is complete
    if (!isLoading) {
      // First check authentication
      if (!user || !session) {
        console.log("No authenticated user detected in admin dashboard layout, redirecting to admin login");
        window.location.href = "/login/user";
        return;
      }
      
      // Then check admin role using isAdmin hook result
      if (!isAdmin && profile) {
        console.log("User does not have admin role, redirecting based on role:", profile.role);
        // Redirect to appropriate dashboard based on user's actual role
        switch(profile.role) {
          case 'user':
            window.location.href = "/user-dashboard";
            break;
          case 'hotel':
            if (profile.is_hotel_owner) {
              window.location.href = "/hotel-dashboard";
            } else {
              window.location.href = "/user-dashboard";
            }
            break;
          case 'association':
            window.location.href = "/panel-asociacion";
            break;
          case 'promoter':
            window.location.href = "/promoter/dashboard";
            break;
          default:
            window.location.href = "/user-dashboard";
        }
        return;
      }
    }
  }, [user, session, profile, isAdmin, isDevelopment, isLoading]);

  // Combine base tabs with admin-only tabs if user is admin
  const adminTabs = isAdmin ? [...baseAdminTabs, ...adminOnlyTabs] : baseAdminTabs;

  // Handle logout using centralized method from AuthContext
  const handleLogout = async () => {
    try {
      console.log("Admin dashboard logout button clicked");
      await signOut();
      console.log("Logout successful, user should be redirected to main page");
      navigate('/');
    } catch (error) {
      console.error("Error during logout from admin dashboard:", error);
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // If not authenticated and not in development mode, don't render anything
  if (!user && !session && !isDevelopment) {
    return null;
  }

  // If authenticated but not an admin (and not in dev mode), don't render
  if (!isDevelopment && !isAdmin && profile) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">ADMIN DASHBOARD</h1>
            
            {/* Panel Fernando Button */}
            <button
              onClick={() => navigate('/panel-fernando')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">Panel Fernando</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden mb-8 sticky top-24 bg-[#7a0486]">
                <nav className="p-2">
                  {adminTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.id === "hotels" ? "/admin/hotels" : 
                                          tab.id === "roles" ? "/admin/roles" :
                                          tab.id === "manage-roles" ? "/admin-roles" :
                                          `/admin/${tab.id}`)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-white",
                        (tab.id === "hotels" && location.pathname.includes("/admin/hotels")) ||
                        (tab.id === "roles" && location.pathname === "/admin/roles") ||
                        (tab.id === "manage-roles" && location.pathname === "/admin-roles") ||
                        (tab.id !== "hotels" && tab.id !== "roles" && tab.id !== "manage-roles" && location.pathname === `/admin/${tab.id}`)
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
