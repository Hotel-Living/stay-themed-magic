
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  formData: {
    first_name: string;
    last_name: string;
    bio?: string; // Bio is optional
  };
  userEmail: string | undefined;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  userEmail,
  isLoading,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Input 
            type="text" 
            name="first_name"
            className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            value={formData.first_name}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Input 
            type="text" 
            name="last_name"
            className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            value={formData.last_name}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <Input 
          type="email" 
          className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
          value={userEmail || ''}
          disabled
        />
        <p className="text-xs text-muted-foreground mt-1">Your email address is verified and cannot be changed.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea 
          className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 h-24"
          placeholder="Tell us a bit about yourself"
          name="bio"
          value={formData.bio || ''}
          onChange={onChange}
        ></textarea>
      </div>

      <div className="pt-4">
        <Button 
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}
