
import { FilterItem } from "./FilterItem";

interface HotelFeaturesFilterProps {
  selectedHotelFeatures: string[];
  onChange: (hotelFeatures: string[]) => void;
}

export function HotelFeaturesFilter({ selectedHotelFeatures, onChange }: HotelFeaturesFilterProps) {
  const hotelFeatures = [
    { value: "wifi", label: "Free WiFi" },
    { value: "pool", label: "Swimming Pool" },
    { value: "spa", label: "Spa & Wellness" },
    { value: "gym", label: "Fitness Center" },
    { value: "restaurant", label: "Restaurant" },
    { value: "bar", label: "Bar/Lounge" },
    { value: "parking", label: "Free Parking" },
    { value: "pet-friendly", label: "Pet Friendly" }
  ];

  const handleFeatureClick = (featureValue: string) => {
    const isSelected = selectedHotelFeatures.includes(featureValue);
    let newFeatures: string[];
    
    if (isSelected) {
      newFeatures = selectedHotelFeatures.filter(feature => feature !== featureValue);
    } else {
      newFeatures = [...selectedHotelFeatures, featureValue];
    }
    
    onChange(newFeatures);
  };

  return (
    <FilterItem title="HOTEL FEATURES">
      {hotelFeatures.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedHotelFeatures.includes(option.value)}
            onChange={() => handleFeatureClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
