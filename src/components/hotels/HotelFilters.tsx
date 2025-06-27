
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';
import { ChevronDown, ChevronRight } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fetchFilterOptions = async () => {
  const [countries, locations, affinities, activities, months, mealPlans, propertyTypes, propertyStyles] = await Promise.all([
    supabase.from('hotels').select('country').neq('country', '').then(res => [...new Set(res.data?.map(h => h.country))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotels').select('city').neq('city', '').then(res => [...new Set(res.data?.map(h => h.city))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotel_themes').select('themes(name,id)').then(res => res.data?.map(d => d.themes).flat() || []),
    supabase.from('hotel_activities').select('activities(name,id)').then(res => res.data?.map(d => d.activities).flat() || []),
    supabase.from('hotels').select('available_months').then(res => [...new Set(res.data?.flatMap(h => h.available_months || []))].map(m => ({ name: m, id: m })) || []),
    supabase.from('hotels').select('meal_plans').then(res => [...new Set(res.data?.flatMap(h => h.meal_plans || []))].map(p => ({ name: p, id: p })) || []),
    Promise.resolve([
      { id: 'hotel', name: 'Hotel' },
      { id: 'boutique', name: 'Hotel Boutique' },
      { id: 'resort', name: 'Resort' },
      { id: 'rural', name: 'Casa Rural' },
    ]),
    supabase.from('hotels').select('style').then(res => [...new Set(res.data?.map(h => h.style))].map(s => ({ name: s, id: s })) || []),
  ]);

  return {
    countries,
    locations,
    affinities,
    activities,
    months,
    mealPlans,
    propertyTypes,
    propertyStyles,
    categories: [1, 2, 3, 4, 5],
    roomTypes: ['Single Room', 'Double Room'],
    days: [
      { name: '32', id: '32' },
      { name: '24', id: '24' },
      { name: '16', id: '16' },
      { name: '8', id: '8' },
    ],
    prices: [
      { name: 'Under $1,000', id: 'under1000' },
      { name: '$1,000 – $1,500', id: '1000to1500' },
      { name: '$1,500 – $2,000', id: '1500to2000' },
      { name: 'Over $2,000', id: 'over2000' },
    ]
  };
};

const HotelFilters = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({});
  
  // Initialize expanded state with key sections open by default
  const [expanded, setExpanded] = useState({
    price: true,
    country: true,
    affinities: false,
    activities: false,
    days: false,
    month: false,
    mealPlan: false,
    propertyType: false,
    propertyStyle: false,
    category: false,
    roomType: false,
    location: false
  });

  useEffect(() => {
    fetchFilterOptions().then(setOptions);
  }, []);

  const handleToggle = (key, val) => {
    setFilters(prev => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(val) ? current.filter(v => v !== val) : [...current, val]
      };
    });
  };

  const handleReset = () => {
    setFilters({});
  };

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCheckboxes = (label, key, list) => (
    <div className="mb-4 border-b border-purple-700/30 pb-4">
      <div 
        className="font-bold mb-2 cursor-pointer text-white hover:text-purple-200 transition-colors flex items-center justify-between p-2 rounded hover:bg-purple-800/30" 
        onClick={() => toggleSection(key)}
      >
        <span>{label}</span>
        {expanded[key] ? (
          <ChevronDown className="w-4 h-4 text-purple-300" />
        ) : (
          <ChevronRight className="w-4 h-4 text-purple-300" />
        )}
      </div>
      {expanded[key] && (
        <div className="grid gap-2 ml-2 max-h-48 overflow-y-auto">
          {list?.map((item, i) => (
            <label key={i} className="flex items-center gap-2 text-white hover:bg-purple-800/20 p-1 rounded cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-purple-500 bg-purple-900/50 text-purple-600 focus:ring-purple-500/50"
                checked={(filters[key] || []).includes(item.id)}
                onChange={() => handleToggle(key, item.id)}
              />
              <span className="text-sm">{item.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-72 p-4 h-screen overflow-y-auto rounded-lg" style={{ backgroundColor: '#2D0A50' }}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-3">{t('filters.title', 'Filters')}</h2>
        <button 
          onClick={handleReset} 
          className="w-full py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded transition-colors"
        >
          {t('filters.resetFilters', 'Reset Filters')}
        </button>
      </div>

      {renderCheckboxes(t('filters.pricePerMonth', 'Price per Month'), 'price', options.prices)}
      {renderCheckboxes(t('filters.country', 'Country'), 'country', options.countries)}
      {renderCheckboxes(t('filters.location', 'Location'), 'location', options.locations)}
      {renderCheckboxes(t('filters.affinities', 'Affinities'), 'affinities', options.affinities)}
      {renderCheckboxes(t('filters.activities', 'Activities'), 'activities', options.activities)}
      {renderCheckboxes(t('filters.numberOfDays', 'Number of Days'), 'days', options.days)}
      {renderCheckboxes(t('filters.month', 'Month'), 'month', options.months)}
      {renderCheckboxes(t('filters.mealPlan', 'Meal Plan'), 'mealPlan', options.mealPlans)}
      {renderCheckboxes(t('filters.propertyType', 'Property Type'), 'propertyType', options.propertyTypes)}
      {renderCheckboxes(t('filters.propertyStyle', 'Property Style'), 'propertyStyle', options.propertyStyles)}
      {renderCheckboxes(t('filters.category', 'Category'), 'category', options.categories?.map(c => ({ id: c, name: `${c}★` })))}
      {renderCheckboxes(t('filters.roomType', 'Room Type'), 'roomType', options.roomTypes?.map(r => ({ id: r, name: r })))}

      <div className="mt-4 pt-4 border-t border-purple-700/30">
        <button 
          onClick={handleReset} 
          className="w-full py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded transition-colors"
        >
          {t('filters.resetFilters', 'Reset Filters')}
        </button>
      </div>
    </aside>
  );
};

export default HotelFilters;
