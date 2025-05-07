
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
  // Add form submission handler for "Enter" key
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      handleAddCategory();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 bg-[#5d0083]/10 rounded-lg space-y-2">
      <Input 
        type="text"
        placeholder="Enter category name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm text-white"
        autoFocus
      />
      <div className="flex space-x-2">
        <Button 
          type="submit"
          size="sm" 
          className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs"
        >
          Add
        </Button>
        <Button 
          type="button"
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          className="bg-transparent text-xs text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddNewCategoryForm;
