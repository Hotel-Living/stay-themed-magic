
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { assignRoleToClerkUser, checkEmailHasRole } from "@/hooks/useUserRoles";

export default function RegisterRole() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const { t, isReady } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user already has a role assigned
  useEffect(() => {
    const checkExistingRole = async () => {
      // Only proceed if Clerk is fully loaded and user exists
      if (!isLoaded || !user) return;
      
      // Get email address, prioritizing primary email
      const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
      if (!email) return;
      
      try {
        const { role, error } = await checkEmailHasRole(email);
        
        if (error) {
          console.error("Error checking existing role:", error);
          return;
        }
        
        if (role) {
          // User already has a role, redirect to appropriate dashboard
          switch (role) {
            case 'guest':
            case 'traveler':
              navigate('/user-dashboard');
              break;
            case 'hotel_owner':
            case 'hotel':
              navigate('/panel-hotel');
              break;
            case 'association':
              navigate('/panel-asociacion');
              break;
            case 'promoter':
              navigate('/promoter/dashboard');
              break;
            default:
              navigate('/user-dashboard');
          }
        }
      } catch (err) {
        console.error("Error checking role:", err);
      }
    };

    if (user && isLoaded) {
      checkExistingRole();
    }
  }, [user, isLoaded, navigate]);

  // Note: Removed redirect to /signing as users arrive here after successful authentication
  // If a user somehow reaches this page without authentication, Clerk will handle the redirect

  const handleAccountTypeSelect = async (accountType: string) => {
    // Wait for Clerk to fully load before proceeding
    if (!isLoaded || !user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cargando información del usuario, por favor espera..."
      });
      return;
    }

    // Get email and user ID - prioritize primary email address or fallback to any available email
    const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
    const userId = user.id;

    if (!email || !userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo obtener la información del usuario"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Email and userId are already validated above

      // Map account types to roles
      const roleMapping: Record<string, string> = {
        traveler: 'guest',
        hotel: 'hotel_owner',
        association: 'association',
        promoter: 'promoter'
      };

      const role = roleMapping[accountType];

      // Assign role to user using Clerk ID
      const { success, error } = await assignRoleToClerkUser(userId, email, role);

      if (error) {
        console.error("Error assigning role:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error al asignar el rol. Intenta nuevamente."
        });
        return;
      }

      if (success) {
        // Role assigned successfully, redirect to appropriate dashboard
        switch (accountType) {
          case 'traveler':
            navigate('/user-dashboard');
            break;
          case 'hotel':
            navigate('/panel-hotel');
            break;
          case 'association':
            navigate('/panel-asociacion');
            break;
          case 'promoter':
            navigate('/promoter/dashboard');
            break;
          default:
            navigate('/user-dashboard');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Este correo ya está registrado con otro tipo de cuenta."
        });
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al asignar el rol. Intenta nuevamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading until i18n is ready and Clerk is loaded
  if (!isReady || !isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Starfield />
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              What type of account do you want to create?
            </h1>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => handleAccountTypeSelect('traveler')}
              disabled={isLoading}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : "Traveler"}
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('hotel')}
              disabled={isLoading}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : "Hotel Partner"}
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('association')}
              disabled={isLoading}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : "Association"}
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('promoter')}
              disabled={isLoading}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : "Promoter"}
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              Already have an account?{" "}
              <button 
                onClick={() => navigate('/signing')}
                className="text-white underline hover:text-white/80"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
