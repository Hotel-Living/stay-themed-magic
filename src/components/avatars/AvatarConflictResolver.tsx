import { useEffect, useState } from 'react';
import { useAvatarManager } from '@/contexts/AvatarManager';

interface ConflictStatus {
  didActive: boolean;
  enhancedActive: boolean;
  randomActive: boolean;
  totalConflicts: number;
}

export function AvatarConflictResolver() {
  const { activeAvatars } = useAvatarManager();
  const [conflicts, setConflicts] = useState<ConflictStatus>({
    didActive: false,
    enhancedActive: false,
    randomActive: false,
    totalConflicts: 0
  });

  useEffect(() => {
    // Check for D-ID avatars
    const didElements = document.querySelectorAll('[data-name*="did"], iframe[src*="d-id.com"]');
    const didActive = didElements.length > 0;

    // Check for Enhanced avatars
    const enhancedActive = activeAvatars.length > 0;

    // Check for Random avatars (they use Enhanced internally)
    const randomElements = document.querySelectorAll('[id*="avatar-"]');
    const randomActive = randomElements.length > 0;

    const totalConflicts = [didActive, enhancedActive, randomActive].filter(Boolean).length;

    setConflicts({
      didActive,
      enhancedActive,
      randomActive,
      totalConflicts
    });

    // Log conflicts for debugging
    if (totalConflicts > 1) {
      console.warn('⚠️ Avatar Conflict Detected:', {
        didActive,
        enhancedActive,
        randomActive,
        activeAvatars: activeAvatars.length,
        didElements: didElements.length,
        randomElements: randomElements.length
      });
    }
  }, [activeAvatars]);

  // Render conflict warning in development
  if (import.meta.env.DEV && conflicts.totalConflicts > 1) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'rgba(255,0,0,0.9)', 
        color: 'white', 
        padding: '12px', 
        fontSize: '12px',
        borderRadius: '6px',
        zIndex: 9999,
        maxWidth: '300px',
        fontFamily: 'monospace'
      }}>
        <div><strong>⚠️ Avatar Conflicts Detected</strong></div>
        <div>Total Systems Active: {conflicts.totalConflicts}</div>
        {conflicts.didActive && <div>• D-ID Avatar: Active</div>}
        {conflicts.enhancedActive && <div>• Enhanced Avatar: Active ({activeAvatars.length})</div>}
        {conflicts.randomActive && <div>• Random Avatar: Active</div>}
        <div style={{marginTop: '8px', fontSize: '10px', opacity: 0.8}}>
          Multiple avatar systems may cause interference
        </div>
      </div>
    );
  }

  return null;
}