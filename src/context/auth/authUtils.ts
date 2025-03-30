
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
  // Check if there's a profile with role information
  if (!profile) {
    console.log("No profile data available for redirection");
    return;
  }

  // Current path to determine context
  const currentPath = window.location.pathname;
  
  // Define path groups
  const publicPaths = ['/', '/login', '/signup', '/signin', '/hotel-signup', '/hotel-login'];
  const hotelOwnerPaths = ['/hotel-dashboard', '/hoteles'];
  const travelerPaths = ['/user-dashboard'];
  
  console.log(`Current path: ${currentPath}, User is hotel owner: ${profile.is_hotel_owner}`);
  
  // *** HOTEL OWNER LOGIC ***
  if (profile.is_hotel_owner === true) {
    // Special case for hotel login page
    if (currentPath === '/hotel-login') {
      console.log("Hotel owner on hotel login page, redirecting to hotel dashboard");
      window.location.href = '/hotel-dashboard';
      return;
    }
    
    // If on public pages or traveler pages, redirect to hotel dashboard
    if (publicPaths.includes(currentPath) || travelerPaths.includes(currentPath)) {
      console.log("Hotel owner detected, redirecting to hotel dashboard");
      window.location.href = '/hotel-dashboard';
      return;
    }
  } 
  // *** TRAVELER LOGIC ***
  else if (profile.is_hotel_owner === false) {
    // Special case for traveler login page
    if (currentPath === '/login' || currentPath === '/signin') {
      console.log("Traveler on login page, redirecting to user dashboard");
      window.location.href = '/user-dashboard';
      return;
    }
    
    // If on public pages or hotel owner pages, redirect to user dashboard
    if (publicPaths.includes(currentPath) || hotelOwnerPaths.includes(currentPath)) {
      console.log("Traveler detected, redirecting to user dashboard");
      window.location.href = '/user-dashboard';
      return;
    }
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
