
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminPaymentsPanel() {
  // This is a placeholder component - would normally fetch payment data from an API
  const mockPayments = [
    { id: 1, booking: "BK12345", user: "John Doe", amount: 1250, date: "2023-06-15", status: "completed" },
    { id: 2, booking: "BK12346", user: "Jane Smith", amount: 980, date: "2023-06-18", status: "pending" },
    { id: 3, booking: "BK12347", user: "Robert Johnson", amount: 1450, date: "2023-06-20", status: "completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Management</h2>
      </div>

      <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Booking Reference</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map(payment => (
              <TableRow key={payment.id}>
                <TableCell>#{payment.id}</TableCell>
                <TableCell>{payment.booking}</TableCell>
                <TableCell>{payment.user}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
