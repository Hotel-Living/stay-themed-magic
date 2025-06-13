
import React, { useState } from "react";

interface MenuOption {
  id: string;
  label: string;
  content: string;
}

const menuOptions: MenuOption[] = [
  {
    id: "utilities",
    label: "UTILITIES",
    content: `**PREDICTABILITY – RESPONSIBILITY – EFFICIENCY**

⚙️ HOTEL-LIVING GUESTS ARE NOT TRANSIENT TOURISTS
They are respectful long-stay residents who stay for 8, 16, 24, or 32 days. 

🌿 SMARTER GUESTS, SMARTER RESOURCE USE
Because of the longer stays and the more personal relationship they establish with your property, these guests tend to be more mindful of how they use resources.
They feel more like temporary tenants than short-term visitors — and that makes a real difference.
________________________________________
⚡ UTILITIES CONSUMPTION IS LOWER AND MORE STABLE
💡 ENERGY-EFFICIENT SYSTEMS (like LED lighting and moderate climate control) become even more effective
🌱 IF FEELING AT HOME guests naturally adopt more conservative habits
________________________________________
💜 A SENSE OF SHARED RESPONSIBILITY
Because Hotel-Living offers affordable rates, guests are often aware and respectful of the opportunity they've been given.
They know this model depends on balance, care, and sustainability — and most of them act accordingly.
________________________________________
🔄 OPTIMIZED OPERATIONS = OPTIMIZED CONSUMPTION
Thanks to reduced room turnover and simplified housekeeping protocols, utility usage remains consistent and optimized, with fewer spikes in electricity or water demand.
________________________________________`
  },
  {
    id: "cleaning",
    label: "CLEANING",
    content: `**HOMESTYLE CLEANING – LONG-TERM COMFORT**

🧼 HOTEL LIVING MEANS A NEW STANDARD OF HOSPITALITY
🏡 ONE THAT FEELS MORE LIKE HOME.
Unlike traditional hotels with daily housekeeping, our approach mirrors the rhythm of real life.

Just like someone living at home might have light help a few times a week, our guests enjoy thoughtful, discreet care that supports their independence and comfort.
________________________________________
🧹 FULL CLEANING — ONCE A WEEK
A complete room cleaning every 7 days ensures hygiene and freshness, with minimal intrusion.
________________________________________
🔄 LIGHT DAILY REFRESH (UPON REQUEST)
Optional light touch-ups — 🗑️ waste removal, 🧺 light tidying, 🌬️ ventilation — are available, respectful of privacy and lifestyle.
________________________________________
🛏️ LINEN CHANGE — EVERY 5 DAYS
Sheets and towels are refreshed regularly, matching the comfort standards of home living.
________________________________________
💼 OPERATIONAL BENEFITS
This model reduces operational costs for hotels while offering guests a residential experience:

•	Less disruption
•	More privacy
•	A feeling of truly belonging — not just staying.`
  },
  {
    id: "meal-plans",
    label: "MEALS",
    content: `🍽 THE HOTEL-LIVING MEAL MODEL: SIMPLE, WHOLESOME, HOMESTYLE

Except for luxury or high-end boutique hotels — or in the case of short 8-day experiential stays centered on fine dining or culinary themes — Hotel-Living is not about gourmet cuisine or lavish buffets.

In most cases, the Hotel-Living experience is built on comfort, simplicity, and sustainability.

Our guests are not here for extravagance.

They are not tourists. They are long-stay residents looking for a reliable, healthy, and affordable meal routine — something that feels like real life at home.
________________________________________
🔧 THAT'S WHY OUR FOOD MODEL IS:

✅ 🥗 Balanced, homestyle, and easy to prepare

✅ 🍎 Designed for moderation and wellness, not indulgence

✅ 👨‍🍳 Compatible with your hotel's existing kitchen setup and staff

✅ ♻️ Low-waste and low-cost — without sacrificing quality or care
________________________________________
🍳 FLEXIBLE MEAL PLANS

Whether offering breakfast only or all-inclusive, Hotel-Living meal plans are built for:

•	🧘 Consistency

•	🏡 Comfort

•	🙂 Guest satisfaction — not culinary showmanship.
________________________________________
💼 OPERATIONAL ADVANTAGES:

🧑‍🍳 Lower operational complexity

🧾 Predictable costs and portion control

😊 A relaxed, familiar dining experience that guests truly value
________________________________________
📊 BUDGET & PLANNING BENEFITS:

Because all bookings are made in advance and fixed-duration:

✅ 📅 You'll know exactly how many guests are coming — and for how long.

✅ 🚫 Zero food waste becomes a real possibility.
________________________________________
🔁 SIMPLE, EFFICIENT KITCHEN STRATEGY:

For simpler kitchens, there's a proven, cost-effective strategy:

🔄 WEEKLY ROTATING MENUS

Where each weekday has a set meal that can be repeated every week — allowing:

•	🛒 Bulk purchasing

•	🍳 Simplified preparation

•	💰 Further cost reduction
________________________________________
🔑 THE RESULT:

🏨 Hotels save

🏡 Guests feel at home

🌍 And the entire experience becomes scalable, sustainable, and deeply human.`
  },
  {
    id: "total-costs",
    label: "TOTAL COST",
    content: `**TOTAL COSTS**

Content for Total Costs will be added here.`
  }
];

