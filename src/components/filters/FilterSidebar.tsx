import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fetchAllFilterOptions = async () => {
  const [countries, locations, affinities, activities, months, mealPlans, propertyTypes, propertyStyles, hotelServices, roomServices] = await Promise.all([
    supabase.from('hotels').select('country').neq('country', '').then(res => [...new Set(res.data?.map(h => h.country))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotels').select('city').neq('city', '').then(res => [...new Set(res.data?.map(h => h.city))].map(c => ({ name: c, id: c })) || []),
    supabase.from('hotel_themes').select('themes(name,id)').then(res => res.data?.map(d => d.themes) || []),
    supabase.from('hotel_activities').select('activities(name,id)').then(res => res.data?.map(d => d.activities) || []),
    supabase.from('hotels').select('available_months').then(res => [...new Set(res.data?.flatMap(h => h.available_months || []))].map(m => ({ name: m, id: m })) || []),
    supabase.from('hotels').select('meal_plans').then(res => [...new Set(res.data?.flatMap(h => h.meal_plans || []))].map(p => ({ name: p, id: p })) || []),
    supabase.from('hotels').select('property_type').then(res => [...new Set(res.data?.map(h => h.property_type))].map(p => ({ name: p, id: p })) || []),
    supabase.from('hotels').select('style').then(res => [...new Set(res.data?.map(h => h.style))].map(s => ({ name: s, id: s })) || []),
    supabase.from('hotels').select('features_hotel').then(res => {
      const all = res.data?.flatMap(h => Object.entries(h.features_hotel || {}));
      return [...new Set(all.map(([key]) => key))].map(k => ({ name: k, id: k })) || [];
    }),
    supabase.from('hotels').select('features_room').then(res => {
      const all = res.data?.flatMap(h => Object.entries(h.features_room || {}));
      return [...new Set(all.map(([key]) => key))].map(k => ({ name: k, id: k })) || [];
    })
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
    hotelServices,
    roomServices,
    categories: [1, 2, 3, 4, 5],
    roomTypes: ['Single Room', 'Double Room']
  };
};

const FilterSidebar = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    price: '',
    country: '',
    location: '',
    affinities: [],
    activities: [],
    days: '',
    month: '',
    mealPlan: '',
    propertyType: '',
    propertyStyle: '',
    category: '',
    roomType: '',
    hotelServices: [],
    roomServices: [],
  });

  const [options, setOptions] = useState({
    countries: [],
    locations: [],
    affinities: [],
    activities: [],
    months: [],
    mealPlans: [],
    propertyTypes: [],
    propertyStyles: [],
    categories: [1, 2, 3, 4, 5],
    roomTypes: ['Single Room', 'Double Room'],
    hotelServices: [],
    roomServices: [],
  });

  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchAllFilterOptions();
      setOptions(data);
    };
    loadOptions();
  }, []);

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderSelect = (label, key, values) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        className="w-full border rounded px-2 py-1"
        value={filters[key]}
        onChange={e => handleChange(key, e.target.value)}
      >
        <option value="">{t('select')}</option>
        {values.map((val, idx) => (
          <option key={idx} value={val.id || val}>{val.name || val}</option>
        ))}
      </select>
    </div>
  );

  const renderCheckboxGroup = (label, key, values) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="grid gap-1">
        {values.map((val, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters[key].includes(val.id || val)}
              onChange={e => {
                const newVals = filters[key].includes(val.id || val)
                  ? filters[key].filter(v => v !== (val.id || val))
                  : [...filters[key], val.id || val];
                handleChange(key, newVals);
              }}
            />
            <span>{val.name || val}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-72 p-4 border-r overflow-y-auto h-screen bg-white">
      {renderSelect(t('filters.pricePerMonth'), 'price', [
        { name: t('price.under1000'), id: 'under1000' },
        { name: t('price.1000to1500'), id: '1000to1500' },
        { name: t('price.1500to2000'), id: '1500to2000' },
        { name: t('price.over2000'), id: 'over2000' },
      ])}
      {renderSelect(t('filters.country'), 'country', options.countries)}
      {renderSelect(t('filters.location'), 'location', options.locations)}
      {renderCheckboxGroup(t('filters.affinities'), 'affinities', options.affinities)}
      {renderCheckboxGroup(t('filters.activities'), 'activities', options.activities)}
      {renderSelect(t('filters.numberOfDays'), 'days', [
        { name: '32', id: '32' },
        { name: '24', id: '24' },
        { name: '16', id: '16' },
        { name: '8', id: '8' },
      ])}
      {renderSelect(t('filters.month'), 'month', options.months)}
      {renderSelect(t('filters.mealPlan'), 'mealPlan', options.mealPlans)}
      {renderSelect(t('filters.propertyType'), 'propertyType', options.propertyTypes)}
      {renderSelect(t('filters.propertyStyle'), 'propertyStyle', options.propertyStyles)}
      {renderSelect(t('filters.category'), 'category', options.categories)}
      {renderSelect(t('filters.roomType'), 'roomType', options.roomTypes)}
      {renderCheckboxGroup(t('filters.hotelServices'), 'hotelServices', options.hotelServices)}
      {renderCheckboxGroup(t('filters.roomServices'), 'roomServices', options.roomServices)}
    </aside>
  );
};

export default FilterSidebar;
