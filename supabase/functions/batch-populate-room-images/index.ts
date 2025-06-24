
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Curated room image URLs (high quality room photos)
const ROOM_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop"
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function addRoomImagesToHotel(hotel: any, imageUrls: string[]) {
  const imagesToAdd = [];
  
  for (let i = 0; i < Math.min(2, imageUrls.length); i++) {
    imagesToAdd.push({
      hotel_id: hotel.id,
      image_url: imageUrls[i],
      is_main: false
    });
  }

  if (imagesToAdd.length > 0) {
    const { error } = await supabase
      .from('hotel_images')
      .insert(imagesToAdd);

    if (error) {
      throw new Error(`Failed to add room images to ${hotel.name}: ${error.message}`);
    }
  }

  return imagesToAdd.length;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { maxHotels, imagesPerHotel } = await req.json();
    
    console.log(`Starting batch room image population for max ${maxHotels} hotels, ${imagesPerHotel} images each`);
    
    // Get hotels that need room images (first 20 hotels without room images)
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select(`
        id, 
        name,
        hotel_images!inner(id, is_main)
      `)
      .eq('hotel_images.is_main', true)
      .limit(maxHotels)
      .order('created_at', { ascending: true });

    if (hotelsError) {
      throw new Error(`Failed to fetch hotels: ${hotelsError.message}`);
    }

    if (!hotels || hotels.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          stats: {
            totalHotels: 0,
            processedHotels: 0,
            imagesAdded: 0,
            errors: ['No hotels found that need room images'],
            hotelProgress: []
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    const stats = {
      totalHotels: Math.min(maxHotels, hotels.length),
      processedHotels: 0,
      imagesAdded: 0,
      errors: [] as string[],
      hotelProgress: [] as string[]
    };

    // Shuffle room images to ensure variety
    const shuffledImages = shuffleArray(ROOM_IMAGE_URLS);
    let imageIndex = 0;

    // Process each hotel
    for (const hotel of hotels.slice(0, maxHotels)) {
      try {
        console.log(`Processing hotel: ${hotel.name}`);
        
        // Get images for this hotel (cycling through available images)
        const hotelImages = [];
        for (let i = 0; i < imagesPerHotel; i++) {
          hotelImages.push(shuffledImages[imageIndex % shuffledImages.length]);
          imageIndex++;
        }
        
        const imagesAdded = await addRoomImagesToHotel(hotel, hotelImages);
        
        stats.imagesAdded += imagesAdded;
        stats.processedHotels++;
        stats.hotelProgress.push(`${hotel.name}: ${imagesAdded} room images added`);
        
        console.log(`Completed ${hotel.name}: ${imagesAdded} room images added`);
        
      } catch (error) {
        console.error(`Error processing hotel ${hotel.name}:`, error);
        stats.errors.push(`${hotel.name}: ${error.message}`);
      }
    }

    console.log(`Batch room image population completed. Total images added: ${stats.imagesAdded}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        stats 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Batch room image population error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Batch room image population failed', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
