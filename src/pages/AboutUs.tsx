
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Rocket, Lightbulb, Globe, Compass, BarChart3, Flame, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/ContactForm";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <header className="mb-16 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-[#f9d3f6] mr-2" />
                <h1 className="text-4xl md:text-5xl font-bold text-[#f9d3f6]">About Us – Hotel Living</h1>
              </div>
            </header>
            
            {/* Who we are section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Rocket className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Who we are</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                We are a pioneering group of professionals with deep experience in hospitality, 
                technology, and human behavior. We know the industry from within and have traveled 
                the world enough to recognize that the model needs change — and we've set out to lead that change.
              </p>
            </section>
            
            {/* A Revolutionary Idea section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Lightbulb className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">A Revolutionary Idea</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                Hotel Living is not just a project. It's a revolution. A revolution that realigns society, 
                rejuvenates human contact, updates outdated lifestyles, and multiplies economic possibilities.
                For the first time in history, hotel life is no longer just for millionaires and royalty. 
                We are democratizing it.
              </p>
            </section>
            
            {/* A New Social Alignment section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Globe className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">A New Social Alignment</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                Society has changed dramatically in the past 50 years, but our ways of living haven't.
                Families are smaller, more people live alone, mobility is easier than ever, remote work is 
                widespread, and people seek deeper human connections — yet still live isolated in outdated 
                home structures.
                Meanwhile, millions of hotel rooms sit empty every year. We unite these two mismatched worlds.
              </p>
            </section>
            
            {/* What We're Creating section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Compass className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">What We're Creating</h2>
              </div>
              <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2">
                <li>A new Western lifestyle: practical, affordable, social, flexible, and mobile</li>
                <li>Extended hotel stays with personalized themes and shared passions</li>
                <li>Hotels full year-round with services people love — no chores, no isolation</li>
                <li>Communities of people grouped by interests, like music, languages, food, or wellness</li>
                <li>Youth job creation: group organizers, experience leaders, social facilitators</li>
                <li>A platform that makes it simple for hotels and humans to match perfectly</li>
              </ul>
            </section>
            
            {/* Why It's Inevitable section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <BarChart3 className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Why It's Inevitable</h2>
              </div>
              <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2">
                <li>The hospitality model must evolve — and now is the time</li>
                <li>Living in hotels isn't crazy — it's the future</li>
                <li>We're merging technology with humanity, not separating them</li>
                <li>Shared life costs less and gives more: it's smarter, richer, and kinder</li>
                <li>Our platform unlocks massive wealth for hotels and real comfort for people</li>
              </ul>
            </section>
            
            {/* Our Mission section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Flame className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                To lead a massive, sustainable realignment of how people live, travel, work, and connect.
                To solve loneliness, financial strain, and inefficiencies of housing with one seamless system.
                To use what already exists — hotels — and reinvent their purpose for modern times.
              </p>
            </section>
            
            {/* Join Us section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Star className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Want to join us?</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-6">
                We are actively looking for visionary talent to join this early-stage revolution.
                Writers, coders, hoteliers, designers, organizers — your time is now.
              </p>
              
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-fuchsia-300 mr-3" />
                <h3 className="text-xl font-semibold text-white">Fill out this form below and be part of the founding team:</h3>
              </div>
              
              <ContactForm />
            </section>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
