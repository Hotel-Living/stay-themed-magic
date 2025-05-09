
import { compareValues } from "./compareValues";

/**
 * Detects changes between current hotel data and updated data
 */
export const detectChanges = (currentHotel: any, updatedData: Record<string, any>) => {
  const pendingChanges: Record<string, any> = {};
  let hasChanges = false;
  
  for (const [key, newValue] of Object.entries(updatedData)) {
    // Get the current value from the database
    const currentValue = currentHotel[key];
    
    // Check if the value has changed using our specialized comparison function
    const isChanged = compareValues(newValue, currentValue, key);
    
    if (isChanged) {
      console.log(`Field changed: ${key}`, { 
        old: currentValue, 
        new: newValue 
      });
      pendingChanges[key] = newValue;
      hasChanges = true;
    }
  }
  
  return { pendingChanges, hasChanges };
};
