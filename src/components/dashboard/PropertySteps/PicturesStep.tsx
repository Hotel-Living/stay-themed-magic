
import React from "react";
import { Upload, Image, PlusCircle, Star } from "lucide-react";

export default function PicturesStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">PICTURES</h3>
      
      <div className="bg-fuchsia-950/30 p-8 rounded-lg border border-dashed border-fuchsia-800/40 text-center">
        <Upload className="w-12 h-12 mx-auto mb-4 text-fuchsia-400/50" />
        <p className="text-foreground/90 font-medium mb-1">Drag & drop photos here</p>
        <p className="text-sm text-foreground/60 mb-4">or click to browse from your device</p>
        <button className="inline-flex items-center px-4 py-2 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors">
          <Image className="w-4 h-4 mr-2" /> Upload Photos
        </button>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Uploaded Photos
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
                <Image className="w-8 h-8" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-2">
                  <Star className="w-4 h-4 text-amber-400" />
                </button>
                <button className="p-1.5 rounded-full bg-red-500/30 hover:bg-red-500/50 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg aspect-[4/3] border border-dashed border-fuchsia-800/40">
            <button className="p-2 rounded-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
              <PlusCircle className="w-6 h-6 text-fuchsia-300" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-foreground/50">
          <span className="text-fuchsia-300">★</span> Select a photo as the main image
        </div>
      </div>
    </div>
  );
}
