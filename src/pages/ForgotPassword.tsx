
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingButton } from "@/components/auth/LoadingButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { requestPasswordReset, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await requestPasswordReset(email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Recuperar contraseña</h1>
                <p className="text-muted-foreground">
                  Te enviaremos un enlace para restablecer tu contraseña
                </p>
              </div>
              
              {submitted ? (
                <div className="text-center py-6">
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-medium">Email enviado</p>
                    <p className="mt-1">
                      Hemos enviado un enlace de recuperación a <strong>{email}</strong>
                    </p>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                  </p>
                  <Link 
                    to="/login" 
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition font-medium"
                  >
                    Volver al inicio de sesión
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                        placeholder="Enter your email"
                        aria-label="Email"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Enviando..."
                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                  >
                    Enviar enlace de recuperación
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
