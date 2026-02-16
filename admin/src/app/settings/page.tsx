import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout userEmail={user.email || 'Unknown'}>
      <div className="space-y-6">
        <h1 className="font-kanit text-2xl font-bold text-slate-900">ตั้งค่า</h1>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          ฟีเจอร์ตั้งค่าจะถูกเพิ่มในเฟสถัดไป
        </div>
      </div>
    </DashboardLayout>
  );
}
