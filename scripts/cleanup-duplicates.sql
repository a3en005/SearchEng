-- Clean up any duplicate entries that might exist

-- Remove duplicate state entries (keep the most recent)
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (PARTITION BY state_codes[1], type ORDER BY created_at DESC) as rn
  FROM public.search_engine_links 
  WHERE type = 'general' AND state_codes IS NOT NULL
)
DELETE FROM public.search_engine_links 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Remove duplicate individual search engines (keep the most recent)
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

-- Final count verification
SELECT 
  'Cleanup completed - Total active engines' as status,
  COUNT(*) as total_active_engines
FROM public.search_engine_links 
WHERE active = true;
