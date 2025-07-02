import { HotelSignUpForm } from "@/components/hotel-signup/HotelSignUpForm";
import { HotelSignUpHeader } from "@/components/hotel-signup/HotelSignUpHeader";

export default function HotelSignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <HotelSignUpHeader 
          title="Join Our Hotel Partner Program"
          subtitle="Start offering unique extended stay experiences to our community"
        />
        <HotelSignUpForm />
      </div>
    </div>
  );
}