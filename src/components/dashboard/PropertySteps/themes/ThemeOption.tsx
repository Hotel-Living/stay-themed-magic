
import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import ThemeItem from "./ThemeItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ThemeOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes?: string[];
}

const ThemeOption = ({ option, onThemeSelect, selectedThemes = [] }: ThemeOptionProps) => {
  const [selected, setSelected] = useState(selectedThemes.includes(option.id));
  const [selectedSuboptions, setSelectedSuboptions] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    setSelected(selectedThemes.includes(option.id));
  }, [selectedThemes, option.id]);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      // Here you would typically add the new item to your state/database
      console.log(`New item added: ${newItemName}`);
      
      // Reset the form
      setNewItemName("");
      setIsAdding(false);
      
      // You can trigger any parent callback here if needed
    }
  };

  if (option.isAddOption) {
    return (
      <div className="flex flex-col w-full">
        {isAdding ? (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm"
            />
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={handleAddItem}
                className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs py-1"
              >
                Add
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsAdding(false)}
                className="bg-transparent text-xs py-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
            <span className="text-xs text-fuchsia-400">{option.name}</span>
          </div>
        )}
      </div>
    );
  }

  const handleOptionChange = (isChecked: boolean) => {
    setSelected(isChecked);
    
    if (onThemeSelect) {
      onThemeSelect(option.id, isChecked);
    }
  };

  const handleSuboptionChange = (suboption: string, isChecked: boolean) => {
    setSelectedSuboptions(prev => {
      const newSelected = isChecked 
        ? [...prev, suboption] 
        : prev.filter(item => item !== suboption);
        
      if (onThemeSelect && newSelected.length > 0) {
        // Consider the main option selected if any suboption is selected
        if (!selected) {
          setSelected(true);
          onThemeSelect(option.id, true);
        }
      }
      
      return newSelected;
    });
  };

  return (
    <>
      <label className="flex items-start mb-1">
        <input
          type="checkbox"
          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
          checked={selected}
          onChange={(e) => handleOptionChange(e.target.checked)}
        />
        <span className="text-sm">{option.name}</span>
      </label>

      {option.suboptions && (
        <div className="pl-6 grid grid-cols-2 gap-1">
          {option.suboptions.map((suboption) => (
            <ThemeItem
              key={`${option.id}-${suboption}`}
              id={`${option.id}-${suboption}`}
              name={suboption}
              onSelect={(isChecked) => handleSuboptionChange(suboption, isChecked)}
            />
          ))}
          <div className="flex flex-col w-full">
            {isAdding ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter new option"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="bg-fuchsia-950/40 border-fuchsia-800/30 text-xs"
                />
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={handleAddItem}
                    className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs py-0.5 px-2"
                  >
                    Add
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAdding(false)}
                    className="bg-transparent text-xs py-0.5 px-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsAdding(true)}
              >
                <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
                <span className="text-xs text-fuchsia-400">Add other</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeOption;
