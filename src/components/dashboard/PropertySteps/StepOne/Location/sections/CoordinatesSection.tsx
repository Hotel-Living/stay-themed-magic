
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CoordinatesSectionProps {
  latitude: string;
  longitude: string;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
}

export default function CoordinatesSection({
  latitude,
  longitude,
  setLatitude,
  setLongitude
}: CoordinatesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="block text-sm font-medium text-white mb-1">
          Latitude
        </Label>
        <Input
          type="text"
          placeholder="Latitude will be set from map"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
          disabled
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-white mb-1">
          Longitude
        </Label>
        <Input
          type="text"
          placeholder="Longitude will be set from map"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="text-white bg-[#7A0486] border-fuchsia-800/30 focus:border-fuchsia-500/50"
          disabled
        />
      </div>
    </div>
  );
}
