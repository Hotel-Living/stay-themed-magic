
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AdminAccessRestore = () => {
  const [email, setEmail] = useState('grand_soiree@yahoo.com');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRestoreAccess = async () => {
    setLoading(true);
    try {
      console.log('Attempting to restore admin access for:', email);
      
      const { data, error } = await supabase.functions.invoke('restore-admin-access', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      console.log('Admin access restore result:', data);
      
      toast({
        title: "Success",
        description: `Admin access restored for ${email}. You can now log in with this email.`,
      });

    } catch (error: any) {
      console.error('Error restoring admin access:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to restore admin access",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Restore Admin Access</CardTitle>
        <CardDescription>
          Update the admin email to restore access to the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">Admin Email</Label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
          />
        </div>
        
        <Button 
          onClick={handleRestoreAccess}
          disabled={loading || !email}
          className="w-full"
        >
          {loading ? 'Restoring Access...' : 'Restore Admin Access'}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          <p>This will update the admin user's email and ensure proper role assignment.</p>
          <p>After restoration, you can log in at the regular login page.</p>
        </div>
      </CardContent>
    </Card>
  );
};
