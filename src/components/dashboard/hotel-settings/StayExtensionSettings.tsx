
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clock, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface StayExtensionSettingsProps {
  hotelId: string;
}

export const StayExtensionSettings = ({ hotelId }: StayExtensionSettingsProps) => {
  const [allowExtensions, setAllowExtensions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      if (!hotelId) return;

      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('allow_stay_extensions')
          .eq('id', hotelId)
          .eq('owner_id', user?.id)
          .single();

        if (error) throw error;

        setAllowExtensions(data?.allow_stay_extensions ?? true);
      } catch (error) {
        console.error('Error fetching extension settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [hotelId, user?.id]);

  const handleSave = async () => {
    if (!hotelId || !user) return;

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from('hotels')
        .update({ allow_stay_extensions: allowExtensions })
        .eq('id', hotelId)
        .eq('owner_id', user.id);

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: `Stay extensions have been ${allowExtensions ? 'enabled' : 'disabled'} for your property.`
      });
    } catch (error) {
      console.error('Error saving extension settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Stay Extensions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Stay Extensions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="allow-extensions" className="text-base font-medium">
              Allow Stay Extensions
            </Label>
            <p className="text-sm text-muted-foreground">
              Let guests extend their current stay by upgrading to longer durations within 5 days of checkout.
            </p>
          </div>
          <Switch
            id="allow-extensions"
            checked={allowExtensions}
            onCheckedChange={setAllowExtensions}
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">How it works:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Guests see extension offers 5 days before checkout</li>
            <li>• They can upgrade to longer stay tiers (8→16, 16→24, etc.)</li>
            <li>• They pay only the price difference between tiers</li>
            <li>• Extensions use your existing tiered pricing structure</li>
          </ul>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};
