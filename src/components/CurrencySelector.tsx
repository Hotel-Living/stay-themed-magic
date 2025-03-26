
import React from "react";
import { 
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
  IndianRupee,
  SwissFranc
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useCurrency, CurrencyCode } from "@/context/CurrencyContext";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Map of currency codes to their corresponding icons
  const currencyIcons: Record<CurrencyCode, React.ReactNode> = {
    USD: <DollarSign className="h-4 w-4" />,
    EUR: <Euro className="h-4 w-4" />,
    GBP: <PoundSterling className="h-4 w-4" />,
    JPY: <JapaneseYen className="h-4 w-4" />,
    INR: <IndianRupee className="h-4 w-4" />,
    CHF: <SwissFranc className="h-4 w-4" />
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "icon"} 
          className="text-white flex items-center gap-1"
        >
          {currencyIcons[currency.code]}
          {isMobile && <span>{currency.code}</span>}
          <span className="sr-only">Select Currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={currency.code === curr.code ? "bg-fuchsia-500/20 text-fuchsia-400" : ""}
          >
            <div className="flex items-center gap-2">
              {currencyIcons[curr.code]}
              <span>{curr.code} - {curr.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
