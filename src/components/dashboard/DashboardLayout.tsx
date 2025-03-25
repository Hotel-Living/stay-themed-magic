
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BuildingIcon, 
  CalendarIcon, 
  UsersIcon, 
  BarChart3Icon, 
  SettingsIcon,
  ChevronRightIcon,
  MessageSquare
} from 'lucide-react';

// Tab content imports
import DashboardContent from './DashboardContent';
import PropertiesContent from './PropertiesContent';
import BookingsContent from './BookingsContent';
import GuestsContent from './GuestsContent';
import AnalyticsContent from './AnalyticsContent';
import SettingsContent from './SettingsContent';
import ReviewsContent from './ReviewsContent';
import AddProperty from './AddProperty';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  dataTab?: string;
}

// Navigation item component extracted for reusability
const NavItem = ({ icon, label, active, onClick, dataTab }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      data-tab={dataTab}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        active
          ? 'bg-fuchsia-950 text-fuchsia-300'
          : 'hover:bg-fuchsia-950/50 text-foreground/80 hover:text-foreground'
      }`}
    >
      <div className="flex items-center flex-1">
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
      <ChevronRightIcon className="w-4 h-4 opacity-50" />
    </button>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const isUserDashboard = location.pathname === '/dashboard';
  
  // Using useMemo to avoid recreating the navigation items on each render
  const navItems = useMemo(() => {
    if (isUserDashboard) {
      return [
        { id: 'dashboard', icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard' },
        { id: 'properties', icon: <BuildingIcon className="w-5 h-5" />, label: 'Properties' },
        { id: 'bookings', icon: <CalendarIcon className="w-5 h-5" />, label: 'Bookings' },
        { id: 'reviews', icon: <MessageSquare className="w-5 h-5" />, label: 'Reviews' },
        { id: 'settings', icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings' },
      ];
    } else {
      return [
        { id: 'dashboard', icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard' },
        { id: 'properties', icon: <BuildingIcon className="w-5 h-5" />, label: 'Properties' },
        { id: 'bookings', icon: <CalendarIcon className="w-5 h-5" />, label: 'Bookings' },
        { id: 'guests', icon: <UsersIcon className="w-5 h-5" />, label: 'Guests' },
        { id: 'analytics', icon: <BarChart3Icon className="w-5 h-5" />, label: 'Analytics' },
        { id: 'addProperty', icon: <BuildingIcon className="w-5 h-5" />, label: 'Add Property' },
        { id: 'settings', icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings' },
      ];
    }
  }, [isUserDashboard]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render the appropriate content based on the active tab
  const renderTabContent = () => {
    if (isUserDashboard) {
      switch (activeTab) {
        case 'dashboard': return <DashboardContent />;
        case 'properties': return <PropertiesContent />;
        case 'bookings': return <BookingsContent bookings={[]} isLoading={false} />;
        case 'reviews': return <ReviewsContent />;
        case 'settings': return <SettingsContent />;
        default: return <DashboardContent />;
      }
    } else {
      // Hotel dashboard tabs
      switch (activeTab) {
        case 'dashboard': return children || <DashboardContent />;
        case 'properties': return <PropertiesContent />;
        case 'bookings': return <BookingsContent bookings={[]} isLoading={false} />;
        case 'guests': return <GuestsContent />;
        case 'analytics': return <AnalyticsContent />;
        case 'addProperty': return <AddProperty />;
        case 'settings': return <SettingsContent />;
        default: return children || <DashboardContent />;
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-64 flex-shrink-0">
        <div className="glass-card rounded-xl p-4 sticky top-24">
          <div className="mb-4">
            <h2 className="text-lg font-bold ml-3">
              {isUserDashboard ? 'User Dashboard' : 'Hotel Dashboard'}
            </h2>
          </div>
          
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => handleTabChange(item.id)}
                dataTab={item.id}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {renderTabContent()}
      </div>
    </div>
  );
}
