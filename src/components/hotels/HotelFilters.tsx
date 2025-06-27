
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pgdzrvdwgoomjnnegkcn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0'
);

interface FilterOptions {
  countries: Array<{ name: string; id: string }>;
  locations: Array<{ name: string; id: string }>;
  affinities: Array<{ name: string; id: string }>;
  activities: Array<{ name: string; id: string }>;
  months: Array<{ name: string; id: string }>;
  mealPlans: Array<{ name: string; id: string }>;
  propertyTypes: Array<{ name: string; id: string }>;
  propertyStyles: Array<{ name: string; id: string }>;
  categories: number[];
  roomTypes: string[];
  days: Array<{ name: string; id: string }>;
  prices: Array<{ name: string; id: string }>;
}

const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const [countries, locations, affinitiesRaw, activitiesRaw, months, mealPlans, propertyTypes, propertyStyles] = await Promise.all([
    supabase.from('hotels').select('country').neq('country', '').then(res => [...new Set(res.data?.map(h => h.country))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotels').select('city').neq('city', '').then(res => [...new Set(res.data?.map(h => h.city))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotel_themes').select('themes(name,id)').then(res => res.data?.map(d => d.themes) || []),
    supabase.from('hotel_activities').select('activities(name,id)').then(res => res.data?.map(d => d.activities) || []),
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

  // Flatten the nested arrays and filter out null values
  const affinities = affinitiesRaw.filter(Boolean).flat();
  const activities = activitiesRaw.filter(Boolean).flat();

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
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [options, setOptions] = useState<FilterOptions>({
    countries: [],
    locations: [],
    affinities: [],
    activities: [],
    months: [],
    mealPlans: [],
    propertyTypes: [],
    propertyStyles: [],
    categories: [],
    roomTypes: [],
    days: [],
    prices: []
  });

  useEffect(() => {
    fetchFilterOptions().then(setOptions);
  }, []);

  const handleToggle = (key: string, val: string) => {
    setFilters(prev => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(val) ? current.filter(v => v !== val) : [...current, val]
      };
    });
  };

  const handleReset = () => setFilters({});

  const renderCheckboxes = (label: string, key: string, list: Array<{ name: string; id: string }> | undefined) => (
    <div className="mb-4">
      <div className="font-bold mb-1">{label}</div>
      <div className="grid gap-1">
        {list?.map((item, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={(filters[key] || []).includes(item.id)}
              onChange={() => handleToggle(key, item.id)}
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-72 p-4 border-r overflow-y-auto h-screen bg-white">
      <button onClick={handleReset} className="mb-4 w-full py-2 bg-purple-700 text-white font-semibold rounded">{t('filters.resetFilters')}</button>
      {renderCheckboxes(t('filters.pricePerMonth'), 'price', options.prices)}
      {renderCheckboxes(t('filters.country'), 'country', options.countries)}
      {renderCheckboxes(t('filters.location'), 'location', options.locations)}
      {renderCheckboxes(t('filters.affinities'), 'affinities', options.affinities)}
      {renderCheckboxes(t('filters.activities'), 'activities', options.activities)}
      {renderCheckboxes(t('filters.numberOfDays'), 'days', options.days)}
      {renderCheckboxes(t('filters.month'), 'month', options.months)}
      {renderCheckboxes(t('filters.mealPlan'), 'mealPlan', options.mealPlans)}
      {renderCheckboxes(t('filters.propertyType'), 'propertyType', options.propertyTypes)}
      {renderCheckboxes(t('filters.propertyStyle'), 'propertyStyle', options.propertyStyles)}
      {renderCheckboxes(t('filters.category'), 'category', options.categories.map(c => ({ id: c.toString(), name: `${c}★` })))}
      {renderCheckboxes(t('filters.roomType'), 'roomType', options.roomTypes.map(r => ({ id: r, name: r })))}
      <button onClick={handleReset} className="mt-4 w-full py-2 bg-purple-700 text-white font-semibold rounded">{t('filters.resetFilters')}</button>
    </aside>
  );
};

export default HotelFilters;
