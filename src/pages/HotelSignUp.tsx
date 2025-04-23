
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthCard } from "@/components/auth/AuthCard";
import { HotelSignUpForm } from "@/components/hotel-signup/HotelSignUpForm";

export default function HotelSignUp() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Register as Hotel Partner" 
            subtitle="Join Hotel-Living and list your property"
            footerLinks={[
              {
                text: "Already have an account?",
                linkText: "Sign in",
                linkUrl: "/hotel-login"
              },
              {
                text: "Looking to book a stay?",
                linkText: "Register as a Traveler",
                linkUrl: "/signup"
              }
            ]}
          >
            <HotelSignUpForm />
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
