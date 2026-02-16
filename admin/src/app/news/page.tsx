import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import NewsManager from '@/components/NewsManager';

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch news from Supabase
  const { data: news, error } = await supabase
    .from('news_announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
  }

  return (
    <DashboardLayout userEmail={user.email || 'Unknown'}>
      <NewsManager initialNews={news || []} userId={user.id} />
    </DashboardLayout>
  );
}
