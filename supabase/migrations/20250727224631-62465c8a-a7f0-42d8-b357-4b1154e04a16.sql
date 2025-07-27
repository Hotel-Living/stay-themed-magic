-- Update handle_new_user function with the correct CASE syntax
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  user_role TEXT;
BEGIN
  -- Extract and map role from user metadata with proper CASE expression
  user_role := CASE
    WHEN NEW.raw_user_meta_data ->> 'role' = 'hotel' THEN 'hotel_owner'
    WHEN NEW.raw_user_meta_data ->> 'role' = 'user' THEN 'guest'
    ELSE COALESCE(NEW.raw_user_meta_data ->> 'role', 'guest')
  END;
  
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    email_verified, 
    role,
    preferred_language
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    user_role,
    COALESCE(NEW.raw_user_meta_data ->> 'language', 'en')
  );
  
  -- Insert role into user_roles table
  INSERT INTO public.user_roles (user_id, email, role)
  VALUES (NEW.id, NEW.email, user_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$function$;