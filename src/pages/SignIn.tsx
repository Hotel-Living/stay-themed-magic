import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useSignUp, useSignIn } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function SignIn() {
  const { user } = useUser();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, isReady } = useTranslation('auth');

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in with role detection
  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const email = user.emailAddresses[0].emailAddress;
        
        // Check if user has a role assigned
        const { data } = await supabase.rpc('check_email_role_exists', { 
          p_email: email 
        });
        
        if (data) {
          // User has a role, redirect to appropriate dashboard
          switch (data) {
            case 'traveler':
              navigate('/user-dashboard');
              break;
            case 'hotel':
              navigate('/hotel-dashboard');
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
          // User has no role, redirect to role selection
          navigate('/register-role');
        }
      }
    };

    if (user) {
      checkUserRole();
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if email already has a role assigned
      const { data: existingRole } = await supabase.rpc('check_email_role_exists', { 
        p_email: email 
      });
      
      if (existingRole) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Este correo ya está registrado con otro tipo de cuenta."
        });
        setIsLoading(false);
        return;
      }

      // Create account with email verification required
      const signUpAttempt = await signUp?.create({
        emailAddress: email,
        password: password,
      });

      // Send email verification with link strategy
      await signUp?.prepareEmailAddressVerification({ 
        strategy: "email_link",
        redirectUrl: `${window.location.origin}/register-role`
      });

      // Show verification message
      toast({
        title: "Verificación requerida",
        description: "Hemos enviado un email de verificación. Por favor, compruébalo para continuar."
      });
      
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.errors?.[0]?.message || "Error al crear la cuenta"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn?.create({
        identifier: email,
        password: password,
      });

      if (result?.status === 'complete') {
        // Check user role and redirect appropriately
        const { data: userRole } = await supabase.rpc('check_email_role_exists', { 
          p_email: email 
        });
        
        if (userRole) {
          // User has role, redirect to appropriate dashboard
          switch (userRole) {
            case 'traveler':
              navigate('/user-dashboard');
              break;
            case 'hotel':
              navigate('/hotel-dashboard');
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
          // User has no role, redirect to role selection
          navigate('/register-role');
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.errors?.[0]?.message || "Error al iniciar sesión"
      });
    } finally {
      setIsLoading(false);
    }
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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup">Crear cuenta</TabsTrigger>
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Crea tu cuenta en Hotel-Living
                  </h2>
                  <p className="text-white/80">
                    Regístrate gratis para comenzar
                  </p>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                </form>
              </TabsContent>
              
              <TabsContent value="login" className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Iniciar sesión
                  </h2>
                  <p className="text-white/80">
                    Accede a tu cuenta Hotel-Living
                  </p>
                </div>
                
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}