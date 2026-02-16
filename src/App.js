import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import DirectorMessage from './components/DirectorMessage';
import VisionMissionPhilosophy from './components/VisionMissionPhilosophy';
import SchoolSymbols from './components/SchoolSymbols';
import OrganizationChart from './components/OrganizationChart';
import CurriculumCards from './components/CurriculumCards';
import AcademicCalendar from './components/AcademicCalendar';
import DigitalLibrary from './components/DigitalLibrary';
import RegistrarGrades from './components/RegistrarGrades';
import AdmissionSteps from './components/AdmissionSteps';
import AdmissionRequirements from './components/AdmissionRequirements';
import TuitionFees from './components/TuitionFees';
import LatestNews from './components/LatestNews';
import Gallery from './components/Gallery';
import EJournal from './components/EJournal';
import ContactInfo from './components/ContactInfo';
import SocialMedia from './components/SocialMedia';
import InternalSystems from './components/InternalSystems';

function App() {
  return (
    <Layout>
      {/* ===== Hero Section ===== */}
      <HeroSection />

      {/* ===== Director's Message ===== */}
      <DirectorMessage />

      {/* ===== About Us: Vision, Mission, Philosophy ===== */}
      <VisionMissionPhilosophy />

      {/* ===== School Symbols ===== */}
      <SchoolSymbols />

      {/* ===== Organization Chart ===== */}
      <OrganizationChart />

      {/* ===== Academic: Curriculum Cards ===== */}
      <CurriculumCards />

      {/* ===== Academic Calendar ===== */}
      <AcademicCalendar />

      {/* ===== Digital Library ===== */}
      <DigitalLibrary />

      {/* ===== Registrar & Grades ===== */}
      <RegistrarGrades />

      {/* ===== Admissions: Steps ===== */}
      <AdmissionSteps />

      {/* ===== Admissions: Requirements ===== */}
      <AdmissionRequirements />

      {/* ===== Admissions: Tuition Fees ===== */}
      <TuitionFees />

      {/* ===== News: Latest News ===== */}
      <LatestNews />

      {/* ===== News: Gallery ===== */}
      <Gallery />

      {/* ===== News: E-Journal ===== */}
      <EJournal />

      {/* ===== Contact: Info & Map ===== */}
      <ContactInfo />

      {/* ===== Contact: Social Media ===== */}
      <SocialMedia />

      {/* ===== Contact: Internal Systems ===== */}
      <InternalSystems />
    </Layout>
  );
}

export default App;
