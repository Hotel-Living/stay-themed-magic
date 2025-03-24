
import React from "react";
import { Hash, Users, Tag, BedDouble, PlusCircle } from "lucide-react";

export default function RoomsAndPricingStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">ROOMS & PRICING</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            LENGTH OF STAYS
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { days: 8, label: "8 days" },
              { days: 16, label: "16 days" },
              { days: 24, label: "24 days" },
              { days: 32, label: "32 days" }
            ].map((option) => (
              <label key={option.days} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            MEALS
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select meal option</option>
            <option value="none">No meals</option>
            <option value="breakfast">Breakfast</option>
            <option value="halfboard">Half Board</option>
            <option value="fullboard">Full Board</option>
            <option value="allinclusive">All Inclusive</option>
            <option value="allinclusive-laundry">All Inclusive (Laundry Included)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Preferred Weekday for all Check-ins/outs
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select weekday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-fuchsia-900/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">ROOM TYPES</h4>
          <button className="inline-flex items-center text-sm px-3 py-1.5 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white transition-colors">
            <PlusCircle className="w-4 h-4 mr-1.5" /> Add Room Type
          </button>
        </div>
        
        <div className="bg-fuchsia-950/40 rounded-lg p-4 border border-fuchsia-800/20 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BedDouble className="w-5 h-5 mr-2 text-fuchsia-300" />
              <h5 className="font-semibold">Double Room</h5>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-2">
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Rooms:</span>
              <span className="font-medium">10</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Adults:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Footage:</span>
              <span className="font-medium">25 m²</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="text-xs px-3 py-1 rounded-lg bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-foreground/80 transition-colors">
              View Prices
            </button>
          </div>
        </div>
        
        <div className="text-center py-4 text-foreground/50 text-sm border border-dashed border-fuchsia-800/20 rounded-lg">
          Add room types to configure pricing options
        </div>
      </div>
    </div>
  );
}
