
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddNewCategoryFormProps {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  handleAddCategory: () => void;
  onCancel: () => void;
}

const AddNewCategoryForm = ({ 
  newCategoryName, 
  setNewCategoryName, 
  handleAddCategory, 
  onCancel 
}: AddNewCategoryFormProps) => {
  return (
    <div className="p-2 bg-[#5A1876]/10 rounded-lg space-y-2">
      <Input 
        type="text"
        placeholder="Enter category name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm text-white"
      />
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          onClick={handleAddCategory}
          className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs"
        >
          Add
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          className="bg-transparent text-xs text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddNewCategoryForm;
