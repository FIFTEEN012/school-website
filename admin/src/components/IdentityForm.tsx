'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Shield, 
  Palette, 
  Flower, 
  Upload, 
  X, 
  Plus, 
  Save, 
  Loader2, 
  Trash2,
  ImageIcon
} from 'lucide-react';

interface SchoolColor {
  name: string;
  hex: string;
  meaning: string;
}

export default function IdentityForm() {
  const supabase = createClient();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const treeImageInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    school_emblem_desc: '',
    school_tree_name: '',
    school_tree_sciname: '',
    school_tree_desc: '',
  });
  
  const [colors, setColors] = useState<SchoolColor[]>([]);
  
  // Image States
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [treeFile, setTreeFile] = useState<File | null>(null);
  const [treePreview, setTreePreview] = useState<string | null>(null);

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
            school_emblem_desc: data.school_emblem_desc || '',
            school_tree_name: data.school_tree_name || '',
            school_tree_sciname: data.school_tree_sciname || '',
            school_tree_desc: data.school_tree_desc || '',
        });
        
        // Handle Colors JSONB
        if (data.school_colors && Array.isArray(data.school_colors)) {
            setColors(data.school_colors);
        } else {
            // Default if empty
            setColors([
                { name: 'สีม่วง (Purple)', hex: '#9333ea', meaning: 'ความสามัคคี ความเข้มแข็ง' },
                { name: 'สีเหลือง (Yellow)', hex: '#facc15', meaning: 'ความสงบร่มเย็น เจริญรุ่งเรือง' }
            ]);
        }

        if (data.school_logo_url) setLogoPreview(data.school_logo_url);
        if (data.school_tree_image_url) setTreePreview(data.school_tree_image_url);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Image Handling ---
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleTreeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTreeFile(file);
      setTreePreview(URL.createObjectURL(file));
    }
  };

  // --- Color Handling ---
  const handleColorChange = (index: number, field: keyof SchoolColor, value: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
  };

  const addColor = () => {
    setColors([...colors, { name: '', hex: '#000000', meaning: '' }]);
  };

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let logoUrl = logoPreview;
      let treeUrl = treePreview;

      // Upload Logo
      if (logoFile) {
        const fileName = `logo-${Date.now()}.${logoFile.name.split('.').pop()}`;
        const { error: uploadError } = await supabase.storage
          .from('hero_images') // Reusing bucket for now
          .upload(fileName, logoFile);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('hero_images').getPublicUrl(fileName);
        logoUrl = data.publicUrl;
      }

      // Upload Tree Image
      if (treeFile) {
        const fileName = `tree-${Date.now()}.${treeFile.name.split('.').pop()}`;
        const { error: uploadError } = await supabase.storage
          .from('hero_images')
          .upload(fileName, treeFile);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('hero_images').getPublicUrl(fileName);
        treeUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from('school_profile')
        .upsert({
          id: formData.id || undefined,
          school_emblem_desc: formData.school_emblem_desc,
          school_tree_name: formData.school_tree_name,
          school_tree_sciname: formData.school_tree_sciname,
          school_tree_desc: formData.school_tree_desc,
          school_colors: colors,
          school_logo_url: logoUrl,
          school_tree_image_url: treeUrl,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      fetchData(); // Refresh to clean dirty state
      setLogoFile(null);
      setTreeFile(null);

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
    <div className="space-y-6">
        <div className="flex items-center justify-end">
             <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-all font-kanit shadow-lg shadow-primary-500/30"
            >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                บันทึกทั้งหมด
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section 1: School Emblem */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 font-kanit">ตราสัญลักษณ์ (School Emblem)</h3>
                </div>

                <div className="space-y-6 flex-grow">
                    {/* Logo Upload */}
                     <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors">
                        <input
                            type="file"
                            ref={logoInputRef}
                            onChange={handleLogoChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {logoPreview ? (
                            <div className="relative w-32 h-32 mx-auto rounded-xl bg-white shadow-sm p-2 group">
                                <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                                <button 
                                    onClick={() => logoInputRef.current?.click()}
                                    type="button"
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl text-white font-kanit text-sm"
                                >
                                    เปลี่ยนรูป
                                </button>
                            </div>
                        ) : (
                            <div className="cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-500">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <p className="text-sm text-slate-500 font-kanit">อัปโหลดตราสัญลักษณ์</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 font-sarabun">
                            คำอธิบายตราสัญลักษณ์
                        </label>
                        <textarea
                            name="school_emblem_desc"
                            value={formData.school_emblem_desc}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-sarabun"
                            placeholder="ตราสัญลักษณ์สื่อถึง..."
                        />
                    </div>
                </div>
            </div>

            {/* Section 2: School Tree */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                        <Flower className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 font-kanit">ต้นไม้ประจำโรงเรียน</h3>
                </div>

                <div className="space-y-6 flex-grow">
                     {/* Tree Image Upload */}
                     <div className="relative group rounded-xl overflow-hidden bg-slate-100 aspect-video border border-slate-200">
                        {treePreview ? (
                            <img src={treePreview} alt="Tree" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                <Flower className="w-12 h-12 opacity-20" />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={treeImageInputRef}
                            onChange={handleTreeImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div 
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => treeImageInputRef.current?.click()}
                        >
                            <span className="text-white font-kanit flex items-center gap-2">
                                <Upload className="w-4 h-4" /> อัปโหลดรูปต้นไม้
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">ชื่อต้นไม้</label>
                             <input
                                name="school_tree_name"
                                value={formData.school_tree_name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sarabun"
                                placeholder="ต้นตะแบก"
                             />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1 font-sarabun">ชื่อวิทยาศาสตร์</label>
                             <input
                                name="school_tree_sciname"
                                value={formData.school_tree_sciname}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sarabun italic"
                                placeholder="Lagerstroemia floribunda"
                             />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 font-sarabun">
                            ความหมาย/คำอธิบาย
                        </label>
                        <textarea
                            name="school_tree_desc"
                            value={formData.school_tree_desc}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-sarabun"
                            placeholder="สื่อถึงความอดทน..."
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: School Colors (Full Width) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                            <Palette className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 font-kanit">สีประจำโรงเรียน</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addColor}
                        className="flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700 font-kanit"
                    >
                        <Plus className="w-4 h-4" /> เพิ่มสี
                    </button>
                </div>

                <div className="space-y-4">
                    {colors.map((color, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-end p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <div className="w-full md:w-auto flex-shrink-0">
                                <label className="block text-xs font-medium text-slate-600 mb-1 font-sarabun">ตัวอย่าง</label>
                                <div className="flex gap-2 items-center">
                                    <div 
                                        className="w-10 h-10 rounded-lg shadow-sm border border-slate-200"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <input
                                        type="color"
                                        value={color.hex}
                                        onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                        className="w-10 h-10 p-0 border-0 rounded overflow-hidden cursor-pointer"
                                    />
                                </div>
                             </div>

                             <div className="flex-grow w-full">
                                <label className="block text-xs font-medium text-slate-600 mb-1 font-sarabun">ชื่อสี (ไทย/อังกฤษ)</label>
                                <input
                                    type="text"
                                    value={color.name}
                                    onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sarabun text-sm"
                                    placeholder="สีม่วง (Purple)"
                                />
                             </div>

                             <div className="flex-grow w-full">
                                <label className="block text-xs font-medium text-slate-600 mb-1 font-sarabun">ความหมาย</label>
                                <input
                                    type="text"
                                    value={color.meaning}
                                    onChange={(e) => handleColorChange(index, 'meaning', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sarabun text-sm"
                                    placeholder="ความเข้มแข็ง..."
                                />
                             </div>

                             <button
                                type="button"
                                onClick={() => removeColor(index)}
                                className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                             >
                                <Trash2 className="w-5 h-5" />
                             </button>
                        </div>
                    ))}
                    
                    {colors.length === 0 && (
                        <p className="text-center text-slate-400 py-8 font-sarabun">ยังไม่ได้ระบุสีประจำโรงเรียน</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
