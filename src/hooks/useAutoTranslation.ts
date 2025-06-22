
import { useHotelTranslations } from './useHotelTranslations';

interface HotelContent {
  name: string;
  description?: string;
  ideal_guests?: string;
  atmosphere?: string;
  perfect_location?: string;
}

export const useAutoTranslation = () => {
  const { translateHotelContent } = useHotelTranslations();

  const triggerAutoTranslations = async (hotelId: string, content: HotelContent) => {
    const targetLanguages: ('es' | 'pt' | 'ro')[] = ['es', 'pt', 'ro'];
    
    // Trigger translations asynchronously for all target languages
    targetLanguages.forEach(async (language) => {
      try {
        await translateHotelContent({
          hotelId,
          targetLanguage: language,
          content
        });
        console.log(`Translation triggered for hotel ${hotelId} in ${language}`);
      } catch (error) {
        console.warn(`Translation failed for hotel ${hotelId} in ${language}:`, error);
        // Fail silently to not block the main workflow
      }
    });
  };

  return { triggerAutoTranslations };
};
