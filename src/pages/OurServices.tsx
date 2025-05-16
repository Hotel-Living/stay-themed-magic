import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
export default function OurServices() {
  return <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10 bg-[#4b0456]">
          <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="px-[28px] text-center">Our platform focuses on providing themed hotel experiences for long-term stays. We connect travelers with hotels that offer unique themed environments, allowing guests to immerse themselves in their interests while enjoying extended accommodations.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}