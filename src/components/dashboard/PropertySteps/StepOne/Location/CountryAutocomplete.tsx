import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountryAutocompleteProps {
  countries: Country[];
  value: string;
  onChange: (countryCode: string) => void;
  onBlur: () => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

export default function CountryAutocomplete({
  countries,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  className = "",
  error = false
}: CountryAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get selected country display text (handle full country names)
  const selectedCountry = countries.find(country => 
    country.name === value || country.code === value || country.code.toLowerCase() === value
  );
  const displayText = selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : "";

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Clear current selection if user is typing
    if (selectedCountry && term !== displayText) {
      onChange("");
    }

    // If the search matches exactly one country, auto-select it
    if (term && filteredCountries.length === 1) {
      const match = filteredCountries[0];
      if (match.name.toLowerCase() === term.toLowerCase()) {
        onChange(match.name);
        setIsOpen(false);
      }
    }
  };

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    // Save full country name to match standardized database format
    console.log(`🌍 COUNTRY SELECTION: Saving "${country.name}" for ${country.name}`);
    onChange(country.name);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true);
        setHighlightedIndex(filteredCountries.length > 0 ? 0 : -1);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        } else if (filteredCountries.length === 1) {
          // If only one result, select it
          handleCountrySelect(filteredCountries[0]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
    setSearchTerm(selectedCountry ? "" : "");
  };

  // Handle input blur
  const handleBlur = (e: React.FocusEvent) => {
    // Only close if we're not clicking on the dropdown
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setSearchTerm("");
      setHighlightedIndex(-1);
      onBlur();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : displayText}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`${className} pr-8`}
          autoComplete="off"
        />
        <ChevronDown 
          className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </div>

      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-[#7A0486] border border-fuchsia-800/30 rounded-lg shadow-lg"
        >
          {filteredCountries.length === 0 ? (
            <div className="p-2 text-sm text-gray-400">
              No countries found
            </div>
          ) : (
            filteredCountries.map((country, index) => (
              <div
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className={`p-2 cursor-pointer text-white text-sm hover:bg-fuchsia-700/50 transition-colors ${
                  index === highlightedIndex ? "bg-fuchsia-700/50" : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {country.flag} {country.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}