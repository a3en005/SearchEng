-- Create search_favorites table
CREATE TABLE IF NOT EXISTS public.search_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  search_name TEXT NOT NULL, -- User-defined name for the search
  input_name TEXT NOT NULL,
  input_address TEXT NOT NULL,
  type_selected TEXT NOT NULL CHECK (type_selected IN ('individual', 'general', 'foundation', 'investment_advisory')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure user can't have duplicate favorite names
  CONSTRAINT unique_favorite_name_per_user UNIQUE(user_id, search_name)
);

-- Enable Row Level Security
ALTER TABLE public.search_favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for search_favorites table
CREATE POLICY "Users can manage own favorites" ON public.search_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_search_favorites_user_id ON public.search_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_search_favorites_user_name ON public.search_favorites(user_id, search_name);

-- Add comments
COMMENT ON TABLE public.search_favorites IS 'User-saved favorite searches for quick access';
COMMENT ON COLUMN public.search_favorites.search_name IS 'User-defined name for easy identification of saved search';
