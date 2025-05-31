
import React from "react";
import { MapPin, Clock, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AffinityFiltersProps {
  countries: string[];
  experiences: string[];
  selectedCountry: string;
  selectedExperience: string;
  selectedDuration: string;
  onCountryChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}

export const AffinityFilters = ({
  countries,
  experiences,
  selectedCountry,
  selectedExperience,
  selectedDuration,
  onCountryChange,
  onExperienceChange,
  onDurationChange
}: AffinityFiltersProps) => {
  const durationOptions = [
    { value: "8", label: "8 days" },
    { value: "16", label: "16 days" },
    { value: "24", label: "24 days" },
    { value: "32", label: "32 days" }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Country Filter */}
      <div className="relative">
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="w-full sm:w-48 bg-fuchsia-950/30 border-fuchsia-900/20 text-white">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-fuchsia-400 mr-2" />
              <SelectValue placeholder="Any Country" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#5A0080] border-fuchsia-900/20">
            <SelectItem value="" className="text-white hover:bg-fuchsia-500/20">
              Any Country
            </SelectItem>
            {countries.map((country) => (
              <SelectItem 
                key={country} 
                value={country} 
                className="text-white hover:bg-fuchsia-500/20"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experience Filter */}
      <div className="relative">
        <Select value={selectedExperience} onValueChange={onExperienceChange}>
          <SelectTrigger className="w-full sm:w-48 bg-fuchsia-950/30 border-fuchsia-900/20 text-white">
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 text-fuchsia-400 mr-2" />
              <SelectValue placeholder="Any Experience" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#5A0080] border-fuchsia-900/20">
            <SelectItem value="" className="text-white hover:bg-fuchsia-500/20">
              Any Experience
            </SelectItem>
            {experiences.map((experience) => (
              <SelectItem 
                key={experience} 
                value={experience} 
                className="text-white hover:bg-fuchsia-500/20"
              >
                {experience}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Filter */}
      <div className="relative">
        <Select value={selectedDuration} onValueChange={onDurationChange}>
          <SelectTrigger className="w-full sm:w-48 bg-fuchsia-950/30 border-fuchsia-900/20 text-white">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-fuchsia-400 mr-2" />
              <SelectValue placeholder="Any Duration" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#5A0080] border-fuchsia-900/20">
            <SelectItem value="" className="text-white hover:bg-fuchsia-500/20">
              Any Duration
            </SelectItem>
            {durationOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value} 
                className="text-white hover:bg-fuchsia-500/20"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
