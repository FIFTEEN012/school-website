import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import VisionMissionForm from '@/components/VisionMissionForm';

export default async function VisionMissionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout userEmail={user.email || 'Admin'}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold font-kanit text-slate-900">
            วิสัยทัศน์ พันธกิจ (Vision & Mission)
          </h1>
          <p className="text-slate-500 font-sarabun">
            จัดการข้อมูลวิสัยทัศน์ พันธกิจ เป้าประสงค์ กลยุทธ์ และปรัชญาของโรงเรียน
          </p>
        </div>

        <VisionMissionForm />
      </div>
    </DashboardLayout>
  );
}
