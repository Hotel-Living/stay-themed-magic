
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
import { useTranslatedConsole } from '@/hooks/useTranslatedSystem';
import { validateDashboardAccess, enforceProductionSecurity } from '@/utils/dashboardSecurity';

export const AssociationDashboard = () => {
  const { signOut, user, session, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const consoleLog = useTranslatedConsole();

  // Check authentication and association dashboard access with improved persistence
  useEffect(() => {
    const checkAccess = async () => {
      // Only check if auth is complete and avoid race conditions
      if (!isLoading) {
        // Add small delay to prevent tab switching issues
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // First check authentication
        if (!user || !session) {
          consoleLog.log("userNotDetected", "in association dashboard, redirecting to association login");
          // Use setTimeout to prevent race conditions
          setTimeout(() => {
            window.location.href = "/login/association";
          }, 100);
          return;
        }
        
        // Apply universal security safeguard for production
        await enforceProductionSecurity(profile, 'association');
        
        // Additional association-specific validation
        const hasAccess = await validateDashboardAccess(profile, 'association');
        if (!hasAccess && profile) {
          console.log("User does not have association access, redirecting based on role:", profile.role);
          // Redirect to appropriate dashboard based on user's actual role
          switch(profile.role) {
            case 'user':
              window.location.href = "/user-dashboard";
              break;
            case 'hotel':
            case 'hotel_owner':
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
        }
      }
    };
    
    checkAccess();
  }, [user, session, profile, isLoading]);

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

        <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none" style={{boxShadow: '0px 0px 18px 3px rgba(0, 174, 255, 0.7)'}}>
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
