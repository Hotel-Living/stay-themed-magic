
import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth/AuthContext";

// Import refactored components
import { ThemePreferencesCard } from "./ThemePreferencesCard";
import { LanguagePreferencesCard } from "./LanguagePreferencesCard";
import { CurrencyPreferencesCard } from "./CurrencyPreferencesCard";
import { NotificationSettingsCard } from "./NotificationSettingsCard";

export default function SettingsContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State management moved to parent component
  const [currency, setCurrency] = useState("USD");
  const [newTheme, setNewTheme] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [themeDescription, setThemeDescription] = useState("");
  const [language, setLanguage] = useState("en");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
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
        <Button onClick={handleSaveSettings} className="flex items-center gap-2 text-white">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
