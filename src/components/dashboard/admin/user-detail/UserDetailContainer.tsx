
import React from "react";
import { ProfileEditActions } from "./ProfileEditActions";
import { UserDetailHeader } from "./UserDetailHeader";
import { UserLoadingState } from "./UserLoadingState";
import { UserNotFound } from "./UserNotFound";
import { UserDetailContent } from "./UserDetailContent";

interface UserDetailContainerProps {
  loading: boolean;
  profile: any;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  handleSave: () => Promise<void>;
  handleCancelEdit: () => void;
  detailProps: any;
}

export const UserDetailContainer: React.FC<UserDetailContainerProps> = ({
  loading,
  profile,
  editing,
  setEditing,
  handleSave,
  handleCancelEdit,
  detailProps
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Details</h2>
        <ProfileEditActions
          editing={editing}
          setEditing={setEditing}
          handleSave={handleSave}
          handleCancelEdit={handleCancelEdit}
        />
      </div>

      {loading ? (
        <UserLoadingState />
      ) : profile ? (
        <UserDetailContent
          {...detailProps}
          profile={profile}
          editing={editing}
        />
      ) : (
        <UserNotFound />
      )}
    </div>
  );
};
