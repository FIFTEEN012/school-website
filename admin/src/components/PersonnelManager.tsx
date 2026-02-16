'use client';

import { useState, useCallback, useId } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Users,
  Pencil,
  Trash2,
  Plus,
  Search,
  Loader2,
  AlertCircle,
  X,
  GripVertical,
  Upload,
  Building2,
  Crown,
  User,
  Image as ImageIcon,
} from 'lucide-react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PersonnelItem {
  id: string;
  name: string;
  position: string;
  department: string | null;
  photo_url: string | null;
  rank: number;
  is_active: boolean;
  created_at: string;
}

interface PersonnelManagerProps {
  initialPersonnel: PersonnelItem[];
}

const departments = [
  { value: 'admin', label: 'ฝ่ายบริหาร', icon: Crown },
  { value: 'science', label: 'วิทยาศาสตร์', icon: Building2 },
  { value: 'math', label: 'คณิตศาสตร์', icon: Building2 },
  { value: 'thai', label: 'ภาษาไทย', icon: Building2 },
  { value: 'english', label: 'ภาษาอังกฤษ', icon: Building2 },
  { value: 'social', label: 'สังคมศึกษา', icon: Building2 },
  { value: 'art', label: 'ศิลปะ', icon: Building2 },
  { value: 'pe', label: 'พลศึกษา', icon: Building2 },
  { value: 'other', label: 'อื่นๆ', icon: Building2 },
];

