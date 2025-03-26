
import { supabase } from "@/integrations/supabase/client";

/**
 * Builds a base query for hotel data with related tables
 */
export const buildBaseHotelQuery = () => {
  return supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
};
