
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toneFilter: ResponseTone | 'all';
  setToneFilter: (tone: ResponseTone | 'all') => void;
}

export function TemplateSearch({ 
  searchQuery, 
  setSearchQuery, 
  toneFilter, 
  setToneFilter 
}: TemplateSearchProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52">
          <div className="space-y-2">
            <h4 className="font-medium">Filter by tone</h4>
            <Select 
              value={toneFilter} 
              onValueChange={(value) => setToneFilter(value as ResponseTone | 'all')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tones</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="grateful">Grateful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
