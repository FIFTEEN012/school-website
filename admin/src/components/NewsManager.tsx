'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Newspaper,
  Calendar,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  X,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  date: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

interface NewsManagerProps {
  initialNews: NewsItem[];
  userId: string;
}

const categories = [
  { value: 'general', label: 'ทั่วไป' },
  { value: 'announcement', label: 'ประกาศ' },
  { value: 'event', label: 'กิจกรรม' },
  { value: 'academic', label: 'วิชาการ' },
  { value: 'sports', label: 'กีฬา' },
];

export default function NewsManager({ initialNews, userId }: NewsManagerProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState('');
  
  const supabase = createClient();

  // Filter news
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Add/Edit news
  const handleSaveNews = async (formData: {
    title: string;
    content: string;
    category: string;
    is_published: boolean;
    date: string;
  }) => {
    setLoading(true);
    setError('');
    
    try {
      if (editingNews) {
        // Update existing
        const { data, error } = await supabase
          .from('news_announcements')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingNews.id)
          .select()
          .single();
          
        if (error) throw error;
        
        setNews(news.map((item) => (item.id === editingNews.id ? data : item)));
      } else {
        // Create new
        const { data, error } = await supabase
          .from('news_announcements')
          .insert({
            ...formData,
            // created_by: userId, // Temporarily removed to fix 409 Conflict error
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setNews([data, ...news]);
      }
      
      setShowModal(false);
      setEditingNews(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  // Delete news
  const handleDelete = async (id: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('news_announcements')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setNews(news.filter((item) => item.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  // Toggle publish status
  const togglePublish = async (item: NewsItem) => {
    try {
      const { error } = await supabase
        .from('news_announcements')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);
        
      if (error) throw error;
      
      setNews(news.map((n) => 
        n.id === item.id ? { ...n, is_published: !n.is_published } : n
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-kanit text-2xl font-bold text-slate-900">จัดการข่าวสาร</h1>
          <p className="text-sm text-slate-500 mt-1">เพิ่ม แก้ไข และลบข่าวสาร/ประกาศ</p>
        </div>
        <button
          onClick={() => {
            setEditingNews(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          เพิ่มข่าวใหม่
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาข่าวสาร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 text-sm"
          >
            <option value="all">ทุกหมวดหมู่</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ข่าว</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">หมวดหมู่</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Newspaper className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>ไม่พบข่าวสาร</p>
                    <p className="text-sm text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือเพิ่มข่าวใหม่</p>
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Newspaper className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{item.title}</p>
                          <p className="text-sm text-slate-500 line-clamp-1">
                            {item.content || 'ไม่มีเนื้อหา'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {categories.find((c) => c.value === item.category)?.label || item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.is_published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {item.is_published ? (
                          <><Eye className="w-3.5 h-3.5" /> เผยแพร่</>
                        ) : (
                          <><EyeOff className="w-3.5 h-3.5" /> แบบร่าง</>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingNews(item);
                            setShowModal(true);
                          }}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <NewsModal
          news={editingNews}
          categories={categories}
          onSave={handleSaveNews}
          onClose={() => {
            setShowModal(false);
            setEditingNews(null);
          }}
          loading={loading}
          supabase={supabase}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(showDeleteConfirm)}
          onCancel={() => setShowDeleteConfirm(null)}
          loading={loading}
        />
      )}
    </div>
  );
}

// News Modal Component
function NewsModal({
  news,
  categories,
  onSave,
  onClose,
  loading,
  supabase,
}: {

  news: NewsItem | null;
  categories: { value: string; label: string }[];
  onSave: (data: any) => void;
  onClose: () => void;
  loading: boolean;
  supabase: any;
}) {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    category: news?.category || 'general',
    image_url: news?.image_url || '',
    is_published: news?.is_published || false,
    date: news?.date || new Date().toISOString().split('T')[0],
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('news-content')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('news-content').getPublicUrl(filePath);

      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-kanit text-lg font-semibold text-slate-900">
            {news ? 'แก้ไขข่าว' : 'เพิ่มข่าวใหม่'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">หัวข้อ</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              placeholder="ระบุหัวข้อข่าว"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">เนื้อหา</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              placeholder="ระบุเนื้อหาข่าว"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">รูปภาพประกอบ</label>
            <div className="flex items-start gap-4">
              {formData.image_url ? (
                <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="absolute top-1 right-1 p-1 bg-white/80 rounded-full hover:bg-white text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 bg-slate-50">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>
              )}
              
              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer bg-white transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploadingImage ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <p className="mt-1.5 text-xs text-slate-500">
                  รองรับไฟล์ภาพ JPG, PNG ขนาดไม่เกิน 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">วันที่</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
            />
            <label htmlFor="is_published" className="text-sm text-slate-700">
              เผยแพร่ทันที
            </label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {news ? 'บันทึก' : 'สร้าง'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-kanit text-lg font-semibold text-slate-900">ยืนยันการลบ</h3>
        </div>
        <p className="text-slate-600 mb-6">
          คุณต้องการลบข่าวนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
}
