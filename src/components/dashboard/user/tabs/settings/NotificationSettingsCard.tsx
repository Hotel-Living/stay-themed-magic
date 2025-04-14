
import React from "react";
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsCardProps {
  emailNotifications: boolean;
  setEmailNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationSettingsCard: React.FC<NotificationSettingsCardProps> = ({
  emailNotifications,
  setEmailNotifications
}) => {
  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription className="text-gray-200">Manage how you receive notifications and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#860493]">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications" className="text-base text-white">Email Notifications</Label>
            <p className="text-sm text-gray-300">Receive booking updates and promotional offers via email</p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};
