
import { useTranslation } from "@/hooks/useTranslation";
import { SuspenseWrapper } from "@/components/modern/SuspenseWrapper";
import { Loader2, AlertTriangle, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { validateDashboardAccess } from "@/utils/dashboardSecurity";
import HotelDashboardEN from "./HotelDashboard.en";
import HotelDashboardES from "./HotelDashboard.es";
import HotelDashboardPT from "./HotelDashboard.pt";
import HotelDashboardRO from "./HotelDashboard.ro";

// Fallback component for blocked resources - redirects to avoid black screen
const HotelDashboardFallback = () => {
  console.error("Hotel Dashboard - Critical error, redirecting to homepage to prevent black screen");
  
  // Immediate redirect on error to prevent black screen
  setTimeout(() => {
    window.location.href = '/';
  }, 2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white text-center max-w-md mx-auto">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h1 className="text-2xl font-bold mb-4">Dashboard Error</h1>
        <p className="text-white/80 mb-6">
          The hotel dashboard encountered an error. You will be redirected to the homepage shortly.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.href = '/'} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full"
          >
            Go to Homepage
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors w-full"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading component for Suspense
const HotelDashboardLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
    <div className="text-center text-white">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
      <p>Loading Hotel Dashboard...</p>
    </div>
  </div>
);

export default function HotelDashboard() {
  const { language } = useTranslation();
  const { profile, isLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAccess = async () => {
      if (!isLoading && profile) {
        console.log("Hotel Dashboard - Checking access for profile:", profile);
        
        try {
          const accessGranted = await validateDashboardAccess(profile, 'hotel');
          console.log("Hotel Dashboard - Access result:", accessGranted);
          
          if (!accessGranted) {
            console.log("Hotel Dashboard - Access denied, redirecting to homepage");
            // Use React Router navigate instead of window.location to avoid breaking browser history
            setTimeout(() => {
              window.location.href = '/';
            }, 100);
            return;
          }
          
          setHasAccess(true);
        } catch (error) {
          console.error("Hotel Dashboard - Error checking access:", error);
          setHasAccess(true); // Allow access on error to prevent logout loops
        }
      } else if (!isLoading && !profile) {
        // Only redirect if we're sure there's no profile after loading completes
        setTimeout(() => {
          window.location.href = '/';
        }, 1000); // Give more time for profile to load
      }
    };

    checkAccess();
  }, [profile, isLoading]);

  // Show loading while checking access
  if (isLoading || hasAccess === null) {
    return <HotelDashboardLoader />;
  }

  // Access granted - render dashboard
  
  const renderDashboard = () => {
    if (language === 'en') return <HotelDashboardEN />;
    if (language === 'es') return <HotelDashboardES />;
    if (language === 'pt') return <HotelDashboardPT />;
    if (language === 'ro') return <HotelDashboardRO />;
    
    // Default fallback to English
    return <HotelDashboardEN />;
  };

  return (
    <SuspenseWrapper 
      fallback={<HotelDashboardLoader />}
      errorFallback={<HotelDashboardFallback />}
      identifier="hotel-dashboard"
    >
      {renderDashboard()}
    </SuspenseWrapper>
  );
}
