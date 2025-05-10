
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Payment, PaymentsState } from "./types";
import { format } from "date-fns";

export const usePayments = () => {
  const [state, setState] = useState<PaymentsState>({
    payments: [],
    loading: true,
    error: null,
    searchTerm: "",
    statusFilter: "all",
    dateFilter: undefined,
    sortField: "created_at",
    sortDirection: "desc",
    page: 1,
    totalCount: 0,
    limit: 10
  });

  // Extract values from state for easier usage
  const {
    searchTerm,
    statusFilter,
    dateFilter,
    sortField,
    sortDirection,
    page,
    limit
  } = state;

  // Fetch payments from Supabase
  const fetchPayments = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Start building the query
      let query = supabase
        .from('payments')
        .select(`
          id,
          booking_id,
          user_id,
          hotel_id,
          amount,
          method,
          status,
          transaction_id,
          created_at,
          updated_at,
          hotel:hotels(name),
          booking:bookings(check_in, check_out)
        `, { 
          count: 'exact' 
        });
      
      // Apply filters
      if (searchTerm) {
        query = query.or(`hotel.name.ilike.%${searchTerm}%`);
      }
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      if (dateFilter) {
        const dateStr = format(dateFilter, 'yyyy-MM-dd');
        query = query.gte('created_at', `${dateStr}T00:00:00.000Z`)
                    .lt('created_at', `${dateStr}T23:59:59.999Z`);
      }
      
      // Apply sorting
      query = query.order(sortField, { ascending: sortDirection === 'asc' });
      
      // Apply pagination
      query = query.range((page - 1) * limit, page * limit - 1);
      
      // Execute the query
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        payments: data as Payment[],
        loading: false,
        totalCount: count || 0
      }));
    } catch (error) {
      console.error('Error fetching payments:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch payments. Please try again later.'
      }));
    }
  };

  // Fetch payments when filters, sort, or pagination changes
  useEffect(() => {
    fetchPayments();
  }, [searchTerm, statusFilter, dateFilter, sortField, sortDirection, page, limit]);

  // Handle sort changes
  const handleSort = (field: string) => {
    setState(prev => ({
      ...prev,
      sortField: field,
      sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setState(prev => ({
      ...prev,
      page: newPage
    }));
  };

  // Calculate total pages for pagination
  const totalPages = useMemo(() => {
    return Math.ceil(state.totalCount / state.limit);
  }, [state.totalCount, state.limit]);

  return {
    ...state,
    handleSort,
    handlePageChange,
    totalPages,
    setSearchTerm: (term: string) => setState(prev => ({ ...prev, searchTerm: term, page: 1 })),
    setStatusFilter: (status: string) => setState(prev => ({ ...prev, statusFilter: status, page: 1 })),
    setDateFilter: (date: Date | undefined) => setState(prev => ({ ...prev, dateFilter: date, page: 1 }))
  };
};
