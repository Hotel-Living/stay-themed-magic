
import React from "react";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { currencyOptions } from "@/utils/themeConstants";

interface CurrencySettingsProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CurrencySettings: React.FC<CurrencySettingsProps> = ({
  currency,
  setCurrency
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency & Regional Preferences</CardTitle>
        <CardDescription>Customize how prices and regional information are displayed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#8017B0]">
        <div>
          <Label htmlFor="currency" className="text-base">Preferred Currency</Label>
          <div className="flex items-center gap-2 mt-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Select defaultValue={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full bg-fuchsia-950/50">
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

export default CurrencySettings;
