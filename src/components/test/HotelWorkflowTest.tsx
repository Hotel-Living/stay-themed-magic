import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
  duration?: number;
}

export const HotelWorkflowTest: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result]);
  };

  const runComprehensiveTest = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to run tests",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setResults([]);

    try {
      // Test 1: Create hotel with related data
      addResult({ test: "Creating test hotel", status: 'pending', message: "Starting..." });
      
      const testHotelData = {
        owner_id: user.id,
        name: `Test Hotel ${Date.now()}`,
        description: "Test hotel for workflow validation",
        country: "Test Country",
        city: "Test City",
        address: "Test Address",
        contact_name: "Test Contact",
        contact_email: "test@example.com",
        contact_phone: "123456789",
        property_type: "hotel",
        style: "modern",
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        version: 1
      };

      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .insert(testHotelData)
        .select()
        .single();

      if (hotelError || !hotel) {
        addResult({ 
          test: "Create hotel", 
          status: 'fail', 
          message: `Failed: ${hotelError?.message || 'No hotel returned'}` 
        });
        return;
      }

      addResult({ 
        test: "Create hotel", 
        status: 'pass', 
        message: `Hotel created with ID: ${hotel.id}` 
      });

      // Test 2: Add related data
      addResult({ test: "Adding related data", status: 'pending', message: "Adding images, themes, activities..." });

      // Add hotel image
      const { error: imageError } = await supabase
        .from('hotel_images')
        .insert({
          hotel_id: hotel.id,
          image_url: 'https://example.com/test-image.jpg',
          is_main: true
        });

      if (imageError) {
        addResult({ 
          test: "Add hotel image", 
          status: 'fail', 
          message: `Failed: ${imageError.message}` 
        });
      } else {
        addResult({ 
          test: "Add hotel image", 
          status: 'pass', 
          message: "Image added successfully" 
        });
      }

      // Add availability package
      const { error: packageError } = await supabase
        .from('availability_packages')
        .insert({
          hotel_id: hotel.id,
          start_date: '2024-08-01',
          end_date: '2024-08-31',
          duration_days: 30,
          total_rooms: 5,
          available_rooms: 5
        });

      if (packageError) {
        addResult({ 
          test: "Add availability package", 
          status: 'fail', 
          message: `Failed: ${packageError.message}` 
        });
      } else {
        addResult({ 
          test: "Add availability package", 
          status: 'pass', 
          message: "Package added successfully" 
        });
      }

      // Test 3: Version control
      addResult({ test: "Testing version control", status: 'pending', message: "Testing concurrent editing protection..." });

      const { data: versionCheck } = await supabase
        .rpc('check_version_conflict', { 
          p_hotel_id: hotel.id, 
          p_expected_version: 1 
        });

      addResult({ 
        test: "Version conflict check", 
        status: versionCheck ? 'pass' : 'fail', 
        message: `Version check result: ${versionCheck}` 
      });

      // Test 4: Locking mechanism
      addResult({ test: "Testing locking mechanism", status: 'pending', message: "Testing hotel lock/unlock..." });

      const { data: lockResult } = await supabase
        .rpc('lock_hotel_for_editing', { 
          p_hotel_id: hotel.id, 
          p_lock: true 
        });

      if (lockResult) {
        addResult({ 
          test: "Acquire lock", 
          status: 'pass', 
          message: "Lock acquired successfully" 
        });

        // Check lock status
        const { data: lockedHotel } = await supabase
          .from('hotels')
          .select('is_locked, locked_by')
          .eq('id', hotel.id)
          .single();

        addResult({ 
          test: "Lock status verification", 
          status: lockedHotel?.is_locked ? 'pass' : 'fail', 
          message: `Lock status: ${lockedHotel?.is_locked}, Locked by: ${lockedHotel?.locked_by}` 
        });

        // Release lock
        const { data: unlockResult } = await supabase
          .rpc('lock_hotel_for_editing', { 
            p_hotel_id: hotel.id, 
            p_lock: false 
          });

        addResult({ 
          test: "Release lock", 
          status: unlockResult ? 'pass' : 'fail', 
          message: `Lock release result: ${unlockResult}` 
        });
      } else {
        addResult({ 
          test: "Acquire lock", 
          status: 'fail', 
          message: "Failed to acquire lock" 
        });
      }

      // Test 5: Admin review lock simulation
      addResult({ test: "Testing admin review lock", status: 'pending', message: "Simulating pending status..." });

      const { error: statusUpdateError } = await supabase
        .from('hotels')
        .update({ status: 'pending' })
        .eq('id', hotel.id);

      if (statusUpdateError) {
        addResult({ 
          test: "Set pending status", 
          status: 'fail', 
          message: `Failed: ${statusUpdateError.message}` 
        });
      } else {
        addResult({ 
          test: "Set pending status", 
          status: 'pass', 
          message: "Status set to pending" 
        });

        // Try to update hotel (should be blocked by RLS)
        const { error: blockedUpdateError } = await supabase
          .from('hotels')
          .update({ description: 'Updated description' })
          .eq('id', hotel.id);

        addResult({ 
          test: "Blocked edit during review", 
          status: blockedUpdateError ? 'pass' : 'fail', 
          message: blockedUpdateError ? "Edit correctly blocked" : "Edit should have been blocked" 
        });
      }

      // Test 6: Count related data before deletion
      addResult({ test: "Pre-deletion data count", status: 'pending', message: "Counting related records..." });

      const [imageCount, packageCount] = await Promise.all([
        supabase.from('hotel_images').select('id', { count: 'exact' }).eq('hotel_id', hotel.id),
        supabase.from('availability_packages').select('id', { count: 'exact' }).eq('hotel_id', hotel.id)
      ]);

      addResult({ 
        test: "Related data count", 
        status: 'pass', 
        message: `Images: ${imageCount.count}, Packages: ${packageCount.count}` 
      });

      // Test 7: Cascade deletion
      addResult({ test: "Testing cascade deletion", status: 'pending', message: "Deleting hotel..." });

      const { error: deleteError } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotel.id);

      if (deleteError) {
        addResult({ 
          test: "Delete hotel", 
          status: 'fail', 
          message: `Failed: ${deleteError.message}` 
        });
      } else {
        addResult({ 
          test: "Delete hotel", 
          status: 'pass', 
          message: "Hotel deleted successfully" 
        });

        // Verify related data was deleted
        const [postDeleteImageCount, postDeletePackageCount] = await Promise.all([
          supabase.from('hotel_images').select('id', { count: 'exact' }).eq('hotel_id', hotel.id),
          supabase.from('availability_packages').select('id', { count: 'exact' }).eq('hotel_id', hotel.id)
        ]);

        addResult({ 
          test: "Cascade deletion verification", 
          status: (postDeleteImageCount.count === 0 && postDeletePackageCount.count === 0) ? 'pass' : 'fail', 
          message: `Post-deletion - Images: ${postDeleteImageCount.count}, Packages: ${postDeletePackageCount.count}` 
        });
      }

      // Test 8: Stale lock cleanup
      addResult({ test: "Testing stale lock cleanup", status: 'pending', message: "Testing cleanup function..." });

      const { data: cleanupResult } = await supabase
        .rpc('cleanup_stale_hotel_locks');

      addResult({ 
        test: "Stale lock cleanup", 
        status: 'pass', 
        message: `Cleaned up ${cleanupResult} stale locks` 
      });

    } catch (error) {
      addResult({ 
        test: "Overall test execution", 
        status: 'fail', 
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50';
      case 'fail': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Hotel Registration Workflow Stability Test</h2>
        <Button 
          onClick={runComprehensiveTest} 
          disabled={isRunning}
          className="bg-primary hover:bg-primary/90"
        >
          {isRunning ? 'Running Tests...' : 'Run Comprehensive Test'}
        </Button>
      </div>

      {results.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Test Results</h3>
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {passCount} passed</span>
              <span className="text-red-600">✗ {failCount} failed</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{result.test}</span>
                  <span className="text-sm">
                    {result.status === 'pass' ? '✓' : result.status === 'fail' ? '✗' : '⏳'}
                  </span>
                </div>
                <div className="text-sm mt-1">{result.message}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};