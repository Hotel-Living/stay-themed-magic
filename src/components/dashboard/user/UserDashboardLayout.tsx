import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/types/dashboard";
import { useAuth } from "@/context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

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
  const { signOut, user, session, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    
    // Only redirect if auth is complete and user is truly not authenticated
    if (!isLoading && (!user || !session)) {
      console.log("No authenticated user detected in user dashboard layout, redirecting to user login");
      window.location.href = "/login/user";
    }
  }, [user, session, isDevelopment, isLoading]);
  
  // Handle logout using centralized method from AuthContext
  const handleLogout = async () => {
    try {
      console.log("User dashboard logout button clicked");
      await signOut();
      console.log("Logout successful, user should be redirected to main page");
      navigate('/');
    } catch (error) {
      console.error("Error during logout from user dashboard:", error);
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const dashboardTitle = language === 'pt' ? "PAINEL DO USUÁRIO" :
                        language === 'ro' ? "TABLOU DE BORD UTILIZATOR" :
                        language === 'es' ? "PANEL DE USUARIO" :
                        "USER DASHBOARD";
  
  const needHelpTitle = language === 'pt' ? "Precisa de ajuda?" :
                       language === 'ro' ? "Ai nevoie de ajutor?" :
                       language === 'es' ? "¿Necesitas Ayuda?" :
                       "Need Help?";
  
  const supportDescription = language === 'pt' ? "Nossa equipe de suporte está disponível 24/7 para ajudá-lo com quaisquer dúvidas." :
                            language === 'ro' ? "Echipa noastră de suport este disponibilă 24/7 pentru a vă asista cu orice întrebări." :
                            language === 'es' ? "Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier pregunta." :
                            "Our support team is available 24/7 to assist you with any questions.";
  
  const contactSupport = language === 'pt' ? "Contatar Suporte" :
                        language === 'ro' ? "Contactează suportul" :
                        language === 'es' ? "Contactar Soporte" :
                        "Contact Support";
  
  const logOut = language === 'pt' ? "Sair" :
                language === 'ro' ? "Deconectare" :
                language === 'es' ? "Cerrar Sesión" :
                "Log Out";
  
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{dashboardTitle}</h1>
          
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
                    {logOut}
                  </button>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5 bg-[#5c0869]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#7A0486]/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold text-white">{needHelpTitle}</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  {supportDescription}
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
                  {contactSupport}
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
