import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout userEmail={user.email || 'Unknown'}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-kanit text-2xl font-bold text-slate-900">จัดการแกลเลอรี่</h1>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
            + อัปโหลดรูปภาพ
          </button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          ฟีเจอร์จัดการแกลเลอรี่จะถูกเพิ่มในเฟสถัดไป
        </div>
      </div>
    </DashboardLayout>
  );
}
