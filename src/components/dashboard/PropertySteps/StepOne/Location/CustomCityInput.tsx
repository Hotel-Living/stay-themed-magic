
import React from "react";

interface CustomCityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCancel: () => void;
}

export default function CustomCityInput({
  value,
  onChange,
  onBlur,
  onCancel
}: CustomCityInputProps) {
  return (
    <div className="mt-1">
      <input 
        type="text" 
        placeholder="Enter city name" 
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
