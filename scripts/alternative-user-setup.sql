-- Alternative approach if the trigger method still doesn't work
-- This removes the automatic user creation and handles it in the application

-- Drop the problematic trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simpler function that can be called from the application
CREATE OR REPLACE FUNCTION public.create_user_profile(
  user_id UUID,
  user_email TEXT,
  user_name TEXT DEFAULT ''
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Insert user profile
  INSERT INTO public.users (id, email, name)
  VALUES (user_id, user_email, user_name)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, public.users.name),
    updated_at = NOW();
  
  -- Create user preferences
  INSERT INTO public.user_preferences (user_id)
  VALUES (user_id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in create_user_profile: %', SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;
