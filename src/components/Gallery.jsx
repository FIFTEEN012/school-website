import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Trophy,
  Heart,
  Maximize2,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { fetchGalleryAlbums } from '../supabase';

// Static fallback data
const fallbackCategories = [
  { id: 'all', label: 'ทั้งหมด', icon: Camera },
  { id: 'fieldtrip', label: 'ทัศนศึกษา', icon: MapPin },
  { id: 'sports', label: 'กีฬาสี', icon: Trophy },
  { id: 'religious', label: 'วันสำคัญทางศาสนา', icon: Heart },
];

const fallbackPhotos = [
  {
    id: 1,
    category: 'fieldtrip',
    title: 'ทัศนศึกษา จ.เชียงใหม่',
    desc: 'นักเรียนชั้น ม.5 เดินทางศึกษาดูงานจังหวัดเชียงใหม่',
    color: 'from-blue-200 to-blue-100',
  },
  {
    id: 2,
    category: 'sports',
    title: 'กีฬาสีภายใน "ประชารัฐเกมส์"',
    desc: 'การแข่งขันกรีฑาและกีฬาสากล',
    color: 'from-amber-200 to-amber-100',
  },
  {
    id: 3,
    category: 'religious',
    title: 'พิธีแห่เทียนพรรษา',
    desc: 'นักเรียนร่วมพิธีแห่เทียนพรรษา ณ วัดประจำตำบล',
    color: 'from-violet-200 to-violet-100',
  },
  {
    id: 4,
    category: 'fieldtrip',
    title: 'ค่ายวิทยาศาสตร์ อพวช.',
    desc: 'กิจกรรมค่ายวิทยาศาสตร์ ณ องค์การพิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ',
    color: 'from-emerald-200 to-emerald-100',
  },
  {
    id: 5,
    category: 'sports',
    title: 'แข่งขันฟุตบอลระหว่างโรงเรียน',
    desc: 'ทีมฟุตบอลโรงเรียนคว้าแชมป์ระดับอำเภอ',
    color: 'from-rose-200 to-rose-100',
  },
  {
    id: 6,
    category: 'religious',
    title: 'วันวิสาขบูชา',
    desc: 'กิจกรรมเวียนเทียนและทำบุญตักบาตร',
    color: 'from-sky-200 to-sky-100',
  },
  {
    id: 7,
    category: 'fieldtrip',
    title: 'ทัศนศึกษาพิพิธภัณฑ์แห่งชาติ',
    desc: 'เรียนรู้ประวัติศาสตร์และวัฒนธรรมไทย',
    color: 'from-orange-200 to-orange-100',
  },
  {
    id: 8,
    category: 'sports',
    title: 'วันกีฬาแห่งชาติ',
    desc: 'กิจกรรมเดิน-วิ่ง เพื่อสุขภาพ',
    color: 'from-teal-200 to-teal-100',
  },
];

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await fetchGalleryAlbums();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching gallery albums:', err);
        setError('ไม่สามารถโหลดข้อมูลแกลเลอรี่ได้');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Process albums data to photos format
  const photos = albums.length > 0 ? albums.flatMap((album, albumIndex) => 
    (album.images || []).map((image, imageIndex) => ({
      id: `${album.id}-${imageIndex}`,
      category: album.category || 'general',
      title: image.title || album.title,
      desc: image.description || album.description,
      image_url: image.image_url,
      color: 'from-gray-200 to-gray-100',
    }))
  ) : fallbackPhotos;

  const categories = albums.length > 0 ? [
    { id: 'all', label: 'ทั้งหมด', icon: Camera },
    ...Array.from(new Set(albums.map(a => a.category).filter(Boolean)))
      .map(cat => ({
        id: cat,
        label: cat,
        icon: Camera
      }))
  ] : fallbackCategories;

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  const nextPhoto = () =>
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent-50/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-4 font-sarabun">
            <Camera className="w-4 h-4" />
            แกลเลอรี่ภาพกิจกรรม
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ภาพ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              กิจกรรม
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            บรรยากาศกิจกรรมต่าง ๆ ของโรงเรียน
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            <span className="ml-2 text-gray-500 font-sarabun">กำลังโหลดแกลเลอรี่...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-16">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="ml-2 text-red-500 font-sarabun">{error}</span>
          </div>
        )}

        {/* Gallery Content */}
        {!loading && !error && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-sarabun transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-600'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Photo */}
                    <div
                      className={`w-full flex items-center justify-center ${
                        index === 0 ? 'h-64 md:h-full min-h-[280px]' : 'h-48 md:h-52'
                      }`}
                    >
                      {photo.image_url ? (
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                          <Camera className="w-12 h-12 text-white/40" />
                        </div>
                      )}
                    </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="font-kanit text-sm font-bold text-white mb-0.5 line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="font-sarabun text-xs text-white/80 line-clamp-1">{photo.desc}</p>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photo */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-[60vh] rounded-2xl flex items-center justify-center ${
                filtered[lightboxIndex].image_url 
                  ? 'bg-black' 
                  : `bg-gradient-to-br ${filtered[lightboxIndex].color}`
              }`}>
                {filtered[lightboxIndex].image_url ? (
                  <img
                    src={filtered[lightboxIndex].image_url}
                    alt={filtered[lightboxIndex].title}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                ) : (
                  <Camera className="w-24 h-24 text-white/30" />
                )}
              </div>
              <div className="text-center mt-4">
                <h3 className="font-kanit text-lg font-bold text-white">
                  {filtered[lightboxIndex].title}
                </h3>
                <p className="font-sarabun text-sm text-white/70 mt-1">
                  {filtered[lightboxIndex].desc}
                </p>
                <p className="font-sarabun text-xs text-white/40 mt-2">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
