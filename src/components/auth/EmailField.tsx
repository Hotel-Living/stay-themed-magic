
import React from "react";
import { Mail } from "lucide-react";

interface EmailFieldProps {
  email: string;
  setEmail: (value: string) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({ email, setEmail }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Mail className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>
    </div>
  );
};
