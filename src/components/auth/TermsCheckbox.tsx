
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TermsCheckboxProps {
  id: string;
  label: ReactNode;
}

export function TermsCheckbox({ id, label }: TermsCheckboxProps) {
  return (
    <div className="flex items-start mt-2">
      <div className="flex items-center h-4">
        <input
          id={id}
          type="checkbox"
          className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
          required
        />
      </div>
      <label htmlFor={id} className="ml-2 text-xs text-muted-foreground">
        {label}
      </label>
    </div>
  );
}
