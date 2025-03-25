
import React, { useState } from "react";
import { NameFields } from "./NameFields";
import { EmailField } from "./EmailField";
import { PasswordFields } from "./PasswordFields";
import { HotelOwnerToggle } from "./HotelOwnerToggle";
import { TermsAcceptance } from "./TermsAcceptance";
import { VerificationNotice } from "./VerificationNotice";
import { SubmitButton } from "./SubmitButton";
import { ErrorMessage } from "./ErrorMessage";

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  errorMessage: string;
  formState: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    isHotelOwner: boolean;
    acceptTerms: boolean;
  };
  setters: {
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setIsHotelOwner: (value: boolean) => void;
    setAcceptTerms: (value: boolean) => void;
  };
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  isLoading,
  errorMessage,
  formState,
  setters
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <ErrorMessage message={errorMessage} />
      
      <NameFields
        firstName={formState.firstName}
        lastName={formState.lastName}
        setFirstName={setters.setFirstName}
        setLastName={setters.setLastName}
      />
      
      <EmailField
        email={formState.email}
        setEmail={setters.setEmail}
      />
      
      <PasswordFields
        password={formState.password}
        confirmPassword={formState.confirmPassword}
        setPassword={setters.setPassword}
        setConfirmPassword={setters.setConfirmPassword}
      />
      
      <HotelOwnerToggle
        isHotelOwner={formState.isHotelOwner}
        setIsHotelOwner={setters.setIsHotelOwner}
      />
      
      <TermsAcceptance
        acceptTerms={formState.acceptTerms}
        setAcceptTerms={setters.setAcceptTerms}
      />
      
      <VerificationNotice />
      
      <SubmitButton
        isLoading={isLoading}
        label="Create Account"
        loadingLabel="Creating Account..."
      />
    </form>
  );
};
