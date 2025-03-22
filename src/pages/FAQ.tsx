
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
                  className="glass-card rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium pr-8">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-fuchsia-400 transition-transform duration-300",
                        expandedItems[index] ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  
                  {expandedItems[index] && (
                    <div className="px-5 pb-5 pt-0 text-foreground/80">
                      <div className="pt-2 border-t border-fuchsia-900/20 mb-3"></div>
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
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
