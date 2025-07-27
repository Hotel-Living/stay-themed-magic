-- Fix handle_new_user function to use 'guest' as default role instead of 'user'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Extract role from user metadata, default to 'guest' if not specified
  user_role := COALESCE(NEW.raw_user_meta_data ->> 'role', 'guest');
  
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
$$;