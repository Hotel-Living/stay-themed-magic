
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingButton } from "@/components/auth/LoadingButton";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { updatePassword, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL contains a valid recovery token
    const hash = window.location.hash;
    const type = new URLSearchParams(hash.slice(1)).get("type");
    
    if (type !== "recovery") {
      setError("Enlace de recuperación no válido");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    const updated = await updatePassword(password);
    
    if (updated) {
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Restablecer contraseña</h1>
                <p className="text-muted-foreground">
                  Crea una nueva contraseña para tu cuenta
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              {success ? (
                <div className="text-center py-6">
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-medium">¡Contraseña actualizada!</p>
                    <p className="mt-1">
                      Tu contraseña ha sido actualizada correctamente.
                    </p>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Serás redirigido al inicio de sesión en unos segundos...
                  </p>
                  <Link 
                    to="/login" 
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition font-medium"
                  >
                    Ir al inicio de sesión
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3 pl-11 pr-12 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                        placeholder="Crea una contraseña segura"
                        aria-label="Nueva contraseña"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                        placeholder="Confirma tu contraseña"
                        aria-label="Confirmar contraseña"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Actualizando..."
                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                  >
                    Actualizar contraseña
                  </LoadingButton>
                  
                  <div className="text-center mt-4">
                    <Link 
                      to="/login" 
                      className="text-fuchsia-400 hover:text-fuchsia-300 transition text-sm"
                    >
                      Volver al inicio de sesión
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
