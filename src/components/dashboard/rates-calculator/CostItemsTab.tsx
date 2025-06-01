
import React, { useState } from "react";

interface MenuOption {
  id: string;
  label: string;
  content: string;
}

const menuOptions: MenuOption[] = [
  {
    id: "utilities",
    label: "Utilities",
    content: "Utilities configuration will be added here."
  },
  {
    id: "cleaning", 
    label: "Cleaning",
    content: "Cleaning configuration will be added here."
  },
  {
    id: "meal-plans",
    label: "Meal Plans", 
    content: "Meal plans configuration will be added here."
  }
];

export const CostItemsTab: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("utilities");

  const activeContent = menuOptions.find(option => option.id === activeOption)?.content || "";

  return (
    <div className="space-y-6">
      {/* Horizontal Menu */}
      <div className="flex justify-center space-x-4">
        {menuOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={`
              relative cursor-pointer px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300
              ${activeOption === option.id 
                ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                : 'bg-[#8017B0]/60 text-white/90 hover:bg-[#8017B0]/80 hover:text-white hover:scale-102'
              }
            `}
          >
            {/* Glow effect for active item */}
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-xl opacity-50 -z-10"></div>
            )}
            {option.label}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
        <h3 className="text-xl font-medium mb-4 text-white">{menuOptions.find(option => option.id === activeOption)?.label}</h3>
        <p className="text-lg">{activeContent}</p>
      </div>
    </div>
  );
};
