import React, { useState } from "react";
interface MenuOption {
  id: string;
  label: string;
  content: string;
}
const menuOptions: MenuOption[] = [{
  id: "utilities",
  label: "LOWER UTILITIES",
  content: `THE HOTEL-LIVING UTILITIES MODEL: PREDICTABLE, RESPONSIBLE, EFFICIENT

⚙️ Hotel-Living guests are not transient tourists — they are respectful long-stay residents who stay for 8, 16, 24, or 32 days.
Because of the longer stays and the more personal relationship they establish with your property, these guests tend to be more mindful of how they use resources.

They feel more like temporary tenants than short-term visitors — and that makes a real difference.

✅ Utilities consumption is lower and more stable
✅ Energy-efficient systems (like LED lighting and moderate climate control) become even more effective
✅ Guests naturally adopt more conservative habits, especially when they feel at home

And there's another key reason:
💜 Because Hotel-Living offers affordable rates, guests are often aware and respectful of the opportunity they've been given.
They know this model depends on balance, care, and sustainability — and most of them act accordingly.

Thanks to reduced room turnover and simplified housekeeping protocols, utility usage remains consistent and optimized — with fewer spikes in electricity or water demand.

Hotel-Living helps your property become a well-run, respectful home — and guests respond to that with gratitude and responsibility.`
}, {
  id: "cleaning",
  label: "HOTEL-LIVING CLEANING PROTOCOL",
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
}, {
  id: "meal-plans",
  label: "MEAL PLANS",
  content: `🍳 The Hotel-Living Meal Model: Simple, Wholesome, Homestyle

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
        
        <div className="text-lg whitespace-pre-line">{activeContent}</div>
        
        {/* Utilities Cost Table Image */}
        {activeOption === "utilities" && <div className="mt-8 bg-white rounded-lg p-4">
            <img src="/lovable-uploads/61382167-a901-4d85-9f7c-e285ae0d71ba.png" alt="Utilities Cost Breakdown Table" className="w-full h-auto rounded-lg mx-auto" />
          </div>}
        
        {/* Meal Plan Cost Table Image */}
        {activeOption === "meal-plans" && <div className="mt-8 bg-white rounded-lg p-4">
            <img src="/lovable-uploads/4fe8fc07-d747-4e00-97c8-345e93e645da.png" alt="Meal Plan Cost Table" className="w-full h-auto rounded-lg" />
          </div>}
      </div>
    </div>;
};
