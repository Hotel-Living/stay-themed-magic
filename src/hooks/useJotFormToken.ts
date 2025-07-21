import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useJotFormToken = () => {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateOrGetToken = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // First, check if user already has a token
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('jotform_token')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw new Error(`Error fetching profile: ${profileError.message}`);
        }

        if (profile?.jotform_token) {
          // User already has a token
          setToken(profile.jotform_token);
        } else {
          // Generate a new token for the user
          const { data: newToken, error: generateError } = await supabase.rpc(
            'generate_jotform_token',
            { user_id: user.id }
          );

          if (generateError) {
            throw new Error(`Error generating token: ${generateError.message}`);
          }

          setToken(newToken);
        }
      } catch (err) {
        console.error('Error managing JotForm token:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    generateOrGetToken();
  }, [user]);

  return { token, isLoading, error };
};