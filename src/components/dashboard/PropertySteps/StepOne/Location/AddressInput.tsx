
import React from "react";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errorMessage?: string;
}

export default function AddressInput({
  value,
  onChange,
  onBlur,
  errorMessage
}: AddressInputProps) {
  const inputClassName = `w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da] text-white placeholder:text-white/50 ${
    errorMessage ? 'border-red-500' : ''
  }`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white uppercase mb-2">
        Dirección <span className="text-red-400">*</span>
      </label>
      
      <input
        type="text"
        className={inputClassName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Ingresa la dirección completa"
        required
      />
      
      {errorMessage && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
