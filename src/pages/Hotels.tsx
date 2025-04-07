
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, HelpCircle } from "lucide-react";

export default function Hotels() {
  const navigate = useNavigate();
  
  const handleCardClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Slogans */}
          <div className="text-center mb-12 space-y-2 p-6 bg-[#5D0478]/30 rounded-xl">
            <h1 className="md:text-3xl font-bold text-center my-0 text-3xl text-yellow-300 py-0 animate-pulse-glow text-stroke">No more empty rooms. Ever.</h1>
            <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">We keep your hotel full. All year long.</p>
            <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">Fill every room. Every day.</p>
            <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">From now on, every month is High Season.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card 
              className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCardClick("/hotel-login")}
            >
              <CardHeader className="pb-4 bg-[#6d0591]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Building className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">Existing Partners</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className="text-white font-medium bg-[#860493] hover:bg-[#460F54]">
                  Hotel Partner Login
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCardClick("/faq-hotels")}
            >
              <CardHeader className="pb-4 bg-[#6d0591]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <HelpCircle className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className="bg-[#860493] hover:bg-[#460F54] text-white font-medium">
                  View FAQ for Hotels
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCardClick("/hotel-signup")}
            >
              <CardHeader className="pb-4 bg-[#6d0591]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Building className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">New Partners</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className="bg-[#860493] hover:bg-[#460F54] text-white font-medium">
                  Register as Hotel Partner
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gradient text-[#ebd4ee]">Why Join Hotels Life?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">100% Occupancy</h3>
                <p className="text-sm text-foreground/80">Fill your vacant rooms with long-term guests year-round</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">Increased Revenue</h3>
                <p className="text-sm text-foreground/80">Higher average daily rates with reduced operational costs</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-sm text-foreground/80">Access to international guests seeking themed experiences</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
