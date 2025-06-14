
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function OurTeam() {
  // Array of static (rectangular) team image paths
  const teamImages = [
    {
      src: "/lovable-uploads/284baa20-4bf1-447d-80b0-355c3e9cc599.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/5d682bb6-816a-44ff-9cbd-0358a7e58ae8.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/cb83335f-9cd2-447c-915d-d7b3801ade69.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/7960ff42-e998-426e-aff3-b61fde09b911.png",
      alt: "",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {teamImages.map((img, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  // No rounded corners or cropping
                  className="border-[5px] border-gray-200 shadow-md w-full max-w-xs h-auto object-contain"
                  style={{ borderRadius: 0 }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
