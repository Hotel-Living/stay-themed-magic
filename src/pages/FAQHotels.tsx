import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function FAQHotels() {
  const [activeTab, setActiveTab] = useState("benefits");

  // Hotel FAQ content (translated from Spanish)
  const hotelFaqCategories = [{
    id: "benefits",
    name: "Benefits"
  }, {
    id: "programs",
    name: "Programs"
  }, {
    id: "operation",
    name: "Operation"
  }, {
    id: "integration",
    name: "Integration"
  }];
  const hotelFaqsByCategory = {
    benefits: [{
      question: "What occupancy rate can I expect?",
      answer: "100% occupancy year-round. Our model ensures that traditionally empty rooms are filled, providing consistent revenue throughout the year."
    }, {
      question: "Will I have empty rooms with this model?",
      answer: "Zero traditionally vacant rooms. Our system maximizes occupancy by focusing on extended stays and themed experiences that attract guests consistently."
    }, {
      question: "What extra benefits will my hotel receive?",
      answer: "Enormous extra benefits including higher average daily rate, reduced operational costs, increased staff stability, and additional revenue from themed activities and services."
    }, {
      question: "What types of stays are most profitable?",
      answer: "Profitable stays of 8, 16, 24, and 32 days. These extended stays reduce turnover costs while maintaining healthy revenue streams."
    }, {
      question: "How does reduced turnover benefit my hotel?",
      answer: "Low turnover = Lower Costs = Higher Profits. With fewer check-ins and check-outs, you'll significantly reduce cleaning, administrative, and operational expenses."
    }, {
      question: "How are arrivals and departures managed?",
      answer: "Just one weekly day for check-ins and check-outs = Zero gaps between reservations. This simplified schedule optimizes staff resources and ensures seamless transitions between guests."
    }],
    programs: [{
      question: "What are themed stays?",
      answer: "Themed stays are specialized hotel experiences built around particular interests or activities. By offering these themed experiences, you attract guests seeking specific experiences related to cuisine, language, sports, art, etc., creating a unique value proposition."
    }, {
      question: "How do themed group reservations work?",
      answer: "Group reservations are pre-organized stays where multiple guests with similar interests book together. Our platform coordinates these groups, filling multiple rooms at once for extended periods, guaranteeing high occupancy rates during traditional low seasons."
    }, {
      question: "What is the long-stay program?",
      answer: "Our long-stay program focuses on extended guest reservations of one month or longer. By catering to these guests, you secure consistent occupancy while reducing turnover-related expenses and staff workload."
    }, {
      question: "How does the multi-hotel circuit work?",
      answer: "The multi-hotel circuit allows guests to move between different themed properties, staying in each for extended periods. By joining this network, your property becomes part of a global travel ecosystem, accessing guests who might otherwise never discover your location."
    }],
    operation: [{
      question: "How does the booking process work?",
      answer: "Guests book directly through our platform, which handles marketing, availability management, payments, and customer service. Your property receives booking details and guest preferences, allowing you to prepare appropriately before arrival."
    }, {
      question: "What themes can my hotel offer?",
      answer: "Your hotel can offer any themes that match your facilities, location, and staff expertise. Popular themes include culinary, languages, sports, wellness, art, technology, and music. Our onboarding team will help identify the most suitable themes for your property based on your unique characteristics."
    }, {
      question: "What staff training is required?",
      answer: "Training requirements depend on your chosen themes but typically include orientation on extended-stay guest needs, themed activity facilitation, and community-building practices. We provide comprehensive training materials and support during implementation."
    }, {
      question: "What technological requirements are needed?",
      answer: "Basic requirements include reliable internet connectivity, property management system integration capabilities, and staff familiar with digital communications. Our system is designed to integrate with most major PMS platforms, minimizing additional technology investments."
    }],
    integration: [{
      question: "How do I join the Hotels Life platform?",
      answer: "The process starts with an application through our website. After initial screening, our partnership team conducts a detailed assessment of your property. If approved, we guide you through onboarding, including theme selection, staff training, and system integration."
    }, {
      question: "What financial model applies to partner hotels?",
      answer: "Hotels Life operates on a commission model based on bookings generated through our platform. We handle marketing, customer acquisition, and community building, while you focus on delivering exceptional experiences. Many properties see significant revenue increases despite the commission structure."
    }, {
      question: "Are there any implementation costs?",
      answer: "Implementation costs vary depending on your chosen themes and existing facilities. Some themes require minimal investment (like language or digital nomad themes), while others might need specific equipment or space modifications. Our team works with you to identify cost-effective implementation strategies."
    }, {
      question: "How long does it take to implement the Hotels Life system?",
      answer: "Typical implementation takes 4-8 weeks from approval to launch. This includes system integration, staff training, theme setup, and marketing preparation. Properties with minimal adaptation needs can launch faster, while those requiring significant modifications might need additional time."
    }]
  };
  return <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-gradient text-[#f067ff]">Hotel Partner FAQ</h1>
          <p className="text-center text-muted-foreground mb-8">
            Find answers to common questions about joining Hotels Life as a property partner
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex justify-start overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-1">
              {hotelFaqCategories.map(category => <TabsTrigger key={category.id} value={category.id} className="px-4 py-1.5 rounded-lg text-sm capitalize whitespace-nowrap bg-[#ad07b6]">
                  {category.name}
                </TabsTrigger>)}
            </TabsList>
            
            {hotelFaqCategories.map(category => <TabsContent key={category.id} value={category.id} className="hotel-text">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {hotelFaqsByCategory[category.id as keyof typeof hotelFaqsByCategory].map((faq, index) => <AccordionItem key={index} value={`${category.id}-${index}`} className="glass-card rounded-lg overflow-hidden border-none">
                      <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-[#4db74d] bg-[#87058c]">
                        <h2 className="font-semibold text-[#f9d3f6]">{faq.question}</h2>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <p className="text-[#f4d0f8]">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </TabsContent>)}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>;
}