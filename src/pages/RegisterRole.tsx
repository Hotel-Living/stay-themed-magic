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
        navigate('/entrance');
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
      // Map account type to role
      const roleMapping: { [key: string]: string } = {
        'traveler': 'guest',
        'hotel': 'hotel_owner',
        'association': 'association',
        'promoter': 'promoter'
      };

      const role = roleMapping[accountType];
      
      if (!role) {
        throw new Error('Invalid account type');
      }

      // Update user role in profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Account type selected",
        description: "Your account has been set up successfully!"
      });

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update account type"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose Your Account Type
            </h1>
            <p className="text-white/80 text-lg">
              Select the option that best describes you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              onClick={() => handleAccountTypeSelect('traveler')}
              disabled={isLoading}
              className="h-32 flex flex-col items-center justify-center space-y-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              <span className="text-2xl">🧳</span>
              <span className="text-lg font-semibold">Traveler</span>
              <span className="text-sm opacity-80">Book amazing stays</span>
            </Button>

            <Button
              onClick={() => handleAccountTypeSelect('hotel')}
              disabled={isLoading}
              className="h-32 flex flex-col items-center justify-center space-y-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              <span className="text-2xl">🏨</span>
              <span className="text-lg font-semibold">Hotel Partner</span>
              <span className="text-sm opacity-80">List your property</span>
            </Button>

            <Button
              onClick={() => handleAccountTypeSelect('association')}
              disabled={isLoading}
              className="h-32 flex flex-col items-center justify-center space-y-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              <span className="text-2xl">🤝</span>
              <span className="text-lg font-semibold">Association</span>
              <span className="text-sm opacity-80">Represent hotels</span>
            </Button>

            <Button
              onClick={() => handleAccountTypeSelect('promoter')}
              disabled={isLoading}
              className="h-32 flex flex-col items-center justify-center space-y-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              <span className="text-2xl">📢</span>
              <span className="text-lg font-semibold">Promoter</span>
              <span className="text-sm opacity-80">Promote travel deals</span>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}