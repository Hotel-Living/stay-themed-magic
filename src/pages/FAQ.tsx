
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CircleDot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("general");
  
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

  const faqCategories = [{
    id: "general",
    name: "General"
  }, {
    id: "booking",
    name: "Booking"
  }, {
    id: "stay",
    name: "During Your Stay"
  }, {
    id: "payment",
    name: "Payment"
  }, {
    id: "themes",
    name: "Affinities"
  }];

  const faqsByCategory = {
    general: [{
      question: "What is Hotel-Living all about?",
      answer: "Hotel-Living is a revolutionary concept that allows you to live in hotels around the world for extended periods, enjoying the comforts of hotel living while connecting with like-minded individuals who share your interests and passions."
    }],
    booking: [{
      question: "How far in advance should I book my stay?",
      answer: "For popular destinations and affinities, we recommend booking 2-3 months in advance, especially during peak seasons."
    }],
    stay: [{
      question: "Can I receive mail and packages at the hotel?",
      answer: "Yes, all our properties accept mail and packages for guests. Some hotels even offer dedicated mailboxes for long-term guests."
    }],
    payment: [{
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards, PayPal, bank transfers, and in many regions, digital payment systems like Apple Pay and Google Pay."
    }],
    themes: [{
      question: "What kind of affinity-based activities can I expect?",
      answer: "Activities vary widely depending on the affinity and property. For example, culinary-focused hotels offer cooking classes, tasting events, food tours, and chef meetups."
    }]
  };
  
  const navigateToTravelerFAQ = () => {
    navigate("/faq-travelers");
  };

  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <div className="glass-card backdrop-blur-lg bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl p-8 mb-16 shadow-lg">
            <h2 className={`${isMobile ? "text-3xl mb-8" : "text-2xl md:text-3xl mb-10"} font-bold text-center text-gradient animate-text-slow bg-clip-text text-transparent`}>
              Experience a Revolutionary Lifestyle
            </h2>
            
            <ul className="space-y-6 max-w-3xl mx-auto">
              {benefitsList.map((benefit, index) => (
                <li 
                  key={index}
                  className="flex items-center text-[#FFC300] hover:text-[#FFD700] transition-colors duration-300"
                >
                  <CircleDot className="mr-3 text-fuchsia-500" size={20} />
                  <p className={`${isMobile ? "text-xl" : "text-base md:text-xl"} font-semibold text-left`}>
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`w-full flex justify-start overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-1 ${isMobile ? "text-lg" : ""}`}>
              {faqCategories.map(category => <TabsTrigger key={category.id} value={category.id} className={`px-4 py-1.5 rounded-lg capitalize whitespace-nowrap ${isMobile ? "text-lg" : "text-sm"} bg-[#730483] text-white`}>
                  {category.name}
                </TabsTrigger>)}
            </TabsList>
            
            {faqCategories.map(category => <TabsContent key={category.id} value={category.id} className="customer-text">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {faqsByCategory[category.id as keyof typeof faqsByCategory].map((faq, index) => <AccordionItem key={index} value={`${category.id}-${index}`} className="glass-card rounded-lg overflow-hidden border-none">
                      <AccordionTrigger className={`px-4 py-3 text-left hover:no-underline text-[#56cc41] bg-[#6a037c] ${isMobile ? "text-lg" : "text-xl"}`}>
                        <h2 className={`text-[#f8faf8] font-bold ${isMobile ? "text-2xl" : "text-lg"}`}>{faq.question}</h2>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-4 bg-[#5A0363]">
                        <p className={`text-slate-50 ${isMobile ? "text-lg" : ""}`}>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </TabsContent>)}
          </Tabs>
          
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="glass-card-hover rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" onClick={navigateToTravelerFAQ}>
              <CardHeader className="pb-4 bg-[#6c0586]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className={`${isMobile ? "text-2xl" : "text-xl"} text-center`}>For Travelers</CardTitle>
                <CardDescription className={`text-center ${isMobile ? "text-lg font-bold text-white" : ""}`}>
                  Detailed information for guests looking to book stays
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
