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
  {
    img: "/lovable-uploads/2233261d-2199-4fe5-80cb-8fb57da3478a.png",
    name: "FERNANDO ESPINEIRA",
    title: "CHIEF OPERATING OFFICER",
  },
  // ADDED STAFF BELOW:
  {
    img: "/lovable-uploads/4ab0282f-bee9-4ffa-9e44-04b2a97aa425.png",
    name: "Benjamin Hughes",
    title: "FRONTEND DEVELOPER",
  },
  {
    img: "/lovable-uploads/0ca6645a-ece0-4075-a1c1-36bf915e4c77.png",
    name: "Natalie Foster",
    title: "CHIEF HUMAN RESOURCES OFFICER",
  },
  {
    img: "/lovable-uploads/a072d968-cb17-442c-ad7c-afbae6334eb1.png",
    name: "Arjun Mehta",
    title: "DIRECTOR OF SOFTWARE DEVELOPMENT",
  },
  {
    img: "/lovable-uploads/b13a8a21-ab9a-459e-9019-bdb5e2955349.png",
    name: "Ethan Brooks",
    title: "BUSINESS RELATIONS COORDINATOR",
  },
  // UPDATE: Change previous "PLATFORM RELIABILITY ENGINEER" to ETHAN HORNE
  {
    img: "/lovable-uploads/b5f52460-e740-4f04-ab00-bd8714f65cb2.png",
    name: "ETHAN HORNE",
    title: "PLATFORM RELIABILITY ENGINEER",
  },
  // ADD: ROD EAGLE IT OPERATIONS MANAGER
  {
    img: "/lovable-uploads/4f0537ed-5d89-421b-b624-3ac5863ca401.png",
    name: "ROD EAGLE",
    title: "IT OPERATIONS MANAGER",
  },
  // ADD: Alfred Slav TECHNICAL SUPPORT
  {
    img: "/lovable-uploads/2b1641c8-d051-40d1-be38-ad4b7bb6e807.png",
    name: "ALFRED SLAV",
    title: "TECHNICAL SUPPORT",
  },
  // ADD: Alexander Scott CHIEF FINANCIAL OFFICER
  {
    img: "/lovable-uploads/91321727-8a4a-4f36-b37c-15ff37fa8ee6.png",
    name: "ALEXANDER SCOTT",
    title: "CHIEF FINANCIAL OFFICER",
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
