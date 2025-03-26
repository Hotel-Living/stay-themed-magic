
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsSidebar } from './settings/SettingsSidebar';
import ProfileSettings from './settings/ProfileSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import BillingSettings from './settings/BillingSettings';
import HelpSupportSettings from './settings/HelpSupportSettings';
import UserPreferencesSettings from './settings/UserPreferencesSettings';

// Define tabs for settings
type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'help' | 'preferences';

export const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'preferences':
        return <UserPreferencesSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'help':
        return <HelpSupportSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2 text-fuchsia-400" />
        Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="md:col-span-1">
          <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Main content area */}
        <div className="md:col-span-3 bg-fuchsia-950/20 p-6 rounded-xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
