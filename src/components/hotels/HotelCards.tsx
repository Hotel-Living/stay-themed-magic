
import { useNavigate } from "react-router-dom";
import { Building, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function HotelCards() {
  const navigate = useNavigate();
  const handleCardClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
      <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/hotel-login")}>
        <CardHeader className="pb-4 bg-[#6d0591]">
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
            <Building className="h-6 w-6 text-fuchsia-400" />
          </div>
          <CardTitle className="text-xl text-center">Existing Partners</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <Button className="text-white font-medium bg-[#860493] hover:bg-[#460F54]">
            Hotel Partner Login
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/faq-hotels")}>
        <CardHeader className="pb-4 bg-[#6d0591]">
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="h-6 w-6 text-fuchsia-400" />
          </div>
          <CardTitle className="text-xl text-center">FAQ</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <Button className="bg-[#860493] hover:bg-[#460F54] text-white font-medium">
            View FAQ for Hotels
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-card-hover rounded-xl overflow-hidden bg-[#6a0a95] cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleCardClick("/hotel-signup")}>
        <CardHeader className="pb-4 bg-[#6d0591]">
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-2">
            <Building className="h-6 w-6 text-fuchsia-400" />
          </div>
          <CardTitle className="text-xl text-center">New Partners</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <Button className="bg-[#860493] hover:bg-[#460F54] text-white font-medium">
            Register as Hotel Partner
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
