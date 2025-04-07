
import React, { useState } from "react";
import { ChevronRight, PlusCircle } from "lucide-react";
import ThemeOption from "./ThemeOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ThemeSubmenuProps {
  submenu: {
    name: string;
    options: Array<{
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }>;
  };
  isOpen: boolean;
  toggleSubmenu: (submenuName: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
}

const ThemeSubmenu = ({ submenu, isOpen, toggleSubmenu, onThemeSelect }: ThemeSubmenuProps) => {
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [newOptionName, setNewOptionName] = useState("");

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      // Here you would typically add the new option to your state/database
      console.log(`New option added to ${submenu.name}: ${newOptionName}`);
      
      // Reset the form
      setNewOptionName("");
      setIsAddingOption(false);
    }
  };

  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
      <div 
        className="flex items-center justify-between w-full text-sm h-6 cursor-pointer" 
        onClick={() => toggleSubmenu(submenu.name)}
      >
        <span className="uppercase">{submenu.name}</span>
        <ChevronRight
          className={`h-3 w-3 transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="mt-1 space-y-0.5">
          {submenu.options.map((option) => (
            <div
              key={option.id}
              className={`bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10 ${
                option.isAddOption ? "flex items-center" : ""
              }`}
            >
              <ThemeOption option={option} onThemeSelect={onThemeSelect} />
            </div>
          ))}
          
          {/* Add new option button/input */}
          {isAddingOption ? (
            <div className="p-2 bg-[#5A1876]/10 rounded-lg space-y-2">
              <Input 
                type="text"
                placeholder="Enter option name"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm"
              />
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={handleAddOption}
                  className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs"
                >
                  Add
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsAddingOption(false)}
                  className="bg-transparent text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="flex items-center cursor-pointer p-2"
              onClick={() => setIsAddingOption(true)}
            >
              <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new option</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeSubmenu;
