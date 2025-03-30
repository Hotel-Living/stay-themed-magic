import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
}
export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleShowPassword
}: PasswordFieldProps) {
  return <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
        <input id={id} type={showPassword ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} className="w-full py-2 pl-9 pr-9 text-sm border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors bg-slate-50" />
        <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={toggleShowPassword}>
          {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
    </div>;
}