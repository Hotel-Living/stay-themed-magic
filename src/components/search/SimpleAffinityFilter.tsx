import React, { useState } from "react";
import { FilterItem } from "./FilterItem";
import { useAffinitiesDataWithLanguage } from "@/hooks/useAffinitiesDataWithLanguage";
import { Search } from "lucide-react";

interface SimpleAffinityFilterProps {
  activeAffinity: string | null;
  onChange: (value: string | null) => void;
  title: string;
}

export function SimpleAffinityFilter({ 
  activeAffinity, 
  onChange,
  title
}: SimpleAffinityFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: affinities = [], isLoading } = useAffinitiesDataWithLanguage();

  // Filter affinities based on search query
  const filteredAffinities = Array.isArray(affinities) ? affinities.filter(affinity =>
    affinity.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAffinitySelect = (affinityName: string) => {
    if (activeAffinity === affinityName) {
      onChange(null); // Deselect if already selected
    } else {
      onChange(affinityName); // Select new affinity
    }
  };

  return (
    <FilterItem title={title}>
      <div 
        className="bg-fuchsia-950/30 rounded-lg max-h-96 overflow-y-auto" 
        onClick={handleContainerClick}
      >
        {/* Search Input */}
        <div className="p-2 border-b border-fuchsia-800/30" onClick={handleSearchClick}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fuchsia-300" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              className="w-full pl-8 pr-3 py-1.5 bg-fuchsia-900/30 border border-fuchsia-700/50 rounded-md text-sm text-white placeholder:text-fuchsia-300/70 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>
        
        {/* Affinities List */}
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="text-center py-4 text-fuchsia-300">Cargando...</div>
          ) : filteredAffinities.length > 0 ? (
            filteredAffinities.map((affinity) => (
              <div
                key={affinity.id}
                className="flex items-center space-x-2 p-1 hover:bg-fuchsia-900/20 rounded cursor-pointer"
                onClick={() => handleAffinitySelect(affinity.name)}
              >
                <input
                  type="radio"
                  checked={activeAffinity === affinity.name}
                  onChange={() => handleAffinitySelect(affinity.name)}
                  className="h-3 w-3 text-fuchsia-600 focus:ring-0"
                />
                <span className="text-sm text-white">{affinity.name}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-fuchsia-300">
              {searchQuery ? "No se encontraron afinidades" : "No hay afinidades disponibles"}
            </div>
          )}
        </div>
      </div>
    </FilterItem>
  );
}