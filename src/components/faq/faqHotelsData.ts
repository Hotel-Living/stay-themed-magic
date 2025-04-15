
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
}

export const hotelFaqCategories: FaqCategory[] = [
  { id: "video", name: "Video" },
  { id: "benefits", name: "Benefits" },
  { id: "programs", name: "Programs" },
  { id: "operation", name: "Operation" },
  { id: "integration", name: "Integration" },
  { id: "revenue", name: "Revenue" },
  { id: "guests", name: "Guest Management" },
  { id: "marketing", name: "Marketing" }
];

export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  benefits: [
    {
      question: "What occupancy rate can I expect?",
      answer: "100% occupancy year-round. Our model ensures that traditionally empty rooms are filled, providing consistent revenue throughout the year."
    },
    {
      question: "Will I have empty rooms with this model?",
      answer: "Zero traditionally vacant rooms. Our system maximizes occupancy by focusing on extended stays and themed experiences that attract guests consistently."
    },
    {
      question: "What extra benefits will my hotel receive?",
      answer: "Enormous extra benefits including higher average daily rate, reduced operational costs, increased staff stability, and additional revenue from themed activities and services."
    },
    {
      question: "What types of stays are most profitable?",
      answer: "Profitable stays of 8, 16, 24, and 32 days. These extended stays reduce turnover costs while maintaining healthy revenue streams."
    },
    {
      question: "How does reduced turnover benefit my hotel?",
      answer: "Low turnover = Lower Costs = Higher Profits. With fewer check-ins and check-outs, you'll significantly reduce cleaning, administrative, and operational expenses."
    },
    {
      question: "How are arrivals and departures managed?",
      answer: "Just one weekly day for check-ins and check-outs = Zero gaps between reservations. This simplified schedule optimizes staff resources and ensures seamless transitions between guests."
    },
    {
      question: "How does the Hotel-Living model increase my revenue?",
      answer: "Our model increases revenue through multiple streams: higher occupancy rates, premium pricing for themed experiences, extended stays that reduce operational costs, and additional service revenue from activities and amenities tailored to specific guest interests."
    },
    {
      question: "How does the platform help with seasonal fluctuations?",
      answer: "Our platform effectively eliminates seasonal fluctuations by creating constant demand through our global network of travelers seeking specific themed experiences. During traditional low seasons, we can fill your property with guests participating in themed stays that operate year-round."
    }
  ],
  programs: [
    {
      question: "What are themed stays?",
      answer: "Themed stays are specialized hotel experiences built around particular interests or activities. By offering these themed experiences, you attract guests seeking specific experiences related to cuisine, language, sports, art, etc., creating a unique value proposition."
    },
    {
      question: "How do themed group reservations work?",
      answer: "Group reservations are pre-organized stays where multiple guests with similar interests book together. Our platform coordinates these groups, filling multiple rooms at once for extended periods, guaranteeing high occupancy rates during traditional low seasons."
    },
    {
      question: "What is the long-stay program?",
      answer: "Our long-stay program focuses on extended guest reservations of one month or longer. By catering to these guests, you secure consistent occupancy while reducing turnover-related expenses and staff workload."
    },
    {
      question: "How does the multi-hotel circuit work?",
      answer: "The multi-hotel circuit allows guests to move between different themed properties, staying in each for extended periods. By joining this network, your property becomes part of a global travel ecosystem, accessing guests who might otherwise never discover your location."
    },
    {
      question: "Can I participate in multiple affinity programs simultaneously?",
      answer: "Yes, hotels can participate in multiple affinity programs simultaneously. In fact, we encourage properties to offer 3-5 different themes to maximize their appeal to various guest segments. Each theme can utilize different areas of your property or operate at different times."
    },
    {
      question: "How often can themes be changed or updated?",
      answer: "Themes can be adjusted quarterly based on performance data and market trends. Our platform provides analytics on which themes are generating the most bookings for your property, allowing you to optimize your offerings over time."
    },
    {
      question: "Do I need to dedicate my entire property to the Hotel-Living program?",
      answer: "No, you can start by allocating just a portion of your rooms to our program. Many partners begin with 30-50% of their inventory and gradually increase as they see the benefits. This allows you to maintain your traditional booking channels while exploring the advantages of our model."
    }
  ],
  operation: [
    {
      question: "How does the booking process work?",
      answer: "Guests book directly through our platform, which handles marketing, availability management, payments, and customer service. Your property receives booking details and guest preferences, allowing you to prepare appropriately before arrival."
    },
    {
      question: "What themes can my hotel offer?",
      answer: "Your hotel can offer any themes that match your facilities, location, and staff expertise. Popular themes include culinary, languages, sports, wellness, art, technology, and music. Our onboarding team will help identify the most suitable themes for your property based on your unique characteristics."
    },
    {
      question: "What staff training is required?",
      answer: "Training requirements depend on your chosen themes but typically include orientation on extended-stay guest needs, themed activity facilitation, and community-building practices. We provide comprehensive training materials and support during implementation."
    },
    {
      question: "What technological requirements are needed?",
      answer: "Basic requirements include reliable internet connectivity, property management system integration capabilities, and staff familiar with digital communications. Our system is designed to integrate with most major PMS platforms, minimizing additional technology investments."
    },
    {
      question: "How do we manage day-to-day operations with extended-stay guests?",
      answer: "Extended-stay guests actually simplify operations. With fewer check-ins/check-outs, your staff can focus on enhancing the guest experience rather than constantly turning over rooms. Our system provides a dashboard for managing guest preferences, scheduled activities, and special requests."
    },
    {
      question: "Do we need specialized staff for themed activities?",
      answer: "Some themes may require specialized staff or facilitators, while others can be implemented with existing personnel. Our platform connects you with qualified activity leaders in your area when needed, and we provide training resources to help your current staff develop new skills related to your chosen themes."
    },
    {
      question: "How is housekeeping managed for extended stays?",
      answer: "For extended stays, housekeeping is typically scheduled less frequently than for traditional short stays. Most properties offer weekly full cleaning with optional mid-week light service. This reduces labor costs while maintaining cleanliness standards. Guests appreciate the reduced intrusions during longer stays."
    },
    {
      question: "What about guest issues or conflicts during longer stays?",
      answer: "Our platform includes a centralized communication system for addressing guest concerns quickly. We also provide conflict resolution protocols specifically designed for extended-stay scenarios. Additionally, our careful guest matching and pre-screening process significantly reduces the likelihood of issues arising."
    }
  ],
  integration: [
    {
      question: "How do I join the Hotel-Living platform?",
      answer: "The process starts with an application through our website. After initial screening, our partnership team conducts a detailed assessment of your property. If approved, we guide you through onboarding, including theme selection, staff training, and system integration."
    },
    {
      question: "What financial model applies to partner hotels?",
      answer: "Hotel-Living operates on a commission model based on bookings generated through our platform. We handle marketing, customer acquisition, and community building, while you focus on delivering exceptional experiences. Many properties see significant revenue increases despite the commission structure."
    },
    {
      question: "Are there any implementation costs?",
      answer: "Implementation costs vary depending on your chosen themes and existing facilities. Some themes require minimal investment (like language or digital nomad themes), while others might need specific equipment or space modifications. Our team works with you to identify cost-effective implementation strategies."
    },
    {
      question: "How long does it take to implement the Hotel-Living system?",
      answer: "Typical implementation takes 4-8 weeks from approval to launch. This includes system integration, staff training, theme setup, and marketing preparation. Properties with minimal adaptation needs can launch faster, while those requiring significant modifications might need additional time."
    },
    {
      question: "Can my current property management system integrate with your platform?",
      answer: "Yes, our platform is designed to integrate with all major property management systems (PMS). We have dedicated API connections for systems like Opera, Cloudbeds, Mews, and many others. For less common PMS solutions, we offer alternative integration methods to ensure seamless operation."
    },
    {
      question: "What kind of support does Hotel-Living provide during and after implementation?",
      answer: "We provide comprehensive support throughout the partnership. During implementation, you'll work with a dedicated onboarding manager. After launch, you'll have access to our 24/7 partner support team, regular performance reviews, ongoing training resources, and a partner community for sharing best practices."
    },
    {
      question: "Is there a minimum commitment period for hotels?",
      answer: "Our standard agreement has a six-month initial term, which allows sufficient time to implement the system and begin seeing results. After this period, partnerships continue on a rolling three-month basis with a 30-day notice period for termination from either party."
    }
  ],
  revenue: [
    {
      question: "What average rate increases do partner hotels experience?",
      answer: "Partner hotels typically see average rate increases of 15-30% compared to their traditional bookings for the same room types. This premium is possible because guests value the curated experiences, community aspects, and convenience of our themed stays."
    },
    {
      question: "How does the revenue split work?",
      answer: "Hotel-Living takes a commission of 15-20% on bookings generated through our platform, with the exact percentage depending on exclusivity arrangements and volume commitments. This is comparable to or lower than many OTA commissions, but with the added benefit of longer stays and higher average rates."
    },
    {
      question: "Can we still use other booking channels?",
      answer: "Yes, most partner hotels maintain their existing booking channels alongside our platform. We work with you to develop an inventory allocation strategy that maximizes revenue while ensuring you can meet commitments to both traditional guests and Hotel-Living participants."
    },
    {
      question: "How predictable is the revenue from Hotel-Living bookings?",
      answer: "Very predictable. Unlike traditional bookings that fluctuate seasonally, our extended-stay and themed programs provide consistent occupancy. Many partners can forecast their Hotel-Living revenue months in advance, allowing for better financial planning and resource allocation."
    }
  ],
  guests: [
    {
      question: "What types of guests does Hotel-Living attract?",
      answer: "Our platform attracts a diverse range of guests including digital nomads, active retirees, experience seekers, extended business travelers, and participants in specialized education or activity programs. These guests typically have above-average income, are well-educated, and value authentic experiences."
    },
    {
      question: "How are guest expectations different for Hotel-Living stays?",
      answer: "Hotel-Living guests expect reliable basics (clean rooms, good internet, responsive service) but place higher value on community interactions, access to themed activities, and spaces that facilitate their interests. They're typically more flexible on traditional luxury amenities if their core needs are met exceptionally well."
    },
    {
      question: "Do guests interact with other hotels in the network?",
      answer: "Yes, many guests participate in our multi-hotel circuit, moving between properties with complementary themes. This creates natural marketing connections between partner hotels and encourages guests to explore different properties within our network."
    }
  ],
  marketing: [
    {
      question: "How does Hotel-Living market my property?",
      answer: "We market partner properties through multiple channels: our global platform, targeted digital campaigns to affinity communities, partnerships with interest-based organizations, content marketing, and social media. Your property gains exposure to audiences specifically interested in your offered themes."
    },
    {
      question: "Can I use the Hotel-Living partnership in my own marketing?",
      answer: "Absolutely! We encourage partners to highlight their Hotel-Living affiliation in their own marketing materials. We provide branding assets, content templates, and marketing guidelines to help you leverage the partnership effectively."
    },
    {
      question: "Does Hotel-Living help with content creation?",
      answer: "Yes, our team assists with creating compelling content about your property's themed experiences. This includes professional photography, video production guidance, copywriting support, and social media content planning tailored to your specific themes and target audiences."
    }
  ]
};
