
import { Review } from '@/hooks/hotel-detail/types';

// Define a dashboard-specific review interface that extends the base Review type
export interface DashboardReview {
  id: string;
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
  isResponded?: boolean;
  response?: string;
  // Include required fields from the imported Review type
  hotel_id: string;
  user_id: string;
  created_at?: string;
}
