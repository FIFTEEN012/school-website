import { createClient } from '@/utils/supabase/server';
import OrganizationChart from '@/components/OrganizationChart';
import StudentStats from '@/components/StudentStats';

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: personnel } = await supabase
    .from('personnel')
    .select('*')
    .eq('is_active', true)
    .order('rank', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <OrganizationChart personnel={personnel || []} />
        <StudentStats />
      </div>
    </div>
  );
}
