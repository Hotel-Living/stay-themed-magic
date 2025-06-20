import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
interface FaqSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}
export function FaqSearch({
  searchQuery,
  setSearchQuery,
  placeholder = "Search FAQs...",
  debounceMs = 300
}: FaqSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery, debounceMs]);
  useEffect(() => {
    if (searchQuery !== inputValue) {
      setInputValue(searchQuery);
    }
  }, [searchQuery]);
  const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };
  return <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#FFF9B0]" />
      </div>
      
      
      
      {inputValue && <button onClick={handleClearSearch} className="absolute inset-y-0 right-4 flex items-center text-[#FFF9B0] hover:text-[#FFF9B0]/80 transition-colors" aria-label="Clear search" type="button">
          <X className="h-5 w-5" />
        </button>}
    </div>;
}