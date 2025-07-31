import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star, Send } from 'lucide-react';

export default function BecomeAmbassadorContent() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasAgreed) {
      toast({
        title: "Agreement Required",
        description: "Please confirm your interest in becoming an ambassador.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to admin messages for admin review
      const { error } = await supabase
        .from('admin_messages')
        .insert({
          user_id: user?.id,
          subject: 'Ambassador Application',
          message: `User ${profile?.first_name || ''} ${profile?.last_name || ''} (${user?.email}) has expressed interest in becoming an ambassador.

Additional Message: ${message || 'No additional message provided.'}`,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your ambassador application has been submitted successfully. We'll contact you soon!",
      });

      setMessage('');
      setHasAgreed(false);
    } catch (error) {
      console.error('Error submitting ambassador application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 border-fuchsia-200 dark:border-fuchsia-800">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-8 h-8 text-fuchsia-600" />
          <h2 className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100">
            Become an Ambassador
          </h2>
        </div>
        
        <p className="text-fuchsia-700 dark:text-fuchsia-300 mb-6">
          Join our ambassador program and help us connect more travelers with exceptional hotels. 
          Share your passion for unique accommodations and earn rewards while doing what you love.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <Star className="w-6 h-6 text-fuchsia-600 mx-auto mb-2" />
            <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100">Earn Rewards</h3>
            <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">Get rewards for successful referrals</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <Send className="w-6 h-6 text-fuchsia-600 mx-auto mb-2" />
            <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100">Share Hotels</h3>
            <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">Recommend amazing hotels to travelers</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <Star className="w-6 h-6 text-fuchsia-600 mx-auto mb-2" />
            <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100">Build Network</h3>
            <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">Connect with hotels and travelers</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Ambassador Application</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input 
                value={`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Not provided'}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                value={user?.email || 'Not provided'}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Message (Optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us why you'd like to become an ambassador or any relevant experience..."
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agree"
              checked={hasAgreed}
              onCheckedChange={(checked) => setHasAgreed(checked as boolean)}
            />
            <label
              htmlFor="agree"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I'm interested in becoming an ambassador and would like to be contacted about this opportunity.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !hasAgreed}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Card>
    </div>
  );
}