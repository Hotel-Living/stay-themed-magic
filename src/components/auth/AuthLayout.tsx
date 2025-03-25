
import React from "react";
import { Navbar } from "@/components/Navbar";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
              
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
