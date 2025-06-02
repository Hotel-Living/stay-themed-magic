import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
export default function Contact() {
  return <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-[#4b0456] p-6 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-50">Contact Us</h1>
          
          {/* Welcome Message */}
          <div className="text-center mb-8 p-6 bg-white/10 rounded-lg border border-white/20">
            <p className="text-slate-50 text-lg leading-relaxed mb-2">
              We're here to listen.
            </p>
            <p className="text-slate-50/90 text-base">
              Feel free to reach out to us at{" "}
              <a href="mailto:contact@hotel-living.com" className="text-[#FFF9B0] hover:text-white transition-colors underline">contact@hotel-living.com</a>
              {" "}— we'd love to hear from you.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </main>
      
      <Footer />
    </div>;
}