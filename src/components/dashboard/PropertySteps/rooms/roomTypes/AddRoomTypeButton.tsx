
import React from "react";
import { Plus } from "lucide-react";

export default function AddRoomTypeButton({ onOpenDialog }: { onOpenDialog: () => void }) {
  return (
    <button
      onClick={onOpenDialog}
      className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-fuchsia-900/10 hover:bg-fuchsia-900/20 transition-colors"
    >
      <Plus className="h-4 w-4" />
      <span className="text-sm">ADD ROOM TYPE</span>
    </button>
  );
}
