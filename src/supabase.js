import { createClient } from '@supabase/supabase-js';

// Frontend Supabase client for public operations
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ryxmbzxlijewmzsbbgol.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5eG1ienhsaWpld216c2JiZ29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMjg2ODMsImV4cCI6MjA4NjcwNDY4M30.p2YQ8oS5xWQrnMY4fzuKEWHJN3d0gGdlnhXkXKHn-jE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for data fetching
export const fetchLatestNews = async (limit = 3) => {
  const { data, error } = await supabase
    .from('news_announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }

  return data || [];
};

export const fetchPersonnel = async () => {
  const { data, error } = await supabase
    .from('personnel')
    .select('*')
    .eq('is_active', true)
    .order('rank', { ascending: true });

  if (error) {
    console.error('Error fetching personnel:', error);
    return [];
  }

  return data || [];
};

export const fetchGalleryAlbums = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }

  return data || [];
};

export default supabase;
