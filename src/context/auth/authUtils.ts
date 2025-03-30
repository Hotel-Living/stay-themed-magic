
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { User } from "@supabase/supabase-js";

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    console.log("Fetched profile:", data);
    return data;
  } catch (error) {
    console.error('Error in fetchProfile:', error);
    return null;
  }
};

export const redirectBasedOnUserRole = (profile: Profile | null) => {
  // Only redirect if we are on the home page or login/signup pages
  const currentPath = window.location.pathname;
  const publicPaths = ['/', '/login', '/signup', '/signin', '/hotel-signup'];
  
  if (publicPaths.includes(currentPath)) {
    if (profile?.is_hotel_owner === true) {
      console.log("User is a hotel owner, redirecting to hotel dashboard");
      window.location.href = '/hotel-dashboard';
    } else {
      console.log("User is a traveler, redirecting to user dashboard");
      window.location.href = '/user-dashboard';
    }
  } else if (currentPath === '/hotel-dashboard' && profile?.is_hotel_owner === false) {
    // Redirect travelers away from hotel dashboard
    console.log("Traveler detected in hotel dashboard, redirecting to user dashboard");
    window.location.href = '/user-dashboard';
  } else if (currentPath === '/user-dashboard' && profile?.is_hotel_owner === true) {
    // Redirect hotel owners away from user dashboard
    console.log("Hotel owner detected in user dashboard, redirecting to hotel dashboard");
    window.location.href = '/hotel-dashboard';
  }
};

export const updateUserProfile = async (user: User, data: Partial<Profile>) => {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', user.id);

  if (error) {
    throw error;
  }

  return await fetchProfile(user.id);
};
