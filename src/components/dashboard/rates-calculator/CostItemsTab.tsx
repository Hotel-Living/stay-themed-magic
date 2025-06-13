
import React, { useState } from "react";
interface MenuOption {
  id: string;
  label: string;
  content: string;
}
const menuOptions: MenuOption[] = [{
  id: "utilities",
  label: "LOWER UTILITIES",
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
}, {
  id: "cleaning",
  label: "HOMESTYLE CLEANING",
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
}, {
  id: "meal-plans",
  label: "MEAL PLANS",
  content: `**THE HOTEL-LIVING MEAL MODEL: SIMPLE, WHOLESOME, HOMESTYLE**

Except for luxury or high-end boutique hotels — or in the case of short 8-day experiential stays centered on fine dining or culinary themes —
Hotel-Living is not about gourmet cuisine or lavish buffets.

In most cases, the Hotel-Living experience is built on comfort, simplicity, and sustainability.

Our guests are not here for extravagance. They are not tourists.
They are long-stay residents looking for a reliable, healthy, and affordable meal routine — something that feels like real life at home.

That's why our food model is:
✅ Balanced, homestyle, and easy to prepare
✅ Designed for moderation and wellness, not indulgence
✅ Compatible with your hotel's existing kitchen setup and staff
✅ Low-waste and low-cost — without sacrificing quality or care

Whether offering breakfast only or all-inclusive, Hotel-Living meal plans are built for consistency, comfort, and guest satisfaction — not culinary showmanship.

This model provides:
🧑‍🍳 Lower operational complexity
🧾 Predictable costs and portion control
😊 A relaxed, familiar dining experience that guests truly value

💡 Additional benefits for your kitchen and budget:

Because all bookings are made in advance and fixed-duration, you'll know exactly how many guests are coming — and for how long.
➡️ Zero food waste becomes a real possibility.

Moreover, for simpler kitchens, there's a proven and cost-effective strategy:
🔁 Weekly rotating menus — where each weekday has a set meal that can be repeated every week.
This allows for bulk purchasing, simplified preparation, and further cost reduction.

Hotels save. Guests feel at home.
And the entire experience becomes scalable, sustainable, and deeply human.`
}, {
  id: "total-costs",
  label: "TOTAL COSTS",
  content: `**TOTAL COSTS**

Content for Total Costs will be added here.`
}];
export const CostItemsTab: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("utilities");
  const activeContent = menuOptions.find(option => option.id === activeOption)?.content || "";
  return <div className="space-y-6">
      {/* Horizontal Menu */}
      <div className="flex justify-center space-x-4">
        {menuOptions.map(option => <div key={option.id} onClick={() => setActiveOption(option.id)} className={`
              relative cursor-pointer px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300
              ${activeOption === option.id ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg transform scale-105' : 'bg-[#8017B0]/60 text-white/90 hover:bg-[#8017B0]/80 hover:text-white hover:scale-102'}
            `}>
            {/* Glow effect for active item */}
            {activeOption === option.id && <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl opacity-50 -z-10"></div>}
            {option.label}
          </div>)}
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
        
        {/* Utilities Cost Table Image - moved to top */}
        {activeOption === "utilities" && <div className="mb-8 rounded-lg p-4 bg-[#0807a0]">
            <img src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" alt="Utilities Cost Breakdown Table" className="w-full h-auto rounded-lg mx-auto" />
          </div>}
        
        {/* Meal Plan Cost Table Image - moved to top */}
        {activeOption === "meal-plans" && <div className="mb-8 bg-white rounded-lg p-4">
            <img src="/lovable-uploads/5e764b54-7da7-4962-85ff-d5e8c6679f20.png" alt="Meal Plan Cost Table" className="w-full h-auto rounded-lg" />
          </div>}
        
        <div className="text-lg whitespace-pre-line">{activeContent}</div>
        
        {/* Total Costs Table Image */}
        {activeOption === "total-costs" && <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
            <img src="/lovable-uploads/9e5f7815-ed09-4a9d-a73f-ae4e1a5b63d6.png" alt="Cost Per Additional Occupied Room Table" className="w-full h-auto rounded-lg mx-auto" />
          </div>}
      </div>
    </div>;
};
