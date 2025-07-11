-- Update User Avatars bucket to allow GIF files
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'avatars';