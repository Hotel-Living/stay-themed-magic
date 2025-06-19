
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { hotelFaqCategories, hotelFaqsByCategory } from "@/components/faq/hotelFaqData";
import { useTranslation } from "@/hooks/useTranslation";

export default function Hotels() {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  // Create translated FAQ data based on current language
  const translatedFaqsByCategory = Object.keys(hotelFaqsByCategory).reduce((acc, categoryId) => {
    acc[categoryId] = hotelFaqsByCategory[categoryId].map(faq => ({
      question: isSpanish && faq.questionEs ? faq.questionEs : faq.question,
      answer: isSpanish && faq.answerEs ? faq.answerEs : faq.answer
    }));
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <main className="pt-16">
        <HotelSlogans />
        <HotelAccordionMenu />
        
        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {isSpanish ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            
            <FaqTabs 
              activeTab="benefits"
              setActiveTab={() => {}}
              faqCategories={hotelFaqCategories}
              faqsByCategory={translatedFaqsByCategory}
              numbered={true}
              searchQuery=""
              accentTextColor="#4db74d"
              headerBgColor="#71037c"
              marginBottom=""
              textSizeClass="text-sm md:text-base"
              answerTextSizeClass="text-xs md:text-sm"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
