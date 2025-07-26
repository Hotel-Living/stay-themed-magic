
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function RegisterRole() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check authentication and role status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/signing');
        return;
      }
      
      setUser(session.user);
      
      // Check if user already has a role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profile?.role) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

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
      };

      const role = roleMapping[accountType];

      // Update user profile with role
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile configured",
        description: "Redirecting to your dashboard..."
      });

      // Navigate to dashboard which will handle role-based routing
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Error assigning role:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Error assigning role. Please try again."
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
