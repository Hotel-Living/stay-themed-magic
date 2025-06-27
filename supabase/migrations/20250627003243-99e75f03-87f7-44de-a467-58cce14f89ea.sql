
-- Create a function to get unique countries from hotels
CREATE OR REPLACE FUNCTION get_unique_countries()
RETURNS TABLE(country_code text, country_name text, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    country,
    country,
    COUNT(*)::bigint
  FROM hotels 
  WHERE status = 'approved'
  GROUP BY country
  ORDER BY country;
$$;

-- Create a function to get unique cities by country
CREATE OR REPLACE FUNCTION get_cities_by_country(country_filter text DEFAULT NULL)
RETURNS TABLE(city_name text, country_code text, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    city,
    country,
    COUNT(*)::bigint
  FROM hotels 
  WHERE status = 'approved'
    AND (country_filter IS NULL OR country = country_filter)
  GROUP BY city, country
  ORDER BY city;
$$;

-- Create a function to get unique property types
CREATE OR REPLACE FUNCTION get_unique_property_types()
RETURNS TABLE(property_type text, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    property_type,
    COUNT(*)::bigint
  FROM hotels 
  WHERE status = 'approved' 
    AND property_type IS NOT NULL
  GROUP BY property_type
  ORDER BY property_type;
$$;

-- Create a function to get unique property styles
CREATE OR REPLACE FUNCTION get_unique_property_styles()
RETURNS TABLE(property_style text, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    style,
    COUNT(*)::bigint
  FROM hotels 
  WHERE status = 'approved' 
    AND style IS NOT NULL
  GROUP BY style
  ORDER BY style;
$$;

-- Create a function to get price range distribution
CREATE OR REPLACE FUNCTION get_price_distribution()
RETURNS TABLE(min_price integer, max_price integer, avg_price numeric, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    MIN(price_per_month)::integer,
    MAX(price_per_month)::integer,
    AVG(price_per_month),
    COUNT(*)::bigint
  FROM hotels 
  WHERE status = 'approved';
$$;

-- Create a function to get dynamic themes with hotel counts
CREATE OR REPLACE FUNCTION get_themes_with_counts()
RETURNS TABLE(theme_id uuid, theme_name text, hotel_count bigint, level integer)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    t.id,
    t.name,
    COUNT(DISTINCT h.id)::bigint,
    t.level
  FROM themes t
  LEFT JOIN hotel_themes ht ON t.id = ht.theme_id
  LEFT JOIN hotels h ON ht.hotel_id = h.id AND h.status = 'approved'
  WHERE t.level = 1
  GROUP BY t.id, t.name, t.level
  HAVING COUNT(DISTINCT h.id) > 0
  ORDER BY t.name;
$$;

-- Create a function to get dynamic activities with hotel counts
CREATE OR REPLACE FUNCTION get_activities_with_counts()
RETURNS TABLE(activity_id uuid, activity_name text, hotel_count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    a.id,
    a.name,
    COUNT(DISTINCT h.id)::bigint
  FROM activities a
  LEFT JOIN hotel_activities ha ON a.id = ha.activity_id
  LEFT JOIN hotels h ON ha.hotel_id = h.id AND h.status = 'approved'
  GROUP BY a.id, a.name
  HAVING COUNT(DISTINCT h.id) > 0
  ORDER BY a.name;
$$;
