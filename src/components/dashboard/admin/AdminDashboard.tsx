
import React, { useState } from 'react';
import AdminUsersPanel from './AdminUsersPanel';
import AdminBookingsPanel from './AdminBookingsPanel';
import AdminPaymentsPanel from './AdminPaymentsPanel';
import AffinitiesPanel from './affinities/AffinitiesPanel';
import AdminFiltersPanel from './AdminFiltersPanel';
import ActivitiesPanel from "./activities/ActivitiesPanel";
import PendingHotelsTable from './PendingHotelsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Calendar, CreditCard, BarChart3 } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 'users';
    if (path.includes('/bookings')) return 'bookings';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/affinities')) return 'affinities';
    if (path.includes('/activities')) return 'activities';
    if (path.includes('/filters')) return 'filters';
    if (path.includes('/hotels')) return 'hotels';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Hotels</CardTitle>
            <Building className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-purple-300">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,341</div>
            <p className="text-xs text-purple-300">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">892</div>
            <p className="text-xs text-purple-300">
              +23% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$54,231</div>
            <p className="text-xs text-purple-300">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Pending Approvals</CardTitle>
            <CardDescription className="text-purple-300">
              Hotels waiting for review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white">New Properties</span>
                <span className="text-orange-400 font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Property Updates</span>
                <span className="text-yellow-400 font-semibold">3</span>
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Review Pending Items
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-purple-300">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-white border-purple-600 hover:bg-purple-800/50">
                <Building className="h-4 w-4 mr-2" />
                Add New Hotel
              </Button>
              <Button variant="outline" className="w-full text-white border-purple-600 hover:bg-purple-800/50">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full text-white border-purple-600 hover:bg-purple-800/50">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent();
      case 'hotels':
        return <PendingHotelsTable />;
      case 'users':
        return <AdminUsersPanel />;
      case 'bookings':
        return <AdminBookingsPanel />;
      case 'payments':
        return <AdminPaymentsPanel />;
      case 'affinities':
        return <AffinitiesPanel />;
      case 'activities':
        return <ActivitiesPanel />;
      case 'filters':
        return <AdminFiltersPanel />;
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}
