
import React from 'react';
import { User, Bell, Shield, CreditCard, LifeBuoy, Heart } from 'lucide-react';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'help' | 'preferences';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  // Tab definitions with icons and labels
  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'preferences' as SettingsTab, label: 'Preferences', icon: <Heart className="w-4 h-4" /> },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security' as SettingsTab, label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'billing' as SettingsTab, label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'help' as SettingsTab, label: 'Help & Support', icon: <LifeBuoy className="w-4 h-4" /> },
  ];

  return (
    <nav className="space-y-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-fuchsia-950 text-fuchsia-300'
              : 'hover:bg-fuchsia-950/50 text-foreground/80 hover:text-foreground'
          }`}
        >
          <span className="mr-3">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default SettingsSidebar;
