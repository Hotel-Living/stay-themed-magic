
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmailVerificationAlertProps {
  email: string | undefined;
  isEmailVerified: boolean | undefined;
  onResendVerification: () => Promise<void>;
}

export const EmailVerificationAlert: React.FC<EmailVerificationAlertProps> = ({
  email,
  isEmailVerified,
  onResendVerification
}) => {
  if (email && isEmailVerified === false) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
        <Badge variant="outline" className="text-red-600 border-red-600 whitespace-nowrap">
          Email not verified
        </Badge>
        <div className="flex-grow text-sm text-gray-600">
          User has not verified their email address
        </div>
        <Button 
          variant="secondary" 
          onClick={onResendVerification}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Resend verification email
        </Button>
      </div>
    );
  }
  
  return null;
};
