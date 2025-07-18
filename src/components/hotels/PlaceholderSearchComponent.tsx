
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

// This is a placeholder component - DO NOT USE in production
// The real search functionality is in the FilterSection and HotelResultsGrid components
export function PlaceholderSearchComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800 font-semibold">
          ⚠️ This is a placeholder component. Use FilterSection and HotelResultsGrid instead.
        </p>
      </div>
      
      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Hotels (Placeholder)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Where to?" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Select>
                <SelectTrigger>
                  <Users className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">&nbsp;</label>
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Search Results (Placeholder)</h2>
        
        {/* Placeholder for results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Hotel Name {item}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Beautiful hotel in prime location
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">$199/night</span>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
