

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

