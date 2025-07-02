
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { PasswordValidation } from "./PasswordValidation";
import { getPasswordStrengthColor } from "@/utils/passwordValidation";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  inputClassName?: string;
  showValidation?: boolean;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleShowPassword,
  showValidation = false,
  inputClassName
}: PasswordFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const strengthColor = getPasswordStrengthColor(value);
  
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full rounded-lg py-2 pl-10 pr-12 text-foreground placeholder-muted-foreground bg-background border border-input focus:border-ring focus:ring-0 transition-colors ${inputClassName}`}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {showValidation && (
        <PasswordValidation 
          password={value} 
          showRequirements={showValidation && (isFocused || value.length > 0)}
        />
      )}
    </div>
  );
}
