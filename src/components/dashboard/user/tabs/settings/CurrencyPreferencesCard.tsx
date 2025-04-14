
import React from "react";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface CurrencyPreferencesCardProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrencyPreferencesCard: React.FC<CurrencyPreferencesCardProps> = ({
  currency,
  setCurrency
}) => {
  // Currency options
  const currencyOptions = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "CNY", label: "Chinese Yuan (CNY)" },
  ];

  return (
    <Card>
      <CardHeader className="bg-[#860493] text-white pb-2 border-b border-fuchsia-800">
        <CardTitle>Currency & Regional Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#860493]">
        <div>
          <Label htmlFor="currency" className="text-base text-white">Preferred Currency</Label>
          <div className="flex items-center gap-2 mt-2">
            <Globe className="h-5 w-5 text-gray-300" />
            <Select defaultValue={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full bg-fuchsia-950/50 text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
