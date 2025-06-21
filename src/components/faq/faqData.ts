
import { FaqItem, FaqCategory } from "./types";
import { faqCategories } from "./faqCategories";
import { generalFaqs } from "./faqData/generalFaqs";
import { bookingFaqs } from "./faqData/bookingFaqs";
import { stayFaqs } from "./faqData/stayFaqs";
import { paymentFaqs } from "./faqData/paymentFaqs";
import { themesFaqs } from "./faqData/themesFaqs";
import { lifestyleFaqs } from "./faqData/lifestyleFaqs";
import { seniorFaqs } from "./faqData/seniorFaqs";
import { communityFaqs } from "./faqData/communityFaqs";
import { practicalFaqs } from "./faqData/practicalFaqs";
import { commuterFaqs } from "./faqData/commuterFaqs";
import { useTranslation } from "@/hooks/useTranslation";

export const useFaqData = () => {
  const { language } = useTranslation();
  
  const getTranslatedCategories = () => {
    const baseCategories = [
      { id: "general", name: "General" },
      { id: "booking", name: "Booking" },
      { id: "stay", name: "During Your Stay" },
      { id: "payment", name: "Payment" },
      { id: "themes", name: "Affinities" },
      { id: "lifestyle", name: "Digital Nomads" },
      { id: "senior", name: "SENIOR" },
      { id: "community", name: "Community" },
      { id: "practical", name: "Practical Details" },
      { id: "commuter", name: "Commuter" }
    ];

    if (language === 'es') {
      return [
        { id: "general", name: "General" },
        { id: "booking", name: "Reservas" },
        { id: "stay", name: "Durante tu estancia" },
        { id: "payment", name: "Pagos" },
        { id: "themes", name: "Afinidades" },
        { id: "lifestyle", name: "Nómadas Digitales" },
        { id: "senior", name: "Mayores" },
        { id: "community", name: "Comunidad" },
        { id: "practical", name: "Detalles Prácticos" },
        { id: "commuter", name: "¿Lejos del trabajo?" }
      ];
    }

    if (language === 'pt') {
      return [
        { id: "general", name: "Geral" },
        { id: "booking", name: "Reservas" },
        { id: "stay", name: "Durante sua estadia" },
        { id: "payment", name: "Pagamentos" },
        { id: "themes", name: "Afinidades" },
        { id: "lifestyle", name: "Nômades Digitais" },
        { id: "senior", name: "Idosos" },
        { id: "community", name: "Comunidade" },
        { id: "practical", name: "Detalhes Práticos" },
        { id: "commuter", name: "Viajante Diário" }
      ];
    }

    if (language === 'ro') {
      return [
        { id: "general", name: "General" },
        { id: "booking", name: "Rezervări" },
        { id: "stay", name: "În timpul șederii" },
        { id: "payment", name: "Plăți" },
        { id: "themes", name: "Afinități" },
        { id: "lifestyle", name: "Nomazi Digitali" },
        { id: "senior", name: "Seniori" },
        { id: "community", name: "Comunitate" },
        { id: "practical", name: "Detalii Practice" },
        { id: "commuter", name: "Navetist" }
      ];
    }

    return baseCategories;
  };

  const getFaqsByCategory = () => {
    return {
      general: generalFaqs,
      booking: bookingFaqs,
      stay: stayFaqs,
      payment: paymentFaqs,
      themes: themesFaqs,
      lifestyle: lifestyleFaqs,
      senior: seniorFaqs,
      community: communityFaqs,
      practical: practicalFaqs,
      commuter: commuterFaqs
    };
  };

  return {
    translatedCategories: getTranslatedCategories(),
    translatedFaqsByCategory: getFaqsByCategory()
  };
};
