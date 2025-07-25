
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";

export default function RegisterRole() {
  const navigate = useNavigate();
  const { t, isReady } = useTranslation('auth');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAccountTypeSelect = (accountType: string) => {
    navigate(`/signup-${accountType}`);
  };

  // Show loading until i18n is ready
  if (!isReady) {
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
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none"
            >
              Traveler
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('hotel')}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none"
            >
              Hotel Partner
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('association')}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none"
            >
              Association
            </Button>
            
            <Button 
              onClick={() => handleAccountTypeSelect('promoter')}
              className="w-full h-16 text-lg font-semibold bg-[#8017B0] hover:bg-[#5c0869] text-white border-none"
            >
              Promoter
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              Already have an account?{" "}
              <button 
                onClick={() => navigate('/signin')}
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
