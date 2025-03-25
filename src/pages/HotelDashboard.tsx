
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/FilterSection";
import { EmailVerificationBanner } from "@/components/auth/EmailVerificationBanner";

export default function HotelDashboard() {
  const { user, profile } = useAuth();
  const { data: hotels = [] } = useHotels({} as FilterState);
  
  const userHotels = hotels.filter(hotel => hotel.owner_id === user?.id);

  useEffect(() => {
    document.title = "Hotel Dashboard | Hotel-Living";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          {/* Show email verification banner if needed */}
          <EmailVerificationBanner />
          
          <h1 className="text-3xl font-bold mb-6">Hotel Owner Dashboard</h1>
          
          <DashboardLayout>
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
                {userHotels.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userHotels.map(hotel => (
                      <div key={hotel.id} className="glass-card p-6 rounded-xl">
                        <h3 className="text-lg font-medium mb-2">{hotel.name}</h3>
                        <p className="text-muted-foreground mb-4">{hotel.city}, {hotel.country}</p>
                        <div className="flex justify-between">
                          <span className="text-sm bg-fuchsia-400/20 text-fuchsia-400 px-3 py-1 rounded-full">
                            {hotel.category} stars
                          </span>
                          <span className="text-sm">
                            ${hotel.price_per_month}/month
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 glass-card rounded-xl">
                    <h3 className="text-lg font-medium mb-2">No properties yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by adding your first property
                    </p>
                    <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Add Property
                    </button>
                  </div>
                )}
              </div>
            </div>
          </DashboardLayout>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
