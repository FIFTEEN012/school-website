import React from 'react';
import { Mail } from 'lucide-react';
import ContactInfo from '@/components/ContactInfo';
import SocialMedia from '@/components/SocialMedia';

export const metadata = {
  title: 'ติดต่อเรา | โรงเรียนประชารัฐพัฒนศึกษา',
  description: 'ช่องทางการติดต่อ โรงเรียนประชารัฐพัฒนศึกษา ที่อยู่ เบอร์โทรศัพท์ และโซเชียลมีเดีย',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-0 pt-24 font-sarabun">


      {/* Components */}
      <ContactInfo />
      <SocialMedia />
    </div>
  );
}
