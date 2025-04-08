
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AffinityStaysSlogans } from "@/components/affinity-stays/AffinityStaysSlogans";
import { AffinityAccordionMenu } from "@/components/affinity-stays/AffinityAccordionMenu";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

export default function AffinityStays() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-4 relative z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          {/* Main content */}
          <AffinityStaysSlogans />
          <AffinityAccordionMenu />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
