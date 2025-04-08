
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  return <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input 
          id={id} 
          type={type} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          className={`w-full py-2 pl-9 pr-3 text-sm rounded-lg border-border focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 bg-[#55036c] ${inputClassName || ''}`} 
        />
      </div>
    </div>;
}
