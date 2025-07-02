-- Admin utility functions

-- Function to get search statistics
CREATE OR REPLACE FUNCTION public.get_search_statistics(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_searches BIGINT,
  unique_users BIGINT,
  top_search_type TEXT,
  searches_by_type JSONB
) AS $$
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  WITH search_stats AS (
    SELECT 
      COUNT(*) as total_searches,
      COUNT(DISTINCT user_id) as unique_users,
      type_selected,
      COUNT(*) as type_count
    FROM public.search_logs 
    WHERE timestamp::date BETWEEN start_date AND end_date
    GROUP BY type_selected
  ),
  aggregated AS (
    SELECT 
      SUM(type_count) as total_searches,
      COUNT(DISTINCT CASE WHEN type_count > 0 THEN 1 END) as unique_users,
      jsonb_object_agg(type_selected, type_count) as searches_by_type
    FROM search_stats
  )
  SELECT 
    a.total_searches,
    a.unique_users,
    (SELECT type_selected FROM search_stats ORDER BY type_count DESC LIMIT 1) as top_search_type,
    a.searches_by_type
  FROM aggregated a;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user activity report
CREATE OR REPLACE FUNCTION public.get_user_activity_report(
  limit_count INTEGER DEFAULT 100
)
RETURNS TABLE (
  user_id UUID,
  user_name TEXT,
  user_email TEXT,
  total_searches BIGINT,
  last_search TIMESTAMP WITH TIME ZONE,
  favorite_search_type TEXT
) AS $$
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(sl.id) as total_searches,
    MAX(sl.timestamp) as last_search,
    MODE() WITHIN GROUP (ORDER BY sl.type_selected) as favorite_search_type
  FROM public.users u
  LEFT JOIN public.search_logs sl ON u.id = sl.user_id
  GROUP BY u.id, u.name, u.email
  ORDER BY total_searches DESC, last_search DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle search engine status
CREATE OR REPLACE FUNCTION public.toggle_search_engine_status(
  engine_id UUID,
  new_status BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  UPDATE public.search_engine_links 
  SET active = new_status, updated_at = NOW()
  WHERE id = engine_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments
COMMENT ON FUNCTION public.get_search_statistics IS 'Admin function to get search statistics for a date range';
COMMENT ON FUNCTION public.get_user_activity_report IS 'Admin function to get user activity report';
COMMENT ON FUNCTION public.toggle_search_engine_status IS 'Admin function to activate/deactivate search engines';
