
import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface UserPreferences {
  notification_bookings: boolean;
  notification_messages: boolean;
  notification_promotions: boolean;
}

export function PreferencesCard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    notification_bookings: true,
    notification_messages: true,
    notification_promotions: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('notification_bookings, notification_messages, notification_promotions')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setPreferences({
            notification_bookings: data.notification_bookings ?? true,
            notification_messages: data.notification_messages ?? true,
            notification_promotions: data.notification_promotions ?? false
          });
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [user]);

  const savePreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          notification_bookings: preferences.notification_bookings,
          notification_messages: preferences.notification_messages,
          notification_promotions: preferences.notification_promotions,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: t('dashboard.preferences.saveSuccess')
      });
    } catch (error: any) {
      console.error('Error saving preferences:', error);
      toast({
        title: t('dashboard.preferences.saveError'),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = (key: keyof UserPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {t('dashboard.preferences.title')}
        </CardTitle>
        <CardDescription className="text-gray-200">
          {t('dashboard.preferences.notifications')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#860493]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base text-white">
                {t('dashboard.preferences.notificationBookings')}
              </Label>
            </div>
            <Switch 
              checked={preferences.notification_bookings}
              onCheckedChange={(checked) => updatePreference('notification_bookings', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base text-white">
                {t('dashboard.preferences.notificationMessages')}
              </Label>
            </div>
            <Switch 
              checked={preferences.notification_messages}
              onCheckedChange={(checked) => updatePreference('notification_messages', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base text-white">
                {t('dashboard.preferences.notificationPromotions')}
              </Label>
            </div>
            <Switch 
              checked={preferences.notification_promotions}
              onCheckedChange={(checked) => updatePreference('notification_promotions', checked)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={savePreferences}
            disabled={loading}
            className="text-white"
          >
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
