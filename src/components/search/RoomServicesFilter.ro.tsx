
import { FilterItem } from "./FilterItem";

interface RoomServicesFilterROProps {
  activeRoomServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomServicesFilterRO({ activeRoomServices, onChange }: RoomServicesFilterROProps) {
  const roomServices = [
    { value: "air_conditioning", label: "Aer Condiționat" },
    { value: "balcony", label: "Balcon/Terasă" },
    { value: "kitchen", label: "Bucătărie/Kitchenette" },
    { value: "workspace", label: "Birou de Lucru" },
    { value: "tv", label: "TV" },
    { value: "minibar", label: "Minibar" },
    { value: "safe", label: "Seif în Cameră" },
    { value: "coffee_maker", label: "Aparat de Cafea/Ceai" },
    { value: "hairdryer", label: "Uscător de Păr" },
    { value: "bathtub", label: "Cadă de Baie" },
    { value: "shower", label: "Duș Separat" },
    { value: "fridge", label: "Frigider" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeRoomServices.includes(serviceValue);
    console.log("RoomServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="SERVICII CAMERĂ">
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
