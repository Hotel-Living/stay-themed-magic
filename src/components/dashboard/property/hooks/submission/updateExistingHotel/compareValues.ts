
import { sortObjectKeysRecursively, stableStringifyArray } from "../utils/compareUtils";

/**
 * Compares two values to determine if they're different
 * Handles various data types (arrays, objects, primitives)
 */
export const compareValues = (newValue: any, currentValue: any, key: string): boolean => {
  // Handle both values being null/undefined
  if (!newValue && !currentValue) {
    return false;
  }
  
  // Special case: one is null/undefined and the other isn't
  if ((!newValue && currentValue) || (newValue && !currentValue)) {
    return true;
  }

  try {
    if (Array.isArray(newValue) && Array.isArray(currentValue)) {
      // For arrays, specialized handling depending on content
      if (newValue.length === 0 && currentValue.length === 0) {
        // Both arrays are empty, no change
        return false;
      } else if (newValue.length !== currentValue.length) {
        // Different lengths, definitely changed
        console.log(`Array length difference for ${key}: new=${newValue.length}, current=${currentValue.length}`);
        return true;
      } else if (newValue.length > 0 && typeof newValue[0] === 'object') {
        // For array of objects (like room_types), use a more robust comparison
        const normalizedNew = stableStringifyArray(newValue);
        const normalizedCurrent = stableStringifyArray(currentValue);
        
        const isChanged = normalizedNew !== normalizedCurrent;
        
        // Extra logging to help diagnose the issue with room_types
        if (key === 'room_types' && isChanged) {
          console.log('Room types detected as changed:');
          console.log('New:', normalizedNew);
          console.log('Current:', normalizedCurrent);
          
          // Additional check to see if they're actually different
          // Sometimes there are slight differences in representation but not in content
          if (JSON.stringify(sortObjectKeysRecursively(newValue)) === 
              JSON.stringify(sortObjectKeysRecursively(currentValue))) {
            console.log('After deeper analysis, room_types appear to be the same');
            return false;
          }
        }
        return isChanged;
      } else {
        // Simple array of primitives
        // Sort and convert to string for a stable comparison
        const normalizedNew = [...newValue].sort().toString();
        const normalizedCurrent = [...currentValue].sort().toString();
        
        return normalizedNew !== normalizedCurrent;
      }
    } else if (
      typeof newValue === 'object' && 
      newValue !== null && 
      currentValue !== null && 
      typeof currentValue === 'object'
    ) {
      // For objects, use recursive sorting for stable comparison
      const normalizedNew = JSON.stringify(sortObjectKeysRecursively(newValue));
      const normalizedCurrent = JSON.stringify(sortObjectKeysRecursively(currentValue));
      
      return normalizedNew !== normalizedCurrent;
    } else {
      // Simple value comparison, with special handling for numbers that might be strings
      if (typeof newValue === 'number' && typeof currentValue === 'string') {
        return newValue !== parseFloat(currentValue);
      } else if (typeof newValue === 'string' && typeof currentValue === 'number') {
        return parseFloat(newValue) !== currentValue;
      } else {
        return newValue !== currentValue;
      }
    }
  } catch (error) {
    console.error(`Error comparing ${key}:`, error);
    // If comparison fails, assume no change to be safe
    return false;
  }
};
