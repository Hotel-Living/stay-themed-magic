
import { useTranslation } from "@/hooks/useTranslation";

export const faqCategories = [
  {
    id: "general",
    name: "General",
    slug: "general",
  },
  {
    id: "hotel-living",
    name: "Hotel Living",
    slug: "hotel-living",
  },
  {
    id: "for-hoteliers",
    name: "For Hoteliers",
    slug: "for-hoteliers",
  },
  {
    id: "for-guests",
    name: "For Guests",
    slug: "for-guests",
  },
  {
    id: "legal",
    name: "Legal",
    slug: "legal",
  },
];

// Use the translation data from the JSON files
export const useFaqData = () => {
  const { t } = useTranslation();
  
  const translatedCategories = [
    {
      id: "general",
      name: t('faq.categories.general'),
      slug: "general",
    },
    {
      id: "hotel-living", 
      name: t('faq.categories.hotelLiving'),
      slug: "hotel-living",
    },
    {
      id: "for-hoteliers",
      name: t('faq.categories.hoteliers'),
      slug: "for-hoteliers",
    },
    {
      id: "for-guests",
      name: t('faq.categories.guests'),
      slug: "for-guests",
    },
    {
      id: "legal",
      name: t('faq.categories.legal'),
      slug: "legal",
    },
  ];

  // Get the FAQ questions as an array and ensure proper typing
  const faqQuestions = t('faq.questions', { returnObjects: true });
  const questionsArray = Array.isArray(faqQuestions) ? faqQuestions : [];

  const translatedFaqsByCategory = {
    general: questionsArray.slice(0, 3) || [],
    "hotel-living": questionsArray.slice(3, 6) || [],
    "for-hoteliers": questionsArray.slice(6, 9) || [],
    "for-guests": questionsArray.slice(9, 12) || [],
    legal: questionsArray.slice(12, 15) || [],
  };

  return { translatedCategories, translatedFaqsByCategory };
};

// Keep original exports for backward compatibility
export const faqsByCategory = {
  general: [
    {
      question: "What is Hotel Living?",
      answer:
        "Hotel Living is a new category of residential living that combines the best aspects of hotels and apartments. It offers flexible lease terms, all-inclusive amenities, and a vibrant community.",
    },
    {
      question: "How does Hotel Living work?",
      answer:
        "Hotel Living partners with hotels to offer long-term stays in their rooms and suites. Guests can book stays of 30 days or more and enjoy all the hotel's amenities, such as housekeeping, room service, and concierge.",
    },
    {
      question: "What are the benefits of Hotel Living?",
      answer:
        "Hotel Living offers a number of benefits over traditional apartments, including flexible lease terms, all-inclusive amenities, and a vibrant community. It is also a more affordable option than renting an apartment in many cities.",
    },
  ],
  "hotel-living": [
    {
      question: "What types of hotels are available on Hotel Living?",
      answer:
        "Hotel Living partners with a variety of hotels, from budget-friendly options to luxury resorts. You can find hotels in a variety of locations, from city centers to suburban areas.",
    },
    {
      question: "How do I book a stay on Hotel Living?",
      answer:
        "You can book a stay on Hotel Living by visiting our website or app. Simply search for hotels in your desired location and dates, and then select the room or suite that you want to book.",
    },
    {
      question: "What is the cancellation policy for Hotel Living?",
      answer:
        "The cancellation policy for Hotel Living varies depending on the hotel. Please see the hotel's listing for more information.",
    },
  ],
  "for-hoteliers": [
    {
      question: "How can I partner with Hotel Living?",
      answer:
        "If you are a hotelier interested in partnering with Hotel Living, please visit our website or app and fill out the contact form. We will be in touch to discuss your options.",
    },
    {
      question: "What are the benefits of partnering with Hotel Living?",
      answer:
        "Partnering with Hotel Living can help you increase occupancy rates, generate new revenue streams, and reach a wider audience.",
    },
    {
      question: "How much does it cost to partner with Hotel Living?",
      answer:
        "The cost of partnering with Hotel Living varies depending on the size and location of your hotel. Please contact us for more information.",
    },
  ],
  "for-guests": [
    {
      question: "What is included in my Hotel Living stay?",
      answer:
        "Your Hotel Living stay includes a room or suite, all hotel amenities, and access to the Hotel Living community. Some hotels may also offer additional amenities, such as free breakfast or parking.",
    },
    {
      question: "How do I pay for my Hotel Living stay?",
      answer:
        "You can pay for your Hotel Living stay with a credit card, debit card, or bank transfer. We also offer financing options.",
    },
    {
      question: "What if I have a problem during my Hotel Living stay?",
      answer:
        "If you have a problem during your Hotel Living stay, please contact the hotel's front desk or our customer support team. We are available 24/7 to assist you.",
    },
  ],
  legal: [
    {
      question: "What are the terms and conditions of Hotel Living?",
      answer:
        "The terms and conditions of Hotel Living can be found on our website or app. Please read them carefully before booking a stay.",
    },
    {
      question: "What is the privacy policy of Hotel Living?",
      answer:
        "The privacy policy of Hotel Living can be found on our website or app. Please read it carefully before using our services.",
    },
    {
      question: "What is the copyright policy of Hotel Living?",
      answer:
        "The copyright policy of Hotel Living can be found on our website or app. Please read it carefully before using our services.",
    },
  ],
};

export const benefitsList = [
  "Renewable stays of\n8, 16, 24, or 32 days",
  "Say goodbye to chores:\ngrocery shopping, cooking,\ncleaning, laundry, and more",
  "Enjoy a constant flow of\nnew places, affinities, and people",
  "Choose hotels based on your\nfavorite affinities and find\nyour kind of people",
  "Eliminate loneliness and isolation\nfor good",
  "Expand your social life, activities,\nand overall quality of living",
  "Take advantage of daily\nservices and amenities",
  "Pay directly at the hotel.\nBook with just 10% down"
];

export const whyHotelLivingList = [
  "A New Category of Residential Living",
  "The best aspects of hotels and apartments",
  "Flexible lease terms",
  "All-inclusive amenities",
  "A vibrant community",
  "More affordable than renting an apartment in many cities",
  "Long-term stays in hotel rooms and suites",
  "Enjoy all the hotel's amenities",
  "Housekeeping, room service, and concierge",
];
