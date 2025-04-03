
import { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="flex items-start mt-2 space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange}
        className="mt-1"
      />
      <label htmlFor={id} className="text-xs text-muted-foreground cursor-pointer">
        {label}
      </label>
    </div>
  );
}
