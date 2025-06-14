
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

// New static gallery: Just the 10 uploaded images (rectangular, pure gallery mode)
const staticGalleryImages = [
  "/lovable-uploads/597f8e23-e1a7-4a48-bbbb-bbec8a9b1064.png",
  "/lovable-uploads/20544980-1c7c-41e7-9534-ea05df211f12.png",
  "/lovable-uploads/e7fc10a7-b8fd-4edf-b629-78a71f0e6118.png",
  "/lovable-uploads/37dd7d26-04cd-40f4-939e-21234807d99f.png",
  "/lovable-uploads/5ba7aee7-2aa5-4628-86b4-255f9d264040.png",
  "/lovable-uploads/b3b41f6f-2efb-45dc-a02b-9d3ea1e3b9c2.png",
  "/lovable-uploads/d574e8eb-197c-482d-856c-a0da0a795b82.png",
  "/lovable-uploads/80553826-35dd-4cfb-a871-87d1f5cb1afb.png",
  "/lovable-uploads/4964d5e3-1640-468e-9d24-8f11f650b264.png",
  "/lovable-uploads/a2b6ec59-29e8-4283-91cd-9923fcfb117a.png",
];

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          {/* Static photo gallery: rectangular only, no text, no staff logic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {staticGalleryImages.map((src) => (
              <div key={src} className="flex flex-col items-center">
                <img
                  src={src}
                  alt=""
                  className="block"
                  style={{
                    width: "11.2rem",
                    height: "11.2rem",
                    objectFit: "cover",
                    borderRadius: 0, // NO rounding/circle.
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
