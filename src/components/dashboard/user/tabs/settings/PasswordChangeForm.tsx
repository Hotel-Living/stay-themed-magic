
import React, { useState } from "react";
import { Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function PasswordChangeForm() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation password do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Password change logic would go here
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Error changing password",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription className="text-gray-200">
          Update your account password for better security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#860493]">
        <div>
          <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-fuchsia-950/50 text-white"
          />
        </div>
        <div>
          <Label htmlFor="newPassword" className="text-white">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-fuchsia-950/50 text-white"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-fuchsia-950/50 text-white"
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleChangePassword}
            className="flex items-center gap-2 text-white"
            disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
