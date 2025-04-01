import React, { ReactNode, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
interface UserDashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  tabs: DashboardTab[];
  setActiveTab: (tab: string) => void;
}
export default function UserDashboardLayout({
  children,
  activeTab,
  tabs,
  setActiveTab
}: UserDashboardLayoutProps) {
  const {
    user,
    profile,
    signOut,
    session
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Use profile data or fallback to defaults
  const userName = profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : profile?.first_name || 'Traveller';

  // Set a default membership type since the field doesn't exist in the Profile type
  const membershipType = 'Premium Member';
  console.log("Current profile in UserDashboardLayout:", profile);

  // Check if user is a hotel owner and redirect if necessary
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    if (profile && profile.is_hotel_owner === true) {
      console.log("Hotel owner detected in user dashboard, redirecting to hotel dashboard");
      navigate('/hotel-dashboard');
    }
  }, [profile, navigate, isDevelopment]);

  // Check if user is authenticated
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    if (!user && !session) {
      console.log("No user detected in dashboard, redirecting to login");
      navigate('/login');
    }
  }, [user, session, navigate, isDevelopment]);
  const handleLogout = async () => {
    try {
      if (!session) {
        console.log("No active session found in dashboard, cannot logout properly");
        toast({
          title: "Error",
          description: "No session found. Please refresh the page and try again.",
          variant: "destructive"
        });
        return;
      }
      await signOut();
    } catch (error) {
      console.error("Error during logout from dashboard:", error);
      toast({
        title: "Error",
        description: "Could not complete logout. Please try again.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <div className="p-6 text-center border-b border-fuchsia-900/20 bg-[#5c0869]">
                  <div className="w-20 h-20 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-10 h-10 text-fuchsia-300">{tabs.find(tab => tab.id === "profile")?.icon}</div>
                  </div>
                  <h2 className="font-bold mb-1">{userName}</h2>
                  <p className="text-sm text-muted-foreground">{membershipType}</p>
                </div>
                
                <nav className="p-2">
                  {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors", activeTab === tab.id ? "bg-fuchsia-500/20 text-fuchsia-200" : "hover:bg-fuchsia-500/10 text-foreground/80")}>
                      {tab.icon}
                      {tab.label}
                    </button>)}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-fuchsia-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </nav>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>;
}