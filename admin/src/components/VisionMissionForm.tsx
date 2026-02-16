'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Save, 
  Loader2,
  Eye,
  Target,
  Flag,
  Map,
  BookOpen,
  HelpCircle
} from 'lucide-react';

export default function VisionMissionForm() {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    vision_content: '',
    mission_content: '',
    goal_content: '',
    strategy_content: '',
    philosophy_quote: '',
    philosophy_desc: ''
  });

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
            vision_content: data.vision_content || '',
            mission_content: data.mission_content || '',
            goal_content: data.goal_content || '',
            strategy_content: data.strategy_content || '',
            philosophy_quote: data.philosophy_quote || '',
            philosophy_desc: data.philosophy_desc || ''
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('school_profile')
        .upsert({
          id: formData.id || undefined,
          vision_content: formData.vision_content,
          mission_content: formData.mission_content,
          goal_content: formData.goal_content,
          strategy_content: formData.strategy_content,
          philosophy_quote: formData.philosophy_quote,
          philosophy_desc: formData.philosophy_desc,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

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
          <h2 className="text-lg font-bold text-slate-900 font-kanit">จัดการข้อมูลวิสัยทัศน์และพันธกิจ</h2>
          <p className="text-sm text-slate-500 font-sarabun">แก้ไขข้อมูลวิสัยทัศน์ พันธกิจ เป้าประสงค์ และกลยุทธ์</p>
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

      <div className="p-6 md:p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Vision (Single Line/Short Text) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 font-kanit">
                    วิสัยทัศน์ (Vision)
                </h3>
            </div>
            
            <textarea
                name="vision_content"
                value={formData.vision_content}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sarabun resize-none"
                placeholder="ระบุวิสัยทัศน์ของโรงเรียน..."
            />
          </div>

          {/* Section 2: Mission (Multiline) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <Target className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 font-kanit">
                    พันธกิจ (Mission)
                </h3>
                <span className="text-xs text-slate-400 font-sarabun ml-auto bg-slate-100 px-2 py-1 rounded">
                    *ขึ้นบรรทัดใหม่เพื่อแยกข้อ (1 บรรทัด = 1 ข้อ)
                </span>
            </div>
            
            <textarea
                name="mission_content"
                value={formData.mission_content}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-sarabun"
                placeholder="1. พัฒนาผู้เรียน...&#10;2. ส่งเสริมครู..."
            />
          </div>

          {/* Section 3: Goals (Multiline) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="p-1.5 bg-rose-100 rounded-lg">
                    <Flag className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 font-kanit">
                    เป้าประสงค์ (Goals)
                </h3>
                <span className="text-xs text-slate-400 font-sarabun ml-auto bg-slate-100 px-2 py-1 rounded">
                    *ขึ้นบรรทัดใหม่เพื่อแยกข้อ
                </span>
            </div>
            
            <textarea
                name="goal_content"
                value={formData.goal_content}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent font-sarabun"
                placeholder="1. ผู้เรียนมีความรู้...&#10;2. โรงเรียนมีระบบ..."
            />
          </div>

           {/* Section 4: Strategies (Multiline) */}
           <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="p-1.5 bg-violet-100 rounded-lg">
                    <Map className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 font-kanit">
                    กลยุทธ์ (Strategies)
                </h3>
                <span className="text-xs text-slate-400 font-sarabun ml-auto bg-slate-100 px-2 py-1 rounded">
                    *ขึ้นบรรทัดใหม่เพื่อแยกข้อ
                </span>
            </div>
            
            <textarea
                name="strategy_content"
                value={formData.strategy_content}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent font-sarabun"
                placeholder="1. ส่งเสริมการเรียนรู้...&#10;2. พัฒนาหลักสูตร..."
            />
          </div>

          {/* Section 5: Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 font-kanit">
                    ปรัชญา (Philosophy)
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                        พุทธศาสนสุภาษิต / คำขวัญ (Pali/Quote)
                    </label>
                    <input
                        type="text"
                        name="philosophy_quote"
                        value={formData.philosophy_quote}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-sarabun"
                        placeholder="ทนโต เสฏโฐ มนุสเสสุ"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">
                        คำแปล / ความหมาย (Description)
                    </label>
                    <input
                        type="text"
                        name="philosophy_desc"
                        value={formData.philosophy_desc}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-sarabun"
                        placeholder="ผู้ฝึกตนดีแล้ว ย่อมประเสริฐ ในหมู่มนุษย์"
                    />
                </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
