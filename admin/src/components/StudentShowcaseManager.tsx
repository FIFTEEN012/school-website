'use client';

import React, { useState, useEffect } from 'react'; // Added React import
import { createClient } from '@/lib/supabase/client';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  Save,
  X,
  Loader2,
  Video,
  Calendar,
  Users,
  Tag
} from 'lucide-react';

interface StudentProject {
  id: string;
  title: string;
  student_names: string;
  description: string;
  category: string;
  image_url: string;
  video_url: string;
  created_at: string;
}

export default function StudentShowcaseManager() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StudentProject | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    student_names: '',
    description: '',
    category: '',
    video_url: '',
    created_at: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('student_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project?: StudentProject) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        student_names: project.student_names,
        description: project.description || '',
        category: project.category || '',
        video_url: project.video_url || '',
        created_at: new Date(project.created_at).toISOString().split('T')[0]
      });
      setPreviewUrl(project.image_url || '');
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        student_names: '',
        description: '',
        category: '',
        video_url: '',
        created_at: new Date().toISOString().split('T')[0]
      });
      setPreviewUrl('');
    }
    setImageFile(null);
    setIsModalOpen(true);
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
    try {
      setSaving(true);
      let imageUrl = previewUrl;

      // Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Ensure bucket exists or use a common public bucket
        const { error: uploadError } = await supabase.storage
          .from('hero_images') // Reusing hero_images bucket or ensure 'student_projects' exists. Using 'hero_images' for simplicity as per previous tasks, or better 'news'. Let's check bucket policy later. For now assuming 'hero_images' is public write or strictly authenticated.
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('hero_images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const projectData = {
        title: formData.title,
        student_names: formData.student_names,
        description: formData.description,
        category: formData.category,
        video_url: formData.video_url,
        image_url: imageUrl,
        created_at: new Date(formData.created_at).toISOString()
      };

      if (editingProject) {
        const { error } = await supabase
          .from('student_projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('student_projects')
          .insert([projectData]);
        if (error) throw error;
      }

      await fetchProjects();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const { error } = await supabase
        .from('student_projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.student_names.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-kanit text-gray-800">จัดการผลงานนักเรียน (Student Showcase)</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-sarabun"
        >
          <Plus className="w-4 h-4" />
          เพิ่มผลงาน
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ค้นหาชื่อผลงาน หรือ ชื่อนักเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-sarabun"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
            {loading ? (
                <div className="p-8 text-center text-gray-500 font-sarabun">Loading...</div>
            ) : (
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kanit">รูปภาพ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kanit">ชื่อผลงาน / ผู้จัดทำ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kanit">ประเภท</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kanit">วันที่</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-kanit">จัดการ</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-5 h-5" />
                                </div>
                            )}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 font-kanit">{project.title}</div>
                            <div className="text-xs text-gray-500 font-sarabun line-clamp-1">{project.student_names}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full font-sarabun">
                            {project.category}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-sarabun">
                            {new Date(project.created_at).toLocaleDateString('th-TH')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleOpenModal(project)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold font-kanit">
                {editingProject ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                      ชื่อผลงาน *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                      placeholder="เช่น โครงงานวิทยาศาสตร์..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                      ผู้จัดทำ * (คั่นด้วยจุลภาค)
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                        required
                        type="text"
                        value={formData.student_names}
                        onChange={(e) => setFormData({...formData, student_names: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                        placeholder="ด.ช.รักเรียน, ด.ญ.ใส่ใจ..."
                        />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                        ประเภท/หมวดหมู่
                     </label>
                     <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                            placeholder="เช่น Short Film, Science Project"
                        />
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                        วันที่เผยแพร่
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="date"
                            value={formData.created_at}
                            onChange={(e) => setFormData({...formData, created_at: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                        />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                            ลิงก์วิดีโอ (YouTube)
                        </label>
                        <div className="relative">
                            <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="url"
                                value={formData.video_url}
                                onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                            รูปภาพปก
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer relative bg-gray-50 group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {previewUrl ? (
                                <div className="relative h-40 w-full">
                                    <img 
                                        src={previewUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <p className="text-white text-sm font-sarabun">คลิกเพื่อเปลี่ยนรูป</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <p className="text-sm font-sarabun">คลิกเพื่ออัปโหลดรูปภาพ</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-sarabun mb-1">
                  รายละเอียด
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sarabun"
                  placeholder="รายละเอียดของผลงาน..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-sarabun"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-sarabun flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      บันทึก
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
