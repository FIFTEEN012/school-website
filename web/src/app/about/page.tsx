import { createClient } from '@/utils/supabase/server';
import OrganizationChart from '@/components/OrganizationChart';

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: personnel } = await supabase
    .from('personnel')
    .select('*')
    .eq('is_active', true)
    .order('rank', { ascending: true });

  return (
    <>
      <OrganizationChart personnel={personnel || []} />
    </>
  );
}
