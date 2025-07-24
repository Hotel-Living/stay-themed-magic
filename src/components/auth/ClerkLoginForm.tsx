import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ForgotPasswordLink } from "./ForgotPasswordLink";
import { Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

interface ClerkLoginFormProps {
  userType: "traveler" | "hotel" | "association" | "promoter";
}

export function ClerkLoginForm({ userType }: ClerkLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signIn) return;
    
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        
        // Route based on user type
        switch (userType) {
          case "hotel":
            navigate("/panel-hotel");
            break;
          case "association":
            navigate("/panel-asociacion");
            break;
          case "promoter":
            navigate("/promoter/dashboard");
            break;
          default:
            navigate("/user-dashboard");
        }
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.errors?.[0]?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id={`${userType}-email`}
        label={userType === "hotel" ? t('businessEmail') : t('email')}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t('enterEmail')}
        Icon={Mail}
        inputClassName="text-white placeholder:text-white/60"
      />
      
      <PasswordField
        id={`${userType}-password`}
        label={t('password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={t('enterPassword')}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        inputClassName="text-white placeholder:text-white/60"
      />
      
      <div className="flex items-center justify-between">
        <RememberMeCheckbox isHotelLogin={userType === "hotel"} />
        <ForgotPasswordLink />
      </div>
      
      <SubmitButton
        isLoading={isLoading}
        loadingText={t('signingIn')}
        text={
          userType === "hotel" ? t('signInAsHotelPartner') :
          userType === "association" ? "Sign In as Association" :
          userType === "promoter" ? "Sign In as Promoter" :
          t('signInAsTraveler')
        }
      />
    </form>
  );
}