
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

export function MapKeyTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testEdgeFunction = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Testing get-maps-key edge function...');
      
      const { data, error: functionError } = await supabase.functions.invoke('get-maps-key');
      
      if (functionError) {
        console.error('Edge function error:', functionError);
        setError(`Edge function error: ${functionError.message}`);
        return;
      }

      console.log('Edge function response:', data);
      setResult(data);
      
    } catch (err) {
      console.error('Test error:', err);
      setError(`Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Google Maps API Key Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testEdgeFunction} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Testing...' : 'Test Edge Function'}
        </Button>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {result && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
            <strong>Success:</strong>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
