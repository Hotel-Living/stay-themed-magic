
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AffinityHeaderProps {
  openNewThemeDialog: () => void;
}

export const AffinityHeader: React.FC<AffinityHeaderProps> = ({ openNewThemeDialog }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Affinities Management</h2>
      <Button onClick={openNewThemeDialog}>
        <Plus className="h-4 w-4 mr-2" /> Add New Affinity
      </Button>
    </div>
  );
};
