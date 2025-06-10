
import React from "react";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AdvancedNotificationSettingsProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
}

export function AdvancedNotificationSettings({
  emailNotifications,
  setEmailNotifications
}: AdvancedNotificationSettingsProps) {
  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Advanced Notification Settings
        </CardTitle>
        <CardDescription className="text-gray-200">
          Manage detailed notification preferences and alerts
        </CardDescription>
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
        
        <div className="space-y-4 pt-4 border-t border-fuchsia-800/20">
          <h4 className="font-medium text-white">Notification Categories</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-white">Booking Confirmations</Label>
              <p className="text-xs text-gray-200">Get notified when bookings are confirmed</p>
            </div>
            <Switch disabled={!emailNotifications} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-white">Special Offers</Label>
              <p className="text-xs text-gray-200">Receive exclusive deals and promotions</p>
            </div>
            <Switch disabled={!emailNotifications} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-white">Hotel Recommendations</Label>
              <p className="text-xs text-gray-200">New hotels matching your preferences</p>
            </div>
            <Switch disabled={!emailNotifications} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
