
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
import { useTranslation } from "@/hooks/useTranslation";

interface LanguagePreferencesCardProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const LanguagePreferencesCard: React.FC<LanguagePreferencesCardProps> = ({
  language,
  setLanguage
}) => {
  const { t, changeLanguage } = useTranslation();

  // Language options
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "ro", label: "Română" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "ru", label: "Русский" },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>{t('navigation.language')} Preferences</CardTitle>
        <CardDescription className="text-gray-200">Choose your preferred language for the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#860493]">
        <div>
          <Label htmlFor="language" className="text-base text-white">Preferred Language</Label>
          <div className="flex items-center gap-2 mt-2">
            <Globe className="h-5 w-5 text-gray-300" />
            <Select defaultValue={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full bg-fuchsia-950/50 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
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
