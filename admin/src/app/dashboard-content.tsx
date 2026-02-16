'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import {
  GraduationCap,
  Newspaper,
  Users,
  Image as ImageIcon,
  Download,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const menuItems = [
  {
    icon: Newspaper,
    title: 'ข่าวสาร / ประกาศ',
    titleEn: 'News & Announcements',
    desc: 'จัดการข่าวสาร ประกาศ และกิจกรรม',
    color: 'from-blue-500 to-blue-600',
    count: '—',
  },
  {
    icon: Users,
    title: 'บุคลากร',
    titleEn: 'Personnel',
    desc: 'จัดการข้อมูลบุคลากรและโครงสร้างองค์กร',
    color: 'from-emerald-500 to-emerald-600',
    count: '—',
  },
  {
    icon: ImageIcon,
    title: 'แกลเลอรี่',
    titleEn: 'Gallery',
    desc: 'จัดการรูปภาพกิจกรรมและอัลบั้ม',
    color: 'from-violet-500 to-violet-600',
    count: '—',
  },
  {
    icon: Download,
    title: 'ไฟล์ดาวน์โหลด',
    titleEn: 'Downloads',
    desc: 'จัดการไฟล์เอกสารและสื่อดาวน์โหลด',
    color: 'from-amber-500 to-amber-600',
    count: '—',
  },
];

export default function DashboardContent({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 font-[family-name:var(--font-kanit)]">
                  PRS Admin
                </h1>
                <p className="text-[10px] text-gray-400">
                  ระบบจัดการเว็บไซต์
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">แดชบอร์ด</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-kanit)]">
            ยินดีต้อนรับ, Admin
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            จัดการเนื้อหาเว็บไซต์โรงเรียนประชารัฐพัฒนศึกษา
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {menuItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="text-left p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-[family-name:var(--font-kanit)] mb-0.5">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-400 mb-2">{item.titleEn}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="mt-10 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-medium font-[family-name:var(--font-kanit)]">
            ระบบ CMS พร้อมใช้งาน
          </p>
          <p className="text-xs text-blue-400 mt-1">
            ฟีเจอร์จัดการเนื้อหาแต่ละส่วนจะถูกเพิ่มในเฟสถัดไป
          </p>
        </div>
      </main>
    </div>
  );
}
