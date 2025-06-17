
import React, { useState } from 'react';
import AdminUsersPanel from './AdminUsersPanel';
import AdminBookingsPanel from './AdminBookingsPanel';
import AdminPaymentsPanel from './AdminPaymentsPanel';
import AffinitiesPanel from './affinities/AffinitiesPanel';
import AdminFiltersPanel from './AdminFiltersPanel';
import ActivitiesPanel from "./activities/ActivitiesPanel";
import PendingHotelsTable from './PendingHotelsTable';
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 'users';
    if (path.includes('/bookings')) return 'bookings';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/affinities')) return 'affinities';
    if (path.includes('/activities')) return 'activities';
    if (path.includes('/filters')) return 'filters';
    if (path.includes('/settings')) return 'settings';
    return 'hotels'; // Default to hotels for /admin/hotels and /admin
  };

  const [activeTab] = useState(getActiveTabFromPath());

  const renderContent = () => {
    switch (activeTab) {
      case 'hotels':
        return <PendingHotelsTable />;
      case 'users':
        return <AdminUsersPanel />;
      case 'bookings':
        return <AdminBookingsPanel />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <p className="text-white/60">Platform analytics and statistics</p>
            </div>
            <Card className="bg-purple-900/20 border-purple-800/30">
              <CardContent className="p-6">
                <div className="text-center text-white/60">
                  <p>Analytics dashboard will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'affinities':
        return <AffinitiesPanel />;
      case 'activities':
        return <ActivitiesPanel />;
      case 'filters':
        return <AdminFiltersPanel />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <p className="text-white/60">Admin settings and configuration</p>
            </div>
            <Card className="bg-purple-900/20 border-purple-800/30">
              <CardContent className="p-6">
                <div className="text-center text-white/60">
                  <p>Admin settings will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <PendingHotelsTable />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}
