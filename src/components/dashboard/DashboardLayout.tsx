import React, { ReactNode, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut, HelpCircle, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const { profile, signOut, user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
  
  const handleLogout = async () => {
    try {
      console.log("Logout button clicked, checking session...");
      
      // Show toast first to give immediate feedback
      toast({
        title: "Cerrando sesión",
        description: "Redirigiendo a la página de login..."
      });
      
      // Call signOut but don't wait for it to complete
      signOut().catch(error => {
        console.error("Error during signOut, but continuing with redirect:", error);
      });
      
      // Immediately redirect to the login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      console.error("Error during logout from hotel dashboard:", error);
      toast({
        title: "Error",
        description: "No se pudo completar el cierre de sesión. Por favor, inténtelo de nuevo.",
        variant: "destructive"
      });
      
      // Force redirect even if there's an error
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  };

  // If not authenticated and not in development mode, don't render anything
  if (!user && !session && !isDevelopment) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">HOTEL MANAGEMENT</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <nav className="p-2 bg-[#5c0869]">
                  {tabs.map(tab => <button key={tab.id} data-tab={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors", activeTab === tab.id ? "bg-[#5A1876]/20 text-fuchsia-200" : "hover:bg-[#5A1876]/10 text-foreground/80")}>
                      {tab.icon}
                      {tab.label}
                    </button>)}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-[#5A1876]/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5 bg-[#5c0869]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A1876]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold">Need Help?</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-4">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-slate-50 bg-[#770477]">
                  Contact Support
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
