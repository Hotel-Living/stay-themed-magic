
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface RoomTypesFilterPTProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilterPT({ activeRoomTypes, onChange }: RoomTypesFilterPTProps) {
  const { loading, error } = useDynamicFilterData();

  const roomTypes = [
    { value: "double", label: "Quarto Duplo" },
    { value: "single", label: "Quarto Individual" }
  ];

  const handleRoomTypeClick = (roomTypeValue: string) => {
    const isCurrentlySelected = activeRoomTypes.includes(roomTypeValue);
    console.log("RoomTypesFilter - Room type toggled:", roomTypeValue, "->", !isCurrentlySelected);
    onChange(roomTypeValue, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <FilterItem title="TIPOS DE QUARTO">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Carregando tipos de quarto...</div>
      </FilterItem>
    );
  }

  if (error) {
    return (
      <FilterItem title="TIPOS DE QUARTO">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Erro ao carregar tipos de quarto</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="TIPOS DE QUARTO">
      {roomTypes.map(roomType => (
        <label key={roomType.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeRoomTypes.includes(roomType.value)}
            onChange={() => handleRoomTypeClick(roomType.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{roomType.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
