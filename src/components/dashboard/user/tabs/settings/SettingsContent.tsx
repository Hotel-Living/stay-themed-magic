
import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import { ThemePreferencesCard } from "./ThemePreferencesCard";
import { LanguagePreferencesCard } from "./LanguagePreferencesCard";
import { CurrencyPreferencesCard } from "./CurrencyPreferencesCard";
import { NotificationSettingsCard } from "./NotificationSettingsCard";

export default function SettingsContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State management
  const [currency, setCurrency] = useState("USD");
  const [newTheme, setNewTheme] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [themeDescription, setThemeDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch the user's existing preferences when component mounts
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          console.error("Error fetching user preferences:", error);
          return;
        }
        
        if (data) {
          // Update local state with fetched preferences
          if (data.language_preferences && data.language_preferences.length > 0) {
            setLanguage(data.language_preferences[0]);
          }
          if (data.favorite_themes) {
            setSelectedThemes(data.favorite_themes);
          }
          // The currency might be stored in user metadata if not in preferences table
          if (user.user_metadata?.currency) {
            setCurrency(user.user_metadata.currency);
          }
          setEmailNotifications(user.user_metadata?.emailNotifications !== false);
        }
      } catch (error) {
        console.error("Error in fetchUserPreferences:", error);
      }
    };
    
    fetchUserPreferences();
  }, [user]);
  
  const handleSaveSettings = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save settings.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Update user_preferences table
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          favorite_themes: selectedThemes,
          language_preferences: [language],
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      
      if (preferencesError) throw preferencesError;
      
      // Update user metadata for other preferences
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          currency,
          emailNotifications,
        }
      });
      
      if (userError) throw userError;
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <ThemePreferencesCard 
        selectedThemes={selectedThemes}
        setSelectedThemes={setSelectedThemes}
        newTheme={newTheme}
        setNewTheme={setNewTheme}
        themeDescription={themeDescription}
        setThemeDescription={setThemeDescription}
      />
      
      <LanguagePreferencesCard 
        language={language}
        setLanguage={setLanguage}
      />
      
      <CurrencyPreferencesCard 
        currency={currency}
        setCurrency={setCurrency}
      />
      
      <NotificationSettingsCard 
        emailNotifications={emailNotifications}
        setEmailNotifications={setEmailNotifications}
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          className="flex items-center gap-2 text-white"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