export const CostItemsTab: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("utilities");

  const activeContent = menuOptions.find(option => option.id === activeOption)?.content || "";

  return (
    <div className="space-y-6">
      {/* Horizontal Menu */}
      <div className="flex justify-center space-x-3">
        {menuOptions.map(option => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={`
              relative cursor-pointer px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-300 border
              ${activeOption === option.id 
                ? 'bg-gradient-to-r from-indigo-500/70 to-purple-500/70 text-white shadow-lg transform scale-105 border-indigo-300/40 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-white/80 hover:from-slate-600/60 hover:to-slate-500/60 hover:text-white hover:scale-102 border-slate-500/30 backdrop-blur-sm'}
            `}
          >
            {/* Subtle glow effect for active item */}
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-md blur-lg opacity-60 -z-10"></div>
            )}
            {option.label}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
        
        {/* Utilities Cost Table Image - moved to top */}
        {activeOption === "utilities" && (
          <div className="mb-8 rounded-lg p-4 bg-[#0807a0]">
            <img 
              src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" 
              alt="Utilities Cost Breakdown Table" 
              className="w-full h-auto rounded-lg mx-auto" 
            />
          </div>
        )}
        
        {/* Cleaning Cost Table Image - moved to top */}
        {activeOption === "cleaning" && (
          <div className="mb-8 rounded-lg p-4 bg-[#0807a0]">
            <img 
              src="/lovable-uploads/f41a8e9d-034a-40b2-9a49-73fa5727f76d.png" 
              alt="Cleaning & Laundry Costs Table" 
              className="w-full h-auto rounded-lg mx-auto" 
            />
          </div>
        )}
        
        {/* Meal Plan Cost Table Image - moved to top */}
        {activeOption === "meal-plans" && (
          <div className="mb-8 rounded-lg p-4 bg-[#7c27af]">
            <img 
              src="/lovable-uploads/5e764b54-7da7-4962-85ff-d5e8c6679f20.png" 
              alt="Meal Plan Cost Table" 
              className="w-3/2 h-auto rounded-lg mx-auto" 
            />
          </div>
        )}
        
        <div className="text-lg whitespace-pre-line">{activeContent}</div>
        
        {/* Total Costs Table Image */}
        {activeOption === "total-costs" && (
          <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
            <img 
              src="/lovable-uploads/b2cd1c13-f37b-4ac8-a0e2-2b3d7f567fce.png" 
              alt="Total Cost Per Full Stay Table" 
              className="w-full h-auto rounded-lg mx-auto" 
            />
          </div>
        )}
      </div>
    </div>
  );
};
