
import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import ThemeItem from "./ThemeItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [customItems, setCustomItems] = useState<Array<{id: string, name: string}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    setSelected(selectedThemes.includes(option.id));
  }, [selectedThemes, option.id]);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      // Create a new custom theme ID
      const customThemeId = `${option.id}-custom-${newItemName.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Add to local state to display it
      setCustomItems(prev => [...prev, { id: customThemeId, name: newItemName }]);
      
      // If onThemeSelect is provided, select this new custom option
      if (onThemeSelect) {
        onThemeSelect(customThemeId, true);
      }
      
      toast({
        title: "Item added",
        description: `${newItemName} has been added`
      });
      
      // Reset the form
      setNewItemName("");
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (itemId: string, itemName: string) => {
    // Remove the item from custom items
    setCustomItems(prev => prev.filter(item => item.id !== itemId));
    
    // Deselect the item if onThemeSelect is provided
    if (onThemeSelect) {
      onThemeSelect(itemId, false);
    }
    
    toast({
      title: "Item deleted",
      description: `${itemName} has been removed`
    });
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
              className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm text-white"
              autoFocus
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
                className="bg-transparent text-xs py-1 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button 
            className="flex items-center cursor-pointer"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
            <span className="text-xs text-fuchsia-400">Add new</span>
          </button>
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
          
          {/* Display custom items */}
          {customItems.length > 0 && (
            <div className="col-span-2 space-y-1 mt-1">
              {customItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.id}
                      defaultChecked={true}
                      onChange={(e) => onThemeSelect && onThemeSelect(item.id, e.target.checked)}
                      className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
                    />
                    <label
                      htmlFor={item.id}
                      className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
                    >
                      {item.name}
                    </label>
                  </div>
                  <button 
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    className="ml-2 text-fuchsia-400 hover:text-fuchsia-200"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* "Add new" functionality */}
          {isAdding ? (
            <div className="col-span-2 space-y-2">
              <Input
                type="text"
                placeholder="Enter new option"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="bg-fuchsia-950/40 border-fuchsia-800/30 text-xs text-white"
                autoFocus
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
                  className="bg-transparent text-xs py-0.5 px-2 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => setIsAdding(true)}
            >
              <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ThemeOption;
