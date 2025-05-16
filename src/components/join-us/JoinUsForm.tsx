
import React, { useState } from "react";
import { Mail, Paperclip, Star, Upload, Loader2 } from "lucide-react";
import { Section } from "./Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { toast } from "sonner";

export function JoinUsForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check file sizes
      const selectedFiles = Array.from(e.target.files);
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024); // 5MB limit

      if (oversizedFiles.length > 0) {
        toast.error("Some files exceed the 5MB size limit and were not added.");
      }
      const validFiles = selectedFiles.filter(file => file.size <= 5 * 1024 * 1024);
      const newFiles = [...files, ...validFiles].slice(0, 5);
      setFiles(newFiles);

      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFormSubmitted = (success: boolean) => {
    if (success) {
      setIsSubmitted(true);
      setFiles([]);
    }
  };

  if (isSubmitted) {
    return (
      <Section icon={Star} title="Want to Join Us?">
        <div className="bg-[#3A0952]/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-[#FFF9B0] mb-4">Thank you!</h3>
          <p className="text-white leading-relaxed mb-6">
            Your form has been submitted successfully. We'll get back to you as soon as possible.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section icon={Star} title="Want to Join Us?">
      <p className="text-white leading-relaxed mb-6">
        If you feel aligned with this vision and want to help bring it to life, we want to hear from you.
      </p>
      
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-[#FFF9B0] mr-3" />
        <h3 className="text-xl font-semibold text-[#FFF9B0]">Apply to Join our Founding Team!</h3>
      </div>
      
      <p className="text-white leading-relaxed mb-6">
        Tell us about yourself! You can:
        <ol className="list-decimal pl-6 mt-3 space-y-2">
          <li>Email us at contact@hotel-living.com — let us know about your background and how you'd like to contribute</li>
          <li>Join our WhatsApp Broadcast List — just send a message to +1 (210) 548-3002</li>
          <li>Use the form below</li>
        </ol>
      </p>

      <ContactForm 
        renderFileUpload={() => (
          <div className="mb-6">
            <label 
              htmlFor="resume-upload" 
              className={`flex items-center gap-2 px-4 py-2 ${
                files.length >= 5 ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#8017B0]/80 hover:bg-[#8017B0] cursor-pointer'
              } text-white rounded-md w-fit transition-colors`}
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>Upload Resume/CV</span>
              
              <input 
                id="resume-upload" 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange} 
                disabled={files.length >= 5 || isUploading} 
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" 
              />
            </label>
            
            {files.length > 0 && (
              <div className="mt-4">
                <p className="text-white text-sm mb-2">Uploaded files ({files.length}/5):</p>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center gap-2 bg-[#8017B0]/40 px-3 py-2 rounded-md">
                      <Paperclip className="w-4 h-4 text-[#FFF9B0]" />
                      <span className="text-white text-sm flex-1 truncate">{file.name}</span>
                      <span className="text-white/70 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                      <button 
                        onClick={() => handleRemoveFile(index)} 
                        className="text-red-400 hover:text-red-300 p-1" 
                        aria-label="Remove file" 
                        disabled={isUploading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )} 
        files={files} 
        recipientEmail="gransoare@yahoo.com" 
        onSubmitSuccess={handleFormSubmitted} 
      />
    </Section>
  );
}
