import React, { ReactNode, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useTranslation } from "@/hooks/useTranslation";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  tabs: DashboardTab[];
  setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({
  children,
  activeTab,
  tabs,
  setActiveTab
}: DashboardLayoutProps) {
  const {
    profile,
    signOut,
    user,
    session
  } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation("dashboard");

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    if (!user || !session) {
      console.log("No authenticated user detected in hotel dashboard layout, redirecting to login");
      window.location.href = "/login";
    }
  }, [user, session, isDevelopment]);

  // Use profile data or fallback to defaults
  const partnerName = profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : profile?.first_name || 'Hotel Partner';
  
  // Handle logout using centralized method from AuthContext
  const handleLogout = async () => {
    try {
      console.log("Hotel dashboard logout button clicked");
      await signOut();
    } catch (error) {
      console.error("Error during logout from hotel dashboard:", error);
      // Error handling is already done in the centralized signOut method
    }
  };

  // If not authenticated and not in development mode, don't render anything
  if (!user && !session && !isDevelopment) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            {t('general.hotelManagement')}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <nav className="p-2 bg-[#5c0869]">
                  {tabs.map(tab => <button key={tab.id} data-tab={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("w-full flex items-center justify-start gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-left", activeTab === tab.id ? "bg-[#5A1876]/20 text-fuchsia-200" : "hover:bg-[#5A1876]/10 text-foreground/80")}>
                      {tab.icon}
                      <span className="text-left">{tab.label}</span>
                    </button>)}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <button onClick={handleLogout} className="w-full flex items-center justify-start gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-[#5A1876]/10 transition-colors text-left">
                    <LogOut className="w-5 h-5" />
                    <span className="text-left">{t('general.logOut')}</span>
                  </button>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5 bg-[#5c0869]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A1876]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold">
                    {t('general.needHelp')}
                  </h3>
                </div>
                <p className="text-sm text-foreground/80 mb-4">
                  {t('general.supportDescription')}
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-slate-50 bg-[#770477]">
                  {t('general.contactSupport')}
                </button>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
