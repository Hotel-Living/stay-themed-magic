-- PHASE 1: Fix orphaned hotel images and restore lost image relationships
-- First, let's restore images for the JULIO 7 hotel (id: d102e7a1-55cd-400e-8ce4-ff11ad9b8a7a)

-- Update orphaned images with temp-hotel-id to link to JULIO 7 hotel  
UPDATE hotel_images 
SET hotel_id = 'd102e7a1-55cd-400e-8ce4-ff11ad9b8a7a'
WHERE hotel_id = 'temp-hotel-id' OR hotel_id IS NULL;

-- Fix the JULIO 7 hotel to have its main image and photos array populated
UPDATE hotels 
SET 
  main_image_url = (
    SELECT image_url 
    FROM hotel_images 
    WHERE hotel_id = 'd102e7a1-55cd-400e-8ce4-ff11ad9b8a7a' 
    LIMIT 1
  ),
  photos = (
    SELECT ARRAY_AGG(image_url) 
    FROM hotel_images 
    WHERE hotel_id = 'd102e7a1-55cd-400e-8ce4-ff11ad9b8a7a'
  )
WHERE id = 'd102e7a1-55cd-400e-8ce4-ff11ad9b8a7a' AND (main_image_url IS NULL OR photos = '{}');

-- Restore empty arrays that were corrupted to null during the data loss
-- This ensures meal_plans, stay_lengths, etc. have proper default arrays instead of null
UPDATE hotels 
SET 
  meal_plans = COALESCE(meal_plans, '{}'),
  stay_lengths = COALESCE(stay_lengths, '{}'),
  room_types = COALESCE(room_types, '{}'),
  photos = COALESCE(photos, '{}'),
  available_months = COALESCE(available_months, '{}')
WHERE 
  meal_plans IS NULL OR 
  stay_lengths IS NULL OR 
  room_types IS NULL OR 
  photos IS NULL OR 
  available_months IS NULL;

-- Verify the restoration worked
SELECT 
  h.name,
  h.main_image_url IS NOT NULL as has_main_image,
  ARRAY_LENGTH(h.photos, 1) as photo_count,
  ARRAY_LENGTH(h.meal_plans, 1) as meal_plans_count,
  ARRAY_LENGTH(h.stay_lengths, 1) as stay_lengths_count,
  COUNT(hi.id) as linked_images
FROM hotels h
LEFT JOIN hotel_images hi ON hi.hotel_id = h.id
WHERE h.id = 'd102e7a1-55cd-400e-8ce4-ff11ad9b8a7a'
GROUP BY h.id, h.name, h.main_image_url, h.photos, h.meal_plans, h.stay_lengths;