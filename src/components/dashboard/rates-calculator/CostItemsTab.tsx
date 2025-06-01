
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
    label: "Hotel-Living Cleaning Protocol",
    content: `🧼 Hotel-Living Cleaning Protocol – Designed for Long-Term Comfort

Hotel Living offers a new standard of hospitality — one that feels more like home.

Unlike traditional hotels with daily housekeeping, our approach mirrors the rhythm of real life.
Just like someone living at home might have light help a few times a week, our guests enjoy thoughtful, discreet care that supports their independence and comfort.

🧽 Full cleaning once a week
A complete room cleaning every 7 days ensures hygiene and freshness, with minimal intrusion.

🌀 Light daily refresh (upon request)
Optional light touch-ups (like waste removal, tidying, and ventilation) are available — respectful of privacy and lifestyle.

🛏️ Linen change every 5 days
Sheets and towels are refreshed regularly, matching the comfort standards of home living.

This model reduces operational costs for hotels while offering guests a residential experience:
less disruption, more privacy, and a feeling of truly belonging — not just staying.`
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
              relative cursor-pointer px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300
              ${activeOption === option.id 
                ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                : 'bg-[#8017B0]/60 text-white/90 hover:bg-[#8017B0]/80 hover:text-white hover:scale-102'
              }
            `}
          >
            {/* Glow effect for active item */}
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl opacity-50 -z-10"></div>
            )}
            {option.label}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
        <h3 className="text-xl font-medium mb-4 text-white">{menuOptions.find(option => option.id === activeOption)?.label}</h3>
        <div className="text-lg whitespace-pre-line">{activeContent}</div>
      </div>
    </div>
  );
};
