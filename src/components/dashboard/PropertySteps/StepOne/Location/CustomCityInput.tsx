
import React, { useState } from "react";

interface CustomCityInputProps {
  onSubmit: (cityName: string) => void;
  initialValue?: string;
}

const CustomCityInput: React.FC<CustomCityInputProps> = ({ 
  onSubmit,
  initialValue = "" 
}) => {
  const [cityName, setCityName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSubmit(cityName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
        className="w-full rounded-md border border-fuchsia-800/40 bg-fuchsia-950/70 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
      />
      <button
        type="submit"
        disabled={!cityName.trim()}
        className="w-full px-3 py-1.5 rounded-md bg-fuchsia-700 text-white text-sm font-medium disabled:opacity-50"
      >
        Add Custom City
      </button>
    </form>
  );
};

export default CustomCityInput;
