
/**
 * Compares two values to determine if they have changed
 */
export const compareValues = (newValue: any, currentValue: any, fieldName: string): boolean => {
  console.log(`Comparing ${fieldName}:`, { new: newValue, current: currentValue });
  
  // Handle null/undefined cases
  if (newValue === null && currentValue === null) return false;
  if (newValue === undefined && currentValue === undefined) return false;
  if (newValue === null && currentValue === undefined) return false;
  if (newValue === undefined && currentValue === null) return false;
  
  // Handle array comparisons (themes, activities, etc.)
  if (Array.isArray(newValue) && Array.isArray(currentValue)) {
    if (newValue.length !== currentValue.length) return true;
    
    // Sort both arrays to ensure order doesn't affect comparison
    const sortedNew = [...newValue].sort();
    const sortedCurrent = [...currentValue].sort();
    
    return !sortedNew.every((val, index) => val === sortedCurrent[index]);
  }
  
  // Handle array vs non-array cases
  if (Array.isArray(newValue) || Array.isArray(currentValue)) {
    return true;
  }
  
  // Handle object comparisons
  if (typeof newValue === 'object' && typeof currentValue === 'object' && 
      newValue !== null && currentValue !== null) {
    const newKeys = Object.keys(newValue);
    const currentKeys = Object.keys(currentValue);
    
    if (newKeys.length !== currentKeys.length) return true;
    
    return newKeys.some(key => compareValues(newValue[key], currentValue[key], `${fieldName}.${key}`));
  }
  
  // Handle primitive value comparisons
  return newValue !== currentValue;
};
