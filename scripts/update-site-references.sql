-- Update any database references to use the new domain
-- This is mainly for documentation and future reference

-- Add a comment to track the site URL change
COMMENT ON SCHEMA public IS 'Cygnus Search Portal - https://cygnuspac-search-portal.vercel.app - Updated domain configuration';

-- If you have any stored URLs in the database, update them here
-- Example: UPDATE some_table SET callback_url = REPLACE(callback_url, 'old-domain', 'cygnuspac-search-portal.vercel.app');

-- Verify the update
SELECT 'Site configuration updated' as status, 'https://cygnuspac-search-portal.vercel.app' as new_domain;
