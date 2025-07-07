import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

interface FilterOption {
  id: string;
  value: string;
  category: string;
  source_type: string;
  is_active: boolean;
}

export function useFiltersByCategoryWithLanguage(category: string) {
  const { language } = useTranslation();
  
  return useQuery({
    queryKey: ['filters-with-mappings', category, language],
    queryFn: async (): Promise<FilterOption[]> => {
      console.log(`🔍 Fetching filters with mappings for category: ${category}, language: ${language}`);
      
      // Get mappings for this category
      const { data: mappings, error: mappingsError } = await supabase
        .from('filter_value_mappings')
        .select('spanish_value, english_value')
        .eq('category', category)
        .eq('is_active', true);

      if (mappingsError) {
        console.error(`❌ Error fetching mappings for category ${category}:`, mappingsError);
      }

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

      // Create a mapping lookup for quick access
      const mappingLookup = new Map<string, string>();
      if (mappings) {
        mappings.forEach(mapping => {
          // Create bidirectional mapping
          mappingLookup.set(mapping.spanish_value, mapping.english_value);
          mappingLookup.set(mapping.english_value, mapping.spanish_value);
        });
      }

      // Transform filters based on language preference and mappings
      const languageFilteredData: FilterOption[] = [];
      const processedValues = new Set<string>();

      filters.forEach(filter => {
        const filterValue = filter.value;
        let displayValue = filterValue;
        
        // Apply language-specific transformation using mappings
        if (language === 'es') {
          // If it's already Spanish, use as-is
          // If it's English and we have a Spanish mapping, use the Spanish version
          if (mappingLookup.has(filterValue)) {
            const mappedValue = mappingLookup.get(filterValue);
            // Use Spanish value if this is English->Spanish mapping
            if (mappings?.some(m => m.english_value === filterValue && m.spanish_value === mappedValue)) {
              displayValue = mappedValue!;
            }
          }
        } else {
          // For English and other languages, prefer English values
          if (mappingLookup.has(filterValue)) {
            const mappedValue = mappingLookup.get(filterValue);
            // Use English value if this is Spanish->English mapping  
            if (mappings?.some(m => m.spanish_value === filterValue && m.english_value === mappedValue)) {
              displayValue = mappedValue!;
            }
          }
        }

        // Avoid duplicates (e.g., both "Todo incluido" and "All Inclusive" in same language)
        if (!processedValues.has(displayValue)) {
          processedValues.add(displayValue);
          languageFilteredData.push({
            ...filter,
            value: displayValue
          });
        }
      });

      console.log(`✅ Found ${languageFilteredData.length} mapped filters for category ${category} (${language}):`, languageFilteredData.map(f => f.value));
      return languageFilteredData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}