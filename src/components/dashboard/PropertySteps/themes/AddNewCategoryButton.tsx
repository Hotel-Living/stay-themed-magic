
import React from "react";
import { PlusCircle } from "lucide-react";

interface AddNewCategoryButtonProps {
  onClick: () => void;
}

const AddNewCategoryButton = ({ onClick }: AddNewCategoryButtonProps) => {
  return (
    <button 
      className="flex items-center cursor-pointer p-2"
      onClick={onClick}
    >
      <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
      <span className="text-xs text-fuchsia-400">Add new category</span>
    </button>
  );
};

export default AddNewCategoryButton;
