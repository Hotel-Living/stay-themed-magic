
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
          <div className="text-center mb-12 space-y-6 p-6 bg-[#5D0478]/30 rounded-xl">
            {/* Main slogans */}
            <div className="space-y-2 mb-6">
              <h1 className="md:text-4xl text-3xl font-bold text-center text-yellow-300 animate-pulse-glow text-stroke">Stop losing money on empty rooms.</h1>
              <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">Your hotel, always full. All year long.</p>
              <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">100% occupancy. Every single day.</p>
              <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">Turn your dead dates into gold.</p>
              <p className="text-2xl text-center text-yellow-300 font-semibold animate-pulse-glow text-stroke">Multiply your profits—dramatically.</p>
            </div>
            
            {/* Second section */}
            <div className="space-y-1 mb-6">
              <p className="text-xl text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">We sell your slow days and keep you in peak season.</p>
              <p className="text-xl text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Zero risk. Zero upfront cost. Zero monthly fees.</p>
              <p className="text-xl text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">You don't have to do a thing.</p>
              <p className="text-xl text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">You don't change a thing.</p>
              <p className="text-xl text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">You just sell your empty rooms.</p>
            </div>
            
            {/* Facts section */}
            <div className="pt-2 border-t border-yellow-300/30">
              <h3 className="text-2xl font-bold text-yellow-300 animate-pulse-glow text-stroke mb-3">THE FACTS:</h3>
              <div className="space-y-2">
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">The secret? 100% occupancy—year-round.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">After you hit break-even, every room is almost pure profit.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">10 empty rooms a day = 3,600 lost opportunities a year.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Selling them at a reduced price is still a goldmine.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Any profit beats a daily loss.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Thousands in lost profits add up fast.</p>
              </div>
            </div>
            
            {/* Final section */}
            <div className="pt-2 border-t border-yellow-300/30 space-y-3">
              <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">We fill your hotel the smart way:<br/>Longer stays. Fewer check-ins. Bigger returns.</p>
              
              <div className="space-y-1">
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">You could even attract your ideal guests</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Just by picking a theme and letting people come together.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">They want to socialize. Connect.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">They need your hotel to stay longer—</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Where their household chores are taken care of.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Yes—they need your empty rooms and your services.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">And you want to give them both.</p>
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Themes are the new social revolution.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">Just promote a theme—and let the magic happen.</p>
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">We're seamless integration. Zero cost. Massive profits.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">We're consistent, professional, year-round staffing.</p>
                <p className="text-lg text-center text-yellow-300 font-medium animate-pulse-glow text-stroke">We're steady, high-value revenue—every single month.</p>
              </div>
              
              <p className="text-2xl text-center text-yellow-300 font-bold animate-pulse-glow text-stroke mt-4">Because from now on… every month is peak season</p>
            </div>
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
