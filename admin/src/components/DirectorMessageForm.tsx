'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  User, 
  Quote, 
  ImageIcon, 
  Save, 
  Loader2,
  Upload,
  Eye,
  Shield,
  Heart
} from 'lucide-react';

export default function DirectorMessageForm() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    director_name: '',
    director_message: '',
    director_image_url: '',
    vision_title: '',
    vision_desc: '',
    management_title: '',
    management_desc: '',
    student_title: '',
    student_desc: ''
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
        console.error('Error fetching data:', error);
      }

      if (data) {
        setFormData({
            id: data.id,
            director_name: data.director_name || '',
            director_message: data.director_message || '',
            director_image_url: data.director_image_url || '',
            vision_title: data.vision_title || '',
            vision_desc: data.vision_desc || '',
            management_title: data.management_title || '',
            management_desc: data.management_desc || '',
            student_title: data.student_title || '',
            student_desc: data.student_desc || ''
        });
        setPreviewUrl(data.director_image_url);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      let imageUrl = formData.director_image_url;

      // Upload Image if changed
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `director-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('hero_images') // Reuse existing bucket
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('hero_images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrlData.publicUrl;
      }

      // Update Database
      const { error: updateError } = await supabase
        .from('school_profile')
        .upsert({
          id: formData.id || undefined,
          director_name: formData.director_name,
          director_message: formData.director_message,
          director_image_url: imageUrl,
          vision_title: formData.vision_title,
          vision_desc: formData.vision_desc,
          management_title: formData.management_title,
          management_desc: formData.management_desc,
          student_title: formData.student_title,
          student_desc: formData.student_desc,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
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
          <h2 className="text-lg font-bold text-slate-900 font-kanit">จัดการสารจากผู้อำนวยการ</h2>
          <p className="text-sm text-slate-500 font-sarabun">แก้ไขข้อมูลผู้อำนวยการ วิสัยทัศน์ และรูปภาพ</p>
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
          
          {/* Left Column: Director Info */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-700 font-kanit border-l-4 border-primary-500 pl-3">
              ข้อมูลผู้อำนวยการ
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                  ชื่อ-นามสกุล
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="director_name"
                    value={formData.director_name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun"
                    placeholder="นางชนัฎฎา จำเริญสรรพ์"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                  สารจากผู้อำนวยการ
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <Quote className="w-5 h-5 text-slate-400" />
                  </div>
                  <textarea
                    name="director_message"
                    value={formData.director_message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sarabun resize-none"
                    placeholder="ข้อความสารจากผู้อำนวยการ..."
                  />
                </div>
              </div>
            </div>

            <h3 className="text-base font-semibold text-slate-700 font-kanit border-l-4 border-accent-500 pl-3 pt-4">
              หลักการบริหาร (3 ข้อ)
            </h3>

            <div className="space-y-4">
              {/* Vision */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-kanit font-medium text-slate-700">ข้อที่ 1: วิสัยทัศน์</span>
                </div>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="vision_title"
                        value={formData.vision_title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-kanit text-sm focus:ring-1 focus:ring-blue-500"
                        placeholder="หัวข้อ (เช่น วิสัยทัศน์ที่ชัดเจน)"
                    />
                    <input
                        type="text"
                        name="vision_desc"
                        value={formData.vision_desc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-sarabun text-sm focus:ring-1 focus:ring-blue-500"
                        placeholder="คำอธิบายสั้นๆ"
                    />
                </div>
              </div>

              {/* Management */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-kanit font-medium text-slate-700">ข้อที่ 2: การบริหาร</span>
                </div>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="management_title"
                        value={formData.management_title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-kanit text-sm focus:ring-1 focus:ring-emerald-500"
                        placeholder="หัวข้อ (เช่น บริหารโปร่งใส)"
                    />
                    <input
                        type="text"
                        name="management_desc"
                        value={formData.management_desc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-sarabun text-sm focus:ring-1 focus:ring-emerald-500"
                        placeholder="คำอธิบายสั้นๆ"
                    />
                </div>
              </div>

              {/* Students */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-rose-100 rounded-lg">
                        <Heart className="w-4 h-4 text-rose-600" />
                    </div>
                    <span className="font-kanit font-medium text-slate-700">ข้อที่ 3: ผู้เรียน</span>
                </div>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="student_title"
                        value={formData.student_title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-kanit text-sm focus:ring-1 focus:ring-rose-500"
                        placeholder="หัวข้อ (เช่น ใส่ใจผู้เรียน)"
                    />
                    <input
                        type="text"
                        name="student_desc"
                        value={formData.student_desc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-sarabun text-sm focus:ring-1 focus:ring-rose-500"
                        placeholder="คำอธิบายสั้นๆ"
                    />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image Upload */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-700 font-kanit border-l-4 border-primary-500 pl-3">
              รูปภาพผู้อำนวยการ
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
                <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto rounded-lg overflow-hidden shadow-md group">
                  <img
                    src={previewUrl}
                    alt="Director Preview"
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
                    ขนาดแนะนำ 3:4 Portrait
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
