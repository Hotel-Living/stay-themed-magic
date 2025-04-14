
import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import ThemePreferences from "./settings/ThemePreferences";
import CurrencySettings from "./settings/CurrencySettings";
import NotificationSettings from "./settings/NotificationSettings";

export default function SettingsContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currency, setCurrency] = useState("USD");
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-8">
      <ThemePreferences />
      
      <CurrencySettings 
        currency={currency}
        setCurrency={setCurrency}
      />
      
      <NotificationSettings 
        emailNotifications={emailNotifications}
        setEmailNotifications={setEmailNotifications}
      />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
