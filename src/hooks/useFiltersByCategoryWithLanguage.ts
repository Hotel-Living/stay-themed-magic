import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import { getTranslationKey, getTranslationPath } from "@/utils/filterTranslationMappings";

interface FilterOption {
  id: string;
  value: string;
  category: string;
  source_type: string;
  is_active: boolean;
}

export function useFiltersByCategoryWithLanguage(category: string) {
  const { language, t } = useTranslation('filters');
  
  return useQuery({
    queryKey: ['filters-with-translations', category, language],
    queryFn: async (): Promise<FilterOption[]> => {
      console.log(`🔍 Fetching filters with translations for category: ${category}, language: ${language}`);
      
      // Get all filters for this category
      const { data: filters, error: filtersError } = await supabase
        .from('filters')
        .select('id, value, category, source_type, is_active')
        .eq('category', category)
        .eq('is_active', true)
        .order('value');

      if (filtersError) {
        console.error(`❌ Error fetching filters for category ${category}:`, filtersError);
        throw filtersError;
      }

      if (!filters) {
        console.log(`✅ No filters found for category ${category}`);
        return [];
      }

      // Transform filters using proper i18n translations
      const translationPath = getTranslationPath(category);
      const translatedData: FilterOption[] = [];
      const processedValues = new Set<string>();

      filters.forEach(filter => {
        const dbValue = filter.value;
        let displayValue = dbValue;
        
        // Get translation key for this database value
        const translationKey = getTranslationKey(dbValue, category);
        
        if (translationKey && translationPath) {
          // Use proper i18n translation
          const fullTranslationKey = `${translationPath}.${translationKey}`;
          const translatedValue = t(fullTranslationKey);
          
          // Only use translation if it's different from the key (i.e., translation exists)
          if (translatedValue !== fullTranslationKey) {
            displayValue = translatedValue;
          }
        }

        // Avoid duplicates
        if (!processedValues.has(displayValue)) {
          processedValues.add(displayValue);
          translatedData.push({
            ...filter,
            value: displayValue
          });
        }
      });

      // Custom ordering for meal_plans category
      if (category === 'meal_plans') {
        const mealPlanOrder = [
          'Solo alojamiento',
          'Desayuno incluido', 
          'Media pensión',
          'Pensión completa',
          'Todo incluido',
          'Lavandería incluida',
          'Lavandería exterior'
        ];
        
        translatedData.sort((a, b) => {
          // Find the original database values to determine order
          const aOriginal = filters.find(f => f.id === a.id)?.value || '';
          const bOriginal = filters.find(f => f.id === b.id)?.value || '';
          
          const aIndex = mealPlanOrder.indexOf(aOriginal);
          const bIndex = mealPlanOrder.indexOf(bOriginal);
          
          // If both items are in the predefined order, sort by that order
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          
          // If only one item is in the predefined order, prioritize it
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          // If neither item is in the predefined order, sort alphabetically
          return a.value.localeCompare(b.value);
        });
      }

      console.log(`✅ Found ${translatedData.length} translated filters for category ${category} (${language}):`, translatedData.map(f => f.value));
      return translatedData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}