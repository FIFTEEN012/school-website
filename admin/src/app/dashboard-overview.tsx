'use client';

import {
  Newspaper,
  Users,
  ImageIcon,
  Download,
  TrendingUp,
  Eye,
} from 'lucide-react';

const stats = [
  {
    name: 'ข่าวทั้งหมด',
    value: '0',
    icon: Newspaper,
    color: 'bg-blue-500',
    trend: '+0%',
  },
  {
    name: 'บุคลากร',
    value: '0',
    icon: Users,
    color: 'bg-emerald-500',
    trend: '+0%',
  },
  {
    name: 'รูปภาพ',
    value: '0',
    icon: ImageIcon,
    color: 'bg-violet-500',
    trend: '+0%',
  },
  {
    name: 'ไฟล์ดาวน์โหลด',
    value: '0',
    icon: Download,
    color: 'bg-amber-500',
    trend: '+0%',
  },
];

const recentActivity = [
  { action: 'ระบบพร้อมใช้งาน', time: 'เมื่อสักครู่', type: 'info' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-kanit text-2xl font-bold text-slate-900">แดชบอร์ด</h1>
        <p className="text-sm text-slate-500 mt-1">ภาพรวมระบบจัดการเว็บไซต์</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 font-kanit">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{stat.trend}</span>
              <span className="text-xs text-slate-400">จากเดือนที่แล้ว</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-kanit font-semibold text-slate-900">กิจกรรมล่าสุด</h3>
          </div>
          <div className="p-5">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-700">{item.action}</span>
                <span className="text-xs text-slate-400 ml-auto">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-kanit font-semibold text-slate-900">ทำงานด่วน</h3>
          </div>
          <div className="p-5 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left">
              <Newspaper className="w-4 h-4 text-blue-500" />
              <span>เพิ่มข่าวใหม่</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>เพิ่มบุคลากร</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left">
              <ImageIcon className="w-4 h-4 text-violet-500" />
              <span>อัปโหลดรูปภาพ</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>ดูเว็บไซต์</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="font-kanit font-semibold text-lg">ยินดีต้อนรับสู่ระบบจัดการ</h3>
        <p className="text-sm text-slate-300 mt-1">
          ระบบ CMS สำหรับโรงเรียนประชารัฐพัฒนศึกษา พร้อมให้บริการแล้ว
        </p>
        <p className="text-xs text-slate-400 mt-3">
          หากพบปัญหาการใช้งาน กรุณาติดต่อผู้ดูแลระบบ
        </p>
      </div>
    </div>
  );
}
