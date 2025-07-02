-- Create search_engine_links table
CREATE TABLE IF NOT EXISTS public.search_engine_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('individual', 'general', 'foundation', 'investment_advisory')),
  country TEXT NOT NULL DEFAULT 'USA',
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  state_codes TEXT[], -- For state-specific sources like 'CA', 'NY', 'TX'
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Constraint for unique sources
  CONSTRAINT unique_source_per_type UNIQUE(type, source_name, country)
);

-- Enable Row Level Security
ALTER TABLE public.search_engine_links ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for search_engine_links table
CREATE POLICY "Anyone can view active search engines" ON public.search_engine_links
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage search engines" ON public.search_engine_links
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_search_engine_links_type ON public.search_engine_links(type);
CREATE INDEX IF NOT EXISTS idx_search_engine_links_active ON public.search_engine_links(active);
CREATE INDEX IF NOT EXISTS idx_search_engine_links_country ON public.search_engine_links(country);
CREATE INDEX IF NOT EXISTS idx_search_engine_links_state_codes ON public.search_engine_links USING GIN(state_codes);
CREATE INDEX IF NOT EXISTS idx_search_engine_links_tags ON public.search_engine_links USING GIN(tags);

-- Add comments
COMMENT ON TABLE public.search_engine_links IS 'Configurable search engines and databases organized by type';
COMMENT ON COLUMN public.search_engine_links.type IS 'Type of search: individual, general, foundation, investment_advisory';
COMMENT ON COLUMN public.search_engine_links.state_codes IS 'Array of state codes this source covers (e.g., [CA, NY])';
COMMENT ON COLUMN public.search_engine_links.tags IS 'Array of tags for categorization and filtering';
