
import React from "react";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { currencyOptions } from "@/utils/themeConstants";

interface CurrencyPreferencesCardProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CurrencyPreferencesCard: React.FC<CurrencyPreferencesCardProps> = ({
  currency,
  setCurrency
}) => {
  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>Currency & Regional Preferences</CardTitle>
        <CardDescription className="text-gray-200">Customize how prices and regional information are displayed</CardDescription>
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
