
import React from 'react';
import { Settings } from 'lucide-react';
import EmptyState from './EmptyState';

export const SettingsContent = () => {
  return (
    <EmptyState 
      icon={<Settings className="w-8 h-8" />}
      title="Settings"
      description="Account settings, preferences, and property management options will be available here. Check back soon for more customization options."
    />
  );
};

export default SettingsContent;
