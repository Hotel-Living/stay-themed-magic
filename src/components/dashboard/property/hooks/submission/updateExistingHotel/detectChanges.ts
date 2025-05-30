
import { compareValues } from "./compareValues";

/**
 * Detects changes between current hotel data and updated data
 */
export const detectChanges = (currentHotel: any, updatedData: Record<string, any>) => {
  const pendingChanges: Record<string, any> = {};
  let hasChanges = false;
  
  console.log("=== CHANGE DETECTION START ===");
  console.log("Current hotel data:", currentHotel);
  console.log("Updated data:", updatedData);
  
  for (const [key, newValue] of Object.entries(updatedData)) {
    // Get the current value from the database
    const currentValue = currentHotel[key];
    
    console.log(`\n--- Checking field: ${key} ---`);
    console.log(`Current value:`, currentValue);
    console.log(`New value:`, newValue);
    console.log(`Current type: ${typeof currentValue}, New type: ${typeof newValue}`);
    
    // Special logging for themes and activities
    if (key === 'themes' || key === 'activities') {
      console.log(`${key} - Current is array:`, Array.isArray(currentValue));
      console.log(`${key} - New is array:`, Array.isArray(newValue));
      if (Array.isArray(currentValue)) {
        console.log(`${key} - Current length:`, currentValue.length);
        console.log(`${key} - Current items:`, currentValue);
      }
      if (Array.isArray(newValue)) {
        console.log(`${key} - New length:`, newValue.length);
        console.log(`${key} - New items:`, newValue);
      }
    }
    
    // Check if the value has changed using our specialized comparison function
    const isChanged = compareValues(newValue, currentValue, key);
    
    console.log(`${key} - Is changed:`, isChanged);
    
    if (isChanged) {
      console.log(`✅ Field changed: ${key}`, { 
        old: currentValue, 
        new: newValue 
      });
      pendingChanges[key] = newValue;
      hasChanges = true;
    } else {
      console.log(`❌ No change detected for: ${key}`);
    }
  }
  
  console.log("=== CHANGE DETECTION END ===");
  console.log("Has changes:", hasChanges);
  console.log("Pending changes:", pendingChanges);
  
  return { pendingChanges, hasChanges };
};
