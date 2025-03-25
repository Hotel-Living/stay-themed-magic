
import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, LifeBuoy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Define tabs for settings
type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'help';

export const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, profile } = useAuth();

  // Tab definitions with icons and labels
  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security' as SettingsTab, label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'billing' as SettingsTab, label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'help' as SettingsTab, label: 'Help & Support', icon: <LifeBuoy className="w-4 h-4" /> },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2 text-fuchsia-400" />
        Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        </div>

        {/* Main content area */}
        <div className="md:col-span-3 bg-fuchsia-950/20 p-6 rounded-xl">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Photo</label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-fuchsia-800/30 flex items-center justify-center text-lg font-medium">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </div>
                    <button className="ml-4 px-3 py-1 text-sm bg-fuchsia-800/30 hover:bg-fuchsia-700/40 rounded-lg transition-colors">
                      Upload Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      defaultValue={profile?.first_name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      defaultValue={profile?.last_name || ''}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    defaultValue={user?.email || ''}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">Your email address is verified and cannot be changed.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea 
                    className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 h-24"
                    placeholder="Tell us a bit about yourself"
                    defaultValue=""
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="booking_confirmations"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="booking_confirmations" className="text-sm font-medium">Booking Confirmations</label>
                        <p className="text-xs text-muted-foreground">Receive emails when your booking is confirmed.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="booking_reminders"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="booking_reminders" className="text-sm font-medium">Booking Reminders</label>
                        <p className="text-xs text-muted-foreground">Receive reminder emails before your upcoming stay.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="special_offers"
                          type="checkbox"
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="special_offers" className="text-sm font-medium">Special Offers</label>
                        <p className="text-xs text-muted-foreground">Receive emails about special deals and promotions.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="newsletter" className="text-sm font-medium">Newsletter</label>
                        <p className="text-xs text-muted-foreground">Receive our monthly newsletter with travel tips and updates.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fuchsia-300 mb-3">System Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="account_updates"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="account_updates" className="text-sm font-medium">Account Updates</label>
                        <p className="text-xs text-muted-foreground">Receive notifications about important account updates.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="security_alerts"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="security_alerts" className="text-sm font-medium">Security Alerts</label>
                        <p className="text-xs text-muted-foreground">Receive notifications about security-related events.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Password</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Two-Factor Authentication</h4>
                  <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
                    <div className="flex items-start">
                      <div className="flex items-center h-5 pt-0.5">
                        <input
                          id="enable_2fa"
                          type="checkbox"
                          className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="enable_2fa" className="text-sm font-medium">Enable Two-Factor Authentication</label>
                        <p className="text-xs text-muted-foreground mt-1">Adding a second layer of security to your account helps protect your information.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Active Sessions</h4>
                  <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40 mb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">
                          {navigator.userAgent.includes('Windows') ? 'Windows' : 
                           navigator.userAgent.includes('Mac') ? 'macOS' : 
                           navigator.userAgent.includes('Linux') ? 'Linux' : 'Unknown'} - 
                          {navigator.userAgent.includes('Chrome') ? ' Chrome' : 
                           navigator.userAgent.includes('Firefox') ? ' Firefox' : 
                           navigator.userAgent.includes('Safari') ? ' Safari' : ' Browser'}
                        </p>
                      </div>
                      <div className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Active</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg transition-colors">
                    Sign Out of All Devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Billing Information</h3>
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium mb-2">No billing information</h4>
                <p className="text-muted-foreground mb-6">You don't have any payment methods set up yet.</p>
                <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Help & Support</h3>
              
              <div className="space-y-6">
                <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
                  <h4 className="text-sm font-medium mb-2">Contact Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">Our support team is here to help. We usually respond within 24 hours.</p>
                  <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                    Contact Support
                  </button>
                </div>

                <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
                  <h4 className="text-sm font-medium mb-2">Frequently Asked Questions</h4>
                  <p className="text-sm text-muted-foreground mb-4">Find answers to common questions about our services.</p>
                  <button className="px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                    View FAQs
                  </button>
                </div>

                <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
                  <h4 className="text-sm font-medium mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-4">Browse our detailed documentation to learn more about our platform.</p>
                  <button className="px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
