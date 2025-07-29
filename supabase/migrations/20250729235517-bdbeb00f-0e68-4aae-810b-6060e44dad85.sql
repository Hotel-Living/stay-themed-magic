-- Remove the admin-only policy that blocks hotel creation
DROP POLICY IF EXISTS "Admins can manage all hotels" ON public.hotels;

-- Ensure hotel owners can freely create and manage their own hotels without role checks
-- Keep existing policies that allow hotel owners to manage their own properties
-- No additional role validation needed beyond authentication and ownership