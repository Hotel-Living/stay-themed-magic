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

// The extra non-staff images
const extraImages = [
  "/lovable-uploads/b18b2dd1-3fea-410f-bb62-da6b79e7d7b9.png",
  "/lovable-uploads/3ba9edc7-9def-4bb7-9b2f-4390f59fefd7.png",
  "/lovable-uploads/37e9be9c-2d94-43d5-baf5-8887c1485d8b.png",
  "/lovable-uploads/276b0ea3-57f8-4a32-b918-acec4f7a35b3.png"
];

// The new batch of uploaded images to display (update with new batches as they arrive)
const newBatchImages = [
  "/lovable-uploads/8a332b21-6c38-4abc-bf39-73e75d358e4c.png",
  "/lovable-uploads/3bd24d37-b891-4186-8e35-164449c41468.png",
  "/lovable-uploads/b87ecb07-0348-4093-b57a-54d9c06c7f70.png",
  "/lovable-uploads/5daa242b-c9d8-4787-b76d-626edb77db9f.png",
  "/lovable-uploads/a0a67a48-d98a-458f-9ec1-10ae8525f5fc.png",
  "/lovable-uploads/8da6791f-c276-499c-adfc-a29d72123964.png",
  "/lovable-uploads/881cd667-9acf-4f27-a558-4ba6f5ada9cf.png",
  "/lovable-uploads/1b0325a2-ac01-4133-8570-7ee480656465.png",
  "/lovable-uploads/69f2c3a5-1113-437f-a034-cf592b7ed700.png",
  "/lovable-uploads/1a0b7471-5b2d-40a7-b2d5-7aac98d77825.png"
];

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
          
          {/* EXTRA NON-STAFF IMAGES (NO FRAME, NO TEXT, NO ROUNDED MASK) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mt-16">
            {extraImages.map((src, i) => (
              <div key={src} className="flex flex-col items-center">
                <img
                  src={src}
                  alt=""
                  className="block"
                  style={{
                    // Keep a consistent large size, adjust to match above visually.
                    width: "11.2rem",
                    height: "11.2rem",
                    objectFit: "cover",
                    borderRadius: 0,
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
                    background: "#fff"
                  }}
                />
              </div>
            ))}
          </div>
          {/* "Regular photos" section: 4 per row, no rounding, no text, as requested */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mt-16">
            {newBatchImages.map((src) => (
              <div key={src} className="flex flex-col items-center">
                <img
                  src={src}
                  alt=""
                  className="block"
                  style={{
                    width: "11.2rem",
                    height: "11.2rem",
                    objectFit: "cover",
                    borderRadius: 0,
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
                    background: "#fff"
                  }}
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
