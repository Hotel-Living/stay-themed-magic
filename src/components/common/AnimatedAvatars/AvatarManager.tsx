import React from 'react';
import { AvatarDisplay } from './AvatarDisplay';
import { useAvatarContext } from './useAvatarContext';

export const AvatarManager: React.FC = () => {
  const { avatarContext, dismissAvatar } = useAvatarContext();

  if (!avatarContext.shouldShow || !avatarContext.avatarType) {
    return null;
  }

  return (
    <AvatarDisplay
      avatarType={avatarContext.avatarType}
      message={avatarContext.message}
      position={avatarContext.position}
      autoHide={avatarContext.autoHide}
      autoHideDelay={avatarContext.autoHideDelay}
      onDismiss={() => dismissAvatar(avatarContext.avatarType!)}
    />
  );
};