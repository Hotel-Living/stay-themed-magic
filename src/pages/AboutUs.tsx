
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
                We are a pioneering group of professionals with deep experience in hospitality, software, and global 
                business. With a clear human focus and a passion for travel, we have lived inside the challenges of 
                the hotel industry while observing how society has evolved. Something had to change — and we're building it.
              </p>
            </section>
            
            {/* We're welcoming new talent section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Lightbulb className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">We're welcoming new talent</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                This is just the beginning. We're actively building our founding team and opening unique opportunities 
                for brilliant people who want to shape the future of how humans live, connect, and move.
              </p>
            </section>
            
            {/* Hotel Living: a necessary revolution section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Flame className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Hotel Living: a necessary revolution</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                Hotel Living is a revolution — one of alignment, humanity, and shared wealth.
                It's not just a new lifestyle model; it's a reorganization of society that places the human being — not property — at the center.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                For the first time in history:
                Living in hotels is no longer just for millionaires and royalty.
                We've come to democratize the concept of hotel living — the very idea of making a hotel your home — and to make it accessible, logical, and socially meaningful.
              </p>
            </section>
            
            {/* A new alignment section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Globe className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">A new alignment</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                Families are smaller.
              </p>
              <p className="text-white/90 leading-relaxed">
                Millions of people live alone.
              </p>
              <p className="text-white/90 leading-relaxed">
                Remote work and global mobility are now the norm.
              </p>
              <p className="text-white/90 leading-relaxed">
                People want better lives, with less burden and more meaning.
              </p>
              <p className="text-white/90 leading-relaxed">
                Yet homes and hotels haven't evolved.
              </p>
              <p className="text-white/90 leading-relaxed">
                And millions of hotel rooms remain empty.
              </p>
              <p className="text-white/90 leading-relaxed mt-4">
                Hotel Living connects these disconnected realities. It transforms underused hotel space into human-centered 
                ecosystems — where people live longer stays, share experiences, and thrive by affinity.
              </p>
            </section>
            
            {/* Why did this emerge? section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Lightbulb className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Why did this emerge?</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                Because it had to be someone with:
              </p>
              <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2">
                <li>Deep knowledge of hotel operations</li>
                <li>A lifetime of travel and social observation</li>
                <li>Enough experience to understand systems</li>
                <li>Enough independence of thought to transcend them</li>
              </ul>
              <p className="text-white/90 leading-relaxed mt-4">
                Hotel Living could only come from someone inside — who looked outside.
              </p>
            </section>
            
            {/* What we offer section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Compass className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">What we offer</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">To hotels:</h3>
                <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2">
                  <li>Permanent year-round occupancy</li>
                  <li>New revenue without disrupting traditional operations</li>
                  <li>Enhanced social relevance and visibility</li>
                  <li>Better resource use, higher profitability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">To people:</h3>
                <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2">
                  <li>A more social, supported way of living</li>
                  <li>Less isolation, more connection</li>
                  <li>A lifestyle with fewer domestic burdens</li>
                  <li>Access to thematic communities (arts, languages, wellness, etc.)</li>
                  <li>Affordability, flexibility, and improved well-being</li>
                </ul>
              </div>
            </section>
            
            {/* Jobs, innovation, future section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <BarChart3 className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Jobs, innovation, future</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                Hotel Living also generates new professions and real employment:
              </p>
              <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2 mb-4">
                <li>Group facilitators</li>
                <li>Experience coordinators</li>
                <li>Hospitality professionals in evolving roles</li>
                <li>Cross-sector job creation in real estate, hospitality, entertainment, and logistics</li>
              </ul>
              <p className="text-white/90 leading-relaxed">
                It will also unlock housing alternatives, drive new real estate models, and empower individuals to live globally, affordably, and meaningfully.
              </p>
            </section>
            
            {/* Technology with a human purpose section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Star className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Technology with a human purpose</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                Hotel Living uses advanced technology not to replace people, but to connect them.
                Our platform matches individuals through their passions, lifestyles, and travel preferences — closing the gap between digital convenience and emotional connection.
              </p>
              <p className="text-white/90 leading-relaxed">
                We believe in using technology to enhance humanity, not isolate it.
              </p>
            </section>
            
            {/* Intellectual Positioning Statement section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Lightbulb className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Intellectual Positioning Statement</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                What you see here is only the beginning.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                Hotel Living is not just a concept — it's the visible layer of a much broader, sophisticated system that we have already designed, structured, documented, and registered internationally.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                What we're presenting now is only the first launch module of a full architecture, composed of multiple original ideas, each with its own internal logic and practical implementation.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                These are deep, powerful models, designed to generate real utility and profitability across all stakeholder layers — from hotels and partners to users and local communities.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                Each element:
              </p>
              <ul className="text-white/90 leading-relaxed list-disc pl-6 space-y-2 mb-4">
                <li>Is entirely innovative</li>
                <li>Has been developed with care over years</li>
                <li>Is internationally protected</li>
                <li>Will be rolled out progressively, in clearly defined stages</li>
                <li>Forms part of a much larger strategic and intellectual framework</li>
              </ul>
              <p className="text-white/90 leading-relaxed mb-4">
                This is not just a functional structure — it's a conceptual system.
                Not something that can be easily recreated — it's a social mechanism with internal coherence and high-level design.
              </p>
              <p className="text-white/90 leading-relaxed">
                This project cannot be reproduced simply with what is visible.
                What makes Hotel Living unique is what comes next — and it is already built.
              </p>
              <p className="text-white/90 leading-relaxed mt-4">
                We are releasing our modules one by one — and we are ready.
              </p>
            </section>
            
            {/* Join Us section */}
            <section className="mb-16 glass-card p-8 rounded-xl border border-fuchsia-400/30">
              <div className="flex items-start mb-4">
                <Star className="h-7 w-7 text-fuchsia-300 mr-3 mt-1" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Want to join us?</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-6">
                If you feel aligned with this vision and want to help bring it to life, we want to hear from you.
              </p>
              
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-fuchsia-300 mr-3" />
                <h3 className="text-xl font-semibold text-white">Apply to join our founding team:</h3>
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
