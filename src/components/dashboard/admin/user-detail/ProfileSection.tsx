
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProfileSectionProps {
  profile: any;
  editing: boolean;
  editForm: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    is_hotel_owner: boolean;
    is_active: boolean;
  };
  setEditForm: React.Dispatch<React.SetStateAction<{
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    is_hotel_owner: boolean;
    is_active: boolean;
  }>>;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  profile, 
  editing, 
  editForm, 
  setEditForm 
}) => {
  if (editing) {
    return (
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input 
              id="first_name"
              value={editForm.first_name}
              onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input 
              id="last_name"
              value={editForm.last_name}
              onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={editForm.email}
            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone"
            value={editForm.phone}
            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
            className="mt-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="is_active" 
            checked={editForm.is_active}
            onCheckedChange={(checked) => setEditForm({...editForm, is_active: checked})}
          />
          <Label htmlFor="is_active">Active Account</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="is_hotel_owner" 
            checked={editForm.is_hotel_owner}
            onCheckedChange={(checked) => setEditForm({...editForm, is_hotel_owner: checked})}
          />
          <Label htmlFor="is_hotel_owner">Hotel Owner</Label>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">First Name</div>
          <div>{profile.first_name || "Not provided"}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Last Name</div>
          <div>{profile.last_name || "Not provided"}</div>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Email</div>
        <div>{profile.email || "Not provided"}</div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Phone</div>
        <div>{profile.phone || "Not provided"}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Account Status</div>
          <div>{profile.is_active !== false ? "Active" : "Inactive"}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Hotel Owner</div>
          <div>{profile.is_hotel_owner ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
};
