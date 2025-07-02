-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  auto_open_results BOOLEAN DEFAULT true,
  max_auto_open INTEGER DEFAULT 3 CHECK (max_auto_open >= 0 AND max_auto_open <= 10),
  preferred_search_engines TEXT[], -- User's preferred search engines
  email_notifications BOOLEAN DEFAULT false,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for user_preferences table
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);

-- Add comments
COMMENT ON TABLE public.user_preferences IS 'User-specific application preferences and settings';
COMMENT ON COLUMN public.user_preferences.auto_open_results IS 'Whether to automatically open search results in new tabs';
COMMENT ON COLUMN public.user_preferences.max_auto_open IS 'Maximum number of results to auto-open (0-10)';
