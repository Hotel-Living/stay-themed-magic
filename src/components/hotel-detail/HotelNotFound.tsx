
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HotelNotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="container max-w-6xl mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Hotel not found</h1>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("hotel.back")}
      </Link>
    </div>
  );
}
