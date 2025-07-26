
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterRole() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to entrance page if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/entrance');
    }
  }, [user, navigate]);

  const handleAccountTypeSelect = async (accountType: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No user session found"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Map account types to roles
      const roleMapping: Record<string, string> = {
        traveler: 'guest',
        hotel: 'hotel_owner',
        association: 'association',
        promoter: 'promoter',
        agent: 'agent'
      };

      const role = roleMapping[accountType];

      // Update user profile with role
      await updateProfile({ role });

      // MANUAL ROUTING - Direct navigation as requested
      // This bypasses any automated redirect logic
      switch (accountType) {
        case 'traveler':
          navigate('/user-dashboard', { replace: true });
          break;
        case 'hotel':
          navigate('/hotel-dashboard', { replace: true });
          break;
        case 'association':
          navigate('/panel-asociacion', { replace: true });
          break;
        case 'promoter':
          navigate('/promoter/dashboard', { replace: true });
          break;
        case 'agent':
          navigate('/panel-agente', { replace: true });
          break;
        default:
          navigate('/user-dashboard', { replace: true });
          break;
      }

      toast({
        title: "Perfil configurado",
        description: "Redirigiendo a tu panel de control..."
      });

    } catch (error: any) {
      console.error('Error assigning role:', error);
      
      // Enhanced error handling for constraint violations
      let errorMessage = "Error al asignar el rol. Intenta nuevamente.";
      if (error.message?.includes('profiles_role_check')) {
        errorMessage = "Error en la asignación de rol. El rol seleccionado no es válido.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if no user
  if (!user) {
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
                onClick={() => navigate('/entrance')}
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
