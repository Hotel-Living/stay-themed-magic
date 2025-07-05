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
    queryKey: ['filters', category, language],
    queryFn: async (): Promise<FilterOption[]> => {
      console.log(`🔍 Fetching filters for category: ${category}, language: ${language}`);
      
      const { data, error } = await supabase
        .from('filters')
        .select('id, value, category, source_type, is_active')
        .eq('category', category)
        .eq('is_active', true)
        .order('value');

      if (error) {
        console.error(`❌ Error fetching filters for category ${category}:`, error);
        throw error;
      }

      if (!data) {
        console.log(`✅ No filters found for category ${category}`);
        return [];
      }

      // Filter by language based on content characteristics
      const languageFilteredData = data.filter(filter => {
        const value = filter.value.toLowerCase();
        
        // Spanish language detection
        if (language === 'es') {
          // Spanish characteristics: contains Spanish accents, ñ, or known Spanish words
          return (
            /[áéíóúñü]/.test(value) || 
            /\b(solo|desayuno|media|pensión|completa|habitación|individual|doble|apartamento|suite|estudio|balcón|máquina|café|baño|privado|cocina|equipada|vista|mar|minibar|escritorio|caja|fuerte|aire|acondicionado|terraza|jacuzzi|chimenea|montaña|cafetera|nevera|microondas|sofá|cama|mesa|trabajo|acepta|mascotas|acceso|playa|piscina|wifi|gratuito|gimnasio|restaurante|bar|spa|parking|recepción|servicio|limpieza|jardín|barbacoa|lavandería|biblioteca|sala|conferencias|habitaciones|consigna|equipaje|alquiler|bicicletas|transfer|aeropuerto|cambio|moneda|triple|familiar|ático|loft|cabaña|villa|bungalow|casa|compartida)\b/.test(value)
          );
        }
        
        // English language detection (default)
        if (language === 'en') {
          // English characteristics: no Spanish accents and common English words
          return (
            !/[áéíóúñü]/.test(value) && 
            !/\b(solo|desayuno|media|pensión|completa|habitación|baño|equipada|acepta|mascotas|acceso|playa|piscina|gratuito|gimnasio|restaurante|servicio|limpieza|jardín|barbacoa|lavandería|biblioteca|conferencias|habitaciones|consigna|equipaje|alquiler|bicicletas|aeropuerto|cambio|moneda|cabaña|villa|bungalow|compartida)\b/.test(value)
          );
        }
        
        // For other languages (pt, ro), fall back to English for now
        return !/[áéíóúñü]/.test(value);
      });

      console.log(`✅ Found ${languageFilteredData.length} language-filtered filters for category ${category} (${language}):`, languageFilteredData);
      return languageFilteredData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}