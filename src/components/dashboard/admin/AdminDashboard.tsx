
import React, { useState, useEffect } from "react";
import { useHotelsData } from "./hooks/useHotelsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Building, Languages, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingHotelsTable from "./PendingHotelsTable";
import AdminUsersPanel from "./AdminUsersPanel";
import AdminBookingsPanel from "./AdminBookingsPanel";
import AdminPaymentsPanel from "./AdminPaymentsPanel";
import AffinitiesPanel from "./affinities/AffinitiesPanel";
import AdminFiltersPanel from "./AdminFiltersPanel";
import BatchTranslationPanel from "./BatchTranslationPanel";
import AdminStatisticsPanel from "./AdminStatisticsPanel";
import AdminCommunicationsPanel from "./AdminCommunicationsPanel";
import AdminAdvertisingPanel from "./AdminAdvertisingPanel";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the current tab from URL path
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 'users';
    if (path.includes('/bookings')) return 'bookings';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/communications')) return 'communications';
    if (path.includes('/advertising')) return 'advertising';
    if (path.includes('/affinities')) return 'affinities';
    if (path.includes('/filters')) return 'filters';
    if (path.includes('/translations')) return 'translations';
    if (path.includes('/statistics')) return 'statistics';
    return 'hotels';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Manage hotels, users, bookings, and system content</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-purple-900/20 border border-purple-800/30">
            <TabsTrigger value="hotels" className="data-[state=active]:bg-purple-700">
              <Building className="w-4 h-4 mr-2" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-700">
              Users
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-purple-700">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-purple-700">
              Payments
            </TabsTrigger>
            <TabsTrigger value="communications" className="data-[state=active]:bg-purple-700">
              Communications
            </TabsTrigger>
            <TabsTrigger value="advertising" className="data-[state=active]:bg-purple-700">
              Advertising
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-purple-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="affinities" className="data-[state=active]:bg-purple-700">
              Affinities
            </TabsTrigger>
            <TabsTrigger value="filters" className="data-[state=active]:bg-purple-700">
              Filters
            </TabsTrigger>
            <TabsTrigger value="translations" className="data-[state=active]:bg-purple-700">
              <Languages className="w-4 h-4 mr-2" />
              Translations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            <PendingHotelsTable />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersPanel />
          </TabsContent>

          <TabsContent value="bookings">
            <AdminBookingsPanel />
          </TabsContent>

          <TabsContent value="payments">
            <AdminPaymentsPanel />
          </TabsContent>

          <TabsContent value="communications">
            <AdminCommunicationsPanel />
          </TabsContent>

          <TabsContent value="advertising">
            <AdminAdvertisingPanel />
          </TabsContent>

          <TabsContent value="statistics">
            <AdminStatisticsPanel />
          </TabsContent>

          <TabsContent value="affinities">
            <AffinitiesPanel />
          </TabsContent>

          <TabsContent value="filters">
            <AdminFiltersPanel />
          </TabsContent>

          <TabsContent value="translations">
            <BatchTranslationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
