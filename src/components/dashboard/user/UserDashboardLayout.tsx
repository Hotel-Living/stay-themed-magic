
import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

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
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Error",
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
          <h1 className="text-3xl font-bold mb-8">USER DASHBOARD</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <nav className="p-2 bg-[#5c0869]">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-white",
                        activeTab === tab.id
                          ? "bg-[#7A0486]/50"
                          : "hover:bg-[#7A0486]/30"
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
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-[#7A0486]/30 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5 bg-[#5c0869]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#7A0486]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold text-white">Need Help?</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
                  Contact Support
                </button>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3 bg-[#5700AD] rounded-2xl p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
