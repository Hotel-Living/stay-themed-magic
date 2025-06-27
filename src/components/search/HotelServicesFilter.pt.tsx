
import { FilterItem } from "./FilterItem";

interface HotelServicesFilterPTProps {
  activeHotelServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelServicesFilterPT({ activeHotelServices, onChange }: HotelServicesFilterPTProps) {
  const hotelServices = [
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Academia" },
    { value: "spa", label: "Spa e Bem-estar" },
    { value: "restaurant", label: "Restaurante" },
    { value: "bar", label: "Bar/Lounge" },
    { value: "wifi", label: "WiFi Gratuito" },
    { value: "parking", label: "Estacionamento" },
    { value: "beach_access", label: "Acesso à Praia" },
    { value: "room_service", label: "Serviço de Quarto" },
    { value: "concierge", label: "Concierge" },
    { value: "laundry", label: "Serviço de Lavanderia" },
    { value: "business_center", label: "Centro de Negócios" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeHotelServices.includes(serviceValue);
    console.log("HotelServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="SERVIÇOS DO HOTEL">
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
