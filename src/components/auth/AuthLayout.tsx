import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Starfield } from '@/components/Starfield';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 pb-8 px-4">
        <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-140px)]">
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-br from-blue-50/95 to-green-50/95 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-blue-400/30 relative">
              {/* Blue glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-blue-600/10 blur-sm -z-10"></div>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#7E26A6] mb-2">{title}</h1>
                {subtitle && (
                  <p className="text-gray-700">{subtitle}</p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}