
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

// All images for the static gallery
const staticGalleryImages = [
  // First batch of 10 images (replace these with actual uploaded file paths as needed)
  "/lovable-uploads/8a332b21-6c38-4abc-bf39-73e75d358e4c.png",
  "/lovable-uploads/3bd24d37-b891-4186-8e35-164449c41468.png",
  "/lovable-uploads/b87ecb07-0348-4093-b57a-54d9c06c7f70.png",
  "/lovable-uploads/5daa242b-c9d8-4787-b76d-626edb77db9f.png",
  "/lovable-uploads/a0a67a48-d98a-458f-9ec1-10ae8525f5fc.png",
  "/lovable-uploads/8da6791f-c276-499c-adfc-a29d72123964.png",
  "/lovable-uploads/881cd667-9acf-4f27-a558-4ba6f5ada9cf.png",
  "/lovable-uploads/1b0325a2-ac01-4133-8570-7ee480656465.png",
  "/lovable-uploads/69f2c3a5-1113-437f-a034-cf592b7ed700.png",
  "/lovable-uploads/1a0b7471-5b2d-40a7-b2d5-7aac98d77825.png",
  // Add any additional batches/images here in upload order:
  "/lovable-uploads/b18b2dd1-3fea-410f-bb62-da6b79e7d7b9.png",
  "/lovable-uploads/3ba9edc7-9def-4bb7-9b2f-4390f59fefd7.png",
  "/lovable-uploads/37e9be9c-2d94-43d5-baf5-8887c1485d8b.png",
  "/lovable-uploads/276b0ea3-57f8-4a32-b918-acec4f7a35b3.png"
  // Add additional file paths as needed below...
];

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          {/* Pure static image gallery, 4 per row, no staff logic, no text, no circular shape, no framing */}
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
                    borderRadius: 0, // NO rounding/circles
                    // No boxShadow, no border, no background override
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

