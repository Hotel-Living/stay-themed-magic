
import React from "react";
import { User } from "lucide-react";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

export const NameFields: React.FC<NameFieldsProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
            placeholder="John"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>
    </div>
  );
};
