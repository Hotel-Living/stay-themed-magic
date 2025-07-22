
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth/AuthContext';

export const useJotFormToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrCreateToken = async () => {
      if (!user) {
        setError('User not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        // First check if user already has a token
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('jotform_token')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (profile?.jotform_token) {
          setToken(profile.jotform_token);
        } else {
          // Generate new token
          const { data: newToken, error: tokenError } = await supabase
            .rpc('generate_jotform_token', { user_id: user.id });

          if (tokenError) {
            throw tokenError;
          }

          setToken(newToken);
        }
      } catch (err: any) {
        console.error('Error fetching/creating JotForm token:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrCreateToken();
  }, [user]);

  return { token, isLoading, error };
};
