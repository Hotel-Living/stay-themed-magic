import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

interface ActivityOption {
  id: string;
  name: string;
  category?: string;
  level?: number;
}

export function useActivitiesDataWithLanguage() {
  const { language } = useTranslation();
  
  return useQuery({
    queryKey: ['activities', language],
    queryFn: async (): Promise<ActivityOption[]> => {
      console.log(`🎯 Fetching activities from database for language: ${language}`);
      
      const { data, error } = await supabase
        .from('activities')
        .select('id, name, category, level')
        .order('name');

      if (error) {
        console.error(`❌ Error fetching activities:`, error);
        throw error;
      }

      if (!data) {
        console.log(`✅ No activities found`);
        return [];
      }

      // Filter activities by language characteristics (similar to filters)
      const languageFilteredData = data.filter(activity => {
        const name = activity.name.toLowerCase();
        
        // Spanish language detection
        if (language === 'es') {
          // Spanish characteristics: contains Spanish accents, ñ, or known Spanish activity words
          return (
            /[áéíóúñü]/.test(name) || 
            /\b(arte|cultura|educación|entretenimiento|comida|bebidas|deportes|actividades|tecnología|ciencia|música|teatro|danza|pintura|escultura|fotografía|literatura|historia|arqueología|museos|galerías|conciertos|espectáculos|teatro|cine|festivales|deportes|natación|senderismo|ciclismo|escalada|esquí|buceo|surf|pesca|golf|tenis|fútbol|baloncesto|cocina|gastronomía|vinos|cervezas|bares|restaurantes|cafeterías|mercados|programación|informática|ingeniería|física|química|biología|astronomía|matemáticas)\b/.test(name)
          );
        }
        
        // English language detection (default)
        if (language === 'en') {
          // English characteristics: no Spanish accents and common English activity words
          return (
            !/[áéíóúñü]/.test(name) && 
            !/\b(arte|cultura|educación|entretenimiento|comida|bebidas|deportes|actividades|tecnología|ciencia|música|teatro|danza|pintura|escultura|fotografía|literatura|historia|arqueología|museos|galerías|conciertos|espectáculos|natación|senderismo|ciclismo|escalada|esquí|buceo|surf|pesca|golf|tenis|fútbol|baloncesto|cocina|gastronomía|vinos|cervezas|bares|restaurantes|cafeterías|mercados|programación|informática|ingeniería|física|química|biología|astronomía|matemáticas)\b/.test(name)
          );
        }
        
        // For other languages (pt, ro), fall back to English for now
        return !/[áéíóúñü]/.test(name);
      });

      console.log(`✅ Found ${languageFilteredData.length} language-filtered activities (${language}):`, languageFilteredData);
      return languageFilteredData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}