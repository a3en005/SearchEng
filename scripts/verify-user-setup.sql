-- Verification script to check if user registration is working

-- Check if the trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table, 
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if the function exists
SELECT 
  routine_name, 
  routine_type, 
  security_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Check RLS policies on users table
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual
FROM pg_policies 
WHERE tablename = 'users';

-- Check RLS policies on user_preferences table
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual
FROM pg_policies 
WHERE tablename = 'user_preferences';

-- Check table permissions
SELECT 
  table_name, 
  privilege_type, 
  grantee
FROM information_schema.table_privileges 
WHERE table_name IN ('users', 'user_preferences')
AND table_schema = 'public';
