-- Create search_logs table
CREATE TABLE IF NOT EXISTS public.search_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input_name TEXT NOT NULL,
  input_address TEXT NOT NULL,
  type_selected TEXT NOT NULL CHECK (type_selected IN ('individual', 'general', 'foundation', 'investment_advisory')),
  sources_used TEXT[], -- Array of source names that were used
  search_metadata JSONB, -- Store additional search parameters
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for search_logs table
CREATE POLICY "Users can view own search logs" ON public.search_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search logs" ON public.search_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all search logs" ON public.search_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_search_logs_user_timestamp ON public.search_logs(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_search_logs_type ON public.search_logs(type_selected);
CREATE INDEX IF NOT EXISTS idx_search_logs_timestamp ON public.search_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_search_logs_user_id ON public.search_logs(user_id);

-- Add comments
COMMENT ON TABLE public.search_logs IS 'Audit trail of all user searches with metadata';
COMMENT ON COLUMN public.search_logs.sources_used IS 'Array of search engine names that were used for this search';
COMMENT ON COLUMN public.search_logs.search_metadata IS 'JSON object storing additional search parameters and results';
