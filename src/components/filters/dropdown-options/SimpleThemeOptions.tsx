
import React from "react";
import { FilterState } from "../FilterTypes";

interface SimpleThemeOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const SimpleThemeOptions: React.FC<SimpleThemeOptionsProps> = ({ type, fontSize }) => {
  const themeCategories = [
    "Art", "Business", "Culture", "Education", "Entertainment", 
    "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
    "Languages", "Lifestyle", "Nature", "Personal Development", 
    "Relationships", "Science and Technology", "Social Impact", "Sports"
  ];
  
  return (
    <div className="grid grid-cols-1">
      {themeCategories.map((category) => (
        <button
          key={category}
          onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
            detail: { key: 'theme', value: { id: category.toLowerCase(), name: category } } 
          }))}
          className={`text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
