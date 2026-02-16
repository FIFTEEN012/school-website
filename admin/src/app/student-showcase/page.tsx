import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import StudentShowcaseManager from '@/components/StudentShowcaseManager';

export default async function StudentShowcasePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout userEmail={user.email || 'Admin'}>
      <div className="p-6">
        <StudentShowcaseManager />
      </div>
    </DashboardLayout>
  );
}
