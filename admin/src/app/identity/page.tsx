import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import IdentityForm from '@/components/IdentityForm';

export default async function IdentityPage() {
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
            เอกลักษณ์โรงเรียน (School Identity)
          </h1>
          <p className="text-slate-500 font-sarabun">
            จัดการข้อมูลตราสัญลักษณ์ สีประจำโรงเรียน และต้นไม้ประจำโรงเรียน
          </p>
        </div>

        <IdentityForm />
      </div>
    </DashboardLayout>
  );
}
