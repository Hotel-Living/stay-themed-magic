
import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { BookingsTable } from "./bookings/BookingsTable";
import { BookingsFilter } from "./bookings/BookingsFilter";
import { BookingsPagination } from "./bookings/BookingsPagination";
import { useBookings } from "./bookings/useBookings";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { format } from "date-fns";

export default function AdminBookingsPanel() {
  const {
    bookings,
    loading,
    searchTerm,
    setSearchTerm,
    searchHotel,
    setSearchHotel,
    searchUser,
    setSearchUser,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    sortField,
    sortDirection,
    page,
    totalCount,
    limit,
    handleSort,
    handlePageChange,
    updateBookingStatus
  } = useBookings();

  const totalPages = Math.ceil(totalCount / limit);

  // Format dates for display and export
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Format price for display and export
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Function to export filtered bookings to CSV/Excel
  const exportToExcel = () => {
    const rows = bookings.map(booking => ({
      'Hotel': booking.hotel?.name || 'Unknown Hotel',
      'Guest': `${booking.user?.first_name || ''} ${booking.user?.last_name || ''}`,
      'Check-in': formatDate(booking.check_in),
      'Check-out': formatDate(booking.check_out),
      'Total Price': formatPrice(booking.total_price),
      'Status': booking.status
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Bookings");
    writeFile(workbook, `bookings_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Bookings Management</h2>
          <Button 
            onClick={exportToExcel} 
            disabled={bookings.length === 0 || loading}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        {/* Enhanced search and filter controls */}
        <BookingsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchHotel={searchHotel}
          setSearchHotel={setSearchHotel}
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <BookingsTable
            bookings={bookings}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            updateBookingStatus={updateBookingStatus}
          />

          {/* Pagination */}
          <BookingsPagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
