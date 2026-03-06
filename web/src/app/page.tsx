import { createClient } from '@/utils/supabase/server';
import HeroSection from '@/components/HeroSection';
import OrganizationChart from '@/components/OrganizationChart';
import DirectorMessage from '@/components/DirectorMessage';
import LatestNews from '@/components/LatestNews';
import VisionMissionPhilosophy from '@/components/VisionMissionPhilosophy';
import SchoolSymbols from '@/components/SchoolSymbols';
import AcademicCalendar from '@/components/AcademicCalendar';
import ContactInfo from '@/components/ContactInfo';
import SocialMedia from '@/components/SocialMedia';

import StudentShowcase from '@/components/StudentShowcase';

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from('news_announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: personnel } = await supabase
    .from('personnel')
    .select('*')
    .eq('is_active', true)
    .order('rank', { ascending: true });

  return (
    <>
      <HeroSection />
      <DirectorMessage />
      <VisionMissionPhilosophy />
      
      <StudentShowcase />
      
      {/* Organization Chart */}
      <OrganizationChart personnel={personnel || []} />

      <SchoolSymbols />
      <AcademicCalendar />
      <LatestNews news={news || []} />
      <ContactInfo />
      <SocialMedia />

    </>
  );
}
