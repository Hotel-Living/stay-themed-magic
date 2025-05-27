import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Starfield } from "@/components/Starfield";

export default function Login() {
  const [activeTab, setActiveTab] = useState("traveler");
  const location = useLocation();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();

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
  return <div className="min-h-screen flex flex-col">
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
              <AuthCard title="Traveler Login" subtitle="Sign in to your Hotel-Living account" footerLinks={[{
              text: "Don't have an account yet?",
              linkText: "Create a traveler account",
              linkUrl: "/signup"
            }]}>
                <LoginForm isHotelLogin={false} />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="hotel">
              <AuthCard title="Hotel Partner Login" subtitle="Sign in to your Hotel-Living partner account" footerLinks={[{
              text: "Don't have a hotel partner account?",
              linkText: "Register as a Hotel Partner",
              linkUrl: "/hotel-signup"
            }]}>
                <LoginForm isHotelLogin={true} />
              </AuthCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>;
}
