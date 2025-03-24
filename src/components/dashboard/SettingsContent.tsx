
import React from 'react';
import { Settings } from 'lucide-react';
import EmptyState from './EmptyState';

export const SettingsContent = () => {
  return (
    <EmptyState 
      icon={<Settings className="w-8 h-8" />}
      title="Settings"
      description="Account and property management settings will be available here."
    />
  );
};

export default SettingsContent;
