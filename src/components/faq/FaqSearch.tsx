
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FaqSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export function FaqSearch({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Search FAQs..." 
}: FaqSearchProps) {
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-fuchsia-400" />
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10 py-2 bg-[#570366]/50 border border-fuchsia-800/20 rounded-lg text-white shadow-md focus:ring-2 focus:ring-fuchsia-500/50"
      />
      
      {searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-3 flex items-center text-fuchsia-400 hover:text-fuchsia-300"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
