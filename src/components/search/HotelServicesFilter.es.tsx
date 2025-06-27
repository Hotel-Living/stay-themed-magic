
import { FilterItem } from "./FilterItem";

interface HotelServicesFilterESProps {
  activeHotelServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelServicesFilterES({ activeHotelServices, onChange }: HotelServicesFilterESProps) {
  const hotelServices = [
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
    { value: "spa", label: "Spa y Bienestar" },
    { value: "restaurant", label: "Restaurante" },
    { value: "bar", label: "Bar/Salón" },
    { value: "wifi", label: "WiFi Gratuito" },
    { value: "parking", label: "Aparcamiento" },
    { value: "beach_access", label: "Acceso a la Playa" },
    { value: "room_service", label: "Servicio de Habitaciones" },
    { value: "concierge", label: "Conserjería" },
    { value: "laundry", label: "Servicio de Lavandería" },
    { value: "business_center", label: "Centro de Negocios" }
  ];

  const handleServiceClick = (serviceValue: string) => {
    const isCurrentlySelected = activeHotelServices.includes(serviceValue);
    console.log("HotelServicesFilter - Service toggled:", serviceValue, "->", !isCurrentlySelected);
    onChange(serviceValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="SERVICIOS DEL HOTEL">
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
