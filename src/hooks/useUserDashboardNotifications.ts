
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface DashboardNotification {
  id: string;
  hotel_id: string;
  type: 'availability' | 'price';
  created_at: string;
  hotel: {
    name: string;
    city: string;
    country: string;
    main_image_url: string | null;
  };
}

export const useUserDashboardNotifications = () => {
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_notifications')
        .select(`
          id,
          hotel_id,
          type,
          created_at,
          hotels (
            name,
            city,
            country,
            main_image_url
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching dashboard notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('user_notifications')
        .update({ is_active: false })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return {
    notifications,
    loading,
    removeNotification,
    refetch: fetchNotifications
  };
};
