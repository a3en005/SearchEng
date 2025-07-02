-- Optional: Clean up any old or duplicate entries

-- Remove old/inactive general business entries that were replaced
DELETE FROM public.search_engine_links 
WHERE type = 'general' 
  AND active = false 
  AND created_at < NOW() - INTERVAL '1 day';

-- Remove any test or placeholder entries
DELETE FROM public.search_engine_links 
WHERE source_name LIKE '%test%' 
   OR source_name LIKE '%placeholder%' 
   OR source_name LIKE '%example%';

-- Ensure no duplicate individual search engines
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (PARTITION BY source_name, type ORDER BY created_at DESC) as rn
  FROM public.search_engine_links 
  WHERE type = 'individual'
)
DELETE FROM public.search_engine_links 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Final verification
SELECT 
  'Cleanup completed' as status,
  COUNT(*) as total_active_engines
FROM public.search_engine_links 
WHERE active = true;
