import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Eye, Edit, Trash2, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/hotels/PaginationControls";

interface HotelData {
  id: string;
  name: string;
  location: string;
  owner: string;
  price: number;
  status: 'approved' | 'pending' | 'rejected';
  created: string;
  main_image_url?: string;
}

const mockHotels: HotelData[] = [
  {
    id: "1",
    name: "Luxury Hotel Madrid",
    location: "Madrid, Spain",
    owner: "John Doe",
    price: 1200,
    status: "approved",
    created: "2023-01-15",
    main_image_url: "https://source.unsplash.com/random/200x200?hotel"
  },
  {
    id: "2",
    name: "Beachfront Resort Barcelona",
    location: "Barcelona, Spain",
    owner: "Alice Smith",
    price: 1500,
    status: "pending",
    created: "2023-02-20",
    main_image_url: "https://source.unsplash.com/random/200x200?beach"
  },
  {
    id: "3",
    name: "Cozy Inn Seville",
    location: "Seville, Spain",
    owner: "Bob Johnson",
    price: 900,
    status: "approved",
    created: "2023-03-10",
    main_image_url: "https://source.unsplash.com/random/200x200?inn"
  },
  {
    id: "4",
    name: "Modern Hotel Valencia",
    location: "Valencia, Spain",
    owner: "Emily Brown",
    price: 1100,
    status: "rejected",
    created: "2023-04-05",
    main_image_url: "https://source.unsplash.com/random/200x200?modern"
  },
  {
    id: "5",
    name: "Historic Hotel Granada",
    location: "Granada, Spain",
    owner: "David Wilson",
    price: 1300,
    status: "approved",
    created: "2023-05-12",
    main_image_url: "https://source.unsplash.com/random/200x200?historic"
  },
  {
    id: "6",
    name: "City Center Hotel Lisbon",
    location: "Lisbon, Portugal",
    owner: "Sophia Martinez",
    price: 1400,
    status: "pending",
    created: "2023-06-18",
    main_image_url: "https://source.unsplash.com/random/200x200?city"
  },
  {
    id: "7",
    name: "Mountain View Lodge Porto",
    location: "Porto, Portugal",
    owner: "Carlos Pereira",
    price: 1000,
    status: "approved",
    created: "2023-07-22",
    main_image_url: "https://source.unsplash.com/random/200x200?mountain"
  },
  {
    id: "8",
    name: "Riverside Hotel Coimbra",
    location: "Coimbra, Portugal",
    owner: "Isabel Santos",
    price: 1150,
    status: "rejected",
    created: "2023-08-01",
    main_image_url: "https://source.unsplash.com/random/200x200?river"
  },
  {
    id: "9",
    name: "Coastal Retreat Algarve",
    location: "Algarve, Portugal",
    owner: "Ricardo Oliveira",
    price: 1600,
    status: "approved",
    created: "2023-09-07",
    main_image_url: "https://source.unsplash.com/random/200x200?coastal"
  },
  {
    id: "10",
    name: "Charming Guesthouse Evora",
    location: "Evora, Portugal",
    owner: "Ana Costa",
    price: 850,
    status: "pending",
    created: "2023-10-14",
    main_image_url: "https://source.unsplash.com/random/200x200?guesthouse"
  }
];

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<HotelData[]>(mockHotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredHotels = hotels.filter(hotel => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const statusRegex = new RegExp(statusFilter, 'i');
    const locationRegex = new RegExp(locationFilter, 'i');
    const ownerRegex = new RegExp(ownerFilter, 'i');

    return searchRegex.test(hotel.name) &&
           statusRegex.test(hotel.status) &&
           locationRegex.test(hotel.location) &&
           ownerRegex.test(hotel.owner);
  });

  return (
    <div className="space-y-6">
      <Card className="bg-[#670e85] border-purple-400/20">
        <CardHeader className="bg-[#670e85] text-white border-b border-purple-400/20">
          <CardTitle className="flex items-center gap-2 text-white">
            <Hotel className="w-5 h-5 text-white" />
            Hotels Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-[#670e85]">
          {/* Search and Filter Controls */}
          <div className="p-4 border-b border-purple-400/20 bg-[#670e85]">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
                  <Input
                    placeholder="Search hotels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-purple-900/50 border-purple-400/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-purple-800/50 border-purple-400/30 text-white hover:bg-purple-700/50"
                >
                  <Filter className="w-4 h-4 mr-2 text-white" />
                  Filters
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-purple-800/50 border-purple-400/30 text-white hover:bg-purple-700/50"
                >
                  <Download className="w-4 h-4 mr-2 text-white" />
                  Export
                </Button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-400/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-purple-800/50 border border-purple-400/30 rounded-md text-white"
                    >
                      <option value="">All Statuses</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Location</label>
                    <select 
                      value={locationFilter} 
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-purple-800/50 border border-purple-400/30 rounded-md text-white"
                    >
                      <option value="">All Locations</option>
                      <option value="Spain">Spain</option>
                      <option value="Portugal">Portugal</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Owner</label>
                    <Input
                      placeholder="Filter by owner..."
                      value={ownerFilter}
                      onChange={(e) => setOwnerFilter(e.target.value)}
                      className="bg-purple-800/50 border-purple-400/30 text-white placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hotels Table */}
          <div className="overflow-x-auto bg-[#670e85]">
            <table className="w-full">
              <thead className="bg-[#670e85] border-b border-purple-400/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-purple-400/30" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Price/Month</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#670e85] divide-y divide-purple-400/20">
                {filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-purple-800/30">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-purple-400/30" />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center border border-purple-400/20">
                        {hotel.main_image_url ? (
                          <img 
                            src={hotel.main_image_url} 
                            alt={hotel.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Hotel className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{hotel.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">{hotel.location}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">{hotel.owner}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">€{hotel.price}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge 
                        variant={hotel.status === 'approved' ? 'default' : hotel.status === 'pending' ? 'secondary' : 'destructive'}
                        className="capitalize"
                      >
                        {hotel.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">{hotel.created}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-200 hover:text-white hover:bg-purple-700/50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-200 hover:text-white hover:bg-purple-700/50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-200 hover:text-white hover:bg-purple-700/50"
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

          {/* Pagination */}
          <div className="p-4 bg-[#670e85] border-t border-purple-400/20">
            <PaginationControls
              currentPage={currentPage}
              totalPages={Math.ceil(filteredHotels.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredHotels.length}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
