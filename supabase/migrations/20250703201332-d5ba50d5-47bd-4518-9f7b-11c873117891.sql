-- PHASE 3: Restore admin panel data visibility
-- Clean up duplicate JULIO hotels and consolidate data

-- First, get the JULIO hotel with photos (the main one)
-- Then delete the empty duplicates and keep the one with data

-- Delete empty JULIO hotels (those without images or with empty arrays)
DELETE FROM hotels 
WHERE name LIKE 'JULIO%' 
  AND id != '1bdad67e-243b-46bc-8576-a1dd3f18e03d' -- Keep the one with data
  AND (
    main_image_url IS NULL 
    OR photos = '{}' 
    OR array_length(photos, 1) IS NULL
  );

-- Ensure the main JULIO hotel has all required fields properly set
UPDATE hotels 
SET 
  status = 'pending',
  meal_plans = COALESCE(meal_plans, '{}'),
  stay_lengths = COALESCE(stay_lengths, '{}'), 
  room_types = COALESCE(room_types, '{}'),
  available_months = COALESCE(available_months, '{}'),
  features_hotel = COALESCE(features_hotel, '{}'),
  features_room = COALESCE(features_room, '{}')
WHERE id = '1bdad67e-243b-46bc-8576-a1dd3f18e03d';

-- Verify the cleanup worked
SELECT 
  id,
  name,
  status,
  main_image_url IS NOT NULL as has_main_image,
  array_length(photos, 1) as photo_count,
  array_length(meal_plans, 1) as meal_plans_count,
  array_length(stay_lengths, 1) as stay_lengths_count,
  array_length(available_months, 1) as available_months_count
FROM hotels 
WHERE name LIKE 'JULIO%'
ORDER BY name;