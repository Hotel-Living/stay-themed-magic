
// UUID validation regex pattern
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validates if a string is a valid UUID
 * @param uuid - String to validate as UUID
 * @returns boolean indicating if the string is a valid UUID
 */
export const isValidUuid = (uuid: string): boolean => {
  return typeof uuid === 'string' && uuidRegex.test(uuid);
};

/**
 * Filters an array and returns only valid UUIDs
 * @param uuids - Array of strings to validate as UUIDs
 * @returns Array containing only valid UUID strings
 */
export const filterValidUuids = (uuids: string[]): string[] => {
  if (!Array.isArray(uuids)) return [];
  return uuids.filter(id => id && isValidUuid(id));
};
