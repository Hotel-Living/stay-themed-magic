
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building } from "lucide-react";

export default function Hotels() {
  const navigate = useNavigate();
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <h1 className="md:text-4xl font-bold mb-6 text-center text-gradient my-0 text-[#ce42dd] text-4xl">Hotel Partner Portal</h1>
          <p className="text-lg text-center mb-12 text-foreground/90">
            Join our network of themed hotels or access your hotel dashboard
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95]">
              <CardHeader className="pb-4 bg-[#6d0591]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Building className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">Existing Partners</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button onClick={() => navigate("/hotel-login")} className="text-white font-medium bg-[#860493] hover:bg-fuchsia-700">
                  Hotel Partner Login
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95]">
              <CardHeader className="pb-4 bg-[#6d0591]">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Building className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">New Partners</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button onClick={() => navigate("/hotel-signup")} className="bg-[#860493] hover:bg-fuchsia-700 text-white font-medium">
                  Register as Hotel Partner
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gradient text-[#c356fa]">Why Join Hotels Life?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">100% Occupancy</h3>
                <p className="text-sm text-foreground/80">Fill your vacant rooms with long-term guests year-round</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">Increased Revenue</h3>
                <p className="text-sm text-foreground/80">Higher average daily rates with reduced operational costs</p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-[#6a0a95]">
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-sm text-foreground/80">Access to international guests seeking themed experiences</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/faq-hotels" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
                Learn more about becoming a Hotel Partner
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