// Sortable Item Component
function SortablePersonnelItem({
  person,
  onEdit,
  onDelete,
}: {
  person: PersonnelItem;
  onEdit: (person: PersonnelItem) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: person.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const deptLabel = departments.find((d) => d.value === person.department)?.label || person.department;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border border-slate-200 p-4 transition-shadow ${
        isDragging ? 'shadow-xl ring-2 ring-slate-400' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Photo */}
        {person.photo_url ? (
          <img
            src={person.photo_url}
            alt={person.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <User className="w-6 h-6 text-slate-400" />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-kanit font-semibold text-slate-900">{person.name}</h3>
          <p className="text-sm text-slate-500">{person.position}</p>
          {deptLabel && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1.5 rounded-md bg-slate-100 text-slate-600 text-xs">
              {deptLabel}
            </span>
          )}
        </div>

        {/* Rank Badge */}
        <div className="text-center px-3">
          <span className="text-xs text-slate-400">ลำดับ</span>
          <p className="text-lg font-bold text-slate-700">{person.rank + 1}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(person)}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(person.id)}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PersonnelManager({ initialPersonnel }: PersonnelManagerProps) {
  const [personnel, setPersonnel] = useState<PersonnelItem[]>(
    initialPersonnel.sort((a, b) => a.rank - b.rank)
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonnelItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const dndId = useId();

  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter personnel
  const filteredPersonnel = personnel.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle drag end
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = personnel.findIndex((item) => item.id === active.id);
      const newIndex = personnel.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newItems = arrayMove(personnel, oldIndex, newIndex).map((item, index) => ({
        ...item,
        rank: index,
      }));

      setPersonnel(newItems);

      // Save new order to database
      try {
        const updates = newItems.map((person) => ({
          id: person.id,
          rank: person.rank,
        }));

        // Update sequentially to avoid race conditions or lock contention
        for (const update of updates) {
          await supabase
            .from('personnel')
            .update({ rank: update.rank })
            .eq('id', update.id);
        }
      } catch (err) {
        console.error('Error updating ranks:', err);
      }
    }
  }, [personnel, supabase]);

  // Upload photo with bucket creation fallback
  const uploadPhoto = async (file: File): Promise<string | null> => {
    setUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `personnel-${Date.now()}.${fileExt}`;
      const bucketName = 'personnel-photos';

      // Try to create bucket if it doesn't exist (ignore error if already exists)
      try {
        await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        });
      } catch {
        // Bucket might already exist, continue
      }

      // Enable RLS policies for the bucket (if possible)
      try {
        // This might not work from client side, but try anyway
        await supabase.rpc('enable_storage_rls', { bucket_name: bucketName });
      } catch {
        // Ignore if function doesn't exist
      }

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) {
        // If bucket doesn't exist or RLS policy blocks
        if (uploadError.message?.includes('bucket') || uploadError.message?.includes('violates row-level security')) {
          setError('Storage bucket ยังไม่ถูกสร้างหรือไม่มีการตั้งค่า RLS policies กรุณา:\n1. สร้าง bucket "personnel-photos" ใน Supabase Dashboard > Storage\n2. ตั้งค่าเป็น Public bucket\n3. หรือติดต่อผู้ดูแลระบบเพื่อตั้งค่า storage permissions');
          return null;
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'อัปโหลดรูปภาพล้มเหลว');
      return null;
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Save personnel
  const handleSave = async (formData: {
    name: string;
    position: string;
    department: string;
    photo_url: string | null;
  }) => {
    setLoading(true);
    setError('');

    try {
      if (editingPerson) {
        // Update existing
        const { data, error } = await supabase
          .from('personnel')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPerson.id)
          .select()
          .single();

        if (error) throw error;

        setPersonnel(personnel.map((p) => (p.id === editingPerson.id ? data : p)));
      } else {
        // Create new with highest rank
        const maxRank = Math.max(...personnel.map((p) => p.rank), -1);
        const { data, error } = await supabase
          .from('personnel')
          .insert({
            ...formData,
            rank: maxRank + 1,
            is_active: true,
          })
          .select()
          .single();

        if (error) throw error;

        setPersonnel([...personnel, data]);
      }

      setShowModal(false);
      setEditingPerson(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  // Delete personnel
  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      const { error, data } = await supabase.from('personnel').delete().eq('id', id).select();

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('ไม่สามารถลบข้อมูลได้ (อาจไม่มีสิทธิ์หรือข้อมูลถูกลบไปแล้ว)');
      }

      // Remove from list and re-rank remaining
      const newPersonnel = personnel
        .filter((p) => p.id !== id)
        .map((p, index) => ({ ...p, rank: index }));

      setPersonnel(newPersonnel);
      setShowDeleteConfirm(null);

      // Update ranks in database
      for (const person of newPersonnel) {
        await supabase.from('personnel').update({ rank: person.rank }).eq('id', person.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-kanit text-2xl font-bold text-slate-900">จัดการบุคลากร</h1>
          <p className="text-sm text-slate-500 mt-1">ลากเพื่อจัดเรียงลำดับ เพิ่ม แก้ไข หรือลบรายชื่อ</p>
        </div>
        <button
          onClick={() => {
            setEditingPerson(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          เพิ่มบุคลากร
        </button>
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-sm text-slate-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
        <GripVertical className="w-4 h-4 text-blue-500" />
        <span>ลากไอคอน ขึ้น-ลง เพื่อจัดเรียงลำดับ (ผู้อำนวยการควรอยู่ลำดับที่ 1)</span>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="ค้นหาชื่อหรือตำแหน่ง..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
        />
      </div>

      {/* Draggable List */}
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredPersonnel.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {filteredPersonnel.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>ไม่พบบุคลากร</p>
                <p className="text-sm text-slate-400 mt-1">เพิ่มบุคลากรใหม่เพื่อเริ่มต้น</p>
              </div>
            ) : (
              filteredPersonnel.map((person) => (
                <SortablePersonnelItem
                  key={person.id}
                  person={person}
                  onEdit={(p) => {
                    setEditingPerson(p);
                    setShowModal(true);
                  }}
                  onDelete={(id) => setShowDeleteConfirm(id)}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Modal */}
      {showModal && (
        <PersonnelModal
          person={editingPerson}
          departments={departments}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingPerson(null);
          }}
          loading={loading}
          uploadingPhoto={uploadingPhoto}
          onUploadPhoto={uploadPhoto}
        />
      )}

      {/* Delete Confirm */}
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

// Personnel Modal
function PersonnelModal({
  person,
  departments,
  onSave,
  onClose,
  loading,
  uploadingPhoto,
  onUploadPhoto,
}: {
  person: PersonnelItem | null;
  departments: { value: string; label: string; icon: any }[];
  onSave: (data: any) => void;
  onClose: () => void;
  loading: boolean;
  uploadingPhoto: boolean;
  onUploadPhoto: (file: File) => Promise<string | null>;
}) {
  const [formData, setFormData] = useState({
    name: person?.name || '',
    position: person?.position || '',
    department: person?.department || 'admin',
    photo_url: person?.photo_url || null,
  });
  const [previewUrl, setPreviewUrl] = useState(person?.photo_url || null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await onUploadPhoto(file);
      if (url) {
        setPreviewUrl(url);
        setFormData({ ...formData, photo_url: url });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-kanit text-lg font-semibold text-slate-900">
            {person ? 'แก้ไขบุคลากร' : 'เพิ่มบุคลากร'}
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
          className="p-6 space-y-5"
        >
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-slate-400" />
              )}
            </div>
            <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm">{uploadingPhoto ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปภาพ'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={uploadingPhoto}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              placeholder="เช่น นายสมชาย ใจดี"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">ตำแหน่ง</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
              placeholder="เช่น ผู้อำนวยการโรงเรียน"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">แผนก/กลุ่มสาระ</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
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
              disabled={loading || uploadingPhoto}
              className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {person ? 'บันทึก' : 'สร้าง'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation
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
        <p className="text-slate-600 mb-6">คุณต้องการลบบุคลากรนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
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
