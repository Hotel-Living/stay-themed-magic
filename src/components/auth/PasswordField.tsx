
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  password: string;
  setPassword: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ 
  password, 
  setPassword,
  placeholder = "Enter your password",
  label = "Password"
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-muted-foreground" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-3 pl-11 pr-12 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
          placeholder={placeholder}
          aria-label={label}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Eye className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};
