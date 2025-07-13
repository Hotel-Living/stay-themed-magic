
import { useLoginForm } from "@/hooks/useLoginForm";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ForgotPasswordLink } from "./ForgotPasswordLink";
import { Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface LoginFormProps {
  isHotelLogin?: boolean;
}

export function LoginForm({ isHotelLogin = false }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit
  } = useLoginForm(isHotelLogin);

  const { t } = useTranslation('auth');

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id={isHotelLogin ? "hotel-email" : "email"}
        label={isHotelLogin ? t('businessEmail') : t('email')}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t('enterEmail')}
        Icon={Mail}
        inputClassName="text-white placeholder:text-white/60"
      />
      
      <PasswordField
        id={isHotelLogin ? "hotel-password" : "password"}
        label={t('password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={t('enterPassword')}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        inputClassName="text-white placeholder:text-white/60"
      />
      
      <div className="flex items-center justify-between">
        <RememberMeCheckbox isHotelLogin={isHotelLogin} />
        <ForgotPasswordLink />
      </div>
      
      <SubmitButton
        isLoading={isLoading}
        loadingText={t('signingIn')}
        text={isHotelLogin ? t('signInAsHotelPartner') : t('signInAsTraveler')}
      />
    </form>
  );
}
