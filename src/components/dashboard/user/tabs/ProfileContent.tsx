
import React, { useState } from "react";
import { CheckIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function ProfileContent() {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [isEditMode, setIsEditMode] = useState(false);
  
  const fullName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : profile?.first_name || "Unnamed User";
    
  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      });
      
      setIsEditMode(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };
  
  const handleCancelEdit = () => {
    // Reset form values to current profile
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
    setPhone(profile?.phone || "");
    setIsEditMode(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          
          {/* Profile picture or avatar */}
          <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-fuchsia-300" />
            </div>
            
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-medium">{fullName}</h3>
              <p className="text-sm text-muted-foreground">{profile?.email_verified ? "Email verified" : "Email not verified"}</p>
              
              {!isEditMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          
          {/* Profile form */}
          <div className={`space-y-4 ${isEditMode ? 'opacity-100' : 'opacity-60'}`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditMode}
                  className="w-full p-2 rounded-md bg-secondary/40 border border-border"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditMode}
                  className="w-full p-2 rounded-md bg-secondary/40 border border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={profile?.email_verified ? "Verified email address" : "Email not verified"}
                disabled
                className="w-full p-2 rounded-md bg-secondary/40 border border-border"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditMode}
                className="w-full p-2 rounded-md bg-secondary/40 border border-border"
              />
            </div>
            
            {isEditMode && (
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
