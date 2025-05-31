
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useUserAffinities } from '@/hooks/useUserAffinities';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AffinityBadge {
  id: string;
  name: string;
  emoji?: string;
  category?: string;
  isEarned: boolean;
}

export const AffinityBadges: React.FC = () => {
  const { userAffinities, loading: userAffinitiesLoading } = useUserAffinities();

  // Fetch all available themes/affinities
  const { data: allThemes, isLoading: themesLoading } = useQuery({
    queryKey: ['all-themes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, name, category')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  if (userAffinitiesLoading || themesLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Affinity Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2"></div>
              <div className="h-3 bg-white/20 rounded mx-auto w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get user's earned affinity IDs
  const earnedAffinityIds = userAffinities.map(ua => ua.theme_id);

  // Create badge data with earned status
  const affinityBadges: AffinityBadge[] = (allThemes || []).map(theme => ({
    id: theme.id,
    name: theme.name,
    category: theme.category,
    emoji: getEmojiForAffinity(theme.name),
    isEarned: earnedAffinityIds.includes(theme.id)
  }));

  // Group badges by category for better organization
  const categorizedBadges = affinityBadges.reduce((acc, badge) => {
    const category = badge.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, AffinityBadge[]>);

  const earnedCount = affinityBadges.filter(badge => badge.isEarned).length;
  const totalCount = affinityBadges.length;

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Your Affinity Badges</h2>
        <div className="text-sm text-white/80">
          {earnedCount} of {totalCount} earned
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(categorizedBadges).map(([category, badges]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wide">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {badges.map(badge => (
                <AffinityBadgeItem key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {earnedCount === 0 && (
        <div className="text-center py-8 text-white/60">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            🏆
          </div>
          <p className="text-sm">Start booking hotels to earn your first affinity badges!</p>
        </div>
      )}
    </div>
  );
};

interface AffinityBadgeItemProps {
  badge: AffinityBadge;
}

const AffinityBadgeItem: React.FC<AffinityBadgeItemProps> = ({ badge }) => {
  return (
    <div className="flex flex-col items-center group">
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-200
          ${badge.isEarned 
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg transform group-hover:scale-110' 
            : 'bg-white/10 opacity-50'
          }
        `}
      >
        <span className="text-2xl">
          {badge.emoji || '🏷️'}
        </span>
      </div>
      <span 
        className={`
          text-xs text-center font-medium leading-tight
          ${badge.isEarned ? 'text-white' : 'text-white/40'}
        `}
      >
        {badge.name}
      </span>
      {badge.isEarned && (
        <Badge 
          variant="default" 
          className="mt-1 bg-green-500/20 text-green-300 text-xs px-2 py-0.5"
        >
          Earned
        </Badge>
      )}
    </div>
  );
};

// Helper function to assign emojis to affinity names
function getEmojiForAffinity(name: string): string {
  const emojiMap: Record<string, string> = {
    // Arts & Culture
    'Theater': '🎭',
    'Museums': '🏛️',
    'Art Galleries': '🎨',
    'Classical Music': '🎼',
    'Opera': '🎭',
    'Dance': '💃',
    'Literature': '📚',
    'Photography': '📸',
    'Architecture': '🏗️',
    'History': '🏺',
    
    // Food & Drinks
    'Street Food': '🍜',
    'Fine Dining': '🍽️',
    'Local Cuisine': '🥘',
    'Wine Tasting': '🍷',
    'Coffee Culture': '☕',
    'Craft Beer': '🍺',
    'Cooking Classes': '👨‍🍳',
    'Food Markets': '🛒',
    'Vegetarian': '🥗',
    'Seafood': '🦞',
    
    // Sports & Activities
    'Hiking': '🥾',
    'Cycling': '🚴',
    'Swimming': '🏊',
    'Yoga': '🧘',
    'Surfing': '🏄',
    'Rock Climbing': '🧗',
    'Skiing': '⛷️',
    'Golf': '⛳',
    'Tennis': '🎾',
    'Running': '🏃',
    
    // Technology & Science
    'Tech Hubs': '💻',
    'Innovation': '💡',
    'Science Museums': '🔬',
    'Startups': '🚀',
    'Digital Nomad': '💻',
    'Coworking': '🏢',
    
    // Entertainment
    'Nightlife': '🌙',
    'Live Music': '🎵',
    'Festivals': '🎪',
    'Gaming': '🎮',
    'Comedy': '😂',
    'Karaoke': '🎤',
    
    // Education & Learning
    'Universities': '🎓',
    'Libraries': '📖',
    'Workshops': '🔧',
    'Language Learning': '🗣️',
    'Meditation': '🧘‍♀️',
    'Mindfulness': '🙏',
    
    // Nature & Wellness
    'Beach': '🏖️',
    'Mountains': '⛰️',
    'Forest': '🌲',
    'Desert': '🏜️',
    'Spa': '💆',
    'Wellness': '🌿',
    'Eco-Tourism': '♻️',
    
    // Default fallbacks
    'Business': '💼',
    'Family': '👨‍👩‍👧‍👦',
    'Romance': '💕',
    'Adventure': '🗺️',
    'Relaxation': '😌',
    'Culture': '🌍',
    'Shopping': '🛍️',
    'Transportation': '🚗',
    'Budget': '💰',
    'Luxury': '👑'
  };
  
  return emojiMap[name] || '🏷️';
}
