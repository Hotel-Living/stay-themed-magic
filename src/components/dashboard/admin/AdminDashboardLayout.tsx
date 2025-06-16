
import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building, ClipboardList, Users, CreditCard, Filter, Calendar, Search, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useTranslation } from "@/hooks/useTranslation";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useIsAdmin();
  const { t } = useTranslation();

  const baseAdminTabs: DashboardTab[] = [
    {
      id: "pending",
      label: t('adminDashboard.pendingHotels'),
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "all",
      label: t('adminDashboard.allHotels'),
      icon: <ClipboardList className="w-5 h-5" />
    },
    {
      id: "users",
      label: t('adminDashboard.users'),
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: t('adminDashboard.bookings'),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "payments",
      label: t('adminDashboard.payments'),
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "affinities",
      label: t('adminDashboard.affinities'),
      icon: <Search className="w-5 h-5" />
    },
    {
      id: "filters",
      label: t('adminDashboard.filters'),
      icon: <Filter className="w-5 h-5" />
    },
    {
      id: "roles",
      label: t('adminDashboard.userRoles'),
      icon: <Users className="w-5 h-5" />
    }
  ];

  const adminOnlyTabs: DashboardTab[] = [
    {
      id: "manage-roles",
      label: t('adminDashboard.manageUserRoles'),
      icon: <UserCog className="w-5 h-5" />
    }
  ];

  // Combine base tabs with admin-only tabs if user is admin
  const adminTabs = isAdmin ? [...baseAdminTabs, ...adminOnlyTabs] : baseAdminTabs;

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
          <h1 className="text-3xl font-bold mb-8">{t('adminDashboard.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden mb-8 sticky top-24 bg-[#7a0486]">
                <nav className="p-2">
                  {adminTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.id === "pending" ? "/admin" : 
                                          tab.id === "all" ? "/admin/hotels" : 
                                          tab.id === "roles" ? "/admin/roles" :
                                          tab.id === "manage-roles" ? "/admin-roles" :
                                          `/admin/${tab.id}`)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-white",
                        (tab.id === "pending" && location.pathname === "/admin") ||
                        (tab.id === "all" && location.pathname.includes("/admin/hotels")) ||
                        (tab.id === "roles" && location.pathname === "/admin/roles") ||
                        (tab.id === "manage-roles" && location.pathname === "/admin-roles") ||
                        (tab.id !== "pending" && tab.id !== "all" && tab.id !== "roles" && tab.id !== "manage-roles" && location.pathname === `/admin/${tab.id}`)
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
                    {t('adminDashboard.logOut')}
                  </button>
                </nav>
              </div>
              
              <div className="rounded-2xl p-5 bg-[#7a0486]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A1876]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold text-white">{t('adminDashboard.needHelp')}</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  {t('adminDashboard.supportHelp')}
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#5A1876] hover:bg-[#6B1F8A]">
                  {t('adminDashboard.contactSupport')}
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
