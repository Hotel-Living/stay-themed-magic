
import { useLoginForm } from "@/hooks/useLoginForm";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ForgotPasswordLink } from "./ForgotPasswordLink";
import { Mail } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id={isHotelLogin ? "hotel-email" : "email"}
        label={isHotelLogin ? "Business Email" : "Email"}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={isHotelLogin ? "Enter your business email" : "Enter your email"}
        Icon={Mail}
        inputClassName="text-white placeholder:text-white/60"
      />
      
      <PasswordField
        id={isHotelLogin ? "hotel-password" : "password"}
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
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
        loadingText="Signing in..."
        text={`Sign In as ${isHotelLogin ? "Hotel Partner" : "Traveler"}`}
      />
    </form>
  );
}
