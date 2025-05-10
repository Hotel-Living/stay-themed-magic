
import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { PaymentsTable } from "./payments/PaymentsTable";
import { PaymentsFilter } from "./payments/PaymentsFilter";
import { PaymentsPagination } from "./payments/PaymentsPagination";
import { usePayments } from "./payments/usePayments";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { format } from "date-fns";

export default function AdminPaymentsPanel() {
  const {
    payments,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    sortField,
    sortDirection,
    page,
    totalPages,
    handleSort,
    handlePageChange
  } = usePayments();

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
      minimumFractionDigits: 2
    }).format(price);
  };

  // Function to export filtered payments to Excel
  const exportToExcel = () => {
    const rows = payments.map(payment => ({
      'Guest': `${payment.user?.first_name || ''} ${payment.user?.last_name || ''}`,
      'Hotel': payment.hotel?.name || 'Unknown Hotel',
      'Amount': formatPrice(payment.amount),
      'Method': payment.method,
      'Status': payment.status,
      'Date': formatDate(payment.created_at)
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Payments");
    writeFile(workbook, `payments_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Payment Management</h2>
          <Button 
            onClick={exportToExcel} 
            disabled={payments.length === 0 || loading}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        {/* Search and filter controls */}
        <PaymentsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <PaymentsTable
            payments={payments}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />

          {/* Pagination */}
          <PaymentsPagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
