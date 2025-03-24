
import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { LogOut, HelpCircle, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

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
  setActiveTab,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Hotel Management</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <div className="p-6 text-center border-b border-fuchsia-900/20">
                  <div className="w-20 h-20 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-10 h-10 text-fuchsia-300" />
                  </div>
                  <h2 className="font-bold mb-1">Hotel Partner</h2>
                  <p className="text-sm text-muted-foreground">Verified Account</p>
                </div>
                
                <nav className="p-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      data-tab={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === tab.id
                          ? "bg-fuchsia-500/20 text-fuchsia-200"
                          : "hover:bg-fuchsia-500/10 text-foreground/80"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <Link
                    to="/login"
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-fuchsia-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </Link>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold">Need Help?</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-4">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <button className="w-full py-2 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
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
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
