-- Create views for easier querying

-- View for active search engines with metadata
CREATE OR REPLACE VIEW public.active_search_engines AS
SELECT 
  id,
  type,
  country,
  source_name,
  source_url,
  description,
  tags,
  state_codes,
  created_at,
  updated_at
FROM public.search_engine_links
WHERE active = true
ORDER BY type, source_name;

-- View for user search statistics
CREATE OR REPLACE VIEW public.user_search_stats AS
SELECT 
  u.id as user_id,
  u.name,
  u.email,
  COUNT(sl.id) as total_searches,
  COUNT(DISTINCT sl.type_selected) as unique_search_types,
  MAX(sl.timestamp) as last_search,
  MIN(sl.timestamp) as first_search
FROM public.users u
LEFT JOIN public.search_logs sl ON u.id = sl.user_id
GROUP BY u.id, u.name, u.email;

-- View for search engine usage statistics
CREATE OR REPLACE VIEW public.search_engine_usage AS
SELECT 
  sel.id,
  sel.source_name,
  sel.type,
  sel.country,
  COUNT(sl.id) as usage_count,
  COUNT(DISTINCT sl.user_id) as unique_users,
  MAX(sl.timestamp) as last_used
FROM public.search_engine_links sel
LEFT JOIN public.search_logs sl ON sel.source_name = ANY(sl.sources_used)
WHERE sel.active = true
GROUP BY sel.id, sel.source_name, sel.type, sel.country
ORDER BY usage_count DESC;

-- Add comments
COMMENT ON VIEW public.active_search_engines IS 'View of all active search engines for easy querying';
COMMENT ON VIEW public.user_search_stats IS 'Aggregated statistics for each user showing search activity';
COMMENT ON VIEW public.search_engine_usage IS 'Usage statistics for each search engine showing popularity';
