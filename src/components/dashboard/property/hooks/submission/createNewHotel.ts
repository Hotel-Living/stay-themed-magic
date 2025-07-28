
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { UploadedImage } from "@/hooks/usePropertyImages";
import { useRelatedDataSubmission } from "./useRelatedDataSubmission";

// Helper function to convert base64/blob URLs to File objects for upload
const processImagesForUpload = async (images: UploadedImage[]): Promise<Array<{ image: UploadedImage, file: File }>> => {
  console.log("Processing images for upload:", images);
  const validImages: Array<{ image: UploadedImage, file: File }> = [];
  
  for (const image of images) {
    try {
      if (image.url && (image.url.startsWith('blob:') || image.url.startsWith('data:'))) {
        // Convert base64 or blob URL to File object for upload
        const response = await fetch(image.url);
        const blob = await response.blob();
        
        // Create a File object from the blob
        const file = new File([blob], image.name || `image-${Date.now()}.jpg`, {
          type: blob.type || 'image/jpeg'
        });
        
        // Add to valid images with associated file
        validImages.push({
          image: image,
          file: file
        });
      } else if (image.url && image.url.startsWith('http')) {
        // Already uploaded image - create a placeholder file for consistency
        console.log("Image already uploaded, skipping:", image.url);
      }
    } catch (error) {
      console.error("Error processing image:", image.name, error);
      // Skip this image but continue with others
    }
  }
  
  return validImages;
};

