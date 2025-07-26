import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { redirectByRole } from "@/hooks/useRoleRedirection";
import Starfield from 'react-starfield';

export default function RegisterRole() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
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
        navigate(redirectByRole(profile.role));
      }
    };

    checkUser();
  }, [navigate]);

  const handleAccountTypeSelect = async (accountType: string) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Map the account type to the corresponding role
      let role = '';
      switch (accountType) {
        case 'traveler':
          role = 'guest';
          break;
        case 'hotel':
          role = 'hotel_owner';
          break;
        case 'association':
          role = 'association';
          break;
        case 'promoter':
          role = 'promoter';
          break;
        default:
          throw new Error('Invalid account type');
      }

      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your account type has been set successfully!",
      });

      // Redirect directly to role-specific dashboard
      navigate(redirectByRole(role));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set account type",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!user ? (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-lg text-white">Loading...</div>
        </div>
      ) : (
        <div className="min-h-screen relative overflow-hidden bg-black">
          <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
          />
          
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Choose Your Account Type
                </h1>
                <p className="text-xl text-white/80">
                  Select the option that best describes your role in the Hotel Living community
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Button
                  onClick={() => handleAccountTypeSelect('traveler')}
                  disabled={isLoading}
                  className="h-auto p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#7E26A6]/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(126,38,166,0.6)]"
                >
                  <div className="text-left">
                    <div className="text-2xl mb-2">🎒</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Traveler</h3>
                    <p className="text-white/70 text-sm">
                      I'm looking for unique places to stay and explore
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() => handleAccountTypeSelect('hotel')}
                  disabled={isLoading}
                  className="h-auto p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#7E26A6]/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(126,38,166,0.6)]"
                >
                  <div className="text-left">
                    <div className="text-2xl mb-2">🏨</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Hotel Partner</h3>
                    <p className="text-white/70 text-sm">
                      I want to list my property and welcome guests
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() => handleAccountTypeSelect('association')}
                  disabled={isLoading}
                  className="h-auto p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#7E26A6]/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(126,38,166,0.6)]"
                >
                  <div className="text-left">
                    <div className="text-2xl mb-2">🤝</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Association</h3>
                    <p className="text-white/70 text-sm">
                      I represent a tourism or hospitality association
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() => handleAccountTypeSelect('promoter')}
                  disabled={isLoading}
                  className="h-auto p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#7E26A6]/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(126,38,166,0.6)]"
                >
                  <div className="text-left">
                    <div className="text-2xl mb-2">📢</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Promoter</h3>
                    <p className="text-white/70 text-sm">
                      I help promote and market travel experiences
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}