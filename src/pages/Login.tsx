
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";

export default function Login() {
  const [activeTab, setActiveTab] = useState("traveler");
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle tab selection from URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'hotel') {
      setActiveTab('hotel');
    }
  }, [location.search]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#8017B0]">
              <TabsTrigger value="traveler" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-lg">
                Traveler
              </TabsTrigger>
              <TabsTrigger value="hotel" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-lg">
                Hotel Partner
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="traveler">
              <AuthCard 
                title={t('auth.travelerLogin')} 
                subtitle={t('auth.signInToAccount')} 
                footerLinks={[{
                  text: t('auth.dontHaveAccount'),
                  linkText: t('auth.createTravelerAccountLink'),
                  linkUrl: "/signup"
                }]}
              >
                <LoginForm isHotelLogin={false} />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="hotel">
              <AuthCard 
                title={t('auth.hotelPartnerLogin')} 
                subtitle={t('auth.signInToPartnerAccount')} 
                footerLinks={[{
                  text: t('auth.dontHavePartnerAccount'),
                  linkText: t('auth.registerAsHotelPartner'),
                  linkUrl: "/hotel-signup"
                }]}
              >
                <LoginForm isHotelLogin={true} />
              </AuthCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
