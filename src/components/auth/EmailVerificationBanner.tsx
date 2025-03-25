
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function EmailVerificationBanner() {
  const { user, resendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [hasResent, setHasResent] = useState(false);
  
  // Don't show banner if user is null or if email is already verified
  if (!user || user.email_confirmed_at) {
    return null;
  }
  
  const handleResend = async () => {
    if (!user.email) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail(user.email);
      setHasResent(true);
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <Alert className="bg-amber-500/15 text-amber-500 border-amber-500/30 mb-6">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Verifica tu correo electrónico</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-2">
        <span>
          {hasResent
            ? "Se ha enviado un nuevo enlace de verificación a tu correo."
            : "Por favor verifica tu correo electrónico para acceder a todas las funciones."}
        </span>
        {!hasResent && (
          <Button 
            variant="outline" 
            size="sm" 
            className="border-amber-500/50 hover:bg-amber-500/20 text-amber-500" 
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Enviando..." : "Reenviar correo"}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
