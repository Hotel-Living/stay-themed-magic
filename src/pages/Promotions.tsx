
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Gift } from "lucide-react";

export default function Promotions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Gift className="w-6 h-6 text-fuchsia-400" />
            <h1 className="text-3xl font-bold">Promotions</h1>
          </div>
          
          <div className="glass-card rounded-2xl p-6 bg-[#7a0486]/80 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-fuchsia-100">Current Promotions</h2>
            <p className="text-fuchsia-100 mb-8">
              Take advantage of our exclusive offers and promotions designed to enhance your hotel experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-xl p-6 bg-[#5d0478] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-fuchsia-200">Early Summer Special</h3>
                  <span className="bg-fuchsia-800/50 text-fuchsia-200 text-xs px-2 py-1 rounded-full">
                    Until June 30
                  </span>
                </div>
                <p className="text-fuchsia-100 mb-4">
                  Book a 7+ night stay at any participating hotel and receive a 15% discount plus a complimentary 
                  welcome package.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium text-white bg-[#770477] hover:bg-[#8A058A] transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="glass-card rounded-xl p-6 bg-[#5d0478] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-fuchsia-200">Extended Stay Bonus</h3>
                  <span className="bg-fuchsia-800/50 text-fuchsia-200 text-xs px-2 py-1 rounded-full">
                    All Year
                  </span>
                </div>
                <p className="text-fuchsia-100 mb-4">
                  Stay for 30+ nights and receive weekly housekeeping, utility credits, and access to premium amenities.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium text-white bg-[#770477] hover:bg-[#8A058A] transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="glass-card rounded-xl p-6 bg-[#5d0478] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-fuchsia-200">Referral Rewards</h3>
                  <span className="bg-fuchsia-800/50 text-fuchsia-200 text-xs px-2 py-1 rounded-full">
                    Limited Time
                  </span>
                </div>
                <p className="text-fuchsia-100 mb-4">
                  Refer a friend and both of you receive a $50 credit toward your next booking. Valid for new member 
                  sign-ups only.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium text-white bg-[#770477] hover:bg-[#8A058A] transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="glass-card rounded-xl p-6 bg-[#5d0478] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-fuchsia-200">Weekend Getaway</h3>
                  <span className="bg-fuchsia-800/50 text-fuchsia-200 text-xs px-2 py-1 rounded-full">
                    Weekends Only
                  </span>
                </div>
                <p className="text-fuchsia-100 mb-4">
                  Book a weekend stay (Friday to Sunday) and enjoy complimentary breakfast and late checkout at 
                  participating locations.
                </p>
                <button className="w-full py-2 rounded-lg text-sm font-medium text-white bg-[#770477] hover:bg-[#8A058A] transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
