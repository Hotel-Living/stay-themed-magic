
import { CodeStatsCounter } from "@/components/CodeStatsCounter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Database, Zap } from "lucide-react";

export default function CodeStats() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Hotel Living Codebase Statistics
        </h1>
        <CodeStatsCounter />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Supabase Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <Shield className="h-12 w-12 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Row Level Security</h3>
              <p className="text-center text-sm">
                All tables are protected with Row Level Security policies, ensuring users can only access data they're authorized to see.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <Database className="h-12 w-12 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Storage Buckets</h3>
              <p className="text-center text-sm">
                Dedicated storage buckets for hotel images and user avatars with proper access controls.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <Zap className="h-12 w-12 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Real-time Subscriptions</h3>
              <p className="text-center text-sm">
                Live updates for bookings and other data, providing a seamless real-time experience for users.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
