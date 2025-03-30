
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building } from "lucide-react";

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">Frequently Asked Questions</h1>
          <p className="text-lg text-center mb-12 text-foreground/90">
            Choose the FAQ category relevant to you
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="glass-card-hover rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">For Travelers</CardTitle>
                <CardDescription className="text-center">
                  Information for guests looking to book stays
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button 
                  onClick={() => navigate("/faq-travelers")}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium"
                >
                  View Traveler FAQs
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card-hover rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
                  <Building className="h-6 w-6 text-fuchsia-400" />
                </div>
                <CardTitle className="text-xl text-center">For Hotel Partners</CardTitle>
                <CardDescription className="text-center">
                  Information for hotels looking to join our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button 
                  onClick={() => navigate("/faq-hotels")}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium"
                >
                  View Hotel Partner FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
