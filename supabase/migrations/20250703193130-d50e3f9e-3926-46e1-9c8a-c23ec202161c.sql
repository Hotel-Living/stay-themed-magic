-- Phase 1: Normalize country data to consistent full names
-- Convert ISO codes and inconsistent formats to full country names

UPDATE hotels SET country = 'France' WHERE country = 'FR';
UPDATE hotels SET country = 'Greece' WHERE country = 'GR';
UPDATE hotels SET country = 'Turkey' WHERE country = 'TR';
UPDATE hotels SET country = 'Portugal' WHERE country = 'PT';
UPDATE hotels SET country = 'United States' WHERE country = 'us';

-- Ensure consistent capitalization for existing full names (if any variations exist)
UPDATE hotels SET country = 'United States' WHERE country ILIKE 'united states';
UPDATE hotels SET country = 'United Kingdom' WHERE country ILIKE 'united kingdom';

-- Verify the update
SELECT DISTINCT country, COUNT(*) as count 
FROM hotels 
GROUP BY country 
ORDER BY country;