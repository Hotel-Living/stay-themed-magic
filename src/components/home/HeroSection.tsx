
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-4 px-4 overflow-hidden">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight" 
            style={{
              background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
              backgroundSize: '200% 200%',
              animation: 'text-shine 2s linear infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
          {t("hero.title")}
        </h1>
        
        <p className="text-xl md:text-3xl mb-10 max-w-5xl mx-auto tracking-tight font-bold"
           style={{
             background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
             backgroundSize: '200% 200%',
             animation: 'text-shine 2s linear infinite',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent'
           }}>
          {t("hero.subtitle")}
        </p>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
          <div className="space-y-0.5">
            {[
              t("services.services.verified.title"), 
              t("services.services.support.title")
            ].map((slogan, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-left font-medium">{slogan}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-0.5">
            {[
              t("services.services.flexible.title"), 
              t("services.services.payments.title")
            ].map((slogan, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-left font-medium">{slogan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
