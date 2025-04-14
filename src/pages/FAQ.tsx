
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

  const benefitsList = [
    "Stay in hotels at unbeatable prices",
    "Enjoy a constant flow of new places, themes, and people",
    "Renewable stays of 8, 16, 24, or 32 days",
    "Say goodbye to chores: grocery shopping, cooking, cleaning, laundry, and more",
    "Expand your social life, activities, and overall quality of living",
    "Eliminate loneliness and isolation for good",
    "Choose hotels based on your favorite themes and find your kind of people",
    "Replace bills and unpredictable expenses with one fixed payment",
    "Enjoy the safety and security every hotel naturally provides",
    "Take advantage of daily services and amenities",
    "All this often for the same cost as a solitary, routine life at home",
    "Use our exclusive filters: themes, activities, services, and more",
    "Ideal lifestyle for singles and couples: digital nomads, active retirees, remote workers, students, people with independent income, etc.",
    "If you wish, earn monthly income by renting out your primary residence",
    "Tired of being a commuter? Live closer to work, raise your quality of life, and stop wasting countless hours and money on daily travel",
    "Pay directly at the hotel. Book with just 10% down"
  ];
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Elegant Introduction Section */}
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <div className="glass-card backdrop-blur-lg bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl p-8 mb-16 shadow-lg">
            <h2 className={`${isMobile ? "text-4xl mb-10" : "text-3xl md:text-4xl mb-12"} font-bold text-center text-gradient animate-text-slow bg-clip-text text-transparent`}>
              Experience a Revolutionary Lifestyle
            </h2>
            
            <ul className="space-y-6 max-w-3xl mx-auto">
              {benefitsList.map((benefit, index) => (
                <li 
                  key={index}
                  className="text-[#FEF7CD] hover:text-[#FFF9E0] transition-colors duration-300 text-center"
                >
                  <p className={`${isMobile ? "text-2xl" : "text-xl md:text-2xl"} font-semibold`}>
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
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
                <CardDescription className={`text-center ${isMobile ? "text-lg font-bold text-white" : ""}`}>
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
