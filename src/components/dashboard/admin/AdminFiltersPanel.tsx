
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminFiltersPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Filter Management</h2>
      </div>

      <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
        <Tabs defaultValue="countries">
          <TabsList className="mb-6">
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="months">Months</TabsTrigger>
            <TabsTrigger value="price">Price Ranges</TabsTrigger>
            <TabsTrigger value="stars">Star Ratings</TabsTrigger>
            <TabsTrigger value="property">Property Types</TabsTrigger>
          </TabsList>
          
          <TabsContent value="countries" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["France", "Italy", "Spain", "Greece", "Portugal", "Germany", "Switzerland", "United Kingdom", "United States", "Canada", "Japan", "Thailand"].map(country => (
                <div key={country} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span>{country}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="months" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                <div key={month} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span>{month}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="price" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["$0-$500", "$500-$1000", "$1000-$1500", "$1500-$2000", "$2000-$3000", "$3000+"].map(range => (
                <div key={range} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span>{range}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stars" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map(rating => (
                <div key={rating} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span>{rating}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="property" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Hotel", "Apartment", "Resort", "Villa", "Cottage", "Cabin", "Hostel"].map(type => (
                <div key={type} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
