
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { hotelFaqCategories, hotelFaqsByCategory } from "@/components/faq/faqHotelsData";

export default function FAQHotels() {
  const [activeTab, setActiveTab] = useState("video");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h1 className={`
              ${isMobile ? "text-6xl" : "text-5xl md:text-6xl"} 
              font-bold mb-6 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}>
              Hotel Partner FAQ
            </h1>
            <p className={`${isMobile ? "text-2xl" : "text-xl"} font-medium text-[#e3d6e9] mb-4`}>
              Find answers to common questions about joining Hotels Life as a property partner
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`w-full flex justify-start overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-1 ${isMobile ? "text-lg" : ""}`}>
              {hotelFaqCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className={`px-4 py-1.5 rounded-lg capitalize whitespace-nowrap ${isMobile ? "text-lg" : "text-sm"} bg-[#68046e]`}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="video" className="hotel-text">
              <div className="glass-card rounded-lg overflow-hidden border-none p-6">
                <h2 className={`font-semibold text-[#f9d3f6] ${isMobile ? "text-2xl" : "text-xl"} mb-4 text-center`}>Watch Our Explainer Video</h2>
                <div className="aspect-video w-full max-w-3xl mx-auto">
                  <iframe className="w-full h-full rounded-lg shadow-lg" src="https://www.youtube.com/embed/NEn7uG_fb8M" title="Hotels Life Partner Program Overview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                  </iframe>
                </div>
                
                <div className="mt-8 border-t-2 border-fuchsia-400/30 pt-6">
                  <h3 className={`text-[#f9d3f6] ${isMobile ? "text-xl" : "text-lg"} font-semibold mb-4 text-center`}>Ready to join Hotels Life?</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/hotel-signup" className={`bg-[#981DA1] hover:bg-[#460F54] text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
                      <Building className="mr-2 h-5 w-5" />
                      Register Your Hotel
                    </Link>
                    <Link to="/hotel-login" className={`bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      Partner Login
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
              
            {hotelFaqCategories.filter(cat => cat.id !== "video").map(category => (
              <TabsContent key={category.id} value={category.id} className="hotel-text">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {hotelFaqsByCategory[category.id as keyof typeof hotelFaqsByCategory].map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`} className="glass-card rounded-lg overflow-hidden border-none">
                      <AccordionTrigger className={`px-4 py-3 text-left hover:no-underline text-[#4db74d] bg-[#71037c] ${isMobile ? "text-xl" : "text-lg"}`}>
                        <h2 className={`text-[#f9d3f6] font-bold ${isMobile ? "text-xl" : "text-lg"}`}>
                          {index + 1}. {faq.question}
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-4 bg-[#5A0363]">
                        <p className={`text-[#f4d0f8] ${isMobile ? "text-lg" : "text-base"}`}>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-8 border-t-2 border-fuchsia-400/30 pt-6">
                  <h3 className={`text-[#f9d3f6] ${isMobile ? "text-xl" : "text-lg"} font-semibold mb-4 text-center`}>Ready to join Hotels Life?</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/hotel-signup" className={`bg-[#981DA1] hover:bg-[#460F54] text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
                      <Building className="mr-2 h-5 w-5" />
                      Register Your Hotel
                    </Link>
                    <Link to="/hotel-login" className={`bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      Partner Login
                    </Link>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
