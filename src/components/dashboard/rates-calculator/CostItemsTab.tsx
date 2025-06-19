
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface MenuOption {
  id: string;
  labelKey: string;
  content: string;
}

const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState<string>("utilities");

  const menuOptions: MenuOption[] = [
    {
      id: "utilities",
      labelKey: "dashboard.ratesCalculator.utilities",
      content: `SUMINISTROS`
    },
    {
      id: "cleaning",
      labelKey: "dashboard.ratesCalculator.cleaning",
      content: `LIMPIEZA`
    },
    {
      id: "meal-plans",
      labelKey: "dashboard.ratesCalculator.meals",
      content: `**THE HOTEL-LIVING MEAL MODEL: SIMPLE, HEALTHY, HOME-STYLE**

Except in luxury, high-end boutique hotels or in 8-day stays focused on gastronomy or culinary experiences, Hotel-Living is not about gourmet cuisine or luxurious buffets.

In most cases, the Hotel-Living experience is based on comfort, simplicity, and sustainability.

Our guests aren't here for luxury.  
They are long-term residents seeking a reliable, healthy, and affordable meal routine — something that resembles real home life.  
________________________________________  
🔧 THAT'S WHY OUR MEAL MODEL IS:

✅ 🥗 Balanced, home-style, and easy to prepare  
✅ 🍎 Designed for moderation and well-being, not excess  
✅ 👨‍🍳 Compatible with your hotel's existing kitchen and staff  
✅ ♻️ Low in waste and cost — without sacrificing quality or care  
________________________________________  
🍳 FLEXIBLE MEAL PLANS

Whether offering only breakfast or full board, Hotel-Living meal plans are designed for:

• 🧘 Consistency  
• 🏡 Comfort  
• 🙂 Guest satisfaction — not culinary spectacle.  
________________________________________  
💼 OPERATIONAL ADVANTAGES:

🧑‍🍳 Lower operational complexity  
🧾 Predictable costs and portion control  
😊 A relaxed, homey dining experience your guests truly value  
________________________________________  
📊 BUDGET AND PLANNING BENEFITS:

As all bookings are made in advance and for fixed durations:

✅ 📅 You'll know exactly how many guests are coming — and for how long.  
✅ 🚫 Food waste can be brought down to nearly zero.  
________________________________________  
🔁 SIMPLE, EFFICIENT KITCHEN STRATEGY:

For simple kitchens, there's a proven, cost-effective strategy:

🔄 ROTATING WEEKLY MENUS

Where each day of the week has a fixed menu that repeats weekly, allowing:

• 🛒 Bulk purchasing  
• 🍳 Simplified prep  
• 💰 Further cost reduction  
________________________________________  
🔑 THE RESULT:

🏨 Your hotel saves  
🏡 Your guests feel at home  
🌍 And the whole experience becomes scalable, sustainable, and deeply human.`
    },
    {
      id: "total-costs",
      labelKey: "dashboard.ratesCalculator.totalCost",
      content: ``
    }
  ];

  const activeContent = menuOptions.find(option => option.id === activeOption)?.content || "";

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-3">
        {menuOptions.map(option => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={
              `relative cursor-pointer px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm
              ${activeOption === option.id 
                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg transform scale-105 border-blue-300/40' 
                : 'bg-gradient-to-r from-blue-800/40 to-purple-800/40 text-white/80 hover:from-blue-700/60 hover:to-purple-700/60 hover:text-white hover:scale-102 border-blue-500/30'}
              `
            }
          >
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-lg opacity-60 -z-10"></div>
            )}
            {t(option.labelKey)}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        {activeOption === "utilities" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" alt="Utilities Cost Breakdown Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>
        )}

        {activeOption === "cleaning" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/f41a8e9d-034a-40b2-9a49-73fa5727f76d.png" alt="Cleaning & Laundry Costs Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>
        )}

        {activeOption === "meal-plans" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/6a458e43-6e8b-4ed0-a804-719a0edfbc9d.png" alt="Meal Plan Cost Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>
        )}

        {activeOption !== "total-costs" && (
          <div className="text-lg whitespace-pre-line">{activeContent}</div>
        )}

        {activeOption === "total-costs" && (
          <div className="flex flex-col items-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/a4d6ce0f-a7ff-4efb-9829-5c03bf5785d8.png" alt="3-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/92000e0e-b70a-4664-8fcf-2fc75d33d6f9.png" alt="4-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/d7e96b77-c634-4ec1-a9b9-80f95f4b8ee0.png" alt="5-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { CostItemsTab };
