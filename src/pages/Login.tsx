
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
  const { t, isReady } = useTranslation('auth');

  // Handle tab selection from URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'hotel') {
      setActiveTab('hotel');
    } else if (tab === 'association') {
      setActiveTab('association');
    } else if (tab === 'promoter') {
      setActiveTab('promoter');
    }
  }, [location.search]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in - role-based routing
  useEffect(() => {
    if (user) {
      // Check user metadata to determine correct dashboard
      const userMetadata = user.user_metadata;
      
      if (userMetadata?.association_name) {
        navigate('/panel-asociacion');
      } else if (userMetadata?.role === 'promoter') {
        navigate('/promoter/dashboard');
      } else if (userMetadata?.is_hotel_owner === true) {
        navigate('/panel-hotel');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [user, navigate]);

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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              {t('loginTitle') || 'Login'}
            </h1>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#8017B0]">
              <TabsTrigger value="traveler" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-sm sm:text-base">
                Traveler
              </TabsTrigger>
              <TabsTrigger value="hotel" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-sm sm:text-base">
                Hotel Partner
              </TabsTrigger>
              <TabsTrigger value="association" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-sm sm:text-base">
                Association
              </TabsTrigger>
              <TabsTrigger value="promoter" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white text-sm sm:text-base">
                Promoter
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="traveler">
              <AuthCard 
                title="Traveler Login" 
                subtitle={t('signInToAccount')} 
                footerLinks={[{
                  text: t('dontHaveAccount'),
                  linkText: t('createTravelerAccountLink'),
                  linkUrl: "/signup"
                }]}
              >
                <LoginForm userType="traveler" />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="hotel">
              <AuthCard 
                title="Hotel Partner Login" 
                subtitle={t('signInToPartnerAccount')} 
                footerLinks={[{
                  text: t('dontHavePartnerAccount'),
                  linkText: t('registerAsHotelPartner'),
                  linkUrl: "/hotel-signup"
                }]}
              >
                <LoginForm userType="hotel" />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="association">
              <AuthCard 
                title="Association Login" 
                subtitle="Sign in to your Association account" 
                footerLinks={[{
                  text: "Don't have an account?",
                  linkText: "Register as Association",
                  linkUrl: "/association-signup"
                }]}
              >
                <LoginForm userType="association" />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="promoter">
              <AuthCard 
                title="Promoter Login" 
                subtitle="Sign in to your Promoter account" 
                footerLinks={[{
                  text: "Don't have an account?",
                  linkText: "Register as Promoter",
                  linkUrl: "/promoter-signup"
                }]}
              >
                <LoginForm userType="promoter" />
              </AuthCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
