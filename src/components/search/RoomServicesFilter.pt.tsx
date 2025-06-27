
import { FilterItem } from "./FilterItem";

interface RoomServicesFilterPTProps {
  activeRoomServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomServicesFilterPT({ activeRoomServices, onChange }: RoomServicesFilterPTProps) {
  const roomServices = [
    { value: "air_conditioning", label: "Ar Condicionado" },
    { value: "balcony", label: "Varanda/Terraço" },
    { value: "kitchen", label: "Cozinha/Kitchenette" },
    { value: "workspace", label: "Mesa de Trabalho" },
    { value: "tv", label: "TV" },
    { value: "minibar", label: "Frigobar" },
    { value: "safe", label: "Cofre no Quarto" },
    { value: "coffee_maker", label: "Máquina de Café/Chá" },
    { value: "hairdryer", label: "Secador de Cabelo" },
    { value: "bathtub", label: "Banheira" },
    { value: "shower", label: "Chuveiro Separado" },
    { value: "fridge", label: "Geladeira" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeRoomServices.includes(serviceValue);
    console.log("RoomServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="SERVIÇOS DO QUARTO">
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
