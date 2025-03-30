
import React, { useState } from "react";
import { User, Save, Edit, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function ProfileContent() {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    country: profile?.country || ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <Button 
            variant="outline" 
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2"
          >
            {editing ? (
              <>
                <User className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        {!editing ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-fuchsia-500/30 flex items-center justify-center text-fuchsia-200">
                  <User className="w-10 h-10" />
                </div>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-xl font-semibold">
                    {profile?.first_name || profile?.last_name 
                      ? `${profile?.first_name || ""} ${profile?.last_name || ""}` 
                      : "Your Name"}
                  </h3>
                  
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user?.email || "Email not available"}</span>
                  </div>
                  
                  {profile?.phone && (
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  
                  {(profile?.city || profile?.country) && (
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {[profile.city, profile.country].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
                
                {profile?.bio && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">About</h4>
                    <p className="text-muted-foreground text-sm">{profile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input 
                  id="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange}
                  className="bg-fuchsia-950/50"
                />
              </div>
              
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input 
                  id="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange}
                  className="bg-fuchsia-950/50"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  value={user?.email || ""} 
                  disabled
                  className="bg-fuchsia-950/50 opacity-70"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Contact support to change your email address
                </p>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="bg-fuchsia-950/50"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio">About You</Label>
              <Textarea 
                id="bio" 
                value={formData.bio} 
                onChange={handleChange}
                className="bg-fuchsia-950/50 min-h-[100px]"
                placeholder="Tell us a bit about yourself, your interests, and what themes you enjoy..."
              />
            </div>
            
            <div className="border-t border-fuchsia-800/20 pt-4">
              <h3 className="text-lg font-medium mb-4">Location Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    className="bg-fuchsia-950/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={formData.city} 
                    onChange={handleChange}
                    className="bg-fuchsia-950/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    className="bg-fuchsia-950/50"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
