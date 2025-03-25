
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface SearchLayoutProps {
  children: ReactNode;
}

export function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
