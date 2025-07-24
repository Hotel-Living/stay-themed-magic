
import { useLoginForm } from "@/hooks/useLoginForm";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ForgotPasswordLink } from "./ForgotPasswordLink";
import { Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface LoginFormProps {
  userType: "traveler" | "hotel" | "association" | "promoter";
}

export function LoginForm({ userType }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    showFallback,
    handleSubmit,
    handleFallbackRedirect
  } = useLoginForm(userType);

  const { t } = useTranslation('auth');

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
        isLoading={isLoading && !showFallback}
        loadingText={t('signingIn')}
        text={
          userType === "hotel" ? t('signInAsHotelPartner') :
          userType === "association" ? "Sign In as Association" :
          userType === "promoter" ? "Sign In as Promoter" :
          t('signInAsTraveler')
        }
      />
      
      {showFallback && (
        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="text-white text-sm mb-3">
            ✅ Login successful! If you weren't redirected automatically:
          </p>
          <button
            type="button"
            onClick={handleFallbackRedirect}
            className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Click here to access your panel
          </button>
        </div>
      )}
    </form>
  );
}
