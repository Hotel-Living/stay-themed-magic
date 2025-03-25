
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { EmailVerificationBanner } from "@/components/auth/EmailVerificationBanner";

export default function UserDashboard() {
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Hotel-Living";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          {/* Show email verification banner if needed */}
          <EmailVerificationBanner />
          
          <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
          
          <DashboardLayout>
            <DashboardContent />
          </DashboardLayout>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
