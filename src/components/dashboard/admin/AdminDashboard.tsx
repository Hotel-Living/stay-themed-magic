import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Users, CreditCard, MessageSquare, Megaphone, Heart, Filter, Languages, UserCheck, BarChart3, Settings, Image } from "lucide-react";
import AdminUsersPanel from "./AdminUsersPanel";
import AdminBookingsPanel from "./AdminBookingsPanel";
import AdminPaymentsPanel from "./AdminPaymentsPanel";
import AdminAffinitiesPanel from "./AdminAffinitiesPanel";
import AdminFiltersPanel from "./AdminFiltersPanel";
import { BatchImagePopulation } from "./BatchImagePopulation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hotels");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform from this central dashboard
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="advertising" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Ads</span>
          </TabsTrigger>
          <TabsTrigger value="affinities" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Themes</span>
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </TabsTrigger>
          <TabsTrigger value="translations" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">i18n</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="batch-images" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Batch Images</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hotels</CardTitle>
              <CardDescription>Manage hotels on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage hotels.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUsersPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Manage bookings on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminBookingsPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>Manage payments on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminPaymentsPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Manage communications on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage communications.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advertising" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advertising</CardTitle>
              <CardDescription>Manage advertising on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage advertising.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affinities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Affinities</CardTitle>
              <CardDescription>Manage affinities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAffinitiesPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Manage filters on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminFiltersPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Translations</CardTitle>
              <CardDescription>Manage translations on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage translations.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Manage roles on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage roles.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View analytics on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can view analytics.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch-images" className="space-y-4">
          <BatchImagePopulation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
