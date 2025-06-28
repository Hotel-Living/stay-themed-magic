import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSecondaryFilterData } from "@/hooks/useSecondaryFilterData";
import { FilterState } from "@/components/filters/FilterTypes";
import { ChevronDown, ChevronRight } from "lucide-react";
interface SecondaryFilterPanelProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return <div className="border-b border-purple-600/30 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-white transition-colors bg-[#5a028d] text-sm my-0 py-[5px] rounded-sm mx-0 px-[6px] font-normal">
        <span className="font-medium text-sm">{title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && <div className="px-3 pb-3 space-y-2">
          {children}
        </div>}
    </div>;
}
export function SecondaryFilterPanel({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: SecondaryFilterPanelProps) {
  const {
    t
  } = useTranslation();
  const {
    countries,
    cities,
    themes,
    activities,
    hotelFeatures,
    roomFeatures,
    propertyStyles,
    loading
  } = useSecondaryFilterData();
  const priceRanges = [{
    key: 'upTo1000',
    label: t('filters.priceRanges.upTo1000'),
    min: 0,
    max: 1000
  }, {
    key: '1000to1500',
    label: t('filters.priceRanges.1000to1500'),
    min: 1000,
    max: 1500
  }, {
    key: '1500to2000',
    label: t('filters.priceRanges.1500to2000'),
    min: 1500,
    max: 2000
  }, {
    key: 'moreThan2000',
    label: t('filters.priceRanges.moreThan2000'),
    min: 2000,
    max: 999999
  }];
  const durationOptions = [32, 24, 16, 8];
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const mealPlanOptions = [{
    key: 'breakfast',
    label: t('filters.breakfast')
  }, {
    key: 'halfBoard',
    label: t('filters.halfBoard')
  }, {
    key: 'fullBoard',
    label: t('filters.fullBoard')
  }, {
    key: 'allInclusive',
    label: t('filters.allInclusive')
  }, {
    key: 'laundryIncluded',
    label: t('filters.laundryIncluded')
  }];
  const propertyTypeOptions = [{
    key: 'hotel',
    label: t('filters.propertyTypes.hotel')
  }, {
    key: 'boutiqueHotel',
    label: t('filters.propertyTypes.boutiqueHotel')
  }, {
    key: 'resort',
    label: t('filters.propertyTypes.resort')
  }, {
    key: 'casaRural',
    label: t('filters.propertyTypes.casaRural')
  }];
  const roomTypeOptions = [{
    key: 'singleRoom',
    label: t('filters.roomTypeOptions.singleRoom')
  }, {
    key: 'doubleRoom',
    label: t('filters.roomTypeOptions.doubleRoom')
  }];
  const renderThemeHierarchy = (themeList: typeof themes, parentId: string | null = null, level: number = 0) => {
    const filteredThemes = themeList.filter(theme => parentId === null && theme.level === 1 || parentId !== null && theme.parent_id === parentId);
    return filteredThemes.map(theme => <div key={theme.id} style={{
      marginLeft: `${level * 16}px`
    }}>
        <label className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
          <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.activities?.includes(theme.id) || false} onChange={e => handleArrayFilterChange('activities', theme.id, e.target.checked)} />
          <span>{theme.name}</span>
        </label>
        {renderThemeHierarchy(themeList, theme.id, level + 1)}
      </div>);
  };
  if (loading) {
    return <div className="bg-[#2D0A50] rounded-lg p-4 text-white">
        <div className="animate-pulse">Loading filters...</div>
      </div>;
  }
  return <div className="bg-[#2D0A50] rounded-lg overflow-hidden">
      {/* Top Reset Button */}
      <div className="p-3 border-b border-purple-600/30">
        <button onClick={onResetAllFilters} className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors">
          {t('filters.resetFilters')}
        </button>
      </div>

      {/* 1. Precio por mes */}
      <CollapsibleSection title={t('filters.pricePerMonth')}>
        {priceRanges.map(range => <label key={range.key} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-[#6b0185]">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.minPrice === range.min && activeFilters.maxPrice === range.max} onChange={e => {
          if (e.target.checked) {
            handleFilterChange('minPrice', range.min);
            handleFilterChange('maxPrice', range.max);
          } else {
            handleFilterChange('minPrice', 0);
            handleFilterChange('maxPrice', null);
          }
        }} />
            <span className="text-slate-50">{range.label}</span>
          </label>)}
      </CollapsibleSection>

      {/* 2. País */}
      <CollapsibleSection title={t('filters.country')}>
        {countries.map(country => <label key={country.code} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.country === country.code} onChange={e => handleFilterChange('country', e.target.checked ? country.code : null)} />
            <span>{country.name} {country.flag}</span>
          </label>)}
      </CollapsibleSection>

      {/* 3. Ubicación */}
      <CollapsibleSection title={t('filters.location')}>
        {cities.map(city => <label key={city} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.location === city} onChange={e => handleFilterChange('location', e.target.checked ? city : null)} />
            <span>{city}</span>
          </label>)}
      </CollapsibleSection>

      {/* 4. Afinidades */}
      <CollapsibleSection title={t('filters.affinities')}>
        {renderThemeHierarchy(themes)}
      </CollapsibleSection>

      {/* 5. Actividades */}
      <CollapsibleSection title={t('filters.activities')}>
        {renderThemeHierarchy(activities)}
      </CollapsibleSection>

      {/* 6. Duración */}
      <CollapsibleSection title={t('filters.duration')}>
        {durationOptions.map(duration => <label key={duration} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.stayLengths === duration.toString()} onChange={e => handleFilterChange('stayLengths', e.target.checked ? duration.toString() : null)} />
            <span>{duration} days</span>
          </label>)}
      </CollapsibleSection>

      {/* 7. Mes */}
      <CollapsibleSection title={t('filters.month')}>
        <div className="grid grid-cols-2 gap-1">
          {months.map(month => <label key={month} className="flex items-center space-x-2 text-white text-xs cursor-pointer p-1 rounded bg-purple-700/[0.99]">
              <input type="checkbox" className="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.month === month} onChange={e => handleFilterChange('month', e.target.checked ? month : null)} />
              <span>{t(`filters.months.${month}`)}</span>
            </label>)}
        </div>
      </CollapsibleSection>

      {/* 8. Plan de comidas */}
      <CollapsibleSection title={t('filters.mealPlan')}>
        {mealPlanOptions.map(option => <label key={option.key} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.mealPlans?.includes(option.key) || false} onChange={e => handleArrayFilterChange('mealPlans', option.key, e.target.checked)} />
            <span>{option.label}</span>
          </label>)}
      </CollapsibleSection>

      {/* 9. Tipo de propiedad */}
      <CollapsibleSection title={t('filters.propertyType')}>
        {propertyTypeOptions.map(option => <label key={option.key} className="flex items-center space-x-2 text-white text-sm cursor-pointer p-1 rounded bg-purple-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.propertyType === option.key} onChange={e => handleFilterChange('propertyType', e.target.checked ? option.key : null)} />
            <span>{option.label}</span>
          </label>)}
      </CollapsibleSection>

      {/* 10. Estilo de propiedad */}
      <CollapsibleSection title={t('filters.propertyStyle')}>
        {propertyStyles.map(style => <label key={style} className="flex items-center space-x-2 text-white text-sm cursor-pointer hover:bg-purple-700/20 p-1 rounded">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.propertyStyle === style} onChange={e => handleFilterChange('propertyStyle', e.target.checked ? style : null)} />
            <span>{style}</span>
          </label>)}
      </CollapsibleSection>

      {/* 11. Categoría */}
      <CollapsibleSection title={t('filters.category')}>
        {[1, 2, 3, 4, 5].map(stars => <label key={stars} className="flex items-center space-x-2 text-white text-sm cursor-pointer hover:bg-purple-700/20 p-1 rounded">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.stars?.includes(stars.toString()) || false} onChange={e => handleArrayFilterChange('stars', stars.toString(), e.target.checked)} />
            <span>{'★'.repeat(stars)}</span>
          </label>)}
      </CollapsibleSection>

      {/* 12. Tipo de habitación */}
      <CollapsibleSection title={t('filters.roomType')}>
        {roomTypeOptions.map(option => <label key={option.key} className="flex items-center space-x-2 text-white text-sm cursor-pointer hover:bg-purple-700/20 p-1 rounded">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.roomTypes?.includes(option.key) || false} onChange={e => handleArrayFilterChange('roomTypes', option.key, e.target.checked)} />
            <span>{option.label}</span>
          </label>)}
      </CollapsibleSection>

      {/* 13. Servicios del Hotel */}
      <CollapsibleSection title={t('filters.hotelFeatures')}>
        {hotelFeatures.map(feature => <label key={feature} className="flex items-center space-x-2 text-white text-sm cursor-pointer hover:bg-purple-700/20 p-1 rounded">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.hotelFeatures?.includes(feature) || false} onChange={e => handleArrayFilterChange('hotelFeatures', feature, e.target.checked)} />
            <span>{feature}</span>
          </label>)}
      </CollapsibleSection>

      {/* 14. Servicios de la Habitación */}
      <CollapsibleSection title={t('filters.roomFeatures')}>
        {roomFeatures.map(feature => <label key={feature} className="flex items-center space-x-2 text-white text-sm cursor-pointer hover:bg-purple-700/20 p-1 rounded">
            <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" checked={activeFilters.roomFeatures?.includes(feature) || false} onChange={e => handleArrayFilterChange('roomFeatures', feature, e.target.checked)} />
            <span>{feature}</span>
          </label>)}
      </CollapsibleSection>

      {/* Bottom Reset Button */}
      <div className="p-3 border-t border-purple-600/30">
        <button onClick={onResetAllFilters} className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors">
          {t('filters.resetFilters')}
        </button>
      </div>
    </div>;
}