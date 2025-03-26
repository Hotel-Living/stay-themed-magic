
import { Booking } from '@/integrations/supabase/types-custom';

export const mockBookings: {
  emmaBooking: Booking;
  michaelBooking: Booking;
  sarahBooking: Booking;
} = {
  emmaBooking: {
    id: "1",
    user_id: "user1",
    hotel_id: "hotel1",
    check_in: "2023-11-15",
    check_out: "2023-11-23",
    total_price: 1200,
    status: "confirmed" as const,
    created_at: "2023-10-01",
    updated_at: "2023-10-01"
  },
  michaelBooking: {
    id: "2",
    user_id: "user2",
    hotel_id: "hotel2",
    check_in: "2023-12-05",
    check_out: "2023-12-21",
    total_price: 2400,
    status: "pending" as const,
    created_at: "2023-11-01",
    updated_at: "2023-11-01"
  },
  sarahBooking: {
    id: "3",
    user_id: "user3",
    hotel_id: "hotel1",
    check_in: "2024-01-10",
    check_out: "2024-01-18",
    total_price: 1500,
    status: "confirmed" as const,
    created_at: "2023-12-01",
    updated_at: "2023-12-01"
  }
};
