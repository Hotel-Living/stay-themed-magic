
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

interface EmailVerificationBannerProps {
  isVerified: boolean;
  userEmail?: string | null;
}

export function EmailVerificationBanner({ isVerified, userEmail }: EmailVerificationBannerProps) {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  
  const sendVerificationEmail = async () => {
    if (!userEmail) return;
    
    try {
      setIsSending(true);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
      });
      
      if (error) {
        handleAuthError(error);
        return;
      }
      
      toast({
        title: "Email enviado",
        description: "Se ha enviado un nuevo enlace de verificación a tu correo electrónico",
      });
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsSending(false);
    }
  };
  
  if (isVerified) {
    return (
      <Alert className="bg-green-50 border-green-200 mb-6">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Email verificado</AlertTitle>
        <AlertDescription className="text-green-700">
          Tu cuenta de correo electrónico ha sido verificada.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert className="bg-amber-50 border-amber-200 mb-6">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Verificación pendiente</AlertTitle>
      <AlertDescription className="text-amber-700 flex flex-col sm:flex-row sm:items-center gap-2">
        <span>
          Por favor, verifica tu correo electrónico para acceder a todas las funciones.
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={sendVerificationEmail}
          disabled={isSending}
          className="bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-900 mt-2 sm:mt-0"
        >
          {isSending ? "Enviando..." : "Reenviar email"}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
