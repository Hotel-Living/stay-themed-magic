import { supabase } from "@/integrations/supabase/client";

// Simple auth utilities for components that need direct auth operations
export const simpleSignOut = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = '/signing';
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const simpleUpdateProfile = async (userId: string, data: any) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};