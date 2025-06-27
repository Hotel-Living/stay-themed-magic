
import { FilterItem } from "./FilterItem";

interface RoomServicesFilterENProps {
  activeRoomServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomServicesFilterEN({ activeRoomServices, onChange }: RoomServicesFilterENProps) {
  const roomServices = [
    { value: "air_conditioning", label: "Air Conditioning" },
    { value: "balcony", label: "Balcony/Terrace" },
    { value: "kitchen", label: "Kitchen/Kitchenette" },
    { value: "workspace", label: "Work Desk" },
    { value: "tv", label: "TV" },
    { value: "minibar", label: "Minibar" },
    { value: "safe", label: "In-room Safe" },
    { value: "coffee_maker", label: "Coffee/Tea Maker" },
    { value: "hairdryer", label: "Hair Dryer" },
    { value: "bathtub", label: "Bathtub" },
    { value: "shower", label: "Separate Shower" },
    { value: "fridge", label: "Refrigerator" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeRoomServices.includes(serviceValue);
    console.log("RoomServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ROOM SERVICES">
      {roomServices.map(service => (
        <label key={service.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeRoomServices.includes(service.value)}
            onChange={() => handleServiceClick(service.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{service.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
