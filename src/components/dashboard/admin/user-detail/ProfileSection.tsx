
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface ProfileSectionProps {
  profile: any;
  editing: boolean;
  editForm: {
    first_name: string;
    last_name: string;
    phone: string;
    is_hotel_owner: boolean;
    is_active: boolean;
  };
  setEditForm: (form: any) => void;
}

export const ProfileSection = ({ profile, editing, editForm, setEditForm }: ProfileSectionProps) => {
  if (editing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={editForm.first_name}
            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={editForm.last_name}
            onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <Checkbox
            id="is_hotel_owner"
            checked={editForm.is_hotel_owner}
            onCheckedChange={(checked) => 
              setEditForm({ ...editForm, is_hotel_owner: checked === true })
            }
          />
          <Label htmlFor="is_hotel_owner">Hotel Owner</Label>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={editForm.is_active}
              onCheckedChange={(checked) => 
                setEditForm({ ...editForm, is_active: checked })
              }
            />
            <Label htmlFor="is_active">User Active</Label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-400">First Name</p>
        <p className="font-medium">{profile.first_name || "Not provided"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Last Name</p>
        <p className="font-medium">{profile.last_name || "Not provided"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Phone</p>
        <p className="font-medium">{profile.phone || "Not provided"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Hotel Owner</p>
        <p className="font-medium">{profile.is_hotel_owner ? "Yes" : "No"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Email Verified</p>
        <p className="font-medium">{profile.email_verified ? "Yes" : "No"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Role</p>
        <p className="font-medium capitalize">{profile.role || "guest"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">User ID</p>
        <p className="font-medium font-mono text-xs">{profile.id}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Joined</p>
        <p className="font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Status</p>
        <p className="font-medium">{profile.is_active !== false ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};
