-- Enable RLS on user_roles table if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own roles
CREATE POLICY "Users can read their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Create policy to allow users to read roles by email (for registration process)
CREATE POLICY "Users can read roles by their email" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));