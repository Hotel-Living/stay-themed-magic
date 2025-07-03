-- Populate photos array for hotels that have images in hotel_images table but empty photos array
UPDATE hotels 
SET photos = ARRAY(
  SELECT image_url 
  FROM hotel_images 
  WHERE hotel_images.hotel_id = hotels.id 
  ORDER BY is_main DESC, created_at ASC
)
WHERE id IN (
  SELECT h.id 
  FROM hotels h 
  INNER JOIN hotel_images hi ON h.id = hi.hotel_id 
  WHERE h.photos IS NULL OR array_length(h.photos, 1) IS NULL OR array_length(h.photos, 1) = 0
  GROUP BY h.id
);