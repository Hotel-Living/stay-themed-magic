
import { FaqCategory, FaqItem } from "./types";

export const hotelFaqCategories: FaqCategory[] = [
  { id: "benefits", name: "BENEFITS" },
  { id: "models", name: "MODELS" },
  { id: "revenue", name: "REVENUE" },
  { id: "guests", name: "GUESTS" },
  { id: "seniors", name: "SENIORS" },
  { id: "affinities", name: "AFFINITIES" },
  { id: "operation", name: "OPERATION" },
  { id: "integration", name: "INTEGRATION" },
  { id: "marketing", name: "MARKETING" },
  { id: "payment", name: "PAYMENT" }
];

export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  benefits: [
    {
      question: "What type of hotel is suitable for Hotel-Living?",
      answer: "Any kind of hotel can benefit from our program — whether it's a boutique hotel, a business hotel, a resort, or a city hotel. The only requirements are: availability for long stays, a willingness to foster community, and the ability to provide consistent service for extended stays."
    },
    {
      question: "How does this benefit your hotel financially?",
      answer: "The Hotel-Living program significantly increases occupancy rates, generates steady revenue through longer stays, and reduces operational costs associated with frequent guest turnover. Properties often see substantial improvements in their RevPAR and profit margins, especially during traditionally low seasons."
    },
    {
      question: "Will major changes be required to the property?",
      answer: "No. Most hotels already have what's needed to implement the Hotel-Living concept. Small adjustments such as enhancing Wi-Fi, creating common areas, or adapting room services may be helpful, but no major renovations are required."
    },
    {
      question: "Does this model reduce dependency on OTAs?",
      answer: "Absolutely. Hotel-Living drives direct bookings through our platform, substantially reducing OTA commissions. Our guests book directly and often return, creating loyal customers and brand ambassadors for your hotel."
    },
    {
      question: "Does it help during low occupancy periods?",
      answer: "This is one of the biggest advantages. Hotel-Living specifically targets low occupancy periods, helping to fill rooms that would otherwise remain empty. Our pricing model adapts to your hotel's seasonality, allowing you to maintain high annual occupancy."
    },
    {
      question: "What support does Hotel-Living offer to partner hotels?",
      answer: "Our partners receive full support: Dedicated account manager, Staff training, Operational manuals, Marketing materials, Professional photography services, Access to the property management dashboard. Our goal is to ensure your success in the long-stay market."
    },
    {
      question: "When do results start appearing after joining?",
      answer: "Most hotels start receiving bookings within the first month of onboarding. Full occupancy impact is typically seen between 3 and 6 months, as your property builds reputation and receives reviews within the long-stay community."
    }
  ],
  models: [
    {
      question: "Is this just a seasonal opportunity?",
      answer: "Not at all. Active retirees travel year-round. Many are digital nomads, solo travelers, or couples seeking a lifestyle change. Hotel-Living generates consistent demand, not just a seasonal peak."
    },
    {
      question: "How can you balance your regular guests with Hotel-Living guests?",
      answer: "Our platform allows you to assign specific rooms to the Hotel-Living model and adjust availability in real time. This flexibility lets you serve your traditional clientele while building long-stay business. Many hotels start by allocating just 10%–20% of their inventory to extended stays and scale up as demand grows."
    },
    {
      question: "Is this truly a new revenue strategy, not just a different type of guest?",
      answer: "Exactly. It's not just about filling rooms — it's about extracting more value per stay: Longer durations, Fewer gaps between bookings, Higher guest loyalty, Greater perceived value = More revenue per room."
    },
    {
      question: "Is there a minimum number of rooms required to join?",
      answer: "No. Even with just 3 or 5 available rooms, you can join the system. You may not run themed programs in such cases, but you can offer 8-day stays with: Full board, Half board, Accommodation only. Depending on your structure. The model is flexible, and there is demand for all service levels — from basic to luxury."
    },
    {
      question: "What stay durations should I offer: 8, 16, 24, or 32 days?",
      answer: "It depends on your hotel's size, category, and operational capacity: Larger hotels with sufficient infrastructure often offer all four durations: 8, 16, 24, and 32 days. Smaller hotels (e.g., up to 20 rooms) often start with 8-day stays for smoother operations. Longer stays are ideal if you have the space and volume of guests to support them."
    },
    {
      question: "What if the hotel has between 40 and 60 rooms?",
      answer: "That's a perfect mid-range. You can start by offering 8- and 16-day stays and expand to 24 or 32 days as operations and demand grow."
    },
    {
      question: "What approach should boutique or high-end hotels take?",
      answer: "Boutique hotels thrive on quality and uniqueness. You can offer 8-day themed programs like: Culinary weeks with guest chefs, Wellness retreats, Cultural or language immersions. These programs can repeat weekly, building consistency, reputation, and a rotating experience for guests."
    },
    {
      question: "Can I set different rates depending on the length of stay?",
      answer: "Yes, and it's highly recommended. Offering progressive discounts based on the duration encourages: Longer bookings (16, 24, or 32 days), Lower operational costs per guest, Greater guest loyalty and stability. Guests naturally prefer longer and more affordable stays — a win for your profitability."
    },
    {
      question: "Can I start with just one stay duration and expand later?",
      answer: "Absolutely. Many hotels begin with 8-day stays to test the model and gradually add longer options as operations evolve and guest behavior becomes clearer. You control the pace of growth."
    },
    {
      question: "Can I combine different models within the same hotel?",
      answer: "Yes — and this is often the smartest choice. For example: Assign some rooms to 8-day themed cycles, Others to long stays (ideal for digital nomads or semi-retirees). This combination maximizes occupancy and attracts a more diverse clientele."
    }
  ],
  revenue: [
    {
      question: "What are the financial benefits for your hotel?",
      answer: "In addition to filling rooms that would otherwise sit empty, you benefit from: Longer stays, Lower turnover, More satisfied guests, A steady revenue stream from low-maintenance, grateful, and likely repeat clients."
    },
    {
      question: "If I have empty rooms, does Hotel-Living have guests for me?",
      answer: "There's always a market. The potential guest base is massive — people of all ages, backgrounds, and preferences looking for flexible, comfortable, and affordable alternatives to traditional housing. Regardless of your hotel's size, there's a way to benefit from the Hotel-Living model by adapting it to your specific offering."
    },
    {
      question: "How does the agreement with Hotel-Living protect your brand?",
      answer: "We position your property as a premium residential-style option — not a low-cost accommodation. Our platform attracts high-quality guests seeking authentic experiences and community, strengthening your brand and reputation."
    },
    {
      question: "How does this impact our existing revenue management strategy?",
      answer: "Hotel-Living enhances your revenue management by creating a reliable baseline of long-stay bookings, which can be factored into forecasting. Many properties use our platform to strategically fill low-demand periods — allowing more aggressive pricing during high-demand windows through conventional channels."
    }
  ],
  guests: [
    {
      question: "What happens if a guest wants to book consecutive stays at different hotels?",
      answer: "The system allows full itinerary management: Guests can plan multiple stages in different cities or countries, The platform coordinates check-in and check-out dates across hotels, You receive the booking for your property within the overall itinerary."
    },
    {
      question: "Can guests combine Hotel-Living with their usual residence?",
      answer: "Yes. Many guests use Hotel-Living as: A part-time second home during the year, A temporary transition while reorganizing their personal or professional life, An alternative to traditional housing during specific life stages."
    },
    {
      question: "Is there a minimum age required for guests?",
      answer: "Hotel-Living is designed for adults (18+), especially targeting: Active professionals, Retirees, Remote workers, Digital nomads, Couples or solo travelers, People transitioning residences. In some cases, families may also be accepted depending on hotel policy and affinities."
    }
  ],
  seniors: [
    {
      question: "Can Hotel-Living help us attract the active senior market?",
      answer: "Absolutely. Hotel-Living opens your doors to a large, growing segment: independent retirees seeking comfort, services, and social life — without entering senior housing. It's a market hotels rarely target... until now."
    },
    {
      question: "What makes this different from traditional hospitality?",
      answer: "It's hospitality with purpose. It's not just a room — it's a lifestyle. And that emotional connection leads to long-term loyalty, word-of-mouth referrals, and a whole new identity for your hotel."
    },
    {
      question: "So can long stays really offer retirees a unique lifestyle upgrade?",
      answer: "Exactly — and that's the beauty of it. You offer a premium experience at a fraction of the cost of senior living, making it attractive for guests and still highly profitable for you."
    },
    {
      question: "Does this turn the hotel into a senior residence?",
      answer: "Not at all. We don't become care facilities — we simply offer a desirable lifestyle for active seniors who want freedom, comfort, and services — without the high costs or limitations of traditional senior housing. No medical staff, no special licenses. Just the same hotel, now serving guests who enjoy long stays and consistent service."
    }
  ],
  affinities: [
    {
      question: "What exactly are hotel affinities?",
      answer: "Affinities are specialized areas of interest that define the focus and community of a hotel. These can include activities (yoga, cooking, languages), lifestyles (digital nomad, wellness), or special interests (art, music, literature). Think of them as your hotel's personality and purpose — what makes it special beyond rooms and services."
    },
    {
      question: "How many affinities should my hotel offer?",
      answer: "Most successful properties start with one core affinity that aligns naturally with their location, facilities, or staff expertise. As the program grows, you may add 1–2 complementary affinities. Too many dilutes your identity and stretches your resources — while a focused approach creates stronger communities and clearer marketing."
    },
    {
      question: "Which affinities are most popular with guests?",
      answer: "It varies by region and hotel type, but platform data shows strong performance in: Wellness, Culinary, Creative arts, Nature/outdoors, Digital nomad themes. The most successful affinity isn't necessarily the most globally popular — it's the one that best aligns with your property's authentic strengths and local setting."
    },
    {
      question: "What space requirements do affinities need?",
      answer: "Space needs vary by affinity, but most don't require major renovations. Multi-use areas that can be reconfigured are ideal. Essentials include: A dedicated community space (often part of an existing lounge), Reliable technology, Appropriate storage, Clear programming schedules. You can also partner with nearby restaurants, salons, or other businesses."
    },
    {
      question: "Can affinities change seasonally?",
      answer: "Yes, seasonal variation works well — especially for properties in locations with distinct seasons. For example, a mountain property may focus on hiking in summer and shift to wellness or creative arts in winter. The key is maintaining a sense of community while rotating specific activities."
    },
    {
      question: "What if regular guests don't want to participate?",
      answer: "Participation is always optional. While affinities create a thematic atmosphere, guests are free to join as much or as little as they wish. Many hotels offer a mix of scheduled activities and always-available resources so guests can tailor their experience."
    },
    {
      question: "Why should our hotel consider offering affinity-based stays?",
      answer: "Because shared interests and passions create powerful guest connections. When people stay with others who share their tastes, their experience becomes deeper, warmer, and more memorable. It's not just a room — it's a shared environment."
    },
    {
      question: "How does this benefit us financially?",
      answer: "Guests who feel a strong sense of belonging often extend their stays and spend more. They dine together, book extra services, and frequently return. Social interaction boosts satisfaction — and satisfaction boosts revenue."
    },
    {
      question: "Can we choose which affinities to promote?",
      answer: "Absolutely. You can attract your ideal guests — whether they're food lovers, music fans, language learners, or creative minds. Especially in smaller hotels, owners can build communities around their own passions and turn their space into something truly personal and powerful."
    },
    {
      question: "Isn't this too niche or restrictive?",
      answer: "Not at all. There's a massive range of interests, and many guests are looking for connection. Plus, it's flexible: you can rotate themes, test new ones, or run multiple at once. There's no single formula — you shape your own identity."
    },
    {
      question: "What's the broader vision behind affinities?",
      answer: "Affinities allow hotels to play a new social role — not just hosting travelers, but creating micro-communities. It's a way to reorganize hospitality — even society — around shared meaning. In a world full of isolation, that's a rare and valuable gift."
    },
    {
      question: "Does this really help fill rooms?",
      answer: "Yes. People are more likely to stay longer when they find something meaningful. Instead of a quick trip, they may join a 16- or 32-day stay — not just for the location, but for the people they'll meet."
    }
  ],
  operation: [
    {
      question: "How do we manage cleaning for long-stay guests?",
      answer: "Most properties adjust their cleaning schedules for extended stays, offering full service 1–2 times per week with simplified daily touch-ups (towel changes, trash removal). This balanced approach keeps things clean, reduces costs, and respects guest privacy. Our operational manual includes detailed guidance for efficient cleaning protocols by stay duration."
    },
    {
      question: "Do we need to change our check-in/check-out procedures?",
      answer: "While the basic process remains the same, we recommend offering a more complete orientation for long-stay guests, including property tours, staff introductions, and a clear explanation of amenities and activities."
    },
    {
      question: "What about laundry services for long-stay guests?",
      answer: "Options vary depending on the property: Some hotels include weekly laundry in the rate, Others offer self-service facilities, Some provide paid laundry services. The key is to have clear, consistent policies that meet guest needs while remaining operationally efficient. You can also partner with an external laundry service or recommend a trusted provider to your guests."
    },
    {
      question: "How do we manage meals for long-stay guests?",
      answer: "Most hotels offer flexible meal plans that guests can customize by preference and stay duration. Common options include breakfast-only, half-board (breakfast and dinner), or meal credit systems. Properties without restaurants often partner with local delivery services or offer kitchenettes for self-catering."
    },
    {
      question: "What adjustments does our staff need to make?",
      answer: "The main shift is building deeper relationships with guests and understanding the different service rhythm of long stays: Front desk becomes a community facilitator, Housekeeping learns personal room preferences, Management focuses on creating a residential feeling. We provide full staff training modules to guide this transition."
    },
    {
      question: "How do we handle room maintenance during long stays?",
      answer: "Preventive maintenance becomes even more important. We recommend mid-stay maintenance checks (with guest permission) and clear communication about any needed work. Many properties also schedule short maintenance blocks between long stays for deep cleaning and repairs."
    },
    {
      question: "What internet and tech requirements do long-stay guests have?",
      answer: "Reliable, high-speed internet is essential — many guests work remotely or stream content frequently. We recommend: Dedicated bandwidth management, Multiple access points for consistent coverage, Basic tech support options. Some properties also offer enhanced workspaces with business amenities."
    },
    {
      question: "How do we balance privacy and community for these guests?",
      answer: "Successful properties define clear boundaries between private spaces (guest rooms) and community areas (lounges, dining spaces). A mix of structured activities and spontaneous gathering spaces allows guests to choose their level of engagement. Staff training emphasizes how to read and respect individual social preferences."
    },
    {
      question: "Are there special safety considerations for long stays?",
      answer: "Yes. Long-stay guests may accumulate more belongings and care more about room security. Consider: Enhanced in-room safes, Secure storage for valuables, Clear policies for room access during housekeeping. Many properties also implement extra identity verification during the booking process for long stays."
    }
  ],
  integration: [
    {
      question: "What is the reservation confirmation process like?",
      answer: "When a guest books through Hotel-Living, you receive instant email notification. For standard reservations, confirmation is automatic. All guest communication occurs via our messaging system until check-in."
    },
    {
      question: "How are payments handled for long stays?",
      answer: "Guests pay their remaining balance directly to the hotel upon check-in, following your standard payment procedures. This gives properties immediate access to funds without third-party delays."
    },
    {
      question: "How do we manage special requests from long-stay guests?",
      answer: "Create a clear system to track and fulfill guest requests — through your existing processes or via our platform's messaging system. Many properties assign specific staff as long-stay guest liaisons."
    },
    {
      question: "Can we continue using our existing booking channels?",
      answer: "Absolutely. Hotel-Living complements your current distribution strategy. You retain full control over inventory allocation, allowing you to balance traditional bookings and long stays based on your occupancy patterns and business needs."
    },
    {
      question: "How are reservations confirmed?",
      answer: "When a guest books through Hotel-Living, they receive instant confirmation. You get immediate notification by email. All communication is managed through our internal messaging system until check-in."
    },
    {
      question: "How are payments processed for these bookings?",
      answer: "Guests pay a 10% deposit at the time of booking, with the remaining 90% paid directly to the hotel upon arrival. This reduces payment processing fees for hotels and minimizes cancellation risks."
    },
    {
      question: "How do we manage special guest requests for long stays?",
      answer: "All special requests are communicated through our messaging system, providing a documented record. Our pre-arrival questionnaire helps identify common needs ahead of check-in."
    },
    {
      question: "What kind of reports do we receive for Hotel-Living bookings?",
      answer: "Our analytics dashboard provides detailed reports on: Booking patterns, Guest demographics, Revenue metrics, Affinity program participation. You can compare channel performance, track review sentiment, and monitor repeat booking rates. Custom reports can also be scheduled for automatic delivery to key stakeholders."
    }
  ],
  marketing: [
    {
      question: "How does Hotel-Living promote my property?",
      answer: "We promote partner properties through multiple channels: Our global platform, Digital campaigns targeting affinity communities, Partnerships with interest-based organizations, Content marketing and social media. Your property is exposed to audiences specifically looking for the affinities you offer."
    },
    {
      question: "Can I use the Hotel-Living partnership in my own marketing?",
      answer: "Absolutely! We encourage partners to highlight their affiliation with Hotel-Living in their own marketing materials. We provide brand assets, content templates, and marketing guidelines to help you leverage the partnership effectively."
    },
    {
      question: "How do affinities support targeted marketing?",
      answer: "Affinities allow for precision marketing that traditional hotels can't match. Instead of reaching general travelers, we connect you directly with communities actively seeking the exact experiences your property offers. This targeted approach results in higher conversion rates and lower customer acquisition costs."
    }
  ],
  payment: [
    {
      question: "How are bookings confirmed and processed?",
      answer: "When a guest books through Hotel-Living, they pay a 10% deposit to secure the reservation. The hotel receives an immediate notification and the reservation is confirmed in your system. The remaining 90% is paid directly to the hotel upon arrival. From the deposit, you receive 2%–3% along with the booking notice."
    },
    {
      question: "What payment methods can guests use?",
      answer: "Guests can pay the initial deposit using all major credit cards, PayPal, or bank transfer. For the remaining balance paid directly to the hotel, properties set their own accepted payment methods — though we recommend offering several options to accommodate international guests."
    },
    {
      question: "Are there any additional fees beyond the commission?",
      answer: "No. Unlike many booking platforms, we don't charge listing fees, photography fees, onboarding costs, or marketing fees. Commission is our only charge — making the partnership risk-free and directly tied to successful bookings."
    }
  ]
};
