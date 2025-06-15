
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

// Matched staff: names and titles from group images, portrait from individual photos
const staffProfiles = [
  {
    img: "/lovable-uploads/a293f10a-52d7-4aae-9e16-439f780888b6.png",
    name: "JORGE FERNANDEZ",
    title: "PUBLIC RELATIONS MANAGER",
  },
  {
    img: "/lovable-uploads/2302bda3-e1b9-4b42-a669-26c4dbcc9e20.png",
    name: "MARIA ELENA CASTANEDA",
    title: "MARKETING EXECUTIVE",
  },
  {
    img: "/lovable-uploads/0541e858-fb70-4334-817f-640e38be5c5d.png",
    name: "Victoria Hayes",
    title: "AFFILIATES & MEMBERSHIP MANAGER",
  },
  {
    img: "/lovable-uploads/77dc7017-bd00-4ce0-8519-f89a3df68b77.png",
    name: "Isabella Reed",
    title: "MEDIA RELATIONS MANAGER",
  },
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
                {/* Profile image with rounded/oval appearance */}
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

