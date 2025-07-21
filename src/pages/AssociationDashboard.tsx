import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function AssociationDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Association Dashboard</h1>
            <p className="text-muted-foreground mb-8">Welcome to your association dashboard</p>
            
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Dashboard Under Development</h2>
              <p className="text-muted-foreground">
                The association dashboard is currently being developed. 
                Please check back soon for more features and functionality.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}