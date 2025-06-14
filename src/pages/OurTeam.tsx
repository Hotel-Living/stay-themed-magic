
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

const newTeamImages = [
  {
    src: "/lovable-uploads/a858c581-5eb3-4786-83bf-5b81cd6eda50.png",
    name: "Lia Jo",
    title: "VENDOR RELATIONS MANAGER"
  },
  {
    src: "/lovable-uploads/3ba9edc7-9def-4bb7-9b2f-4390f59fefd7.png",
    name: "James Peterson",
    title: "CHIEF FINANCIAL OFFICER"
  },
  {
    src: "/lovable-uploads/37e9be9c-2d94-43d5-baf5-8887c1485d8b.png",
    name: "James Peterson",
    title: "GENERAL COUNSEL"
  },
  {
    src: "/lovable-uploads/276b0ea3-57f8-4a32-b918-acec4f7a35b3.png",
    name: "Isabella Schneider",
    title: "AI INTEGRATION SPECIALIST"
  },
  {
    src: "/lovable-uploads/bb4b2662-5116-428e-9bf3-e5ed73e133e5.png",
    name: "Benjamin Hughes",
    title: "FRONTEND DEVELOPER"
  },
  {
    src: "/lovable-uploads/e4e2e3f2-220f-4fb8-a32c-5755fed0e39a.png",
    name: "Natalie Foster",
    title: "CHIEF HUMAN RESOURCES OFFICER"
  },
  {
    src: "/lovable-uploads/0f02fa32-9a3a-45b3-8a03-f1e73db23b18.png",
    name: "Arjun Mehta",
    title: "DIRECTOR OF SOFTWARE DEVELOPMENT"
  },
  {
    src: "/lovable-uploads/300d829c-e4ae-4d9b-8469-86a05fb89a8c.png",
    name: "Ethan Brooks",
    title: "BUSINESS RELATIONS COORDINATOR"
  },
  {
    src: "/lovable-uploads/7aa63a56-3993-48d0-b72f-047bae98745e.png",
    name: "Victoria Hayes",
    title: "AFFILIATES & MEMBERSHIP MANAGER"
  },
  {
    src: "/lovable-uploads/b18b2dd1-3fea-410f-bb62-da6b79e7d7b9.png",
    name: "Isabella Reed",
    title: "MEDIA RELATIONS MANAGER"
  }
];

// The size as previously specified (40% larger than the original block) 
// If the old was w-32 (8rem), then 1.4*8rem = 11.2rem; adjust as close as possible while maintaining clear grid.
// Tailwind: 'w-32' => 'w-[11.2rem]', same for h-[11.2rem]
// To apply to the frame, text placement, etc.

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16"
            style={{
              // Ensures equal horizontal/vertical spacing for all resolutions
            }}
          >
            {newTeamImages.map((img, idx) => (
              <div
                key={img.src}
                className="flex flex-col items-center"
              >
                <div
                  className="flex items-center justify-center rounded-full shadow-lg bg-white border border-gray-300"
                  style={{
                    width: "11.2rem",
                    height: "11.2rem", // 40% bigger than 8rem (w-32)
                    padding: "0.3rem",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    style={{
                      width: "10.4rem",
                      height: "10.4rem",
                      objectFit: "cover",
                      borderRadius: "50%",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  className="mt-4 bg-white border border-gray-300 px-4 py-2 text-center"
                  style={{
                    width: "100%",
                    minWidth: "10.5rem",
                    maxWidth: "13rem",
                  }}
                >
                  <div className="font-normal text-black" style={{ fontSize: "1.07rem", lineHeight: "1.3" }}>
                    {img.name}
                  </div>
                  <div className="font-bold text-black" style={{ fontSize: "1.09rem", lineHeight: "1.3" }}>
                    {img.title}
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
