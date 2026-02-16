import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import PersonnelManager from '@/components/PersonnelManager';

export default async function PersonnelPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch personnel from Supabase
  const { data: personnel, error } = await supabase
    .from('personnel')
    .select('*')
    .order('rank', { ascending: true });

  if (error) {
    console.error('Error fetching personnel:', error);
  }

  return (
    <DashboardLayout userEmail={user.email || 'Unknown'}>
      <PersonnelManager initialPersonnel={personnel || []} />
    </DashboardLayout>
  );
}
