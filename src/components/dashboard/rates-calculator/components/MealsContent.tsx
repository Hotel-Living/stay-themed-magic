
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const MealsContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6">{t('dashboard.ratesCalculator.mealsModelTitle')}</h3>
      
      <div className="space-y-4">
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsModelDescription1')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsModelDescription2')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsLuxuryException')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsComfortBased')}</p>
        
        <p className="text-sm font-semibold">{t('dashboard.ratesCalculator.mealsNotForLuxury')}</p>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.mealsResidents')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsFoodModelTitle')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsBalanced')}</p>
            <p>{t('dashboard.ratesCalculator.mealsModeration')}</p>
            <p>{t('dashboard.ratesCalculator.mealsCompatible')}</p>
            <p>{t('dashboard.ratesCalculator.mealsLowWaste')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsFlexibleMeals')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsPlanDescription')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsConsistency')}</p>
            <p>{t('dashboard.ratesCalculator.mealsComfort')}</p>
            <p>{t('dashboard.ratesCalculator.mealsSatisfaction')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsOperationalAdvantages')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsLowerComplexity')}</p>
            <p>{t('dashboard.ratesCalculator.mealsPredictableCosts')}</p>
            <p>{t('dashboard.ratesCalculator.mealsRelaxedDining')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsBudgetBenefits')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsAdvanceBookings')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsKnowGuests')}</p>
            <p>{t('dashboard.ratesCalculator.mealsZeroWaste')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsKitchenStrategy')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsStrategyDescription')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsRotatingMenus')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.mealsFixedMenus')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsBulkPurchasing')}</p>
            <p>{t('dashboard.ratesCalculator.mealsSimplifiedPrep')}</p>
            <p>{t('dashboard.ratesCalculator.mealsCostReduction')}</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.mealsResult')}</p>
          <div className="ml-4 text-sm space-y-1">
            <p>{t('dashboard.ratesCalculator.mealsHotelSaves')}</p>
            <p>{t('dashboard.ratesCalculator.mealsGuestsAtHome')}</p>
            <p>{t('dashboard.ratesCalculator.mealsScalableExperience')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
