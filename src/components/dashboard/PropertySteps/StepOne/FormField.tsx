
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder
}: FormFieldProps) {
  const shouldShowError = error ? true : false;
  const baseClasses = `text-white bg-[#7A0486] border-[#7A0486]/30 ${shouldShowError ? "border-red-500" : ""}`;
  
  return (
    <div>
      <Label htmlFor={id} className="text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={3}
          placeholder={placeholder}
          className={baseClasses}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
      
      {shouldShowError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
