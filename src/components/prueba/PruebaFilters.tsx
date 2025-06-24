
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Download, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Filter {
  id: string;
  category: string;
  value: string;
  created_at: string;
}

export default function PruebaFilters() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("countries");
  const { toast } = useToast();

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const { data, error } = await supabase
        .from('filters')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setFilters(data || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
      toast({
        title: "Error",
        description: "Failed to fetch filters",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteFilter = async (filterId: string) => {
    try {
      const { error } = await supabase
        .from('filters')
        .delete()
        .eq('id', filterId);

      if (error) throw error;

      setFilters(prev => prev.filter(filter => filter.id !== filterId));
      toast({
        description: "Filter deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting filter:', error);
      toast({
        title: "Error",
        description: "Failed to delete filter",
        variant: "destructive"
      });
    }
  };

  const getFiltersByCategory = (category: string) => {
    return filters.filter(filter => 
      filter.category === category && 
      filter.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const FilterTable = ({ category, title }: { category: string; title: string }) => {
    const categoryFilters = getFiltersByCategory(category);
    
    return (
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">{title} ({categoryFilters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-600">
                  <th className="text-left p-3 text-white">Value</th>
                  <th className="text-left p-3 text-white">Created</th>
                  <th className="text-left p-3 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryFilters.map((filter) => (
                  <tr key={filter.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
                    <td className="p-3 text-white font-medium">{filter.value}</td>
                    <td className="p-3 text-white/80">
                      {new Date(filter.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                          onClick={() => deleteFilter(filter.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-6">
            <div className="text-center text-white">Loading filters...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Filter Management</h2>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search Controls */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search filters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-purple-900/20 border border-purple-800/30">
          <TabsTrigger value="countries" className="data-[state=active]:bg-purple-700">
            Countries
          </TabsTrigger>
          <TabsTrigger value="months" className="data-[state=active]:bg-purple-700">
            Months
          </TabsTrigger>
          <TabsTrigger value="price_ranges" className="data-[state=active]:bg-purple-700">
            Price Ranges
          </TabsTrigger>
          <TabsTrigger value="amenities" className="data-[state=active]:bg-purple-700">
            Amenities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="countries">
          <FilterTable category="countries" title="Countries" />
        </TabsContent>

        <TabsContent value="months">
          <FilterTable category="months" title="Months" />
        </TabsContent>

        <TabsContent value="price_ranges">
          <FilterTable category="price_ranges" title="Price Ranges" />
        </TabsContent>

        <TabsContent value="amenities">
          <FilterTable category="amenities" title="Amenities" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
