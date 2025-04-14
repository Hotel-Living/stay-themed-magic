
import React from "react";

interface CustomCountryInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCancel: () => void;
}

export default function CustomCountryInput({
  value,
  onChange,
  onBlur,
  onCancel
}: CustomCountryInputProps) {
  return (
    <div className="mt-1">
      <input 
        type="text" 
        placeholder="Enter country name" 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full p-2 text-white bg-[#7A0486] border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <button 
        onClick={onCancel}
        className="mt-2 text-fuchsia-300 text-sm hover:text-fuchsia-100"
      >
        Cancel
      </button>
    </div>
  );
}
