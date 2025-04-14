
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, EyeOff, Lock, Mail, User, Building } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  // Traveler login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Hotel login state
  const [hotelEmail, setHotelEmail] = useState("");
  const [hotelPassword, setHotelPassword] = useState("");
  const [showHotelPassword, setShowHotelPassword] = useState(false);
  
  const {
    signIn,
    isLoading,
    user
  } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent, isHotelLogin: boolean = false) => {
    e.preventDefault();
    
    const loginEmail = isHotelLogin ? hotelEmail : email;
    const loginPassword = isHotelLogin ? hotelPassword : password;
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    console.log(`${isHotelLogin ? "Hotel" : "Traveler"} login attempt with:`, loginEmail);
    try {
      const result = await signIn(loginEmail, loginPassword);
      if (result.error) {
        toast({
          title: "Error al iniciar sesión",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    // Redirection is now handled in AuthContext after profile is fetched
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowHotelPassword = () => setShowHotelPassword(!showHotelPassword);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <Tabs defaultValue="traveler" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#8017B0]">
              <TabsTrigger value="traveler" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white">Traveler</TabsTrigger>
              <TabsTrigger value="hotel" className="text-white data-[state=active]:bg-[#5c0869] data-[state=active]:text-white">Hotel Partner</TabsTrigger>
            </TabsList>
            
            <TabsContent value="traveler">
              <AuthCard 
                title="Traveler Login" 
                subtitle="Sign in to your Hotel-Living account"
                footerLinks={[
                  {
                    text: "Don't have an account yet?",
                    linkText: "Create a traveler account",
                    linkUrl: "/signup"
                  }
                ]}
              >
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
                  {/* Email Field */}
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    Icon={Mail}
                    inputClassName="text-white placeholder:text-white/60"
                  />
                  
                  {/* Password Field */}
                  <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                    inputClassName="text-white placeholder:text-white/60"
                  />
                  
                  {/* Remember me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember" type="checkbox" className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500" />
                      <label htmlFor="remember" className="ml-2 text-xs text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Forgot password?
                    </Link>
                  </div>
                  
                  {/* Login Button */}
                  <SubmitButton
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    text="Sign In as Traveler"
                  />
                </form>
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="hotel">
              <AuthCard 
                title="Hotel Partner Login" 
                subtitle="Sign in to your Hotel-Living partner account"
                footerLinks={[
                  {
                    text: "Don't have a hotel partner account?",
                    linkText: "Register as a Hotel Partner",
                    linkUrl: "/hotel-signup"
                  }
                ]}
              >
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-5">
                  {/* Hotel Email Field */}
                  <InputField
                    id="hotel-email"
                    label="Business Email"
                    type="email"
                    value={hotelEmail}
                    onChange={e => setHotelEmail(e.target.value)}
                    placeholder="Enter your business email"
                    Icon={Mail}
                    inputClassName="text-white placeholder:text-white/60"
                  />
                  
                  {/* Hotel Password Field */}
                  <PasswordField
                    id="hotel-password"
                    label="Password"
                    value={hotelPassword}
                    onChange={e => setHotelPassword(e.target.value)}
                    placeholder="Enter your password"
                    showPassword={showHotelPassword}
                    toggleShowPassword={toggleShowHotelPassword}
                    inputClassName="text-white placeholder:text-white/60"
                  />
                  
                  {/* Remember me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="hotel-remember" type="checkbox" className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500" />
                      <label htmlFor="hotel-remember" className="ml-2 text-xs text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Forgot password?
                    </Link>
                  </div>
                  
                  {/* Login Button */}
                  <SubmitButton
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    text="Sign In as Hotel Partner"
                  />
                </form>
              </AuthCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
