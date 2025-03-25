
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");

  const faqCategories = [
    { id: "general", name: "General" },
    { id: "booking", name: "Booking" },
    { id: "stay", name: "During Your Stay" },
    { id: "payment", name: "Payment" },
    { id: "themes", name: "Themes" },
    { id: "hosting", name: "Hosting" }
  ];

  const faqsByCategory = {
    general: [
      {
        question: "What is Hotels Life all about?",
        answer: "Hotels Life is a revolutionary concept that allows you to live in hotels around the world for extended periods, enjoying the comforts of hotel living while connecting with like-minded individuals who share your interests and passions. It's a lifestyle that eliminates household chores, provides built-in social opportunities, and allows you to explore different destinations without the commitments of traditional housing."
      },
      {
        question: "How does the theme selection work?",
        answer: "Our unique theme-based approach allows you to choose hotels that focus on your specific interests - whether that's art, music, technology, cuisine, or dozens of other options. When you filter by themes, you'll find hotels that not only accommodate you but also offer specialized facilities, activities, and communities centered around those interests. This ensures you'll connect with people who share your passions."
      },
      {
        question: "What is included in the monthly price?",
        answer: "The monthly price typically includes accommodation in a private room, utilities, housekeeping, access to hotel amenities (which vary by property), themed activities and events, and community gatherings. Some properties include meals, while others offer self-catering options or meal plans for an additional fee. Each hotel listing clearly specifies what's included."
      },
      {
        question: "How long can I stay at a hotel?",
        answer: "Minimum stays typically start at one month, but you can stay for multiple months if availability permits. Many guests choose to move between different Hotels Life properties throughout the year, experiencing different themes and locations. Our flexible booking system allows you to plan your lifestyle around your preferences and schedule."
      },
      {
        question: "Is Hotels Life available worldwide?",
        answer: "We're expanding rapidly and currently offer properties across Europe, North America, and select locations in Asia and Africa. Our goal is to provide global coverage, allowing members to experience themed hotel living in any destination they desire. New properties are added regularly, so check back often if you don't see your preferred location."
      },
      {
        question: "Do I need to participate in themed activities?",
        answer: "Not at all! While the themed activities and communities are a major benefit of Hotels Life, participation is entirely optional. You can enjoy the hotel's amenities and your private space without attending any events. However, most guests find that the community aspect and shared interests significantly enhance their experience."
      }
    ],
    booking: [
      {
        question: "How far in advance should I book my stay?",
        answer: "For popular destinations and themes, we recommend booking 2-3 months in advance, especially during peak seasons. Some of our most exclusive properties can fill up 6 months ahead. However, we also offer last-minute availability in many locations, sometimes with special rates for immediate occupancy."
      },
      {
        question: "Can I cancel or change my booking?",
        answer: "Yes, most bookings can be modified or cancelled. Standard stays have a 30-day cancellation policy with a full refund if cancelled outside that window. Within 30 days, a portion of your first month's payment may be retained as a cancellation fee. Flex-rate bookings offer more flexibility for a slightly higher rate. All policies are clearly indicated during the booking process."
      },
      {
        question: "Is there a membership fee or subscription?",
        answer: "No, there's no mandatory membership fee. You only pay for your stays. However, we do offer an optional Hotels Life+ subscription that provides benefits like priority booking, rate discounts, enhanced room selection, and exclusive events for frequent users of our platform."
      }
    ],
    stay: [
      {
        question: "Can I receive mail and packages at the hotel?",
        answer: "Yes, all our properties accept mail and packages for guests. Some hotels even offer dedicated mailboxes for long-term guests. Larger packages are held at reception or delivered to your room depending on the property's policy."
      },
      {
        question: "What if I need maintenance or assistance during my stay?",
        answer: "All our hotels provide 24/7 support for guests. For maintenance issues, most properties offer quick response times, typically resolving problems within 24 hours. You can request assistance through the in-room system, mobile app, or directly at reception."
      },
      {
        question: "Can I have visitors or guests during my stay?",
        answer: "Yes, visitors are welcome at our hotels. For day visitors, there's typically no charge. For overnight guests, policies vary by property - some offer free stays for a limited number of nights per month, while others have a nominal fee. All guests must register with reception for security purposes."
      },
      {
        question: "Is there housekeeping service?",
        answer: "Yes, standard housekeeping is included in all stays. Most properties offer weekly full cleaning with fresh linens and towels, and some offer more frequent service. Additional cleaning can be arranged for an extra fee. You can set your housekeeping preferences through your profile or directly with the hotel."
      }
    ],
    payment: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, bank transfers, and in many regions, digital payment systems like Apple Pay and Google Pay. Some locations also accept cryptocurrency payments. All payments are processed securely through our encrypted platform."
      },
      {
        question: "Is there a security deposit?",
        answer: "Yes, most properties require a refundable security deposit, typically equivalent to one week's stay. This is held but not charged to your payment method and is released within 7 days after checkout, assuming no damages or additional charges. Some premium properties may require higher deposits."
      },
      {
        question: "Can I pay monthly or must I pay for the entire stay upfront?",
        answer: "For stays longer than one month, you can choose to pay monthly. The first month is charged at booking to secure your reservation, and subsequent months are automatically charged on the same day each month. For stays of 6+ months, we offer additional payment options, including quarterly payments with modest discounts."
      }
    ],
    themes: [
      {
        question: "What kind of themed activities can I expect?",
        answer: "Activities vary widely depending on the theme and property. For example, our culinary-themed hotels offer cooking classes, tasting events, food tours, and chef meetups. Tech-themed properties might host hackathons, workshops, and industry networking events. Creative arts hotels feature studios, galleries, performances, and hands-on workshops. Each property lists its regular activities on its detail page."
      },
      {
        question: "How are hotels vetted for their themes?",
        answer: "We have a rigorous vetting process for themed properties. Hotels must demonstrate authentic commitment to their themes through dedicated facilities, qualified staff, regular programming, and community engagement. Our team personally visits and evaluates each property before listing, and we continuously collect and monitor guest feedback to ensure quality and authenticity."
      },
      {
        question: "Can I suggest new themes or activities?",
        answer: "Absolutely! We welcome guest input and many of our current themes were suggested by our community. You can submit theme ideas through your account dashboard. For activities at your current hotel, speak directly with the community manager - most properties are eager to incorporate guest-led activities and events."
      }
    ],
    hosting: [
      {
        question: "How can I list my property on Hotels Life?",
        answer: "If you own or manage a hotel or suitable property, you can apply to become a host through our website. We're looking for properties that can commit to creating authentic themed environments and communities. After initial screening, our partnerships team will contact you to discuss potential themes, necessary facilities, and our hosting requirements."
      },
      {
        question: "What's required to host a themed hotel?",
        answer: "Successful host properties typically offer: private accommodations with ensuite bathrooms, common spaces for community activities, reliable high-speed internet, regular cleaning services, and 24/7 support staff. Additionally, themed properties must provide dedicated facilities relevant to their theme(s), regular programming, and qualified staff or partners to facilitate activities."
      },
      {
        question: "What's the financial model for hosts?",
        answer: "Hotels Life works on a commission model, taking a percentage of bookings made through our platform. We handle marketing, booking management, and community building, while you focus on providing exceptional accommodations and themed experiences. Many of our properties see higher occupancy rates and increased revenue through our long-stay model compared to traditional short-term bookings."
      },
      {
        question: "Can my property feature multiple themes?",
        answer: "Yes, many successful properties on our platform offer 2-3 complementary themes. This allows them to attract a wider audience while still maintaining cohesive community experiences. We can help you identify theme combinations that work well together based on your property's strengths, location, and target demographic."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-fuchsia-300">Frequently Asked Questions</h1>
          
          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="inline-flex w-auto p-1 h-auto bg-[#5A1876]/80 rounded-lg">
                {faqCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-fuchsia-800 data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="rounded-lg overflow-hidden glass-card bg-[#5A1876]/80">
                  <Accordion type="single" collapsible className="w-full divide-y divide-fuchsia-800/20">
                    {faqsByCategory[category.id as keyof typeof faqsByCategory].map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="px-6 py-4 text-white font-medium text-lg hover:bg-fuchsia-800/20">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-white/90">
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4 text-fuchsia-300">Still have questions?</h2>
            <p className="mb-6 text-white/90">Our customer service team is ready to help you with any inquiries.</p>
            <a 
              href="/customer-service" 
              className="inline-block px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-500 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
