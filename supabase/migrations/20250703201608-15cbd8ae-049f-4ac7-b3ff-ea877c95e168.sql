-- PHASE 4 FIXED: Set proper hotel ownership and verify complete data restoration

-- Assign the JULIO hotel to the hotel owner user
UPDATE hotels 
SET owner_id = '786aefb8-bd6e-4955-8a0e-ec82efa0e608'  -- The hotel owner from profiles
WHERE id = '1bdad67e-243b-46bc-8576-a1dd3f18e03d';

-- Verify complete data restoration and accessibility for both admin and hotel owner
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
  COUNT(DISTINCT ht.theme_id) as linked_themes,
  COUNT(DISTINCT ha.activity_id) as linked_activities
FROM hotels h
LEFT JOIN hotel_images hi ON hi.hotel_id = h.id
LEFT JOIN hotel_themes ht ON ht.hotel_id = h.id  
LEFT JOIN hotel_activities ha ON ha.hotel_id = h.id
WHERE h.name = 'JULIO'
GROUP BY h.id, h.name, h.owner_id, h.status, h.main_image_url, h.photos, h.meal_plans, h.stay_lengths, h.room_types, h.available_months;