
import { ReactNode } from "react";

interface TermsCheckboxProps {
  id: string;
  label: ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

export function TermsCheckbox({
  id,
  label,
  checked = false,
  onChange = () => {}
}: TermsCheckboxProps) {
  return (
    <div className="flex items-start mt-2">
      <input
        id={id}
        type="checkbox"
        className="w-3 h-3 mt-1 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-xs text-muted-foreground">
        {label}
      </label>
    </div>
  );
}
