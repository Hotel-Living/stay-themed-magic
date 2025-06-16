
import React from "react";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "textarea" | "tel";
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
}

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  errorMessage,
  required = false,
  placeholder
}: FormFieldProps) {
  const inputClassName = `w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da] text-white placeholder:text-white/50 ${
    errorMessage ? 'border-red-500' : ''
  }`;

  const labelClassName = "block text-sm font-medium text-white uppercase mb-2";

  return (
    <div className="space-y-2">
      <label className={labelClassName}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          className={inputClassName + " min-h-[80px]"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      )}
      
      {errorMessage && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
