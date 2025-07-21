import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function AssociationDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Association Dashboard</h1>
          <p className="text-xl">Coming Soon</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}