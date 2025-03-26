
import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAcceptanceProps {
  acceptTerms: boolean;
  setAcceptTerms: (value: boolean) => void;
}

export const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({
  acceptTerms,
  setAcceptTerms
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={acceptTerms}
        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
      />
      <label 
        htmlFor="terms" 
        className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I accept the{" "}
        <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
          terms and conditions
        </Link>
        {" "}and{" "}
        <Link to="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
          privacy policy
        </Link>
      </label>
    </div>
  );
};
