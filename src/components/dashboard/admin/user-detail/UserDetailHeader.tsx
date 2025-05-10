
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserDetailHeaderProps {
  editing: boolean;
  handleSaveUserDetails: () => void;
  setEditing: (editing: boolean) => void;
}

export const UserDetailHeader = ({ editing, handleSaveUserDetails, setEditing }: UserDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users
      </Button>
      <h2 className="text-2xl font-bold">User Details</h2>
      {editing ? (
        <Button 
          variant="outline" 
          onClick={handleSaveUserDetails}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setEditing(true)}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit User
        </Button>
      )}
    </div>
  );
};
