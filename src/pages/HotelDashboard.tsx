
import { useTranslation } from "@/hooks/useTranslation";
import { Loader2, AlertTriangle, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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
  const { profile, session, isLoading, user } = useAuth();
  
  // Debugging logs
  console.log('HotelDashboard Debug - Profile:', profile);
  console.log('HotelDashboard Debug - Session:', session);
  console.log('HotelDashboard Debug - isLoading:', isLoading);
  
  // Show loading while auth is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p>Loading Hotel Dashboard...</p>
        </div>
      </div>
    );
  }

  // Only redirect if auth is complete and there's definitely no session
  if (!isLoading && (!session || !user)) {
    // Use setTimeout to prevent race conditions when tab visibility changes
    setTimeout(() => {
      window.location.href = '/login/hotel';
    }, 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Render dashboard immediately - no validation, no suspense, no error boundaries
  const renderDashboard = () => {
    if (language === 'en') return <HotelDashboardEN />;
    if (language === 'es') return <HotelDashboardES />;
    if (language === 'pt') return <HotelDashboardPT />;
    if (language === 'ro') return <HotelDashboardRO />;
    return <HotelDashboardEN />;
  };

  return renderDashboard();
}
