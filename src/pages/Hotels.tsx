
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, HelpCircle, Star, CheckCircle, TrendingUp, Calendar, DollarSign } from "lucide-react";

export default function Hotels() {
  const navigate = useNavigate();
  const handleCardClick = (path: string) => {
    navigate(path);
  };
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Slogans */}
          <div className="text-center mb-12 space-y-6 p-8 bg-gradient-to-br from-[#6a0a95] to-[#460F54] rounded-xl shadow-lg border border-[#ad66a8]/30">
            {/* Main slogans */}
            <div className="space-y-6 mb-12">
              <h1 className="text-2xl font-bold text-center text-white border-b border-yellow-300/30 pb-4 max-w-xl mx-auto">Stop losing money on empty rooms</h1>
              
              <div className="space-y-2 py-4">
                <p className="text-xl text-center text-white font-bold">Your hotel, always full. All year long</p>
                <p className="text-xl text-center text-white font-bold">100% occupancy. Every single day</p>
                <p className="text-xl text-center text-white font-bold">Turn your dead dates into gold</p>
                <p className="text-xl text-center text-white font-bold">Multiply your profits dramatically</p>
              </div>
            </div>
            
            {/* Single line section - double spacing */}
            <div className="py-6 mb-10 flex items-center justify-center space-x-2 bg-[#860493]/40 rounded-lg px-4">
              <TrendingUp className="h-6 w-6 text-yellow-300" />
              <p className="text-xl text-center text-white font-bold">We sell your slow days and keep you in peak season</p>
              <TrendingUp className="h-6 w-6 text-yellow-300" />
            </div>
            
            {/* Zero risk section */}
            <div className="space-y-4 py-6 mb-12 bg-[#460F54]/40 rounded-lg px-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">ZERO RISK. ZERO EFFORT.</h3>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              
              <p className="text-xl text-center text-white font-bold">Zero risk. Zero upfront cost. Zero monthly fees</p>
              <p className="text-xl text-center text-white font-bold">You don't have to do a thing</p>
              <p className="text-xl text-center text-white font-bold">You don't change a thing</p>
              <p className="text-xl text-center text-white font-bold">You just sell your empty rooms</p>
            </div>
            
            {/* Facts section - left aligned with icons */}
            <div className="pt-6 border-t border-yellow-300/30 mb-12 bg-[#860493]/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Star className="h-6 w-6 text-yellow-300 mr-2" /> 
                THE FACTS:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#6a0a95] rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-lg text-white font-bold">1</span>
                  </div>
                  <p className="text-xl text-left text-white font-bold">The secret is to keep 100% occupancy year-round</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#6a0a95] rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-lg text-white font-bold">2</span>
                  </div>
                  <p className="text-xl text-left text-white font-bold">After you hit break-even, every room is almost pure profit</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#6a0a95] rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-lg text-white font-bold">3</span>
                  </div>
                  <p className="text-xl text-left text-white font-bold">10 empty rooms a day = 3,600 profits lost every year</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#6a0a95] rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-lg text-white font-bold">4</span>
                  </div>
                  <p className="text-xl text-left text-white font-bold">Selling them at a reduced price add up a true goldmine</p>
                </div>
              </div>
            </div>
            
            {/* Smart way section */}
            <div className="pt-6 border-t border-yellow-300/30 mb-12 bg-[#460F54]/40 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-yellow-300 mr-2" />
                <p className="text-xl text-center text-white font-bold">We fill your hotel the smart way:</p>
              </div>
              <p className="text-xl text-center text-white font-bold py-2">Longer stays. Fewer check-ins. Bigger returns</p>
            </div>
            
            {/* Guest attraction section */}
            <div className="pt-6 border-t border-yellow-300/30 space-y-10">
              <div className="space-y-2 bg-[#6a0a95]/40 p-4 rounded-lg">
                <p className="text-xl text-center text-white font-bold">You could even attract your ideal guests just by</p>
                <p className="text-xl text-center text-white font-bold">picking a theme and letting people come together</p>
              </div>
              
              <div className="space-y-2 bg-[#860493]/30 p-4 rounded-lg">
                <p className="text-xl text-center text-white font-bold">Because they want to socialize. Connect</p>
                <p className="text-xl text-center text-white font-bold">And they need you and your hotel. And they want to stay longer</p>
                <p className="text-xl text-center text-white font-bold">And they need their household chores being taken care of</p>
              </div>
              
              <div className="space-y-2 bg-[#6a0a95]/40 p-4 rounded-lg">
                <p className="text-xl text-center text-white font-bold">So, they need your empty rooms and services</p>
                <p className="text-xl text-center text-white font-bold">And you want to give them both</p>
              </div>
              
              <div className="space-y-2 bg-[#860493]/30 p-4 rounded-lg">
                <p className="text-xl text-center text-white font-bold">Yes. Themes are the new social revolution</p>
                <p className="text-xl text-center text-white font-bold">Think on a theme and let the magic happen</p>
              </div>
              
              <div className="space-y-8 mt-10">
                <div className="bg-[#860493]/40 p-4 rounded-lg animate-pulse-glow">
                  <p className="text-xl text-center text-white font-bold">We're seamless integration. Zero cost. Massive profits</p>
                </div>
                
                <div className="bg-[#6a0a95]/50 p-4 rounded-lg animate-pulse-glow">
                  <p className="text-xl text-center text-white font-bold">We´re your bridge to consistent, professional, year-round staffing</p>
                </div>
                
                <div className="bg-[#860493]/40 p-4 rounded-lg animate-pulse-glow">
                  <p className="text-xl text-center text-white font-bold">We're steady, high-value revenue every single month</p>
                </div>
              </div>
              
              <div className="mt-12 py-4 border-t border-yellow-300/30 bg-[#6a0a95] rounded-lg animate-text">
                <p className="text-xl text-center text-white font-bold">Because from now on… every month is peak season</p>
              </div>
            </div>
          </div>
          
          {/* Grid of cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/hotel-login")}>
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
            
            <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/faq-hotels")}>
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
            
            <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/hotel-signup")}>
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
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6 text-gradient text-[#ebd4ee]">Why Join Hotels Life?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">100% Occupancy</h3>
                <p className="text-sm text-foreground/80">Fill your vacant rooms with long-term guests year-round</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Increased Revenue</h3>
                <p className="text-sm text-foreground/80">Higher average daily rates with reduced operational costs</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
                <Users className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-sm text-foreground/80">Access to international guests seeking themed experiences</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
