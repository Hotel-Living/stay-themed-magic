import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function FAQTravelers() {
  const [activeTab, setActiveTab] = useState("general");
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
    name: "Themes"
  }];
  const faqsByCategory = {
    general: [{
      question: "What is Hotels Life all about?",
      answer: "Hotels Life is a revolutionary concept that allows you to live in hotels around the world for extended periods, enjoying the comforts of hotel living while connecting with like-minded individuals who share your interests and passions. It's a lifestyle that eliminates household chores, provides built-in social opportunities, and allows you to explore different destinations without the commitments of traditional housing."
    }, {
      question: "How does the theme selection work?",
      answer: "Our unique theme-based approach allows you to choose hotels that focus on your specific interests - whether that's art, music, technology, cuisine, or dozens of other options. When you filter by themes, you'll find hotels that not only accommodate you but also offer specialized facilities, activities, and communities centered around those interests. This ensures you'll connect with people who share your passions."
    }, {
      question: "What is included in the monthly price?",
      answer: "The monthly price typically includes accommodation in a private room, utilities, housekeeping, access to hotel amenities (which vary by property), themed activities and events, and community gatherings. Some properties include meals, while others offer self-catering options or meal plans for an additional fee. Each hotel listing clearly specifies what's included."
    }, {
      question: "How long can I stay at a hotel?",
      answer: "Minimum stays typically start at one month, but you can stay for multiple months if availability permits. Many guests choose to move between different Hotels Life properties throughout the year, experiencing different themes and locations. Our flexible booking system allows you to plan your lifestyle around your preferences and schedule."
    }, {
      question: "Is Hotels Life available worldwide?",
      answer: "We're expanding rapidly and currently offer properties across Europe, North America, and select locations in Asia and Africa. Our goal is to provide global coverage, allowing members to experience themed hotel living in any destination they desire. New properties are added regularly, so check back often if you don't see your preferred location."
    }, {
      question: "Do I need to participate in themed activities?",
      answer: "Not at all! While the themed activities and communities are a major benefit of Hotels Life, participation is entirely optional. You can enjoy the hotel's amenities and your private space without attending any events. However, most guests find that the community aspect and shared interests significantly enhance their experience."
    }, {
      question: "Can I stay in hotels at excellent prices?",
      answer: "Absolutely! We offer competitive pricing for extended stays that are often comparable to what you would pay for traditional housing, but with all the added benefits of hotel living and none of the hassles."
    }, {
      question: "How can I enjoy new places, themes, and people continuously?",
      answer: "Our platform makes it easy to move between different themed hotels, allowing you to experience new locations, themes, and communities without the commitment of long-term leases or property ownership. You can try a music-themed hotel one month and switch to a culinary-focused property the next."
    }, {
      question: "What are renewable stays of 8, 16, 24, and 32 days?",
      answer: "These are our flexible stay packages that allow you to extend your stay in increments that fit your schedule. Start with an 8-day stay and extend to 16, 24, or 32 days as needed, maintaining the same great rate and accommodations."
    }, {
      question: "How do I eliminate household chores?",
      answer: "When you stay with us, you leave behind shopping, cooking, cleaning, laundry, and other household maintenance. Our properties provide housekeeping, and many offer meal plans or have restaurants on-site. This frees up your time to focus on what matters to you."
    }],
    booking: [{
      question: "How far in advance should I book my stay?",
      answer: "For popular destinations and themes, we recommend booking 2-3 months in advance, especially during peak seasons. Some of our most exclusive properties can fill up 6 months ahead. However, we also offer last-minute availability in many locations, sometimes with special rates for immediate occupancy."
    }, {
      question: "Can I cancel or change my booking?",
      answer: "Yes, most bookings can be modified or cancelled. Standard stays have a 30-day cancellation policy with a full refund if cancelled outside that window. Within 30 days, a portion of your first month's payment may be retained as a cancellation fee. Flex-rate bookings offer more flexibility for a slightly higher rate. All policies are clearly indicated during the booking process."
    }, {
      question: "Is there a membership fee or subscription?",
      answer: "No, there's no mandatory membership fee. You only pay for your stays. However, we do offer an optional Hotels Life+ subscription that provides benefits like priority booking, rate discounts, enhanced room selection, and exclusive events for frequent users of our platform."
    }, {
      question: "How do I select a hotel based on my favorite themes?",
      answer: "Our advanced filtering system allows you to search for hotels based on themes that interest you. Simply select your preferred theme from our extensive list, and we'll show you properties that offer activities, facilities, and communities centered around that interest."
    }, {
      question: "Can I replace multiple unpredictable bills with a single fixed payment?",
      answer: "Yes! One of the major benefits of our service is financial predictability. Your monthly rate typically includes all utilities, internet, housekeeping, and amenities, so you don't have to worry about unexpected bills or maintenance costs."
    }, {
      question: "How does direct payment at the hotel work?",
      answer: "You can reserve your stay with just 10% of the total rate. The remaining balance is paid directly to the hotel upon arrival, eliminating middleman fees and giving you the opportunity to verify that everything meets your expectations before completing your payment."
    }],
    stay: [{
      question: "Can I receive mail and packages at the hotel?",
      answer: "Yes, all our properties accept mail and packages for guests. Some hotels even offer dedicated mailboxes for long-term guests. Larger packages are held at reception or delivered to your room depending on the property's policy."
    }, {
      question: "What if I need maintenance or assistance during my stay?",
      answer: "All our hotels provide 24/7 support for guests. For maintenance issues, most properties offer quick response times, typically resolving problems within 24 hours. You can request assistance through the in-room system, mobile app, or directly at reception."
    }, {
      question: "Can I have visitors or guests during my stay?",
      answer: "Yes, visitors are welcome at our hotels. For day visitors, there's typically no charge. For overnight guests, policies vary by property - some offer free stays for a limited number of nights per month, while others have a nominal fee. All guests must register with reception for security purposes."
    }, {
      question: "Is there housekeeping service?",
      answer: "Yes, standard housekeeping is included in all stays. Most properties offer weekly full cleaning with fresh linens and towels, and some offer more frequent service. Additional cleaning can be arranged for an extra fee. You can set your housekeeping preferences through your profile or directly with the hotel."
    }, {
      question: "How can I multiply my social life, activities, and standard of living?",
      answer: "Our themed hotels naturally create communities of like-minded individuals. Regular events, shared spaces, and common interests make it easy to connect with others. Many guests report that their social circles expand significantly when staying at our properties."
    }, {
      question: "How does Hotels Life help eliminate loneliness or isolation?",
      answer: "By living in a community of people who share your interests, you'll naturally develop connections. Our hotels are designed with community spaces that encourage interaction, and our themed activities provide natural conversation starters, making it easier to form meaningful relationships."
    }, {
      question: "What security benefits do hotels provide?",
      answer: "Hotels offer a level of security that's difficult to achieve in private residences. Features typically include 24/7 staffing, security cameras in public areas, secure access systems, fire safety equipment, emergency response protocols, and sometimes security personnel. This comprehensive approach provides peace of mind, especially when staying in unfamiliar locations."
    }, {
      question: "What daily services and attentions can I expect?",
      answer: "Beyond standard housekeeping, our hotels offer concierge services, maintenance assistance, dining options, and activity coordination. Many properties also provide amenities like fitness centers, pools, business centers, and social spaces. Premium properties may offer additional services like laundry, personal shopping, or private transportation."
    }],
    payment: [{
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, bank transfers, and in many regions, digital payment systems like Apple Pay and Google Pay. Some locations also accept cryptocurrency payments. All payments are processed securely through our encrypted platform."
    }, {
      question: "Is there a security deposit?",
      answer: "Yes, most properties require a refundable security deposit, typically equivalent to one week's stay. This is held but not charged to your payment method and is released within 7 days after checkout, assuming no damages or additional charges. Some premium properties may require higher deposits."
    }, {
      question: "Can I pay monthly or must I pay for the entire stay upfront?",
      answer: "For stays longer than one month, you can choose to pay monthly. The first month is charged at booking to secure your reservation, and subsequent months are automatically charged on the same day each month. For stays of 6+ months, we offer additional payment options, including quarterly payments with modest discounts."
    }, {
      question: "Is the cost comparable to living alone?",
      answer: "In many cases, yes. When you factor in all the costs of traditional living (rent/mortgage, utilities, internet, maintenance, furnishings, etc.) plus the value of included services like housekeeping, amenities, and community activities, Hotels Life often provides excellent value. Many members find that the total cost is similar to or even less than their previous living arrangements, especially in major cities."
    }, {
      question: "Can I generate monthly income by renting out my usual home?",
      answer: "Many of our members do exactly this! If you own a home, you can rent it out while you enjoy the Hotels Life experience. This can help offset the cost of your hotel stays or even generate additional income. We don't directly manage this process, but many members use property management services or platforms like Airbnb to handle their rentals."
    }],
    themes: [{
      question: "What kind of themed activities can I expect?",
      answer: "Activities vary widely depending on the theme and property. For example, our culinary-themed hotels offer cooking classes, tasting events, food tours, and chef meetups. Tech-themed properties might host hackathons, workshops, and industry networking events. Creative arts hotels feature studios, galleries, performances, and hands-on workshops. Each property lists its regular activities on its detail page."
    }, {
      question: "How are hotels vetted for their themes?",
      answer: "We have a rigorous vetting process for themed properties. Hotels must demonstrate authentic commitment to their themes through dedicated facilities, qualified staff, regular programming, and community engagement. Our team personally visits and evaluates each property before listing, and we continuously collect and monitor guest feedback to ensure quality and authenticity."
    }, {
      question: "Can I suggest new themes or activities?",
      answer: "Absolutely! We welcome guest input and many of our current themes were suggested by our community. You can submit theme ideas through your account dashboard. For activities at your current hotel, speak directly with the community manager - most properties are eager to incorporate guest-led activities and events."
    }, {
      question: "How can I use your exclusive filters for themes, activities, and services?",
      answer: "Our advanced search system allows you to filter properties by specific themes, available activities, and service offerings. You can also combine these filters with location preferences, price ranges, and available dates to find the perfect property for your interests and needs."
    }, {
      question: "Is Hotels Life ideal for specific groups of people?",
      answer: "Our service is particularly popular among digital nomads, active retirees, online workers, students, and individuals with independent resources. Solo travelers and couples often find our model especially appealing as it provides both privacy and community. However, we welcome everyone interested in our lifestyle concept, regardless of background or circumstance."
    }]
  };
  return <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-gradient text-[#e9c6f7]">Traveler FAQ</h1>
          <p className="text-center mb-8 text-[#f7fbf7]">
            Find answers to common questions about booking and staying with Hotels Life
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex justify-start overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-1">
              {faqCategories.map(category => <TabsTrigger key={category.id} value={category.id} className="px-4 py-1.5 rounded-lg text-sm capitalize whitespace-nowrap bg-[#730483]">
                  {category.name}
                </TabsTrigger>)}
            </TabsList>
            
            {faqCategories.map(category => <TabsContent key={category.id} value={category.id} className="customer-text">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {faqsByCategory[category.id as keyof typeof faqsByCategory].map((faq, index) => <AccordionItem key={index} value={`${category.id}-${index}`} className="glass-card rounded-lg overflow-hidden border-none">
                      <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-[#56cc41] bg-[#550477]">
                        <h2 className="font-semibold text-[#f8faf8]">{faq.question}</h2>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <p className="text-slate-50">{faq.answer}</p>
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