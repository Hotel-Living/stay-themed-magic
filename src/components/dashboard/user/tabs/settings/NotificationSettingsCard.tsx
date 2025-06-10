
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface NotificationSettingsCardProps {
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
}

export const NotificationSettingsCard: React.FC<NotificationSettingsCardProps> = ({
  emailNotifications,
  setEmailNotifications
}) => {
  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription className="text-gray-200">Manage how and when you receive updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#860493]">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications" className="text-base text-white">Email Notifications</Label>
            <p className="text-sm text-gray-200">
              Receive updates about new hotels matching your themes
            </p>
          </div>
          <Switch 
            id="emailNotifications" 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};
