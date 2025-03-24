
import React from "react";
import { PlusCircle } from "lucide-react";

export default function ThemesAndActivitiesStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">THEMES</h3>
      
      <p className="text-sm text-foreground/90 mb-4">
        Elija una o varias temáticas, no excluyentes, que destaque al instante su hotel de toda competencia y atraiga a sus clientes perfectos
      </p>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors mb-6">
        More Information
      </button>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          THEMES
        </label>
        <div className="grid grid-cols-1 gap-4">
          {/* Arts */}
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">Arts</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Painting", "Photography", "Sculpture", "Music", "Theater", "Dance"].map((theme) => (
                <label key={theme} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{theme}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new Arts theme</span>
              </div>
            </div>
          </div>
          
          {/* Culture */}
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">Culture</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["History", "Heritage", "Language", "Local Traditions", "Gastronomy"].map((theme) => (
                <label key={theme} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{theme}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new Culture theme</span>
              </div>
            </div>
          </div>
          
          {/* Wellness */}
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">Wellness</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Yoga", "Meditation", "Spa", "Fitness", "Nutrition", "Mindfulness"].map((theme) => (
                <label key={theme} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{theme}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new Wellness theme</span>
              </div>
            </div>
          </div>
          
          {/* Technology */}
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">Technology</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Digital Nomad", "Co-working", "Tech Events", "Innovation", "Startup"].map((theme) => (
                <label key={theme} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{theme}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new Technology theme</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-medium">Add new theme category</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          HOTEL FEATURES
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", "24/7 Reception", "Room Service"].map((feature) => (
            <label key={feature} className="flex items-start">
              <input 
                type="checkbox" 
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm">{feature}</span>
            </label>
          ))}
          <div className="flex items-center">
            <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
            <span className="text-sm text-fuchsia-400">Add new feature</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          ACTIVITIES
        </label>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">On Premises</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Dancing", "Concerts", "Courses", "Games", "Theater", "Spa"].map((activity) => (
                <label key={activity} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{activity}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new activity</span>
              </div>
            </div>
          </div>
          
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">At Nearby Locations</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Beach", "Hiking", "Concerts", "Shopping", "Museums", "Sports"].map((activity) => (
                <label key={activity} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{activity}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
