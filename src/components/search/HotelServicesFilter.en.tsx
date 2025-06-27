
import { FilterItem } from "./FilterItem";

interface HotelServicesFilterENProps {
  activeHotelServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelServicesFilterEN({ activeHotelServices, onChange }: HotelServicesFilterENProps) {
  const hotelServices = [
    { value: "pool", label: "Swimming Pool" },
    { value: "gym", label: "Fitness Center" },
    { value: "spa", label: "Spa & Wellness" },
    { value: "restaurant", label: "Restaurant" },
    { value: "bar", label: "Bar/Lounge" },
    { value: "wifi", label: "Free WiFi" },
    { value: "parking", label: "Parking" },
    { value: "beach_access", label: "Beach Access" },
    { value: "room_service", label: "Room Service" },
    { value: "concierge", label: "Concierge" },
    { value: "laundry", label: "Laundry Service" },
    { value: "business_center", label: "Business Center" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeHotelServices.includes(serviceValue);
    console.log("HotelServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="HOTEL SERVICES">
      {hotelServices.map(service => (
        <label key={service.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeHotelServices.includes(service.value)}
            onChange={() => handleServiceClick(service.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{service.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
