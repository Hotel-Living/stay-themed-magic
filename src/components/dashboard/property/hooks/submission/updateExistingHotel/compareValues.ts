
import { sortObjectKeysRecursively, stableStringifyArray } from "../utils/compareUtils";

// Helper function to compare primitive values
const comparePrimitives = (newValue: any, currentValue: any): boolean => {
  // Handle number/string conversions
  if (typeof newValue === 'number' && typeof currentValue === 'string') {
    return newValue !== parseFloat(currentValue);
  } else if (typeof newValue === 'string' && typeof currentValue === 'number') {
    return parseFloat(newValue) !== currentValue;
  } else {
    return newValue !== currentValue;
  }
};

// Helper function to compare arrays of objects
const compareObjectArrays = (newValue: any[], currentValue: any[], key: string): boolean => {
  const normalizedNew = stableStringifyArray(newValue);
  const normalizedCurrent = stableStringifyArray(currentValue);
  
  const isChanged = normalizedNew !== normalizedCurrent;
  
  console.log(`Object array comparison for ${key}:`);
  console.log('Normalized new:', normalizedNew);
  console.log('Normalized current:', normalizedCurrent);
  console.log('Is changed:', isChanged);
  
  // Extra logging to help diagnose the issue with room_types
  if (key === 'room_types' && isChanged) {
    console.log('Room types detected as changed:');
    
    // Additional check to see if they're actually different
    // Sometimes there are slight differences in representation but not in content
    if (JSON.stringify(sortObjectKeysRecursively(newValue)) === 
        JSON.stringify(sortObjectKeysRecursively(currentValue))) {
      console.log('After deeper analysis, room_types appear to be the same');
      return false;
    }
  }
  return isChanged;
};

// Helper function to compare arrays of primitives
const comparePrimitiveArrays = (newValue: any[], currentValue: any[], key: string): boolean => {
  // Sort and convert to string for a stable comparison
  const normalizedNew = [...newValue].sort().toString();
  const normalizedCurrent = [...currentValue].sort().toString();
  
  console.log(`Primitive array comparison for ${key}:`);
  console.log('New sorted:', normalizedNew);
  console.log('Current sorted:', normalizedCurrent);
  console.log('Are equal:', normalizedNew === normalizedCurrent);
  
  return normalizedNew !== normalizedCurrent;
};

// Helper function to compare objects
const compareObjects = (newValue: any, currentValue: any): boolean => {
  const normalizedNew = JSON.stringify(sortObjectKeysRecursively(newValue));
  const normalizedCurrent = JSON.stringify(sortObjectKeysRecursively(currentValue));
  
  return normalizedNew !== normalizedCurrent;
};

/**
 * Compares two values to determine if they're different
 * Handles various data types (arrays, objects, primitives)
 */
export const compareValues = (newValue: any, currentValue: any, key: string): boolean => {
  console.log(`\n🔍 Comparing ${key}:`);
  console.log('New value:', newValue, 'Type:', typeof newValue);
  console.log('Current value:', currentValue, 'Type:', typeof currentValue);
  
  // Handle both values being null/undefined
  if (!newValue && !currentValue) {
    console.log(`Both ${key} are null/undefined - no change`);
    return false;
  }
  
  // Special case: one is null/undefined and the other isn't
  if ((!newValue && currentValue) || (newValue && !currentValue)) {
    console.log(`One ${key} is null/undefined, the other isn't - changed`);
    return true;
  }

  try {
    if (Array.isArray(newValue) && Array.isArray(currentValue)) {
      console.log(`${key} - Both are arrays`);
      // For arrays, specialized handling depending on content
      if (newValue.length === 0 && currentValue.length === 0) {
        // Both arrays are empty, no change
        console.log(`${key} - Both arrays empty - no change`);
        return false;
      } else if (newValue.length !== currentValue.length) {
        // Different lengths, definitely changed
        console.log(`${key} - Array length difference: new=${newValue.length}, current=${currentValue.length}`);
        return true;
      } else if (newValue.length > 0 && typeof newValue[0] === 'object') {
        // For array of objects (like room_types), use our specialized comparison
        console.log(`${key} - Array of objects detected`);
        return compareObjectArrays(newValue, currentValue, key);
      } else {
        // Simple array of primitives (like themes and activities)
        console.log(`${key} - Array of primitives detected`);
        return comparePrimitiveArrays(newValue, currentValue, key);
      }
    } else if (
      typeof newValue === 'object' && 
      newValue !== null && 
      currentValue !== null && 
      typeof currentValue === 'object'
    ) {
      // For objects, use our specialized comparison
      console.log(`${key} - Both are objects`);
      return compareObjects(newValue, currentValue);
    } else {
      // For primitives, use our specialized comparison
      console.log(`${key} - Primitive comparison`);
      const result = comparePrimitives(newValue, currentValue);
      console.log(`${key} - Primitive result:`, result);
      return result;
    }
  } catch (error) {
    console.error(`Error comparing ${key}:`, error);
    // If comparison fails, assume no change to be safe
    return false;
  }
};
