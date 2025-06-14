
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import React from "react";

// Pure static gallery: All images as provided, rectangular, no processing, no staff logic
const staticGalleryImages = [
  "/lovable-uploads/597f8e23-e1a7-4a48-bbbb-bbec8a9b1064.png",
  "/lovable-uploads/e94f3f85-8e07-4fe8-a381-9765b4e29fb8.png",
  "/lovable-uploads/e7fc10a7-b8fd-4edf-b629-78a71f0e6118.png",
  "/lovable-uploads/37dd7d26-04cd-40f4-939e-21234807d99f.png",
  "/lovable-uploads/5ba7aee7-2aa5-4628-86b4-255f9d264040.png",
  "/lovable-uploads/b3b41f6f-2efb-45dc-a02b-9d3ea1e3b9c2.png",
  "/lovable-uploads/d574e8eb-197c-482d-856c-a0da0a795b82.png",
  "/lovable-uploads/80553826-35dd-4cfb-a871-87d1f5cb1afb.png",
  "/lovable-uploads/4964d5e3-1640-468e-9d24-8f11f650b264.png",
  "/lovable-uploads/a2b6ec59-29e8-4283-91cd-9923fcfb117a.png",
  "/lovable-uploads/c8e5f873-69d3-467e-96f5-188fb5a9512a.png",
  "/lovable-uploads/1eaa6515-a2f7-4161-b3dd-810e797e180a.png",
  "/lovable-uploads/30eb0762-2378-4805-a041-6f4ac65c980b.png",
  "/lovable-uploads/edff432e-7a2a-4e72-ab55-2f328e723667.png"
  // Add any future images below, in exact order
];

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12"
            style={{
              alignItems: "stretch", // Ensures all in the row are same height
            }}
          >
            {staticGalleryImages.map((src, i) => (
              <div
                key={src}
                className="flex flex-col items-center w-full h-full"
                style={{
                  minHeight: 0,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={src}
                    alt=""
                    className="block select-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "320px",
                      objectFit: "contain", // no cropping, image fully contained
                      aspectRatio: "auto",
                      borderRadius: 0,
                      boxShadow: "none",
                      background: "none",
                      margin: 0,
                      padding: 0,
                      display: "block"
                    }}
                    draggable={false}
                  />
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
