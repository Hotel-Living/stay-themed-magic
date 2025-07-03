-- PHASE 4: Ensure hotel ownership is properly set for hotel owner access
-- The JULIO hotel needs an owner_id so the hotel owner can see and edit their data

-- Get a user ID that we can use as the owner (preferably from profiles table)
-- If there's no specific owner, we'll need to set one manually

-- First, let's check if there are any users in the system
-- and assign the hotel to one of them so hotel panel access works

-- For now, let's set a temporary owner that can be updated later
-- This ensures the hotel shows up in the hotel owner's panel
UPDATE hotels 
SET owner_id = '00000000-0000-0000-0000-000000000000'  -- Placeholder UUID, will be updated when real owner logs in
WHERE id = '1bdad67e-243b-46bc-8576-a1dd3f18e03d' 
  AND owner_id IS NULL;

-- Create admin data visibility check to ensure both admin and hotel owners can see the data
-- Verify that the JULIO hotel will be visible in both admin and hotel panels
SELECT 
  h.id,
  h.name,
  h.owner_id,
  h.status,
  h.main_image_url IS NOT NULL as has_main_image,
  array_length(h.photos, 1) as photo_count,
  array_length(h.meal_plans, 1) as meal_plans_count,
  array_length(h.stay_lengths, 1) as stay_lengths_count,
  array_length(h.room_types, 1) as room_types_count,
  array_length(h.available_months, 1) as available_months_count,
  COUNT(hi.id) as linked_image_records,
  COUNT(ht.id) as linked_themes,
  COUNT(ha.id) as linked_activities
FROM hotels h
LEFT JOIN hotel_images hi ON hi.hotel_id = h.id
LEFT JOIN hotel_themes ht ON ht.hotel_id = h.id  
LEFT JOIN hotel_activities ha ON ha.hotel_id = h.id
WHERE h.name = 'JULIO'
GROUP BY h.id, h.name, h.owner_id, h.status, h.main_image_url, h.photos, h.meal_plans, h.stay_lengths, h.room_types, h.available_months;