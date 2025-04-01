import React from "react";
export default function BasicInfoStep() {
  return <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          HOTEL NAME
        </label>
        <input type="text" placeholder="Enter hotel name" required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#6c067c]" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          CATEGORY
        </label>
        <select required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]">
          <option value="">Select hotel category</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
          <option value="nr">Not Rated</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          TYPE OF PROPERTY
        </label>
        <select required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]">
          <option value="">Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="boutique">Hotel Boutique</option>
          <option value="resort">Resort</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          STYLE OF PROPERTY
        </label>
        <select required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]">
          <option value="">Select property style</option>
          <option value="classic">Classic</option>
          <option value="classic-elegant">Classic Elegant</option>
          <option value="design">Design</option>
          <option value="modern">Modern</option>
          <option value="countryside">Countryside</option>
          <option value="urban">Urban</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          HOTEL DESCRIPTION
        </label>
        <textarea placeholder="Enter a detailed description of your hotel" required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[120px] bg-[#5c0869]"></textarea>
      </div>
    </div>;
}