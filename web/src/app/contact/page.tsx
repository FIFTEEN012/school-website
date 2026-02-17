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
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            ติดต่อสอบถาม
          </span>
          <h1 className="font-kanit text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ติดต่อ
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              เรา
            </span>
          </h1>
          <p className="font-sarabun text-lg text-gray-600 max-w-2xl mx-auto">
            หากมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อโรงเรียนได้ตามช่องทางด้านล่าง
          </p>
        </div>
      </div>

      {/* Components */}
      <ContactInfo />
      <SocialMedia />
    </div>
  );
}
