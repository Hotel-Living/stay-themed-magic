
import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { HotelFilters } from "./hotels/HotelFilters";
import { HotelTable } from "./hotels/HotelTable";
import { HotelCard } from "./hotels/HotelCard";
import { HotelPagination } from "./hotels/HotelPagination";
import { LoadingState } from "./hotels/LoadingState";
import { useHotelsData } from "./hooks/useHotelsData";
import { useHotelFiltering } from "./hotels/hooks/useHotelFiltering";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { utils, writeFile } from "xlsx";
import { Download, RefreshCw } from "lucide-react";

export default function AdminHotelsPanel() {
  const [page, setPage] = useState(1);
  const limit = 15;
  const { hotels, loading, fetchAllHotels } = useHotelsData();
  const { 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    countryFilter,
    setCountryFilter,
    filteredHotels 
  } = useHotelFiltering(hotels);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const totalPages = Math.ceil(filteredHotels.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedHotels = filteredHotels.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const exportHotels = () => {
    const dataToExport = filteredHotels.map(hotel => ({
      'Hotel Name': hotel.name || '-',
      'City': hotel.city || '-',
      'Country': hotel.country || '-',
      'Status': hotel.status === 'approved' ? 'Published' : (hotel.status || 'Unknown'),
      'Price/Month': hotel.price_per_month ? `€${hotel.price_per_month}` : '-',
      'Category': hotel.category ? `${hotel.category} Stars` : '-',
      'Owner': hotel.profiles ? `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'Unknown' : 'Unknown',
      'Created': new Date(hotel.created_at).toLocaleDateString(),
      'Featured': hotel.is_featured ? 'Yes' : 'No'
    }));

    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Hotels");
    writeFile(wb, "hotels_export.xlsx");
  };

  const handleRefresh = () => {
    fetchAllHotels();
    setPage(1);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <LoadingState />
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Hotel Management</h2>
            <p className="text-gray-600 mt-1">
              Total: {hotels.length} hotels | Showing: {filteredHotels.length} | 
              Published: {hotels.filter(h => h.status === 'approved').length} | 
              Pending: {hotels.filter(h => h.status === 'pending').length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={exportHotels}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export to Excel
            </Button>
          </div>
        </div>

        {/* Search and filter controls */}
        <HotelFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          hotels={hotels}
        />

        <div className="rounded-xl p-6 bg-[#7a0486]">
          {isMobile ? (
            <div className="space-y-4">
              {paginatedHotels.length > 0 ? (
                paginatedHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))
              ) : (
                <div className="text-center py-8 text-white">No hotels found</div>
              )}
            </div>
          ) : (
            <HotelTable hotels={paginatedHotels} />
          )}

          {/* Pagination */}
          <HotelPagination 
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
