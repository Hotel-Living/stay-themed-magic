
/**
 * Recursively sorts object keys for stable comparison
 */
export function sortObjectKeysRecursively(obj: any): any {
  // Handle non-objects and null
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    // If it's an array, recurse into each element
    if (Array.isArray(obj)) {
      return obj.map(item => sortObjectKeysRecursively(item));
    }
    return obj;
  }
  
  // Create a new object with sorted keys
  const sortedObj: Record<string, any> = {};
  const sortedKeys = Object.keys(obj).sort();
  
  for (const key of sortedKeys) {
    const value = obj[key];
    // Recursively sort nested objects
    sortedObj[key] = sortObjectKeysRecursively(value);
  }
  
  return sortedObj;
}

/**
 * Creates stable JSON representations of arrays for comparison
 */
export function stableStringifyArray(arr: any[]): string {
  // Map each object to a stable string representation and sort to ensure consistent order
  return JSON.stringify(
    arr.map(item => sortObjectKeysRecursively(item))
       .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  );
}
