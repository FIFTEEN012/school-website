import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import DirectorMessageForm from '@/components/DirectorMessageForm';

export default async function DirectorMessagePage() {
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
            สารจากผู้อำนวยการ (Director Message)
          </h1>
          <p className="text-slate-500 font-sarabun">
            จัดการข้อมูลสารจากผู้อำนวยการ วิสัยทัศน์ และนโยบายการบริหาร
          </p>
        </div>

        <DirectorMessageForm />
      </div>
    </DashboardLayout>
  );
}
