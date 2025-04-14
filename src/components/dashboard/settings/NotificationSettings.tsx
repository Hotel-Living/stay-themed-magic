
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface NotificationSettingsProps {
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  setEmailNotifications
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how and when you receive updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#8017B0]">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
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

export default NotificationSettings;
