import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { validateDashboardAccess, enforceProductionSecurity } from "@/utils/dashboardSecurity";

export default function PromoterDashboard() {
  const { signOut, user, session, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication and promoter dashboard access with improved persistence
  useEffect(() => {
    const checkAccess = async () => {
      // Only check if auth is complete and avoid race conditions
      if (!isLoading) {
        // Add small delay to prevent tab switching issues
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // First check authentication
        if (!user || !session) {
          console.log("No authenticated user detected in promoter dashboard, redirecting to promoter login");
          // Use setTimeout to prevent race conditions
          setTimeout(() => navigate("/login/promoter"), 100);
          return;
        }
        
        // Apply universal security safeguard for production
        await enforceProductionSecurity(profile, 'promoter');
        
        // Additional promoter-specific validation
        const hasAccess = await validateDashboardAccess(profile, 'promoter');
        if (!hasAccess && profile) {
          console.log("User does not have promoter access, redirecting based on role:", profile.role);
          // Redirect to appropriate dashboard based on user's actual role
          switch(profile.role) {
            case 'user':
            case 'guest':
              navigate("/user-dashboard");
              break;
            case 'hotel':
            case 'hotel_owner':
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
        }
      }
    };
    
    checkAccess();
  }, [user, session, profile, isLoading]);

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

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (security handled in useEffect)
  if (!user || !session) {
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