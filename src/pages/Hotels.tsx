
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, HelpCircle, Star, CheckCircle, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
            
            {/* Zero risk section - UPDATED WITH CHECK ICONS */}
            <div className="space-y-4 py-6 mb-12 bg-[#460F54]/40 rounded-lg px-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">ZERO RISK. ZERO EFFORT.</h3>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              
              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">Zero risk</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">Zero effort</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">Zero upfront cost</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">Zero monthly fees</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">You don't change a thing</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">You don't do a thing</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-lg text-left text-white font-bold">You just make HUGE PROFITS from your USUALLY EMPTY ROOMS</p>
                </div>
              </div>
            </div>
            
            {/* Replace the Facts section and everything below with 7 accordion menus */}
            <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
              <Accordion type="single" collapsible className="w-full">
                {/* MENU 1 */}
                <AccordionItem value="item-1" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    WE ARE ZERO RISK
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2">
                    <p className="text-lg">Zero upfront cost</p>
                    <p className="text-lg">Zero monthly fees</p>
                    <p className="text-lg">You don't change a thing</p>
                    <p className="text-lg">You don't have to do a thing</p>
                    <p className="text-lg">You just sell your empty rooms</p>
                  </AccordionContent>
                </AccordionItem>

                {/* MENU 2 */}
                <AccordionItem value="item-2" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    SOME FACTS
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="text-lg">100% occupancy year-round is the secret</li>
                      <li className="text-lg">After break-even, empty rooms are the goldmine</li>
                      <li className="text-lg">10 empty rooms on average per day? = 3,600 lost profits every year</li>
                      <li className="text-lg">Selling them off at a reduced price make a fortune</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                {/* MENU 3 */}
                <AccordionItem value="item-3" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    WE FILL YOUR HOTEL
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2">
                    <p className="text-lg">On the smart way: longer stays</p>
                    <p className="text-lg">Fewer check-ins. Bigger returns</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* MENU 4 */}
                <AccordionItem value="item-4" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    THEMES
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2">
                    <p className="text-lg">You may even attract your ideal guests</p>
                    <p className="text-lg">Just pick a theme and let people come together</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* MENU 5 */}
                <AccordionItem value="item-5" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    THEY NEED YOUR HOTEL
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2">
                    <p className="text-lg">Because people want to socialize. Make friends</p>
                    <p className="text-lg">They want to stay longer in your hotel</p>
                    <p className="text-lg">They want you to take care of their household chores</p>
                    <p className="text-lg">They urgently need your empty rooms and services</p>
                    <p className="text-lg">Just help them: give them both</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* MENU 6 */}
                <AccordionItem value="item-6" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    THEMES ARE THE NEW SOCIAL REVOLUTION
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    <p className="text-lg">Just think on a theme and let the magic happen</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* MENU 7 */}
                <AccordionItem value="item-7" className="border-b border-fuchsia-400/30">
                  <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
                    WE'RE SEAMLESS INTEGRATION
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2">
                    <p className="text-lg">We're your bridge to professional, year-round staffing</p>
                    <p className="text-lg">We're steady and high-value monthly revenue</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mt-12 py-4 border-t border-yellow-300/30 bg-[#6a0a95] rounded-lg animate-text">
              <p className="text-xl text-center text-white font-bold">Because from now on… every month is peak season</p>
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
