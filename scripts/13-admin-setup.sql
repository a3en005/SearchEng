-- Admin setup script
-- Run this after your first admin user signs up

-- Instructions for setting up the first admin user:
-- 1. First, have the admin user sign up through the normal process
-- 2. Then run this command with their actual email:

-- UPDATE public.users SET role = 'admin' WHERE email = 'your-admin-email@example.com';

-- Example (uncomment and modify):
-- UPDATE public.users SET role = 'admin' WHERE email = 'admin@cygnus.com';

-- Verify admin setup
-- SELECT id, email, name, role, created_at FROM public.users WHERE role = 'admin';

-- Add comment
COMMENT ON SCHEMA public IS 'Schema setup complete. Remember to set admin role for first admin user.';
