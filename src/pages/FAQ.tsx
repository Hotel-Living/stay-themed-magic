
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const faqItems: FAQItem[] = [
    {
      question: "How does the booking process work?",
      answer: "Booking with Hotel-Living.com is simple. Browse available themed hotels, apply filters to find ones matching your interests, select your stay duration (8, 16, 24, or 32 days), choose your dates, and complete the booking process. You'll receive instant confirmation and all the details about your stay.",
      category: "Booking",
    },
    {
      question: "What are the available stay durations?",
      answer: "Hotel-Living.com offers extended stays in fixed durations of 8, 16, 24, or 32 days. These durations are designed to provide enough time for immersive experiences while maintaining flexibility for travelers.",
      category: "Booking",
    },
    {
      question: "Can I cancel or modify my reservation?",
      answer: "Yes, reservations can be modified or cancelled according to each hotel's policy. Most hotels allow free cancellation up to 30 days before your stay, with partial refunds available for cancellations up to 14 days prior to arrival. You can manage all your bookings through your account dashboard.",
      category: "Booking",
    },
    {
      question: "What are themed hotels?",
      answer: "Themed hotels on our platform are properties that specialize in particular interests, hobbies, or experiences. They offer specialized facilities, programs, and activities centered around these themes, such as language learning, culinary arts, sports, technology, and many more.",
      category: "Hotels",
    },
    {
      question: "How are the themes organized?",
      answer: "Themes are organized into categories like Languages, Culinary, Arts & Crafts, Sports & Fitness, Technology, Wellness, Games, and Music. Each category contains multiple specific themes. Hotels may offer one or multiple themes from various categories.",
      category: "Hotels",
    },
    {
      question: "What is included in a themed stay?",
      answer: "Each themed stay includes accommodation plus theme-specific activities, facilities, and programs. The exact inclusions vary by hotel and are detailed on the hotel's page. Most themed stays include daily structured activities, access to specialized facilities, and opportunities to connect with like-minded guests.",
      category: "Hotels",
    },
    {
      question: "How do I create a user account?",
      answer: "Click the 'Sign Up' button on the top navigation bar, select 'Traveler' as your account type, and complete the registration form with your personal details. Once registered, you can book stays, save favorite hotels, and manage your reservations.",
      category: "Accounts",
    },
    {
      question: "How can I list my hotel on Hotel-Living.com?",
      answer: "Hotel owners can register by clicking 'Sign Up', selecting 'Hotel Owner' as the account type, and completing the registration process. After verification, you'll gain access to the hotel dashboard where you can create property listings, set up themes, manage bookings, and configure your hotel's availability.",
      category: "Hotel Partners",
    },
    {
      question: "What fees does Hotel-Living.com charge hotel partners?",
      answer: "Hotel-Living.com charges a commission of 10% on successful bookings. There are no upfront fees or monthly charges for listing your property. The commission covers our marketing efforts, platform maintenance, customer service, and payment processing.",
      category: "Hotel Partners",
    },
    {
      question: "How do payments work?",
      answer: "Guests pay for their bookings through our secure payment system at the time of reservation. Funds are held securely and released to hotel partners 24 hours after the guest's check-in. Hotel partners can set up direct deposit for receiving payments through the hotel dashboard.",
      category: "Payments",
    },
    {
      question: "Are there any special discounts available?",
      answer: "We offer various seasonal promotions, first-time booking discounts, and loyalty rewards for repeat guests. Hotel partners may also offer their own special rates for certain periods. Check the homepage or subscribe to our newsletter to stay updated on current promotions.",
      category: "Payments",
    },
    // New FAQs translated from Spanish
    {
      question: "WHAT IS THE HOTEL-LIVING SYSTEM?",
      answer: "A system that allows you to live in hotels with renewable fixed stays of 8, 16, 24, and 32 days. Additionally, if you choose hotels that offer our unique 'All-Inclusive Plus' program, it's even possible to live with all daily needs covered: accommodation, full board, laundry, cleaning, Internet, leaving behind all kinds of bills (electricity, water, Internet, etc.), as well as enjoying absolute security and constant services, attention, care, extensive social life, and much more.",
      category: "General",
    },
    {
      question: "WHO IS THE HOTEL-LIVING SYSTEM FOR?",
      answer: "In principle, it's ideal for anyone who wants to truly enjoy life, live with everything taken care of, save on multiple expenses and hassles, and completely enhance their social life and activities.",
      category: "General",
    },
    {
      question: "WHAT ARE HOTEL-LIVING THEMES?",
      answer: "They are the possibility to search for, find, and surround yourself with people who share exactly your same tastes and mindsets. Whatever your interest, hobbies, taste, or passion, there's a possibility that you'll find hotels where people who like the same things as you gather and meet.",
      category: "Themes",
    },
    {
      question: "WHY DOES HOTEL-LIVING ALLOW ME TO MULTIPLY MY SOCIAL LIFE?",
      answer: "Because Hotel-Living clients, unlike classic hotel clients, want to meet people and make friends. In fact, we recommend that hotels entirely dedicated to our system not even offer television in the rooms, as we want to avoid isolation, whether voluntary or not, or loneliness at all costs. Additionally, with our unique system of Hotel Themes, the experience is even more intense: surrounding yourself with people who share your same tastes and mindsets.",
      category: "Experience",
    },
    {
      question: "AM I OBLIGATED TO SOCIALIZE WITH OTHER CLIENTS?",
      answer: "No, everyone has their preferences and lifestyle, but having a good social life is highly desirable and, in fact, expanding it as much as possible with like-minded people.",
      category: "Experience",
    },
    {
      question: "WHY ARE STAYS 8, 16, 24, AND 32 RENEWABLE DAYS?",
      answer: "Because this way hotels can organize themselves much more easily.",
      category: "Booking",
    },
    {
      question: "CAN I FIND THE SAME HOTELS ON OTHER BOOKING PORTALS OFFERING THEIR ROOMS AT MUCH HIGHER PRICES?",
      answer: "Of course. Hotel-Living does not interfere with the hotels' usual booking systems, but rather is exclusively dedicated to selling their traditionally empty rooms to clients looking for an entirely different product: medium and long-term stays, with the greatest number of services possible, at the best possible price, and ideally in hotels with their favorite themes.",
      category: "Hotels",
    },
    {
      question: "DOES THE HOTEL-LIVING SYSTEM CREATED BY YOU MEAN A RADICAL IMPROVEMENT IN THE STANDARD OF LIVING FOR MANY PEOPLE?",
      answer: "Of course it does. With Hotel-Living, it's no longer necessary to live alone or waste time on tedious household chores: supermarket, cooking, cleaning, laundry, etc., nor continue paying multiple increasing bills of all kinds (electricity, water, gas, Internet, community, etc.), or suffer from an increasingly deficient social life and activities. With Hotel-Living, it's perfectly possible to live in hotels all year round, renewing stays or trying new hotels and communities as desired. The supply of Hotel-Living hotels is always expanding, and new opportunities are constant. All this around your home, in your city, or in a wonderful new place. Because, as Hotel-Living hotels increase, you will always find a hotel establishment that, regardless of your budget, will allow you to live there at almost the same cost as your current laborious life alone. The reason is obvious: expenses are much lower if they are made communally. One hundred people living separately will always pay much more than a single establishment that purchases goods and pays for services wholesale. Furthermore, if it's establishments whose regular activity already covers basic expenses but suffer from empty rooms at certain times of the year, the profitability they can obtain with our Hotel-Living system will be immense, since they will not only eliminate the expenses of those empty spaces but also make them highly profitable while being able to offer extremely attractive rates for well-organized medium and long-term stays.",
      category: "General",
    },
    {
      question: "SO, IS IT POSSIBLE TO LIVE PERMANENTLY IN ONE OR SEVERAL HOTELS, AS DESIRED OR CONVENIENT, IN RENEWABLE STAYS, EVEN WITH EVERYTHING TAKEN CARE OF, DEDICATING ONESELF TO TRULY ENJOYING LIFE, MEETING PEOPLE, AND HAVING FUN?",
      answer: "Of course it's possible. Getting to know and enjoy new hotels and people, extending stays in those we like most, truly living life as it always should have been, is now perfectly possible with our Hotel-Living system. In fact, there's the possibility of living in hotels and renting out your own home to obtain another monthly income.",
      category: "Experience",
    },
    {
      question: "HOW DO I PAY FOR MY HOTEL-LIVING STAYS?",
      answer: "You will pay directly at the hotel. To make the reservation, you only need to pay a small non-refundable deposit.",
      category: "Payments",
    },
  ];
  
  const categories = [
    { id: "all", label: "All Questions" },
    ...Array.from(new Set(faqItems.map((item) => item.category))).map((category) => ({
      id: category,
      label: category,
    })),
  ];
  
  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = searchQuery
      ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Find answers to common questions about Hotel-Living.com, our themed hotels, booking process, and more.
            </p>
          </div>
          
          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mb-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="w-full py-3 pl-12 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
              placeholder="Search for questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/50"
                    : "bg-secondary/50 text-foreground/80 border border-border hover:bg-fuchsia-500/10"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/90 text-black rounded-xl overflow-hidden transition-all duration-300 shadow"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium pr-8">{faq.question.charAt(0).toUpperCase() + faq.question.slice(1).toLowerCase()}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-fuchsia-800 transition-transform duration-300",
                        expandedItems[index] ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  
                  {expandedItems[index] && (
                    <div className="px-5 pb-5 pt-0 text-gray-700">
                      <div className="pt-2 border-t border-gray-200 mb-3"></div>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">No FAQs match your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          
          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-foreground/80 mb-6">
              Our support team is always ready to help with any questions you might have.
            </p>
            <button className="py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
