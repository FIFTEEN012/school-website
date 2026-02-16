"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Palette, Music, Award, Flower } from 'lucide-react';

const schoolColors = [
  { name: 'น้ำเงิน', nameEn: 'Royal Blue', hex: '#1e40af', meaning: 'ความซื่อสัตย์ สุจริต และความมั่นคง' },
  { name: 'ขาว', nameEn: 'White', hex: '#ffffff', meaning: 'ความบริสุทธิ์ ความดีงาม และความโปร่งใส', border: true },
  { name: 'ทอง', nameEn: 'Gold', hex: '#d97706', meaning: 'ความเจริญรุ่งเรือง และความภาคภูมิใจ' },
];

export default function SchoolSymbols() {
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
            ตราสัญลักษณ์ สีประจำ และเพลงมาร์ชที่เป็นความภาคภูมิใจของเรา
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
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-5 shadow-lg overflow-hidden">
              <img src="/images/logo.jpg" alt="ตราสัญลักษณ์" className="w-full h-full object-contain p-2" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">ตราสัญลักษณ์</h3>
            <p className="font-sarabun text-xs text-primary-500 font-medium uppercase tracking-wider mb-5">
              School Emblem
            </p>

            {/* School Emblem Image */}
            <div className="w-40 h-40 mx-auto mb-5 drop-shadow-2xl">
              <img src="/images/logo.jpg" alt="ตราสัญลักษณ์โรงเรียน" className="w-full h-full object-contain" />
            </div>

            <p className="font-sarabun text-sm text-gray-600 leading-relaxed">
              ตราสัญลักษณ์ประจำโรงเรียนสื่อถึงความมุ่งมั่นในการพัฒนาการศึกษา
              และความเป็นเลิศทางวิชาการ
            </p>
          </motion.div>

          {/* School Colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-yellow-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">สีประจำโรงเรียน</h3>
            <p className="font-sarabun text-xs text-violet-500 font-medium uppercase tracking-wider mb-5">
              School Colors
            </p>

            {/* Color Swatches */}
            <div className="space-y-4 mb-5 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl shadow-md bg-purple-600 flex-shrink-0 border-2 border-white/50" />
                <div>
                   <p className="font-kanit text-sm font-semibold text-gray-900">สีม่วง (Purple)</p>
                   <p className="font-sarabun text-xs text-gray-500">ความสามัคคี ความเข้มแข็ง</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl shadow-md bg-yellow-400 flex-shrink-0 border-2 border-white/50" />
                <div>
                   <p className="font-kanit text-sm font-semibold text-gray-900">สีเหลือง (Yellow)</p>
                   <p className="font-sarabun text-xs text-gray-500">ความสงบร่มเย็น เจริญรุ่งเรือง</p>
                </div>
              </div>
            </div>

            {/* Combined color bar */}
            <div className="flex rounded-xl overflow-hidden h-4 shadow-inner mt-8">
              <div className="flex-1 bg-purple-600" />
              <div className="flex-1 bg-yellow-400" />
            </div>
          </motion.div>

          {/* School Tree */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Flower className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">ต้นไม้ประจำโรงเรียน</h3>
            <p className="font-sarabun text-xs text-emerald-500 font-medium uppercase tracking-wider mb-5">
              School Tree
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 mb-5 border border-emerald-100 min-h-[140px] flex flex-col items-center justify-center">
              <h4 className="font-kanit text-xl font-bold text-emerald-700 mb-2">ต้นตะแบก</h4>
              <p className="font-sarabun text-sm text-emerald-600/80">
                (Lagerstroemia floribunda)
              </p>
            </div>
            
            <p className="font-sarabun text-sm text-gray-600 leading-relaxed">
               ต้นไม้ที่สื่อถึงความอดทน แข็งแกร่ง และความสวยงามที่ยั่งยืน
               เป็นร่มเงาให้แก่สถานศึกษา
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
