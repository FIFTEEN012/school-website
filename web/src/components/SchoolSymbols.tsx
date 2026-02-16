"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Palette, Flower, Award } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface SchoolColor {
    name: string;
    hex: string;
    meaning: string;
    border?: boolean;
}

export default function SchoolSymbols() {
  const [data, setData] = useState({
      school_logo_url: '/images/logo.jpg',
      school_emblem_desc: 'ตราสัญลักษณ์ประจำโรงเรียนสื่อถึงความมุ่งมั่นในการพัฒนาการศึกษา และความเป็นเลิศทางวิชาการ',
      school_colors: [
        { name: 'สีม่วง (Purple)', hex: '#9333ea', meaning: 'ความสามัคคี ความเข้มแข็ง' },
        { name: 'สีเหลือง (Yellow)', hex: '#facc15', meaning: 'ความสงบร่มเย็น เจริญรุ่งเรือง' }
      ] as SchoolColor[],
      school_tree_name: 'ต้นตะแบก',
      school_tree_sciname: 'Lagerstroemia floribunda',
      school_tree_desc: 'ต้นไม้ที่สื่อถึงความอดทน แข็งแกร่ง และความสวยงามที่ยั่งยืน เป็นร่มเงาให้แก่สถานศึกษา',
      school_tree_image_url: '' // Will handle fallback in render
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      try {
        const { data: fetchedData, error } = await supabase
          .from('school_profile')
          .select('*')
          .single();
        
        if (fetchedData) {
          setData({
             school_logo_url: fetchedData.school_logo_url || data.school_logo_url,
             school_emblem_desc: fetchedData.school_emblem_desc || data.school_emblem_desc,
             school_colors: (fetchedData.school_colors as unknown as SchoolColor[]) || data.school_colors,
             school_tree_name: fetchedData.school_tree_name || data.school_tree_name,
             school_tree_sciname: fetchedData.school_tree_sciname || data.school_tree_sciname,
             school_tree_desc: fetchedData.school_tree_desc || data.school_tree_desc,
             school_tree_image_url: fetchedData.school_tree_image_url
          });
        }
      } catch (error) {
        console.error("Error fetching school identity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-50/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-50/30 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-4 font-sarabun">
            <Award className="w-4 h-4" />
            เอกลักษณ์โรงเรียน
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            สัญลักษณ์
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ประจำโรงเรียน
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ตราสัญลักษณ์ สีประจำ และต้นไม้ที่เป็นความภาคภูมิใจของเรา
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* School Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-lg overflow-hidden border border-gray-100">
               <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">ตราสัญลักษณ์</h3>
            <p className="font-sarabun text-xs text-primary-500 font-medium uppercase tracking-wider mb-8">
              School Emblem
            </p>

            {/* School Emblem Image */}
            <div className="flex-grow flex items-center justify-center mb-8">
                <div className="w-48 h-48 drop-shadow-2xl transition-transform hover:scale-105 duration-500">
                    <img className="w-full h-full object-contain" src={data.school_logo_url} alt="ตราสัญลักษณ์โรงเรียน" />
                </div>
            </div>

            <p className="font-sarabun text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
              {data.school_emblem_desc}
            </p>
          </motion.div>

          {/* School Colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300 flex flex-col"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-yellow-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">สีประจำโรงเรียน</h3>
            <p className="font-sarabun text-xs text-violet-500 font-medium uppercase tracking-wider mb-8">
              School Colors
            </p>

            {/* Color Swatches */}
            <div className="space-y-6 mb-8 text-left flex-grow">
              {data.school_colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                    <div 
                        className={`w-14 h-14 rounded-2xl shadow-md flex-shrink-0 border-4 border-white transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}
                        style={{ backgroundColor: color.hex }}
                    />
                    <div>
                        <p className="font-kanit text-base font-bold text-gray-900">{color.name}</p>
                        <p className="font-sarabun text-sm text-gray-500">{color.meaning}</p>
                    </div>
                </div>
              ))}
            </div>

            {/* Combined color bar */}
            <div className="flex rounded-xl overflow-hidden h-4 shadow-inner mt-auto">
               {data.school_colors.map((color, idx) => (
                   <div key={idx} className="flex-1" style={{ backgroundColor: color.hex }} />
               ))}
            </div>
          </motion.div>

          {/* School Tree */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300 flex flex-col"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Flower className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">ต้นไม้ประจำโรงเรียน</h3>
            <p className="font-sarabun text-xs text-emerald-500 font-medium uppercase tracking-wider mb-8">
              School Tree
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 mb-8 border border-emerald-100 flex flex-col items-center justify-center relative overflow-hidden group">
               {data.school_tree_image_url && (
                   <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                       <img src={data.school_tree_image_url} alt={data.school_tree_name} className="w-full h-full object-cover" />
                   </div>
               )}
              <div className="relative z-10">
                <h4 className="font-kanit text-2xl font-bold text-emerald-800 mb-1">{data.school_tree_name}</h4>
                <p className="font-sarabun text-sm text-emerald-700/80 italic font-medium">
                    ({data.school_tree_sciname})
                </p>
              </div>
            </div>
            
            <p className="font-sarabun text-sm text-gray-600 leading-relaxed mt-auto">
               {data.school_tree_desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
