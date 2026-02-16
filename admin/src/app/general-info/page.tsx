import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import GeneralInfoForm from '@/components/GeneralInfoForm';

export default async function GeneralInfoPage() {
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
            ข้อมูลทั่วไป (General Info)
          </h1>
          <p className="text-slate-500 font-sarabun">
            จัดการข้อมูลพื้นฐานของโรงเรียนและรูปภาพหน้าแรก
          </p>
        </div>

        <GeneralInfoForm />
      </div>
    </DashboardLayout>
  );
}
