-- Update main_image_url for hotels that don't have one but have images in hotel_images table
UPDATE hotels 
SET main_image_url = (
  SELECT image_url 
  FROM hotel_images 
  WHERE hotel_images.hotel_id = hotels.id 
  ORDER BY is_main DESC, created_at ASC 
  LIMIT 1
)
WHERE (main_image_url IS NULL OR main_image_url = '') 
AND EXISTS (
  SELECT 1 
  FROM hotel_images 
  WHERE hotel_images.hotel_id = hotels.id
);