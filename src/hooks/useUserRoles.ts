
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export async function addUserRole(userId: string, role: string) {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error adding user role:", error);
    return { data: null, error };
  }
}

export async function removeUserRole(userId: string, role: string) {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .delete()
      .match({ user_id: userId, role });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error removing user role:", error);
    return { data: null, error };
  }
}

export async function getUserRoles(userId: string) {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    
    if (error) throw error;
    return { roles: data?.map(r => r.role) || [], error: null };
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return { roles: [], error };
  }
}

export async function getUserByEmail(email: string) {
  try {
    // First try to get from auth.users via RPC or edge function
    // For now, we'll use a workaround by checking profiles table
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .ilike("id", `%${email}%`) // This is a limitation - we need email in profiles
      .single();
    
    if (error) throw error;
    return { user: data, error: null };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return { user: null, error };
  }
}
