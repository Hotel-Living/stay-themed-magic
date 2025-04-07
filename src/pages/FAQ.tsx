
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function FAQ() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const navigateToTravelerFAQ = () => {
    navigate("/faq-travelers");
  };
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <h1 className={`${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} font-bold mb-6 text-center text-gradient text-[#eedbf7]`}>Frequently Asked Questions</h1>
          <p className={`${isMobile ? "text-xl" : "text-lg"} text-center mb-12 font-medium text-[#e3d6e9]`}>
            Find answers to common questions
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Card className="glass-card-hover rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" onClick={navigateToTravelerFAQ}>
              <CardHeader className="pb-4 bg-[#6c0586]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className={`${isMobile ? "text-2xl" : "text-xl"} text-center`}>For Travelers</CardTitle>
                <CardDescription className={`text-center ${isMobile ? "text-lg" : ""}`}>
                  Information for guests looking to book stays
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className={`bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium ${isMobile ? "text-lg py-2 px-6" : ""}`}>
                  View Traveler FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
