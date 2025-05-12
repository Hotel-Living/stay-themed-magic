
import React, { useState } from "react";
import { Mail, Paperclip, Star, Upload } from "lucide-react";
import { Section } from "./Section";
import { ContactForm } from "@/components/contact/ContactForm";

export function JoinUsForm() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Limit to 5 files
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [...files, ...selectedFiles].slice(0, 5);
      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Section icon={Star} title="Want to join us?">
      <p className="text-white leading-relaxed mb-6">
        If you feel aligned with this vision and want to help bring it to life, we want to hear from you.
      </p>
      
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-[#FFF9B0] mr-3" />
        <h3 className="text-xl font-semibold text-[#FFF9B0]">Apply to join our founding team:</h3>
      </div>
      
      <p className="text-white leading-relaxed mb-6">
        Tell us about yourself! You can either upload your résumé (CV), or simply describe your experience and what you can contribute, using the form below.
      </p>

      {/* File upload section */}
      <div className="mb-6">
        <label 
          htmlFor="resume-upload" 
          className="flex items-center gap-2 px-4 py-2 bg-[#8017B0]/80 hover:bg-[#8017B0] text-white rounded-md cursor-pointer w-fit transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Files (max 5)</span>
          <input
            id="resume-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={files.length >= 5}
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
                  <button 
                    onClick={() => handleRemoveFile(index)} 
                    className="text-red-400 hover:text-red-300 p-1"
                    aria-label="Remove file"
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
      
      <ContactForm />
    </Section>
  );
}
