import { createClient } from '@/utils/supabase/server';
import HeroSection from '@/components/HeroSection';
import OrganizationChart from '@/components/OrganizationChart';
import DirectorMessage from '@/components/DirectorMessage';
import LatestNews from '@/components/LatestNews';
import CurriculumCards from '@/components/CurriculumCards';
import AdmissionSteps from '@/components/AdmissionSteps';
import AdmissionRequirements from '@/components/AdmissionRequirements';
import VisionMissionPhilosophy from '@/components/VisionMissionPhilosophy';
import SchoolSymbols from '@/components/SchoolSymbols';
import AcademicCalendar from '@/components/AcademicCalendar';
import DigitalLibrary from '@/components/DigitalLibrary';
import RegistrarGrades from '@/components/RegistrarGrades';
import TuitionFees from '@/components/TuitionFees';
import EJournal from '@/components/EJournal';
import ContactInfo from '@/components/ContactInfo';
import SocialMedia from '@/components/SocialMedia';
import InternalSystems from '@/components/InternalSystems';

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from('news_announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
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
      
      {/* Organization Chart */}
      <OrganizationChart personnel={personnel || []} />

      <SchoolSymbols />
      <CurriculumCards />
      <AcademicCalendar />
      <DigitalLibrary />
      <RegistrarGrades />
      <AdmissionSteps />
      <AdmissionRequirements />
      <TuitionFees />
      <LatestNews news={news || []} />
      <EJournal />
      <ContactInfo />
      <SocialMedia />
      <InternalSystems />
    </>
  );
}
