
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function OurValues() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Our Values</h1>
          
          <div className="prose prose-invert max-w-none">
            <p>This is a placeholder for the Our Values content. More detailed content will be added later.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
