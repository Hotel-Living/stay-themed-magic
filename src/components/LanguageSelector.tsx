
import React from "react";
import { Languages } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  const languages = [
    { code: "en", name: t("lang.en") },
    { code: "es", name: t("lang.es") },
    { code: "fr", name: t("lang.fr") },
    { code: "de", name: t("lang.de") },
    { code: "it", name: t("lang.it") },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "icon"} 
          className="text-white flex items-center gap-1"
        >
          <Languages className="h-4 w-4" />
          {isMobile && <span>{t("lang.select")}</span>}
          <span className="sr-only">{t("lang.select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={language === lang.code ? "bg-fuchsia-500/20 text-fuchsia-400" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
