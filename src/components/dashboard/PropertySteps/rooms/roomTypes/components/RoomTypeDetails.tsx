
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";

interface RoomTypeDetailsProps {
  name: string;
  description: string;
  capacity: number;
  baseRate: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RoomTypeDetails({
  name,
  description,
  capacity,
  baseRate,
  onEdit,
  onDelete
}: RoomTypeDetailsProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">
          {description || 'No description'} | Capacity: {capacity} | Base Price: ${baseRate}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-blue-400 hover:text-blue-300 hover:bg-fuchsia-900/30"
        >
          <Edit2 size={18} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-300 hover:bg-fuchsia-900/30"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
}
