
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isHotelOwner, setIsHotelOwner] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    
    if (!acceptTerms) {
      setErrorMessage("You must accept the terms and conditions");
      return;
    }
    
    try {
      await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        is_hotel_owner: isHotelOwner
      });
      // Note: Navigation is handled in the signUp function
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create account");
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      description="Join Hotel-Living and discover amazing long-term stays"
    >
      <SignUpForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
        formState={{
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          isHotelOwner,
          acceptTerms
        }}
        setters={{
          setEmail,
          setPassword,
          setConfirmPassword,
          setFirstName,
          setLastName,
          setIsHotelOwner,
          setAcceptTerms
        }}
      />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
