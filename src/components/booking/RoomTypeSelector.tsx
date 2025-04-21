
import { cn } from "@/lib/utils";

interface RoomTypeSelectorProps {
  selectedRoomType: string;
  setSelectedRoomType: (roomTypeId: string) => void;
}

export function RoomTypeSelector({ selectedRoomType, setSelectedRoomType }: RoomTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Room Type</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={cn(
            "rounded-lg border py-2 text-center transition-all",
            selectedRoomType === "single"
              ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-200"
              : "border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
          )}
          onClick={() => setSelectedRoomType("single")}
        >
          Single
        </button>
        <button
          type="button"
          className={cn(
            "rounded-lg border py-2 text-center transition-all",
            selectedRoomType === "double"
              ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-200"
              : "border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
          )}
          onClick={() => setSelectedRoomType("double")}
        >
          Double
        </button>
      </div>
    </div>
  );
}
