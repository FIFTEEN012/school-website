-- Run this in your Supabase SQL Editor

-- 1. Enable RLS on the table (ensure it's on)
ALTER TABLE personnel ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing restrictive policies (to avoid conflicts)
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON personnel;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON personnel;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON personnel;
DROP POLICY IF EXISTS "Enable read access for all users" ON personnel;

-- 3. Create permissive policies for the admin system

-- Allow everyone to READ (so the public website can see them)
CREATE POLICY "Enable read access for all users"
ON personnel FOR SELECT
USING (true);

-- Allow authenticated users (Admins) to DELETE
CREATE POLICY "Enable delete for authenticated users"
ON personnel FOR DELETE
TO authenticated
USING (true);

-- Allow authenticated users (Admins) to INSERT
CREATE POLICY "Enable insert for authenticated users"
ON personnel FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users (Admins) to UPDATE
CREATE POLICY "Enable update for authenticated users"
ON personnel FOR UPDATE
TO authenticated
USING (true);
