
import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  label,
  loadingLabel
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
};
