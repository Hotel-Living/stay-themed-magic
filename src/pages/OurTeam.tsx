
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

// Staff data extracted from group photo and matched with uploaded individual images
const staffProfiles = [
  {
    img: "/lovable-uploads/5d0b855a-1ebc-4826-9a04-fa2c6e66ae25.png",
    name: "Joanna Ridge",
    title: "Chief Strategy Officer",
  },
  {
    img: "/lovable-uploads/6c8e1efa-e665-40e5-8e0e-99ea9fc7b89a.png",
    name: "James Peterson",
    title: "General Counsel",
  },
  {
    img: "/lovable-uploads/d32609d7-2cd1-42a3-8e83-b096f13ace1e.png",
    name: "Isabella Schneider",
    title: "AI Integration Specialist",
  },
  // Lia Jo will be added once her individual photo is provided
];

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {staffProfiles.map(({ img, name, title }) => (
              <div key={img} className="flex flex-col items-center">
                {/* Profile image with oval/circle styling */}
                <div className="rounded-full shadow-lg border-4 border-white bg-white overflow-hidden flex items-center justify-center aspect-square w-44 h-44">
                  <img
                    src={img}
                    alt={name}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                {/* Name and title */}
                <div className="mt-4 w-11/12 text-center bg-white bg-opacity-80 rounded-lg shadow flex flex-col items-center py-2 px-3 border border-gray-200">
                  <div className="font-medium text-base">{name}</div>
                  <div className="font-bold text-sm uppercase tracking-wide text-gray-800 mt-1" style={{ letterSpacing: "0.02em" }}>
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
