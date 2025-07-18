
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UserDashboardLayout } from "@/components/dashboard/user/tabs/UserDashboardLayout";
import { Starfield } from "@/components/Starfield";

export default function UserDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      <main className="flex-1">
        <UserDashboardLayout />
      </main>
      <Footer />
    </div>
  );
}
