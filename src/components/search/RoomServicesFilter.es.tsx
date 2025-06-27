
import { FilterItem } from "./FilterItem";

interface RoomServicesFilterESProps {
  activeRoomServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomServicesFilterES({ activeRoomServices, onChange }: RoomServicesFilterESProps) {
  const roomServices = [
    { value: "air_conditioning", label: "Aire Acondicionado" },
    { value: "balcony", label: "Balcón/Terraza" },
    { value: "kitchen", label: "Cocina/Cocineta" },
    { value: "workspace", label: "Escritorio de Trabajo" },
    { value: "tv", label: "TV" },
    { value: "minibar", label: "Minibar" },
    { value: "safe", label: "Caja Fuerte" },
    { value: "coffee_maker", label: "Máquina de Café/Té" },
    { value: "hairdryer", label: "Secador de Pelo" },
    { value: "bathtub", label: "Bañera" },
    { value: "shower", label: "Ducha Separada" },
    { value: "fridge", label: "Refrigerador" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeRoomServices.includes(serviceValue);
    console.log("RoomServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="SERVICIOS DE LA HABITACIÓN">
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
