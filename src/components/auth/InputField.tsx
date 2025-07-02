
import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  Icon: LucideIcon;
  inputClassName?: string;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  Icon,
  inputClassName
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg py-2 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-foreground placeholder-muted-foreground bg-background border border-input focus:border-ring focus:ring-0 transition-colors ${inputClassName}`}
        />
      </div>
    </div>
  );
}
