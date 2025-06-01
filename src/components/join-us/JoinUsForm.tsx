
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { submitJoinUsForm } from '@/services/joinUsService';
import { toast } from 'sonner';

export function JoinUsForm() {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitJoinUsForm(formData, files);
      
      if (success) {
        toast.success('Your application has been submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
        setFiles([]);
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md border-purple-500/30">
        <CardHeader className="text-center">
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#FFF9B0]`}>
            APPLY TO JOIN
          </CardTitle>
          
          {/* Temporary email contact line */}
          <div className="mt-3">
            <p className={`
              ${isMobile ? "text-sm" : "text-base"} 
              text-white bg-[#8017B0] py-2 px-6 rounded-lg inline-block
              font-medium tracking-wide
            `}>
              You can also email us directly at contact@hotel-living.com
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#FFF9B0] font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-purple-400/50 text-white placeholder:text-gray-300 focus:border-purple-400"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#FFF9B0] font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-purple-400/50 text-white placeholder:text-gray-300 focus:border-purple-400"
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#FFF9B0] font-medium">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="bg-white/10 border-purple-400/50 text-white placeholder:text-gray-300 focus:border-purple-400 resize-none"
                placeholder="Tell us about yourself, your skills, and why you want to join our team..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-[#FFF9B0] font-medium">
                Attach Files (Optional)
              </Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                multiple
                className="bg-white/10 border-purple-400/50 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
              />
              {files.length > 0 && (
                <div className="text-sm text-gray-300">
                  {files.length} file(s) selected: {files.map(f => f.name).join(', ')}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
