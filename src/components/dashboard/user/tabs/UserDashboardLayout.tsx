
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardContent } from "./DashboardContent";
import { BookingsContent } from "./BookingsContent";
import { SavedContent } from "./SavedContent";
import { HistoryContent } from "./HistoryContent";
import { PaymentsContent } from "./PaymentsContent";
import { ProfileContent } from "./ProfileContent";
import { SettingsContent } from "./SettingsContent";
import { ExperienceContent } from "./ExperienceContent";
import { GetThreeNightsContent } from "./GetThreeNightsContent";
import { NotificationsContent } from "./NotificationsContent";

export const UserDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D1B69] pt-20">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full mb-8 bg-purple-900/30 p-1 rounded-xl backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Bookings</TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Saved</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Alerts</TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Experience</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">History</TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Payments</TabsTrigger>
            <TabsTrigger value="get-three-nights" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">3 Nights</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-fuchsia-600 text-xs lg:text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsContent />
          </TabsContent>

          <TabsContent value="saved">
            <SavedContent />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsContent />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceContent />
          </TabsContent>

          <TabsContent value="history">
            <HistoryContent />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsContent />
          </TabsContent>

          <TabsContent value="get-three-nights">
            <GetThreeNightsContent />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileContent />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
