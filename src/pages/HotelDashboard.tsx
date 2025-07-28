
import { useTranslation } from "@/hooks/useTranslation";
import { SuspenseWrapper } from "@/components/modern/SuspenseWrapper";
import { Loader2, AlertTriangle, RefreshCcw } from "lucide-react";
import HotelDashboardEN from "./HotelDashboard.en";
import HotelDashboardES from "./HotelDashboard.es";
import HotelDashboardPT from "./HotelDashboard.pt";
import HotelDashboardRO from "./HotelDashboard.ro";

// Fallback component for blocked resources
const HotelDashboardFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white text-center max-w-md mx-auto">
      <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
      <h1 className="text-2xl font-bold mb-4">Loading Hotel Dashboard</h1>
      <p className="text-white/80 mb-6">
        If this page doesn't load, please disable your ad blocker or browser extensions for this site.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Reload Page
      </button>
    </div>
  </div>
);

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
