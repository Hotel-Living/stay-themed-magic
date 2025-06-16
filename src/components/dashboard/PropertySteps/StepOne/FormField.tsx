
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
  id?: string;
  error?: string;
  hasError?: boolean;
}

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  errorMessage,
  required = false,
  placeholder,
  id,
  error,
  hasError
}: FormFieldProps) {
  const finalError = errorMessage || error;
  const hasErrorState = hasError || !!finalError;
  
  const inputClassName = `w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da] text-white placeholder:text-white/50 ${
    hasErrorState ? 'border-red-500' : ''
  }`;

  const labelClassName = "block text-sm font-medium text-white uppercase mb-2";

  return (
    <div className="space-y-2">
      <label className={labelClassName} htmlFor={id}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          id={id}
          className={inputClassName + " min-h-[80px]"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={inputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      )}
      
      {finalError && (
        <p className="text-red-400 text-sm">{finalError}</p>
      )}
    </div>
  );
}
