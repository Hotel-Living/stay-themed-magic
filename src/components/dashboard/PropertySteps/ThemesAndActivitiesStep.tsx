import React from "react";

export default function ThemesAndActivitiesStep() {
  const activityCategories = {
    'Sports': [
      'Tennis', 'Golf', 'Swimming', 'Hiking', 'Cycling', 'Yoga', 'Gym'
    ],
    'Arts & Culture': [
      'Painting Classes', 'Cooking Classes', 'Photography Tours', 
      'Local Crafts', 'Dance Classes', 'Music Lessons'
    ],
    'Wellness': [
      'Spa Services', 'Meditation', 'Massage', 'Hot Springs'
    ],
    'Entertainment': [
      'Board Games', 'Movie Nights', 'Live Music', 'Wine Tasting'
    ],
    'Nature & Adventure': [
      'Bird Watching', 'Garden Tours', 'Nature Walks', 'Stargazing'
    ]
  };

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h3 className="text-sm font-medium mb-2 uppercase">SELECT AVAILABLE ACTIVITIES</h3>
        
        {Object.entries(activityCategories).map(([category, activities]) => (
          <div key={category} className="mb-3">
            <h4 className="text-sm font-medium mb-1.5 text-fuchsia-200">{category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-2">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    id={`activity-${activity}`}
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4"
                  />
                  <label 
                    htmlFor={`activity-${activity}`}
                    className="text-sm text-white"
                  >
                    {activity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-fuchsia-900/10 rounded-lg p-3">
        <h3 className="text-sm font-medium mb-2 uppercase">ADD CUSTOM ACTIVITIES</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="activity-name" className="block text-sm font-medium text-foreground/90 mb-1">Activity Name</label>
            <input type="text" id="activity-name" placeholder="e.g. Local Pottery Workshop" className="w-full p-2 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-fuchsia-950/30" />
          </div>
          <div>
            <label htmlFor="activity-description" className="block text-sm font-medium text-foreground/90 mb-1">Description</label>
            <textarea id="activity-description" placeholder="Describe the activity..." className="w-full p-2 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-fuchsia-950/30 min-h-[80px]"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="activity-duration" className="block text-sm font-medium text-foreground/90 mb-1">Duration (hours)</label>
              <input type="number" id="activity-duration" min="0.5" step="0.5" placeholder="2" className="w-full p-2 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-fuchsia-950/30" />
            </div>
            <div>
              <label htmlFor="activity-price" className="block text-sm font-medium text-foreground/90 mb-1">Price ($)</label>
              <input type="number" id="activity-price" min="0" placeholder="25" className="w-full p-2 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-fuchsia-950/30" />
            </div>
          </div>
          <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase">
            Add Custom Activity
          </button>
        </div>
      </div>
      
      <div className="bg-fuchsia-900/10 rounded-lg p-3">
        <h3 className="text-sm font-medium mb-2 uppercase">ACCESSIBILITY FEATURES</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="wheelchair" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4" />
            <label htmlFor="wheelchair" className="text-sm">Wheelchair Accessible</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="elevator" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4" />
            <label htmlFor="elevator" className="text-sm">Elevator</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="accessible-bathroom" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4" />
            <label htmlFor="accessible-bathroom" className="text-sm">Accessible Bathroom</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="accessible-parking" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4" />
            <label htmlFor="accessible-parking" className="text-sm">Accessible Parking</label>
          </div>
        </div>
      </div>
    </div>
  );
}
