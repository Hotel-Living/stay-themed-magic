
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#844B8E]">Frequently Asked Questions</h1>
          
          <div className="rounded-lg overflow-hidden bg-[#E3F2FD]">
            <Accordion type="single" collapsible className="w-full divide-y divide-blue-100">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-[#844B8E] font-medium text-lg hover:bg-blue-50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-[#844B8E]">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4 text-[#844B8E]">Still have questions?</h2>
            <p className="mb-6 text-[#844B8E]">Our customer service team is ready to help you with any inquiries.</p>
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
