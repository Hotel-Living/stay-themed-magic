
import { supabase } from "@/integrations/supabase/client";

export const createJotFormURL = async () => {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("❌ No authenticated user found for JotForm URL creation");
      throw new Error("User must be authenticated to submit hotel information");
    }

    // Generate or get the user's JotForm token
    const { data: tokenData, error: tokenError } = await supabase
      .rpc('generate_jotform_token', { user_id: user.id });

    if (tokenError || !tokenData) {
      console.error("❌ Failed to generate JotForm token:", tokenError);
      throw new Error("Failed to generate authentication token");
    }

    const userToken = tokenData;
    console.log("✅ Generated JotForm token for user:", user.id);

    // Base JotForm URL
    const baseUrl = "https://form.jotform.com/243534361745358";
    
    // Create URL with token in multiple formats for maximum compatibility
    const urlParams = new URLSearchParams({
      // Primary token parameter
      user_token: userToken,
      // Backup parameters
      token: userToken,
      uid: user.id,
      // Pre-populate the hidden field directly
      'submission[user_token]': userToken
    });

    const finalUrl = `${baseUrl}?${urlParams.toString()}`;
    
    console.log("🔗 Created JotForm URL with token:", finalUrl);
    console.log("📋 Token being sent:", userToken);
    
    return finalUrl;
  } catch (error) {
    console.error("❌ Error creating JotForm URL:", error);
    throw error;
  }
};
