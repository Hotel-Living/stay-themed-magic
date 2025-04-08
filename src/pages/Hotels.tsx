
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { ZeroRiskSection } from "@/components/hotels/ZeroRiskSection";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
import { HotelFootnote } from "@/components/hotels/HotelFootnote";
import { HotelCards } from "@/components/hotels/HotelCards";
import { HotelFeatures } from "@/components/hotels/HotelFeatures";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

export default function Hotels() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 relative z-10">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          {/* Main content container - made narrower and more transparent */}
          <div className="text-center mb-12 space-y-6 p-8 bg-gradient-to-br from-[#6a0a95]/70 to-[#460F54]/70 backdrop-blur-sm rounded-xl shadow-lg border border-[#ad66a8]/30 max-w-3xl">
            <HotelSlogans />
            <HotelAccordionMenu />
            <HotelFootnote />
          </div>
          
          {/* Grid of cards */}
          <HotelCards />
          
          {/* Features section */}
          <HotelFeatures />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
