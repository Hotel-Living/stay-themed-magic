import React, { useState } from "react";
import { ChevronRight, PlusCircle, Trash2 } from "lucide-react";
import ThemeOption from "./ThemeOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  selectedThemes?: string[];
}

const ThemeSubmenu = ({ submenu, isOpen, toggleSubmenu, onThemeSelect, selectedThemes = [] }: ThemeSubmenuProps) => {
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [newOptionName, setNewOptionName] = useState("");
  const [customOptions, setCustomOptions] = useState<Array<{id: string, name: string}>>([]);
  const { toast } = useToast();

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      const customOptionId = `${submenu.name.toLowerCase().replace(/\s+/g, '-')}-custom-${newOptionName.toLowerCase().replace(/\s+/g, '-')}`;
      
      setCustomOptions(prev => [...prev, { id: customOptionId, name: newOptionName }]);
      
      if (onThemeSelect) {
        onThemeSelect(customOptionId, true);
      }
      
      toast({
        title: "Option added",
        description: `${newOptionName} has been added to ${submenu.name}`
      });
      
      setNewOptionName("");
      setIsAddingOption(false);
    }
  };

  const handleDeleteOption = (optionId: string, optionName: string) => {
    setCustomOptions(prev => prev.filter(option => option.id !== optionId));
    
    if (onThemeSelect) {
      onThemeSelect(optionId, false);
    }
    
    toast({
      title: "Option deleted",
      description: `${optionName} has been removed from ${submenu.name}`
    });
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
          {submenu.options.filter(option => !option.isAddOption).map((option) => (
            <div
              key={option.id}
              className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10"
            >
              <ThemeOption 
                option={option} 
                onThemeSelect={onThemeSelect} 
                selectedThemes={selectedThemes}
              />
            </div>
          ))}
          
          {customOptions.length > 0 && (
            <div className="space-y-1 mt-1">
              {customOptions.map((option) => (
                <div 
                  key={option.id}
                  className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.id}
                      defaultChecked={true}
                      onChange={(e) => onThemeSelect && onThemeSelect(option.id, e.target.checked)}
                      className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
                    />
                    <label
                      htmlFor={option.id}
                      className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
                    >
                      {option.name}
                    </label>
                  </div>
                  <button 
                    onClick={() => handleDeleteOption(option.id, option.name)}
                    className="ml-2 text-fuchsia-400 hover:text-fuchsia-200"
                    aria-label={`Delete ${option.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {isAddingOption ? (
            <div className="p-2 bg-[#5A1876]/10 rounded-lg space-y-2">
              <Input 
                type="text"
                placeholder="Enter option name"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm text-white"
                autoFocus
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
                  className="bg-transparent text-xs text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button 
              className="flex items-center cursor-pointer p-2"
              onClick={() => setIsAddingOption(true)}
            >
              <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeSubmenu;
