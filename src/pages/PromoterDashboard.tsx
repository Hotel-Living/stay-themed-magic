import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

export default function PromoterDashboard() {
  const { signOut, user, session, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated AND has correct promoter role
  useEffect(() => {
    // Log development mode but continue with auth checks
    if (isDevelopment) {
      if (process.env.NODE_ENV === 'development') console.log('Development mode: Skipping role validation for PromoterDashboard');
      // Continue to auth checks instead of returning
    }
    
    // Only check if auth is complete
    if (!isLoading) {
      // First check authentication
      if (!user || !session) {
        console.log("No authenticated user detected in promoter dashboard, redirecting to promoter login");
        navigate("/login/promoter");
        return;
      }
      
      // Then check promoter role
      if (profile && profile.role !== 'promoter') {
        console.log("User does not have promoter role, redirecting based on role:", profile.role);
        // Redirect to appropriate dashboard based on user's actual role
        switch(profile.role) {
          case 'user':
            navigate("/user-dashboard");
            break;
          case 'hotel':
            if (profile.is_hotel_owner) {
              navigate("/hotel-dashboard");
            } else {
              navigate("/user-dashboard");
            }
            break;
          case 'association':
            navigate("/panel-asociacion");
            break;
          case 'admin':
            navigate("/admin");
            break;
          default:
            navigate("/user-dashboard");
        }
        return;
      }
    }
  }, [user, session, profile, isDevelopment, isLoading]);

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

  // If not authenticated and not in development mode, don't render anything
  if (!user && !session && !isDevelopment) {
    return null;
  }

  // If authenticated but not a promoter (and not in dev mode), don't render
  if (!isDevelopment && profile && profile.role !== 'promoter') {
    return null;
  }

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