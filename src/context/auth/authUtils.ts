
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      
      // Check if this is a "no rows returned" error, which means profile doesn't exist
      if (error.code === 'PGRST116') {
        console.log("No profile found, attempting to create one");
        return await createDefaultProfile(userId);
      }
      
      return null;
    }

    console.log("Fetched profile:", data);
    return data;
  } catch (error) {
    console.error('Error in fetchProfile:', error);
    return null;
  }
};

// Helper function to create a default profile if one doesn't exist
const createDefaultProfile = async (userId: string): Promise<Profile | null> => {
  try {
    // First, check if user exists in auth system
    const { data: authUser } = await supabase.auth.admin.getUserById(userId);
    
    if (!authUser || !authUser.user) {
      console.error("Cannot create profile: User does not exist in auth system");
      return null;
    }
    
    // Get email from auth user to determine if this is a hotel account
    // based on domain or registration path
    const userEmail = authUser.user.email || '';
    const metadata = authUser.user.user_metadata || {};
    
    // FIX: Ensure id field is not optional by separating it from the Partial<Profile> type
    const profileData = {
      id: userId,
      first_name: metadata.first_name || null,
      last_name: metadata.last_name || null,
      is_hotel_owner: metadata.is_hotel_owner === true,
      avatar_url: null,
      phone: null
    };
    
    // Insert the new profile
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select('*')
      .single();
      
    if (error) {
      console.error("Error creating default profile:", error);
      return null;
    }
    
    console.log("Created new profile:", data);
    return data;
  } catch (error) {
    console.error("Error in createDefaultProfile:", error);
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
  // First check if profile exists
  const existingProfile = await fetchProfile(user.id);
  
  if (!existingProfile) {
    // Profile doesn't exist, create it first
    console.log("Profile doesn't exist, creating before updating");
    await createDefaultProfile(user.id);
  }
  
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', user.id);

  if (error) {
    throw error;
  }

  return await fetchProfile(user.id);
};
