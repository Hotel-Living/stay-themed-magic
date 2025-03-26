
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface HotelOwnerToggleProps {
  isHotelOwner: boolean;
  setIsHotelOwner: (value: boolean) => void;
}

export const HotelOwnerToggle: React.FC<HotelOwnerToggleProps> = ({
  isHotelOwner,
  setIsHotelOwner
}) => {
  return (
    <div className="flex items-center space-x-3 py-2">
      <Switch
        id="hotel-owner"
        checked={isHotelOwner}
        onCheckedChange={setIsHotelOwner}
      />
      <Label htmlFor="hotel-owner">
        I want to register as a hotel owner
      </Label>
    </div>
  );
};
