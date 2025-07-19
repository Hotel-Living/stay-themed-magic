import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
interface MenuOption {
  id: string;
  labelKey: string;
  contentKey?: string;
}
const CostItemsTab: React.FC = () => {
  const {
    t
  } = useTranslation("dashboard");
  const [activeOption, setActiveOption] = useState<string>("utilities");
  const menuOptions: MenuOption[] = [{
    id: "utilities",
    labelKey: "ratesCalculator.utilities",
    contentKey: "utilities"
  }, {
    id: "cleaning",
    labelKey: "ratesCalculator.cleaning",
    contentKey: "cleaning"
  }, {
    id: "meal-plans",
    labelKey: "ratesCalculator.meals",
    contentKey: "meals"
  }, {
    id: "total-costs",
    labelKey: "ratesCalculator.totalCost"
  }];
  const getContentForOption = (optionId: string): string => {
    switch (optionId) {
      case "utilities":
        return `**${t('ratesCalculator.utilitiesTitle')}**

⚙️ ${t('ratesCalculator.utilitiesGuestsNotTransients')}
${t('ratesCalculator.utilitiesDescription1')}

🌿 ${t('ratesCalculator.utilitiesSmartGuestsTitle')}
${t('ratesCalculator.utilitiesDescription2')}
${t('ratesCalculator.utilitiesDescription3')}
________________________________________
⚡ ${t('ratesCalculator.utilitiesLowerConsumption')}
💡 ${t('ratesCalculator.utilitiesEnergyEfficiency')}
🌱 ${t('ratesCalculator.utilitiesConservativeHabits')}
________________________________________
💜 ${t('ratesCalculator.utilitiesSharedResponsibility')}
${t('ratesCalculator.utilitiesResponsibilityDescription')}
________________________________________
🔄 ${t('ratesCalculator.utilitiesOptimizedOperations')}
${t('ratesCalculator.utilitiesOptimizedDescription')}
________________________________________`;
      case "cleaning":
        return `**${t('ratesCalculator.cleaningModelTitle')}**

🧼 ${t('ratesCalculator.cleaningHotelLivingStandard')}
🏡 ${t('ratesCalculator.cleaningFeelsLikeHome')}
${t('ratesCalculator.cleaningDescription1')}

${t('ratesCalculator.cleaningDescription2')}
________________________________________
🧹 ${t('ratesCalculator.cleaningCompleteTitle')}
${t('ratesCalculator.cleaningCompleteDescription')}
________________________________________
🔄 ${t('ratesCalculator.cleaningLightRefresh')}
${t('ratesCalculator.cleaningLightRefreshDescription')}
________________________________________
🛏️ ${t('ratesCalculator.cleaningBedChange')}
${t('ratesCalculator.cleaningBedChangeDescription')}
________________________________________
💼 ${t('ratesCalculator.cleaningOperationalBenefits')}
${t('ratesCalculator.cleaningOperationalDescription')}`;
      case "meal-plans":
        return "**MEAL PLANS - BALANCED APPROACH**\n\nOur meal plans are designed to provide balanced, nutritious options that cater to long-stay guests while maintaining operational efficiency.\n\n**FLEXIBLE MEAL PLANS**\n\nGuests can choose from various meal plan options based on their preferences and dietary requirements.\n\n**OPERATIONAL BENEFITS**\n\n• Lower kitchen complexity\n• Predictable costs\n• Relaxed dining experience\n\n**RESULT**\n\n🏨 Hotels benefit from simplified operations\n🏡 Guests enjoy home-like dining flexibility\n🌍 Sustainable and cost-effective approach";
      default:
        return "";
    }
  };
  const activeContent = getContentForOption(activeOption);
  return <div className="space-y-6">
      {/* Redesigned Horizontal Menu with Hotel-Living Colors */}
      <div className="flex justify-center space-x-3">
        {menuOptions.map(option => <div key={option.id} onClick={() => setActiveOption(option.id)} className={`
              relative cursor-pointer px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm
              ${activeOption === option.id ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg transform scale-105 border-blue-300/40' : 'bg-gradient-to-r from-blue-800/40 to-purple-800/40 text-white/80 hover:from-blue-700/60 hover:to-purple-700/60 hover:text-white hover:scale-102 border-blue-500/30'}
            `}>
            {/* Soft glow effect for active item */}
            {activeOption === option.id && <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-lg opacity-60 -z-10"></div>}
            {t(option.labelKey)}
          </div>)}
      </div>

      {/* Content Area with Updated Background */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        
        {/* Utilities Cost Table Image with purple glow */}
        {activeOption === "utilities" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" alt="Utilities Cost Breakdown Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>}
        
        {/* Cleaning Cost Table Image with purple glow */}
        {activeOption === "cleaning" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/f41a8e9d-034a-40b2-9a49-73fa5727f76d.png" alt="Cleaning & Laundry Costs Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>}
        
        {/* Meal Plan Cost Table Image with purple glow */}
        {activeOption === "meal-plans" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="Meal Plan Cost Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/110303a2-ca68-4631-9654-8546151560be.png" />
            </div>
          </div>}
        
        {/* Content display only for non-total-costs sections */}
        {activeOption !== "total-costs" && <div className="text-lg whitespace-pre-line">{activeContent}</div>}
        
        {/* Total Costs Tables Images with purple glow - 3 images vertically arranged with negative margins for tight spacing */}
        {activeOption === "total-costs" && <div className="flex flex-col items-center">
            {/* 3-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="3-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/19b1348e-95c1-47b0-994b-f51b541b3b66.png" />
            </div>
            
            {/* 4-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="4-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/de1ac570-1974-4c95-b5b4-c4e058faf1f2.png" />
            </div>
            
            {/* 5-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="5-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/2732e24f-67d9-4697-9c03-a77aa12a50ff.png" />
            </div>
          </div>}
        
        {/* Add disclaimer at the bottom */}
        <div className="mt-8 pt-4 border-t border-purple-500/30">
          <p className="text-sm text-white/60 italic text-center">
            {t("ratesCalculator.disclaimer")}
          </p>
        </div>
      </div>
    </div>;
};
export { CostItemsTab };