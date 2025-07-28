
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssociationHotelsTab } from './tabs/AssociationHotelsTab';
import { RegisteredHotelsTab } from './tabs/RegisteredHotelsTab';
import { CommissionsTab } from './tabs/CommissionsTab';
import { AccountTab } from './tabs/AccountTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { Starfield } from '@/components/Starfield';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';

export const AssociationDashboard = () => {
  const { signOut, user, session, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // For development purposes - allow access to the dashboard without authentication
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if user is authenticated AND has correct association role
  useEffect(() => {
    
    // Only check if auth is complete
    if (!isLoading) {
      // First check authentication
      if (!user || !session) {
        console.log("No authenticated user detected in association dashboard, redirecting to association login");
        window.location.href = "/login/association";
        return;
      }
      
      // Then check association role
      if (profile && profile.role !== 'association') {
        console.log("User does not have association role, redirecting based on role:", profile.role);
        // Redirect to appropriate dashboard based on user's actual role
        switch(profile.role) {
          case 'user':
            window.location.href = "/user-dashboard";
            break;
          case 'hotel':
            if (profile.is_hotel_owner) {
              window.location.href = "/hotel-dashboard";
            } else {
              window.location.href = "/user-dashboard";
            }
            break;
          case 'promoter':
            window.location.href = "/promoter/dashboard";
            break;
          case 'admin':
            window.location.href = "/admin";
            break;
          default:
            window.location.href = "/user-dashboard";
        }
        return;
      }
    }
  }, [user, session, profile, isDevelopment, isLoading]);

  // Handle logout using centralized method from AuthContext
  const handleLogout = async () => {
    try {
      console.log("Association dashboard logout button clicked");
      await signOut();
      console.log("Logout successful, user should be redirected to main page");
      navigate('/');
    } catch (error) {
      console.error("Error during logout from association dashboard:", error);
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

  // If authenticated but not an association (and not in dev mode), don't render
  if (!isDevelopment && profile && profile.role !== 'association') {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Starfield />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Panel de Asociación</h1>
            <p className="text-slate-300 text-lg">Gestione sus hoteles y comisiones</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>

        <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
          <CardContent className="p-6">
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50 border border-blue-500/20">
                <TabsTrigger 
                  value="hotels" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mis hoteles
                </TabsTrigger>
                <TabsTrigger 
                  value="registered" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mis hoteles registrados
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Comisiones
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mi cuenta
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Analíticas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="mt-6">
                <AssociationHotelsTab />
              </TabsContent>

              <TabsContent value="registered" className="mt-6">
                <RegisteredHotelsTab />
              </TabsContent>

              <TabsContent value="commissions" className="mt-6">
                <CommissionsTab />
              </TabsContent>

              <TabsContent value="account" className="mt-6">
                <AccountTab />
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <AnalyticsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};
