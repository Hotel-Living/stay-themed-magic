
import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

export const PasswordFields: React.FC<PasswordFieldsProps> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 pl-11 pr-12 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Eye className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
            placeholder="Confirm your password"
          />
        </div>
      </div>
    </>
  );
};
