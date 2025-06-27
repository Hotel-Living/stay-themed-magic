
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';

interface FilterData {
  prices: number[];
  countries: { code: string; name: string; flag: string }[];
  locations: string[];
  affinities: { id: string; name: string }[];
  activities: { id: string; name: string }[];
  days: number[];
  months: string[];
  mealPlans: string[];
  propertyTypes: string[];
  propertyStyles: string[];
  categories: string[];
  roomTypes: string[];
}

interface FilterState {
  priceRange: [number, number];
  countries: string[];
  locations: string[];
  affinities: string[];
  activities: string[];
  dayRange: number | null;
  months: string[];
  mealPlans: string[];
  propertyTypes: string[];
  propertyStyles: string[];
  categories: string[];
  roomTypes: string[];
}

export default function HotelFilters() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState<FilterData>({
    prices: [0, 5000],
    countries: [],
    locations: [],
    affinities: [],
    activities: [],
    days: [7, 14, 21, 30, 60, 90],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    mealPlans: ['Breakfast', 'Half Board', 'Full Board', 'All Inclusive'],
    propertyTypes: ['Hotel', 'Resort', 'Villa', 'Apartment'],
    propertyStyles: ['Modern', 'Classic', 'Luxury', 'Budget'],
    categories: ['5-star', '4-star', '3-star', 'Budget'],
    roomTypes: ['Single', 'Double', 'Suite', 'Family']
  });

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    countries: [],
    locations: [],
    affinities: [],
    activities: [],
    dayRange: null,
    months: [],
    mealPlans: [],
    propertyTypes: [],
    propertyStyles: [],
    categories: [],
    roomTypes: []
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    price: true,
    country: true,
    location: false,
    affinity: false,
    activity: false,
    days: false,
    months: false,
    mealPlans: false,
    propertyTypes: false,
    propertyStyles: false,
    categories: false,
    roomTypes: false
  });

  useEffect(() => {
    loadFilterData();
  }, []);

  const loadFilterData = async () => {
    try {
      setLoading(true);
      
      // Load countries
      const { data: countries } = await supabase
        .from('hotels')
        .select('country')
        .not('country', 'is', null);
      
      const uniqueCountries = [...new Set(countries?.map(h => h.country) || [])];
      
      // Load themes
      const { data: themes } = await supabase
        .from('themes')
        .select('id, name')
        .order('name');
      
      // Load activities
      const { data: activities } = await supabase
        .from('activities')
        .select('id, name')
        .order('name');

      setFilterData(prev => ({
        ...prev,
        countries: uniqueCountries.map(country => ({
          code: country,
          name: country,
          flag: '🏳️'
        })),
        affinities: themes || [],
        activities: activities || []
      }));
    } catch (error) {
      console.error('Error loading filter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      countries: [],
      locations: [],
      affinities: [],
      activities: [],
      dayRange: null,
      months: [],
      mealPlans: [],
      propertyTypes: [],
      propertyStyles: [],
      categories: [],
      roomTypes: []
    });
  };

  const handleCheckboxChange = (category: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[];
      if (checked) {
        return { ...prev, [category]: [...currentValues, value] };
      } else {
        return { ...prev, [category]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const renderFilterSection = (
    key: string,
    title: string,
    items: any[],
    filterKey: keyof FilterState
  ) => (
    <div key={key} className="mb-2">
      <button
        onClick={() => toggleSection(key)}
        className="w-full flex items-center justify-between p-3 bg-[#7607b2] text-white rounded-t hover:bg-[#8a08cc] transition-colors"
      >
        <span className="font-semibold text-sm">{title}</span>
        {expanded[key] ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {expanded[key] && (
        <div className="bg-[#5d0083] p-3 rounded-b max-h-48 overflow-y-auto">
          {items.map((item, index) => {
            const value = typeof item === 'string' ? item : (item.name || item.code || item);
            const displayName = typeof item === 'object' && item.name ? item.name : value;
            const isChecked = (filters[filterKey] as string[]).includes(value);
            
            return (
              <label key={index} className="flex items-center mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(filterKey, value, e.target.checked)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                />
                <span className="text-sm font-bold text-white">{displayName}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto p-4 bg-[#2D0A50] rounded-lg">
        <div className="text-white text-center">Loading filters...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-[#2D0A50] rounded-lg space-y-3">
      {/* Reset Button - Top */}
      <Button 
        onClick={resetFilters}
        variant="outline" 
        size="sm" 
        className="w-full mb-4 border-fuchsia-400 text-fuchsia-300 hover:bg-fuchsia-800/20"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset All Filters
      </Button>

      {/* Price Range Filter */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-3 bg-[#7607b2] text-white rounded-t hover:bg-[#8a08cc] transition-colors"
        >
          <span className="font-semibold text-sm">PRICE PER MONTH</span>
          {expanded.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expanded.price && (
          <div className="bg-[#5d0083] p-3 rounded-b">
            <div className="flex justify-between text-sm font-bold text-white mb-2">
              <span>€{filters.priceRange[0]}</span>
              <span>€{filters.priceRange[1]}</span>
            </div>
            
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
              max={5000}
              min={0}
              step={50}
              className="w-full mb-2"
            />
            
            <div className="flex justify-between text-xs text-gray-300">
              <span>€0</span>
              <span>€5,000+</span>
            </div>
          </div>
        )}
      </div>

      {/* All filter sections */}
      {renderFilterSection('country', 'COUNTRIES', filterData.countries, 'countries')}
      {renderFilterSection('location', 'LOCATIONS', filterData.locations, 'locations')}
      {renderFilterSection('affinity', 'AFFINITIES', filterData.affinities, 'affinities')}
      {renderFilterSection('activity', 'ACTIVITIES', filterData.activities, 'activities')}
      {renderFilterSection('months', 'MONTHS', filterData.months, 'months')}
      {renderFilterSection('mealPlans', 'MEAL PLANS', filterData.mealPlans, 'mealPlans')}
      {renderFilterSection('propertyTypes', 'PROPERTY TYPES', filterData.propertyTypes, 'propertyTypes')}
      {renderFilterSection('propertyStyles', 'PROPERTY STYLES', filterData.propertyStyles, 'propertyStyles')}
      {renderFilterSection('categories', 'CATEGORIES', filterData.categories, 'categories')}
      {renderFilterSection('roomTypes', 'ROOM TYPES', filterData.roomTypes, 'roomTypes')}

      {/* Reset Button - Bottom */}
      <Button 
        onClick={resetFilters}
        variant="outline" 
        size="sm" 
        className="w-full mt-4 border-fuchsia-400 text-fuchsia-300 hover:bg-fuchsia-800/20"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  );
}
