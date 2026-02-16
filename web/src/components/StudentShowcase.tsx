'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Award, Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

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

export default function StudentShowcase() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('student_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // Simple check for YouTube URLs to convert to embed format if needed
    // This is a basic implementation; robust handling would use regex
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-sm font-medium mb-4 font-sarabun">
            <Award className="w-4 h-4" />
            ผลงานแห่งความภาคภูมิใจ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-kanit text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            ผลงานนักเรียนของเรา
          </h2>
          <p className="text-lg text-gray-600 font-sarabun max-w-2xl mx-auto leading-relaxed">
            ความคิดสร้างสรรค์และนวัตกรรมจากฝีมือนักเรียน ที่สะท้อนถึงศักยภาพและความมุ่งมั่นในการเรียนรู้
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-lg border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-violet-600 shadow-sm font-sarabun">
                      {project.category}
                    </span>
                  </div>

                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/50">
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-kanit text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-start gap-2 mb-4 text-gray-500 text-sm font-sarabun">
                    <Users className="w-4 h-4 mt-1 flex-shrink-0 text-violet-400" />
                    <span className="line-clamp-2">{project.student_names}</span>
                  </div>

                  <p className="text-gray-600 text-sm font-sarabun line-clamp-3 mb-6 flex-grow">
                    {project.description}
                  </p>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-violet-50 text-gray-700 hover:text-violet-600 font-medium font-sarabun transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    ดูรายละเอียด
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
              >
                 <div className="w-full md:w-2/3 bg-black sticky top-0 md:relative min-h-[300px] md:min-h-0">
                    {selectedProject.video_url ? (
                      <iframe
                        src={getEmbedUrl(selectedProject.video_url)}
                        title={selectedProject.title}
                        className="w-full h-full aspect-video"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                        <div className="text-center p-8">
                             <img 
                                src={selectedProject.image_url} 
                                alt={selectedProject.title}
                                className="w-full h-64 object-cover rounded-lg opacity-50 mb-4"
                              />
                             <p>ไม่มีวิดีโอ</p>
                        </div>
                      </div>
                    )}
                 </div>

                 <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                             <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold font-sarabun mb-3 inline-block">
                                {selectedProject.category}
                             </span>
                            <h3 className="text-2xl font-bold font-kanit text-gray-900 leading-tight">
                                {selectedProject.title}
                            </h3>
                        </div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        >
                          <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6 font-sarabun">
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                                <Users className="w-4 h-4 text-violet-500" />
                                ผู้จัดทำ
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                                {selectedProject.student_names}
                            </p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                                <Calendar className="w-4 h-4 text-violet-500" />
                                วันที่เผยแพร่
                            </h4>
                            <p className="text-gray-600 text-sm">
                                {new Date(selectedProject.created_at).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        <div>
                             <h4 className="text-sm font-bold text-gray-900 mb-2">รายละเอียด</h4>
                             <p className="text-gray-600 leading-relaxed text-sm">
                                {selectedProject.description}
                             </p>
                        </div>
                    </div>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
