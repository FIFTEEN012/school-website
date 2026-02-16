'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Trophy, 
  ImageIcon, 
  Save, 
  Loader2,
  Upload,
  X
} from 'lucide-react';

export default function GeneralInfoForm() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    school_name: '',
    student_count: 0,
    curriculum_count: 0,
    success_rate: 0,
    hero_image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('school_profile')
        .select('*')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
            // No data found, might need to insert first or handle empty state
            // For now, let's assume seed data exists or we initialize defaults
            console.log("No profile found, using defaults");
        } else {
            console.error('Error fetching data:', error);
        }
      }

      if (data) {
        setFormData({
            id: data.id,
            school_name: data.school_name || '',
            student_count: data.student_count || 0,
            curriculum_count: data.curriculum_count || 0,
            success_rate: data.success_rate || 0,
            hero_image_url: data.hero_image_url || ''
        });
        setPreviewUrl(data.hero_image_url);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'school_name' ? value : Number(value)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.hero_image_url;

      // Upload Image if changed
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `hero-${Date.now()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('hero_images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from('hero_images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrlData.publicUrl;
      }

      // Update Database
      const { error: updateError } = await supabase
        .from('school_profile')
        .upsert({
          id: formData.id || undefined, // undefined allows auto-generation on insert if id is missing, but typically we update
          school_name: formData.school_name,
          student_count: formData.student_count,
          curriculum_count: formData.curriculum_count,
          success_rate: formData.success_rate,
          hero_image_url: imageUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      // Refresh data to ensure state sync
      fetchData();

    } catch (error) {
      console.error('Error saving data:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-kanit">จัดการข้อมูลทั่วไป (General Info)</h2>
          <p className="text-sm text-slate-500 font-sarabun">แก้ไขข้อมูลที่แสดงบนหน้าแรกของเว็บไซต์</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-kanit shadow-sm hover:shadow-primary-500/25"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Stats Form */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-700 font-kanit border-l-4 border-primary-500 pl-3">
              ข้อมูลโรงเรียน
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                  ชื่อโรงเรียน (School Name)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun"
                    placeholder="โรงเรียนประชารัฐพัฒนศึกษา"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                    จำนวนนักเรียน
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      name="student_count"
                      value={formData.student_count}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                    จำนวนหลักสูตร
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      name="curriculum_count"
                      value={formData.curriculum_count}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                    ความสำเร็จ (%)
                  </label>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      step="0.1"
                      name="success_rate"
                      value={formData.success_rate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image Upload */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-700 font-kanit border-l-4 border-primary-500 pl-3">
              รูปภาพหน้าปก (Hero Image)
            </h3>

            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="relative w-full aspect-[4/5] max-w-[300px] mx-auto rounded-lg overflow-hidden shadow-md group">
                  <img
                    src={previewUrl}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="text-white flex flex-col items-center">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium font-kanit">เปลี่ยนรูปภาพ</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                    className="flex flex-col items-center justify-center py-12 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-500">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 font-kanit mb-1">
                    คลิกเพื่ออัปโหลดรูปภาพ
                  </p>
                  <p className="text-xs text-slate-500 font-sarabun">
                    ขนาดแนะนำ 800 x 1000 pixels (Portrait)
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
