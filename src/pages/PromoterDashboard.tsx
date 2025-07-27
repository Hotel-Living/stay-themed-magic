import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

export default function PromoterDashboard() {
  const { signOut, user, session, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated
  useEffect(() => {
    // Skip the auth check in development mode
    if (isDevelopment) return;
    
    // Only redirect if auth is complete and user is truly not authenticated
    if (!isLoading && (!user || !session)) {
      console.log("No authenticated user detected in promoter dashboard, redirecting to promoter login");
      window.location.href = "/login/promoter";
    }
  }, [user, session, isDevelopment, isLoading]);

  // Handle logout using centralized method from AuthContext
  const handleLogout = async () => {
    try {
      console.log("Promoter dashboard logout button clicked");
      await signOut();
      console.log("Logout successful, user should be redirected to main page");
      navigate('/');
    } catch (error) {
      console.error("Error during logout from promoter dashboard:", error);
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="text-center text-white relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
          <h1 className="text-4xl font-bold mb-4">Promoter Dashboard</h1>
          <p className="text-xl">Coming Soon</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}