
import React, { useState } from "react";

interface CustomCountryInputProps {
  onSubmit: (countryName: string) => void;
  initialValue?: string;
}

const CustomCountryInput: React.FC<CustomCountryInputProps> = ({ 
  onSubmit,
  initialValue = "" 
}) => {
  const [countryName, setCountryName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (countryName.trim()) {
      onSubmit(countryName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="Enter country name"
        className="w-full rounded-md border border-fuchsia-800/40 bg-fuchsia-950/70 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
      />
      <button
        type="submit"
        disabled={!countryName.trim()}
        className="w-full px-3 py-1.5 rounded-md bg-fuchsia-700 text-white text-sm font-medium disabled:opacity-50"
      >
        Add Custom Country
      </button>
    </form>
  );
};

export default CustomCountryInput;
