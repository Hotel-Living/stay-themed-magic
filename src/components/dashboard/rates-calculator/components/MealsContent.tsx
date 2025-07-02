
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const MealsContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6">{t('dashboard.ratesCalculator.mealsContent.title')}</h3>
      
      <div className="space-y-4">
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.luxuryException')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.comfortBased')}</p>
        
        <p className="text-sm font-semibold">{t('dashboard.ratesCalculator.mealsContent.notForLuxury')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.residents')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.foodModelTitle')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.balanced')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.moderation')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.compatible')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.lowWaste')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.flexibleMeals')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.mealPlansDesc')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.consistency')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.comfort')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.satisfaction')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.operationalAdvantages')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.lowerComplexity')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.predictableCosts')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.relaxedDining')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.budgetBenefits')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.advanceBookings')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.knowGuests')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.zeroWaste')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.kitchenStrategy')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.strategyDesc')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.rotatingMenus')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsContent.fixedMenus')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.bulkPurchasing')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.simplifiedPrep')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.costReduction')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsContent.result')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsContent.hotelSaves')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.guestsAtHome')}</p>
            <p>{t('dashboard.ratesCalculator.mealsContent.scalableExperience')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
