
import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { BookingsTable } from "./bookings/BookingsTable";
import { BookingsFilter } from "./bookings/BookingsFilter";
import { BookingsPagination } from "./bookings/BookingsPagination";
import { useBookings } from "./bookings/useBookings";

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

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Bookings Management</h2>
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
