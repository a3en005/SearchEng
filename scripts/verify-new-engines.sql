-- Verification script to check the new search engines

-- Count search engines by type
SELECT 
  type,
  COUNT(*) as total_engines,
  COUNT(CASE WHEN active = true THEN 1 END) as active_engines
FROM public.search_engine_links 
GROUP BY type
ORDER BY type;

-- List all state business search engines
SELECT 
  source_name,
  state_codes[1] as state,
  source_url,
  active
FROM public.search_engine_links 
WHERE type = 'general' 
  AND source_name LIKE '%Secretary of State%' 
  OR source_name LIKE '%Corporation%'
  OR source_name LIKE '%Division%'
ORDER BY state_codes[1];

-- List all individual search engines
SELECT 
  source_name,
  source_url,
  tags,
  active
FROM public.search_engine_links 
WHERE type = 'individual'
ORDER BY source_name;

-- Check for any duplicate entries
SELECT 
  source_name, 
  type, 
  COUNT(*) as count
FROM public.search_engine_links 
GROUP BY source_name, type 
HAVING COUNT(*) > 1;

-- Summary statistics
SELECT 
  'Total Search Engines' as metric,
  COUNT(*) as value
FROM public.search_engine_links
UNION ALL
SELECT 
  'Active Search Engines' as metric,
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
WHERE type = 'individual' AND active = true;
