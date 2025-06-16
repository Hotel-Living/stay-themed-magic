
import React from 'react';
import Calculator from '../Calculator';
import { useTranslation } from '@/hooks/useTranslation';

export const RatesCalculatorTab = () => {
  const { t, language } = useTranslation();

  const costCategories = [
    {
      title: language === 'es' ? t('dashboard.basicServices') : 'BASIC SERVICES',
      items: [
        { name: 'Reception', cost: 2 },
        { name: 'Maintenance', cost: 1.5 },
        { name: 'Utilities', cost: 3 },
        { name: 'Insurance', cost: 0.5 }
      ]
    },
    {
      title: language === 'es' ? t('dashboard.cleaning') : 'CLEANING',
      items: [
        { name: 'Room cleaning', cost: 8 },
        { name: 'Linen change', cost: 4 },
        { name: 'Common areas', cost: 2 }
      ]
    },
    {
      title: language === 'es' ? t('dashboard.meals') : 'MEALS',
      items: [
        { name: 'Breakfast', cost: 12 },
        { name: 'Lunch', cost: 18 },
        { name: 'Dinner', cost: 22 }
      ]
    }
  ];

  const totalCost = costCategories.reduce((total, category) => 
    total + category.items.reduce((sum, item) => sum + item.cost, 0), 0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {costCategories.map((category, index) => (
          <div key={index} className="glass-card rounded-xl p-4 bg-[#5d0478]">
            <h3 className="text-lg font-semibold mb-4 text-center text-fuchsia-200">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">${item.cost}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6 bg-[#5d0478] text-center">
        <h3 className="text-xl font-bold mb-2 text-fuchsia-200">
          {language === 'es' ? t('dashboard.totalCost') : 'TOTAL COST'}
        </h3>
        <p className="text-3xl font-bold text-white">${totalCost}</p>
        <p className="text-sm text-fuchsia-300 mt-2">per room per day</p>
      </div>

      <Calculator />
    </div>
  );
};
