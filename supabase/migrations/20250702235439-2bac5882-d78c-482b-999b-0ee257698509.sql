
-- Add admin role for the user grand_soiree@yahoo.com
INSERT INTO public.user_roles (user_id, role) 
VALUES ('786aefb8-bd6e-4955-8a0e-ec82efa0e608', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Set hotel owner flag to true for dual access
UPDATE public.profiles 
SET is_hotel_owner = true
WHERE id = '786aefb8-bd6e-4955-8a0e-ec82efa0e608';
