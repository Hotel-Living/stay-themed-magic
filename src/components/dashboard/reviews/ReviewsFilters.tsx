
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewsFiltersProps {
  activeTab: string;
  sortOption: string;
  ratingFilter: number | null;
  onTabChange: (tab: string) => void;
  onSortChange: (sort: string) => void;
  onRatingFilterChange: (rating: number | null) => void;
}

export function ReviewsFilters({
  activeTab,
  sortOption,
  ratingFilter,
  onTabChange,
  onSortChange,
  onRatingFilterChange
}: ReviewsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
      <Tabs value={activeTab} className="w-full max-w-md" onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2 items-center">
        <SlidersHorizontal className="h-4 w-4 text-foreground/70" />
        <Select
          value={sortOption}
          onValueChange={(value) => onSortChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={ratingFilter ? ratingFilter.toString() : 'all'}
          onValueChange={(value) => onRatingFilterChange(value === 'all' ? null : Number(value))}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars Only</SelectItem>
            <SelectItem value="4">4 Stars Only</SelectItem>
            <SelectItem value="3">3 Stars Only</SelectItem>
            <SelectItem value="2">2 Stars Only</SelectItem>
            <SelectItem value="1">1 Star Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