// Helper function to handle image upload to Supabase
const handleImageUpload = async (hotelId: string, imageData: Array<{ image: UploadedImage, file: File }>): Promise<void> => {
  console.log("Starting image upload for hotel:", hotelId);
  
  const uploadedImageUrls: string[] = [];
  let mainImageUrl: string | null = null;
  
  for (let i = 0; i < imageData.length; i++) {
    const { image, file } = imageData[i];
    console.log(`Uploading image ${i + 1}/${imageData.length}:`, image.name);
    
    try {
      // Upload to Supabase Storage
      const fileName = `${hotelId}/${Date.now()}-${image.name || `image-${i}.jpg`}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('Hotel Images')
        .upload(fileName, file);
        
        if (uploadError) {
          console.error("Upload error for image:", image.name, uploadError);
          continue; // Skip this image but continue with others
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('Hotel Images')
          .getPublicUrl(fileName);
        
        const publicUrl = urlData.publicUrl;
        console.log("Image uploaded successfully:", publicUrl);
        
        // Insert into hotel_images table
        const { error: dbError } = await supabase
          .from('hotel_images')
          .insert({
            hotel_id: hotelId,
            image_url: publicUrl,
            is_main: image.isMain || i === 0 // First image or explicitly marked as main
          });
        
        if (dbError) {
          console.error("Database error for image:", image.name, dbError);
          continue; // Skip this image but continue with others
        }
        
        uploadedImageUrls.push(publicUrl);
        
        // Set main image URL (first uploaded image or the one marked as main)
        if ((image.isMain || i === 0) && !mainImageUrl) {
          mainImageUrl = publicUrl;
        }
    } catch (error) {
      console.error("Failed to upload image:", image.name, error);
      // Continue with other images
    }
  }
  
  // Update hotel's main_image_url if we have a main image
  if (mainImageUrl) {
    console.log("Updating hotel main image URL:", mainImageUrl);
    const { error: updateError } = await supabase
      .from('hotels')
      .update({ main_image_url: mainImageUrl })
      .eq('id', hotelId);
    
    if (updateError) {
      console.error("Failed to update hotel main image URL:", updateError);
    }
  }
  
  console.log(`Successfully uploaded ${uploadedImageUrls.length} images for hotel ${hotelId}`);
};

export const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
  console.log("=== CREATE NEW HOTEL START ===");
  console.log("Creating new hotel with data:", formData);
  console.log("User ID provided:", userId);
  
  // Validate required parameters
  if (!userId) {
    console.error("No user ID provided for hotel creation");
    throw new Error("User ID is required for hotel creation");
  }
  
  // Use the provided userId or get it from the current session
  // Since routes are protected, we can safely assume user is authenticated
  const ownerId = userId;

  // Convert the stay lengths from an array of numbers to a PostgreSQL array
  const stayLengths = formData.stayLengths || [];
  
  // Get available months from formData
  const availableMonths = formData.available_months || [];
  
  // Get meal plans array
  const mealPlans = formData.mealPlans || [];
  
  // Get room types data
  const roomTypes = formData.roomTypes || [];
  
  // Extract faqs
  const faqs = formData.faqs || [];
  
  // Get the selected weekday
  const preferredWeekday = formData.preferredWeekday || "Monday";

  // Extract hotel and room features - ensure they're actually objects
  const featuresHotel = formData.featuresHotel || {};
  const featuresRoom = formData.featuresRoom || {};
  
  // Extract rates for different stay lengths
  const rates = formData.rates || {
    "8": formData.price_8,
    "16": formData.price_16,
    "24": formData.price_24,
    "32": formData.price_32
  };

  // Parse latitude and longitude if they're strings
  const latitude = formData.latitude ? 
    (typeof formData.latitude === 'string' ? parseFloat(formData.latitude) : formData.latitude) : 
    null;
  
  const longitude = formData.longitude ? 
    (typeof formData.longitude === 'string' ? parseFloat(formData.longitude) : formData.longitude) : 
    null;
  
  // Get the pricing matrix from formData
  const pricingMatrix = formData.pricingMatrix || [];

  // Calculate price_per_month from pricing matrix if available, otherwise use fallback
  const calculatedPricePerMonth = formData.price_per_month || (parseInt(formData.category) * 1000);

  const hotelData = {
    owner_id: ownerId,
    name: formData.hotelName,
    description: formData.description || null,
    country: formData.country || null,
    city: formData.city || null,
    address: formData.address || null,
    postal_code: formData.postalCode || null,
    latitude: latitude,
    longitude: longitude,
    price_per_month: formData.price_per_month || null,
    category: formData.category ? parseInt(formData.category) : null,
    property_type: formData.propertyType || null,
    style: formData.style,
    ideal_guests: formData.idealGuests, // Use correct field name
    atmosphere: formData.atmosphere,
    perfect_location: formData.perfectLocation, // Use correct field name
    contact_name: formData.contactName,
    contact_email: formData.contactEmail,
    contact_phone: formData.contactPhone,
    stay_lengths: stayLengths,
    meal_plans: mealPlans,
    room_types: roomTypes,
    faqs: faqs,
    terms: formData.terms || null,
    preferredWeekday: preferredWeekday,
    features_hotel: featuresHotel,
    features_room: featuresRoom,
    available_months: availableMonths,
    rates: rates,
    main_image_url: formData.mainImageUrl || null,
    enable_price_increase: formData.enablePriceIncrease || false,
    price_increase_cap: formData.priceIncreaseCap || 20,
    pricingmatrix: pricingMatrix // Use the correct lowercase column name from database
  };

  console.log("=== INSERTING HOTEL DATA ===");
  console.log("Final hotel data to insert:", hotelData);

  try {
    const { data, error } = await supabase
      .from('hotels')
      .insert([hotelData])
      .select()
      .single();

    console.log("=== SUPABASE INSERT RESPONSE ===");
    console.log("Data returned:", data);
    console.log("Error returned:", error);

    if (error) {
      console.error("=== HOTEL CREATION ERROR ===");
      console.error("Error creating hotel:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      console.error("Error code:", error.code);
      throw new Error(`Hotel creation failed: ${error.message}`);
    }

    if (!data) {
      console.error("=== NO DATA RETURNED ERROR ===");
      console.error("No data returned from hotel creation, but no error either");
      throw new Error("Hotel creation failed: No data returned from database");
    }

    console.log("=== HOTEL CREATED SUCCESSFULLY ===");
    console.log("Hotel created successfully:", data);
    console.log("Hotel ID:", data?.id);
    console.log("Hotel name:", data?.name);
    console.log("Hotel owner_id:", data?.owner_id);

    // Process image uploads after hotel creation
    if (data?.id && formData.hotelImages && formData.hotelImages.length > 0) {
      console.log("=== PROCESSING HOTEL IMAGES ===");
      console.log("Images to process:", formData.hotelImages.length);
      console.log("Images data:", formData.hotelImages);
      
      try {
        // Convert base64/blob images to uploadable format
        const validImages = await processImagesForUpload(formData.hotelImages);
        console.log("Valid images processed:", validImages.length);
        
        if (validImages.length > 0) {
          // Upload images to storage and create database records
          await handleImageUpload(data.id, validImages);
          console.log("✅ Images uploaded successfully");
        } else {
          console.warn("No valid images found to upload");
        }
      } catch (imageError) {
        console.error("=== IMAGE UPLOAD ERROR ===");
        console.error("Failed to upload images for hotel:", data.id);
        console.error("Image error:", imageError);
        // Don't throw - allow hotel creation to succeed even if images fail
        console.warn("Hotel created successfully but images failed to upload");
      }
    } else {
      console.log("No images to process for hotel:", data?.id);
    }

    // Process activities and themes after hotel creation
    if (data?.id) {
      console.log("=== PROCESSING ACTIVITIES AND THEMES ===");
      console.log("Activities from form:", formData.activities);
      console.log("Themes from form:", formData.themes);
      
      try {
        const { handleThemesAndActivities, handleAvailability } = useRelatedDataSubmission();
        await handleThemesAndActivities(
          data.id, 
          formData.themes || [], 
          formData.activities || []
        );
        console.log("✅ Activities and themes processed successfully");

        // FIX: Process availability packages into database
        if (formData.availabilityPackages && formData.availabilityPackages.length > 0) {
          console.log("=== PROCESSING AVAILABILITY PACKAGES ===");
          console.log("Availability packages from form:", formData.availabilityPackages);
          
          try {
            // Insert availability packages into database
            const packageRows = formData.availabilityPackages.map(pkg => ({
              hotel_id: data.id,
              start_date: new Date(pkg.startDate).toISOString().split('T')[0],
              end_date: new Date(pkg.endDate).toISOString().split('T')[0],
              duration_days: pkg.duration,
              total_rooms: pkg.availableRooms,
              available_rooms: pkg.availableRooms
            }));

            const { error: packageError } = await supabase
              .from('availability_packages')
              .insert(packageRows);

            if (packageError) {
              console.error("Error inserting availability packages:", packageError);
            } else {
              console.log("✅ Availability packages processed successfully");
            }
          } catch (packageProcessingError) {
            console.error("=== AVAILABILITY PACKAGE ERROR ===");
            console.error("Failed to process availability packages:", packageProcessingError);
            // Don't throw - allow hotel creation to succeed
          }
        }

        // Also handle available months for general availability
        await handleAvailability(data.id, formData.available_months || []);
        console.log("✅ General availability processed successfully");

      } catch (relationshipError) {
        console.error("=== RELATIONSHIP DATA ERROR ===");
        console.error("Failed to process activities and themes for hotel:", data.id);
        console.error("Relationship error:", relationshipError);
        // Don't throw - allow hotel creation to succeed even if relationships fail
        console.warn("Hotel created successfully but activities/themes failed to save");
      }
    }

    // Trigger automatic translations asynchronously (non-blocking)
    if (data?.id) {
      const translationContent = {
        name: data.name,
        description: data.description || undefined,
        ideal_guests: data.ideal_guests || undefined,
        atmosphere: data.atmosphere || undefined,
        perfect_location: data.perfect_location || undefined
      };

      // Use setTimeout to ensure this runs after the main workflow completes
      setTimeout(async () => {
        try {
          const targetLanguages: ('es' | 'pt' | 'ro')[] = ['es', 'pt', 'ro'];
          
          for (const language of targetLanguages) {
            try {
              await supabase.functions.invoke('translate-hotel-content', {
                body: {
                  hotelId: data.id,
                  targetLanguage: language,
                  content: translationContent
                }
              });
              console.log(`Auto-translation triggered for hotel ${data.id} in ${language}`);
            } catch (translationError) {
              console.warn(`Auto-translation failed for hotel ${data.id} in ${language}:`, translationError);
              // Continue with other languages even if one fails
            }
          }
        } catch (error) {
          console.warn('Auto-translation process failed:', error);
          // Fail silently to not affect the main hotel creation workflow
        }
      }, 1000); // 1 second delay to ensure main workflow completes
    }

    console.log("=== CREATE NEW HOTEL END ===");
    return data;
    
  } catch (insertError) {
    console.error("=== CRITICAL HOTEL INSERT ERROR ===");
    console.error("Failed to insert hotel into database:", insertError);
    console.error("Insert error message:", insertError.message);
    console.error("Insert error details:", insertError.details);
    console.error("Insert error hint:", insertError.hint);
    console.error("Insert error code:", insertError.code);
    throw insertError;
  }
};
