-- Verification script to check all 50 states and people search engines

-- Count by type
SELECT 
  type,
  COUNT(*) as total_engines,
  COUNT(CASE WHEN active = true THEN 1 END) as active_engines
FROM public.search_engine_links 
GROUP BY type
ORDER BY type;

-- Verify all 50 states are present
SELECT 
  source_name,
  state_codes[1] as state,
  source_url,
  active
FROM public.search_engine_links 
WHERE type = 'general' 
  AND active = true
ORDER BY state_codes[1];

-- Count states to ensure we have all 50
SELECT 
  'Total States' as metric,
  COUNT(DISTINCT state_codes[1]) as count
FROM public.search_engine_links 
WHERE type = 'general' 
  AND active = true
  AND state_codes IS NOT NULL;

-- Verify all requested individual search engines are present
SELECT 
  source_name,
  source_url,
  tags,
  active
FROM public.search_engine_links 
WHERE type = 'individual'
  AND source_name IN ('SearchPeopleFree', 'FastPeopleSearch', 'TruePeopleSearch', 'USPhonebooks', 'Radaris', 'Veripages', 'FastBackgroundCheck')
ORDER BY source_name;

-- List all individual search engines
SELECT 
  source_name,
  source_url,
  active
FROM public.search_engine_links 
WHERE type = 'individual'
  AND active = true
ORDER BY source_name;

-- Summary statistics
SELECT 
  'Total Active Search Engines' as metric,
  COUNT(*) as value
FROM public.search_engine_links 
WHERE active = true
UNION ALL
SELECT 
  'State Business Portals' as metric,
  COUNT(*) as value
FROM public.search_engine_links 
WHERE type = 'general' AND active = true
UNION ALL
SELECT 
  'Individual Search Engines' as metric,
  COUNT(*) as value
FROM public.search_engine_links 
WHERE type = 'individual' AND active = true
UNION ALL
SELECT 
  'Foundation Search Engines' as metric,
  COUNT(*) as value
FROM public.search_engine_links 
WHERE type = 'foundation' AND active = true
UNION ALL
SELECT 
  'Investment Advisory Engines' as metric,
  COUNT(*) as value
FROM public.search_engine_links 
WHERE type = 'investment_advisory' AND active = true;

-- Check for any missing states (should return empty if all 50 are present)
WITH all_states AS (
  SELECT unnest(ARRAY['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']) as state_code
),
existing_states AS (
  SELECT DISTINCT state_codes[1] as state_code
  FROM public.search_engine_links 
  WHERE type = 'general' AND active = true AND state_codes IS NOT NULL
)
SELECT 
  a.state_code as missing_state
FROM all_states a
LEFT JOIN existing_states e ON a.state_code = e.state_code
WHERE e.state_code IS NULL;
