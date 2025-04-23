
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { Mail } from "lucide-react";

interface LoginFormProps {
  isHotelLogin?: boolean;
}

export function LoginForm({ isHotelLogin = false }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    console.log(`${isHotelLogin ? "Hotel" : "Traveler"} login attempt with:`, email);
    try {
      const result = await signIn(email, password);
      if (result.error) {
        toast({
          title: "Error al iniciar sesión",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

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
        <div className="flex items-center">
          <input
            id={isHotelLogin ? "hotel-remember" : "remember"}
            type="checkbox"
            className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
          />
          <label htmlFor={isHotelLogin ? "hotel-remember" : "remember"} className="ml-2 text-xs text-muted-foreground">
            Remember me
          </label>
        </div>
        <a href="/forgot-password" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
          Forgot password?
        </a>
      </div>
      
      <SubmitButton
        isLoading={isLoading}
        loadingText="Signing in..."
        text={`Sign In as ${isHotelLogin ? "Hotel Partner" : "Traveler"}`}
      />
    </form>
  );
}
