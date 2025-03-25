
import React from "react";
import { Link } from "react-router-dom";
import { EmailField } from "@/components/auth/EmailField";
import { PasswordField } from "@/components/auth/PasswordField";
import { RememberMeCheckbox } from "@/components/auth/RememberMeCheckbox";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { SubmitButton } from "@/components/auth/SubmitButton";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  errorMessage?: string;
  formState: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  setters: {
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setRememberMe: (value: boolean) => void;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  errorMessage,
  formState,
  setters
}) => {
  const { email, password, rememberMe } = formState;
  const { setEmail, setPassword, setRememberMe } = setters;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField password={password} setPassword={setPassword} />
      
      {/* Remember me and Forgot Password */}
      <div className="flex items-center justify-between">
        <RememberMeCheckbox rememberMe={rememberMe} setRememberMe={setRememberMe} />
        <Link to="/forgot-password" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition">
          Forgot password?
        </Link>
      </div>
      
      {/* Login Button */}
      <SubmitButton
        isLoading={isLoading}
        label="Sign In"
        loadingLabel="Signing in..."
      />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
};
