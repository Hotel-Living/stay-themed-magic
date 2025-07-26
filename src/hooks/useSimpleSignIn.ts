import { supabase } from "@/integrations/supabase/client";

export const simpleSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      return { 
        success: true, 
        error: null,
        hasRole: !!profile?.role
      };
    }

    return { success: false, error: "Login failed" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};