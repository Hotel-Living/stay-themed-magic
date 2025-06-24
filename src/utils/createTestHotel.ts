
import { supabase } from "@/integrations/supabase/client";

export const createTestHotel = async () => {
  console.log("Creating test hotel entry...");
  
  const testHotelData = {
    owner_id: "00000000-0000-0000-0000-000000000000", // Placeholder owner ID
    name: "Grand Plaza San Antonio",
    description: "A luxurious downtown hotel featuring elegant accommodations and world-class amenities. Perfect for extended stays with stunning city views and exceptional service. Our hotel combines modern comfort with classic hospitality, offering guests an unforgettable experience in the heart of San Antonio.",
    country: "United States",
    city: "San Antonio",
    address: "123 Commerce Street, Downtown",
    postal_code: "78205",
    latitude: 29.4241,
    longitude: -98.4936,
    price_per_month: 3500,
    category: 4,
    property_type: "Hotel",
    style: "Modern",
    ideal_guests: "Business travelers, digital nomads, and professionals seeking extended stays with premium amenities and convenient downtown location",
    atmosphere: "Sophisticated and welcoming with a vibrant downtown energy. Perfect blend of business-friendly environment and leisure comfort",
    perfect_location: "Walking distance to River Walk, business district, restaurants, and major attractions",
    contact_name: "Sarah Martinez",
    contact_email: "sarah.martinez@grandplazasa.com",
    contact_phone: "+1 (210) 555-0123",
    stay_lengths: [8, 16, 24, 32],
    meal_plans: ["Breakfast included", "Half-board", "Full-board"],
    room_types: [
      {
        name: "Executive Suite",
        description: "Spacious suite with separate living area, work desk, and premium amenities",
        basePrice: 3500,
        roomCount: 12,
        maxOccupancy: 2,
        rates: {
          "8": 3500,
          "16": 6800,
          "24": 9900,
          "32": 12800
        }
      },
      {
        name: "Deluxe Room",
        description: "Comfortable room with city view, work area, and modern furnishings",
        basePrice: 2800,
        roomCount: 20,
        maxOccupancy: 2,
        rates: {
          "8": 2800,
          "16": 5400,
          "24": 7800,
          "32": 10200
        }
      }
    ],
    faqs: [
      {
        question: "What is included in the extended stay packages?",
        answer: "All packages include daily housekeeping, Wi-Fi, gym access, and business center use. Meal plans vary by selection."
      },
      {
        question: "Is parking available?",
        answer: "Yes, we offer complimentary self-parking and valet parking options for extended stay guests."
      },
      {
        question: "Can I extend my stay if needed?",
        answer: "Subject to availability, extensions can be arranged with 48-hour notice."
      }
    ],
    terms: "Standard hotel terms and conditions apply. Extended stay rates are non-refundable after 48 hours of booking. Changes subject to availability.",
    preferredWeekday: "Monday",
    features_hotel: {
      "24/7 Front Desk": true,
      "Fitness Center": true,
      "Business Center": true,
      "Restaurant": true,
      "Room Service": true,
      "Concierge": true,
      "Laundry Service": true,
      "Parking": true,
      "WiFi": true,
      "Pool": false,
      "Spa": false,
      "Pet Friendly": true
    },
    features_room: {
      "Air Conditioning": true,
      "Flat Screen TV": true,
      "Work Desk": true,
      "Mini Fridge": true,
      "Coffee Maker": true,
      "Safe": true,
      "Iron/Ironing Board": true,
      "Hair Dryer": true,
      "Balcony": false,
      "Kitchen": false,
      "Microwave": true
    },
    available_months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    rates: {
      "8": 3500,
      "16": 6800,
      "24": 9900,
      "32": 12800
    },
    main_image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    enable_price_increase: true,
    price_increase_cap: 25,
    status: 'approved'
  };

  const { data, error } = await supabase
    .from('hotels')
    .insert([testHotelData])
    .select()
    .single();

  if (error) {
    console.error("Error creating test hotel:", error);
    throw error;
  }

  console.log("Test hotel created successfully:", data);

  // Add some sample themes
  if (data?.id) {
    // Get some theme IDs to associate with the hotel
    const { data: themes } = await supabase
      .from('themes')
      .select('id, name')
      .limit(3);

    if (themes && themes.length > 0) {
      const hotelThemes = themes.map(theme => ({
        hotel_id: data.id,
        theme_id: theme.id
      }));

      await supabase
        .from('hotel_themes')
        .insert(hotelThemes);
    }

    // Add some sample activities
    const { data: activities } = await supabase
      .from('activities')
      .select('id, name')
      .limit(3);

    if (activities && activities.length > 0) {
      const hotelActivities = activities.map(activity => ({
        hotel_id: data.id,
        activity_id: activity.id
      }));

      await supabase
        .from('hotel_activities')
        .insert(hotelActivities);
    }

    // Add some sample images
    const sampleImages = [
      {
        hotel_id: data.id,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        is_main: true
      },
      {
        hotel_id: data.id,
        image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        is_main: false
      },
      {
        hotel_id: data.id,
        image_url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1449&q=80",
        is_main: false
      }
    ];

    await supabase
      .from('hotel_images')
      .insert(sampleImages);
  }

  return data;
};
