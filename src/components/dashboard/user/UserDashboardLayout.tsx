
import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
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
  const { profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
              Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}!
            </h1>
          </div>
          
          {/* Mobile Tab Navigation */}
          <div className="block lg:hidden mb-6">
            <div className="bg-purple-900/30 p-1 rounded-xl backdrop-blur-sm overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                      activeTab === tab.id 
                        ? "bg-fuchsia-600 text-white" 
                        : "text-white hover:bg-fuchsia-500/20"
                    )}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8 sticky top-24">
                <nav className="p-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === tab.id 
                          ? "bg-fuchsia-600 text-white" 
                          : "text-white hover:bg-fuchsia-500/20"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
