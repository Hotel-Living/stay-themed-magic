
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }
    
    try {
      await signIn(email, password, rememberMe);
      // Note: Navigation is handled in the signIn function
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to sign in");
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Sign in to manage your account"
    >
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
        formState={{
          email,
          password,
          rememberMe
        }}
        setters={{
          setEmail,
          setPassword,
          setRememberMe
        }}
      />
    </AuthLayout>
  );
}
