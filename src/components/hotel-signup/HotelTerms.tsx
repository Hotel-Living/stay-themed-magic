
import { Link } from "react-router-dom";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";

interface HotelTermsProps {
  acceptTerms: boolean;
  acceptBusinessTerms: boolean;
  onAcceptTermsChange: () => void;
  onAcceptBusinessTermsChange: () => void;
}

export function HotelTerms({
  acceptTerms,
  acceptBusinessTerms,
  onAcceptTermsChange,
  onAcceptBusinessTermsChange
}: HotelTermsProps) {
  return (
    <>
      <TermsCheckbox
        id="terms"
        checked={acceptTerms}
        onChange={onAcceptTermsChange}
        label={
          <>
            I agree to the{" "}
            <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
              Privacy Policy
            </Link>
          </>
        }
      />
      
      <TermsCheckbox
        id="businessTerms"
        checked={acceptBusinessTerms}
        onChange={onAcceptBusinessTermsChange}
        label={
          <>
            I confirm that I am authorized to list this property and agree to the{" "}
            <Link to="/hotel-partner-agreement" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
              Hotel Partner Agreement
            </Link>
          </>
        }
      />
    </>
  );
}
