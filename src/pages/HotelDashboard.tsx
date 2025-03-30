
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calculator,
  PlusCircle,
  Building, 
  Calendar, 
  CreditCard,
  Users,
  BarChart3,
  MessageSquare, 
  Settings
} from "lucide-react";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import AddProperty from "@/components/dashboard/AddProperty";
import CalculatorContent from "@/components/dashboard/Calculator";
import PropertiesContent from "@/components/dashboard/PropertiesContent";
import BookingsContent from "@/components/dashboard/BookingsContent";
import GuestsContent from "@/components/dashboard/GuestsContent";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";
import ReviewsContent from "@/components/dashboard/ReviewsContent";
import FinancesContent from "@/components/dashboard/FinancesContent";
import SettingsContent from "@/components/dashboard/SettingsContent";
import { useAuth } from "@/context/AuthContext";
import { DashboardTab } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated and is a hotel owner
  useEffect(() => {
    if (!user || !session) {
      console.log("No authenticated user detected in hotel dashboard");
      // Don't redirect immediately, we'll show a registration prompt instead
      return;
    }
    
    if (profile && profile.is_hotel_owner === false) {
      console.log("Non-hotel owner detected in hotel dashboard, redirecting to user dashboard");
      navigate('/user-dashboard');
    }
  }, [user, profile, session, navigate]);
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "calculator", label: "Hotel-Living Calculator", icon: <Calculator className="w-5 h-5" /> },
    { id: "addProperty", label: "+ A Property", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "properties", label: "My Properties", icon: <Building className="w-5 h-5" /> },
    { id: "bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "guests", label: "Guests", icon: <Users className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "finances", label: "Finances", icon: <CreditCard className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "calculator":
        return <CalculatorContent />;
      case "addProperty":
        return <AddProperty />;
      case "properties":
        return <PropertiesContent />;
      case "bookings":
        return <BookingsContent />;
      case "guests":
        return <GuestsContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "reviews":
        return <ReviewsContent />;
      case "finances":
        return <FinancesContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };
  
  // If not authenticated, show registration options
  if (!user || !session) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 bg-background/80 backdrop-blur-md border-b border-border fixed w-full z-10">
          <div className="container flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">Hotel-Living</Link>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="container max-w-xl p-6 text-center">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-8 bg-black/60 backdrop-blur-sm">
                <Building className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h1 className="text-3xl font-bold mb-4">Hotel Partner Portal</h1>
                <p className="text-muted-foreground mb-8">
                  List your hotel or property on Hotel-Living and connect with travelers looking for unique themed stays.
                </p>
                
                <div className="space-y-4">
                  <Link to="/hotel-signup">
                    <Button className="w-full py-6 text-lg">
                      Register as a Hotel Partner
                    </Button>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
                
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background/20 rounded-lg">
                    <h3 className="font-medium mb-2">List Your Property</h3>
                    <p className="text-xs text-muted-foreground">Create listings for your themed properties with photos and details</p>
                  </div>
                  
                  <div className="p-4 bg-background/20 rounded-lg">
                    <h3 className="font-medium mb-2">Manage Bookings</h3>
                    <p className="text-xs text-muted-foreground">Handle reservations, check-ins and manage guest communications</p>
                  </div>
                  
                  <div className="p-4 bg-background/20 rounded-lg">
                    <h3 className="font-medium mb-2">Analytics & Revenue</h3>
                    <p className="text-xs text-muted-foreground">Track performance, adjust pricing and grow your business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <DashboardLayout 
      activeTab={activeTab}
      tabs={tabs}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
