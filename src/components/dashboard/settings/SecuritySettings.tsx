
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [enable2FA, setEnable2FA] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    }, 800);
  };

  const handleSignOutAllDevices = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out from all other devices.",
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Security Settings</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Password</h4>
          <form onSubmit={handleUpdatePassword} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <Input 
                type="password" 
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <Input 
                type="password" 
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <Input 
                type="password" 
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Two-Factor Authentication</h4>
          <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
            <div className="flex items-start">
              <div className="flex items-center h-5 pt-0.5">
                <Checkbox
                  id="enable_2fa"
                  checked={enable2FA}
                  onCheckedChange={() => setEnable2FA(!enable2FA)}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="enable_2fa" className="text-sm font-medium">Enable Two-Factor Authentication</label>
                <p className="text-xs text-muted-foreground mt-1">Adding a second layer of security to your account helps protect your information.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Active Sessions</h4>
          <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-xs text-muted-foreground">
                  {navigator.userAgent.includes('Windows') ? 'Windows' : 
                   navigator.userAgent.includes('Mac') ? 'macOS' : 
                   navigator.userAgent.includes('Linux') ? 'Linux' : 'Unknown'} - 
                  {navigator.userAgent.includes('Chrome') ? ' Chrome' : 
                   navigator.userAgent.includes('Firefox') ? ' Firefox' : 
                   navigator.userAgent.includes('Safari') ? ' Safari' : ' Browser'}
                </p>
              </div>
              <div className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Active</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSignOutAllDevices}
            variant="destructive"
            className="px-4 py-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg transition-colors"
          >
            Sign Out of All Devices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
