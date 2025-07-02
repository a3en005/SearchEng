-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant specific permissions for views
GRANT SELECT ON public.active_search_engines TO anon, authenticated;
GRANT SELECT ON public.user_search_stats TO authenticated;
GRANT SELECT ON public.search_engine_usage TO authenticated;

-- Revoke unnecessary permissions from anon users
REVOKE ALL ON public.users FROM anon;
REVOKE ALL ON public.search_logs FROM anon;
REVOKE ALL ON public.user_preferences FROM anon;
REVOKE ALL ON public.search_favorites FROM anon;
REVOKE ALL ON public.audit_logs FROM anon;

-- Add comments
COMMENT ON SCHEMA public IS 'Main application schema with proper RLS and permissions';
