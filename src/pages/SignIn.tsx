import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useSignUp, useSignIn } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { checkEmailHasRole } from "@/hooks/useUserRoles";

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
  
  // Verification states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in with role detection
  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const email = user.emailAddresses[0].emailAddress;
        
        try {
          // Check if user has a role assigned
          const { role, error } = await checkEmailHasRole(email);
          
          if (error) {
            console.error("Error checking role:", error);
            return;
          }
          
          if (role) {
            // User has a role, redirect to appropriate dashboard
            switch (role) {
              case 'guest':
              case 'traveler':
                navigate('/user-dashboard');
                break;
              case 'hotel_owner':
              case 'hotel':
                navigate('/panel-hotel');
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
        } catch (err) {
          console.error("Error checking role:", err);
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
    
    // Add timeout handling to prevent freeze
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "La operación tardó demasiado tiempo. Por favor, inténtalo de nuevo."
      });
    }, 30000); // 30 second timeout

    try {
      // Check if email already has a role assigned
      const { role: existingRole, error } = await checkEmailHasRole(email);
      
      if (error) {
        console.error("Error checking existing role:", error);
      }
      
      if (existingRole) {
        clearTimeout(timeoutId);
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

      if (!signUpAttempt) {
        throw new Error("No se pudo crear la cuenta");
      }

      // Temporarily use email_code since email_link is not enabled in this Clerk environment
      console.log("Attempting email verification with strategy: email_code");
      
      await signUp?.prepareEmailAddressVerification({ 
        strategy: "email_code"
      });
      
      console.log("Email code verification request sent successfully");
      setShowVerification(true);
      
      toast({
        title: "Código de verificación enviado",
        description: "Hemos enviado un código de verificación a tu email. Ingrésalo abajo para continuar."
      });
      
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.errors?.[0]?.message || error.message || "Error al crear la cuenta"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result?.status === 'complete') {
        setShowVerification(false);
        toast({
          title: "Email verificado",
          description: "Tu email ha sido verificado exitosamente. Redirigiendo..."
        });
        
        // Redirect to role selection
        navigate('/register-role');
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Error de verificación",
        description: error.errors?.[0]?.message || "Código de verificación inválido"
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
        try {
          // Check user role and redirect appropriately
          const { role: userRole, error } = await checkEmailHasRole(email);
          
          if (error) {
            console.error("Error checking role:", error);
          }
          
          if (userRole) {
            // User has role, redirect to appropriate dashboard
            switch (userRole) {
              case 'guest':
              case 'traveler':
                navigate('/user-dashboard');
                break;
              case 'hotel_owner':
              case 'hotel':
                navigate('/panel-hotel');
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
        } catch (err) {
          console.error("Error checking role:", err);
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
                
                {/* Emergency Verification Code Input - Only show if codes are sent despite link config */}
                {showVerification && (
                  <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                    <h3 className="text-white font-medium mb-3">
                      Verificación por código
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      Ingresa el código de verificación que enviamos a tu email:
                    </p>
                    <form onSubmit={handleVerifyCode} className="space-y-3">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary text-center"
                        placeholder="123456"
                        maxLength={6}
                        required
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Verificando..." : "Verificar código"}
                      </button>
                    </form>
                  </div>
                )}
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