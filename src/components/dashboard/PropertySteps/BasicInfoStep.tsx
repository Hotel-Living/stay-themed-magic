
import React from "react";

export default function BasicInfoStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">BASIC INFORMATION</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Hotel Name
        </label>
        <input 
          type="text" 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
          placeholder="Enter hotel name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Category
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
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
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Type of Property
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
          <option value="">Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="boutique">Hotel Boutique</option>
          <option value="resort">Resort</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Style of Property
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
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
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Hotel Description
        </label>
        <textarea 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[120px]"
          placeholder="Enter a detailed description of your hotel"
        ></textarea>
      </div>
    </div>
  );
}
