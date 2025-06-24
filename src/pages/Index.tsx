
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedHotels } from "@/components/FeaturedHotels";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TestHotelCreator } from "@/components/TestHotelCreator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedHotels />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <TestHotelCreator />
    </div>
  );
};

export default Index;
