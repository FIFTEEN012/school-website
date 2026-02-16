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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">ตราสัญลักษณ์</h3>
            <p className="font-sarabun text-xs text-primary-500 font-medium uppercase tracking-wider mb-5">
              School Emblem
            </p>

            {/* Emblem Placeholder */}
            <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-dashed border-primary-200 flex flex-col items-center justify-center mb-5">
              <Shield className="w-12 h-12 text-primary-300 mb-2" />
              <p className="font-sarabun text-xs text-primary-400">ตราโรงเรียน</p>
              <p className="font-sarabun text-[10px] text-primary-300">Emblem Placeholder</p>
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">สีประจำโรงเรียน</h3>
            <p className="font-sarabun text-xs text-violet-500 font-medium uppercase tracking-wider mb-5">
              School Colors
            </p>

            {/* Color Swatches */}
            <div className="space-y-4 mb-5">
              {schoolColors.map((color) => (
                <div key={color.name} className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl shadow-md flex-shrink-0 ${
                      color.border ? 'border-2 border-gray-200' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-left">
                    <p className="font-kanit text-sm font-semibold text-gray-900">
                      {color.name}{' '}
                      <span className="font-sarabun text-xs text-gray-400 font-normal">
                        ({color.nameEn})
                      </span>
                    </p>
                    <p className="font-sarabun text-xs text-gray-500">{color.meaning}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined color bar */}
            <div className="flex rounded-xl overflow-hidden h-3 shadow-inner">
              <div className="flex-1 bg-[#1e40af]" />
              <div className="flex-1 bg-white border-y border-gray-200" />
              <div className="flex-1 bg-[#d97706]" />
            </div>
          </motion.div>

          {/* School Song */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 text-center border border-primary-100/50 hover:shadow-glass-lg transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-kanit text-lg font-bold text-gray-900 mb-1">เพลงมาร์ชโรงเรียน</h3>
            <p className="font-sarabun text-xs text-rose-500 font-medium uppercase tracking-wider mb-5">
              School Marching Song
            </p>

            {/* Song Lyrics Preview */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
              <Flower className="w-6 h-6 text-rose-300 mx-auto mb-3" />
              <p className="font-sarabun text-sm text-gray-600 leading-relaxed italic">
                "ประชารัฐพัฒนศึกษา สถาบันแห่งปัญญา
                <br />
                มุ่งมั่นพัฒนา สร้างคุณค่าแก่แผ่นดิน..."
              </p>
              <p className="font-sarabun text-xs text-gray-400 mt-2">
                (ตัวอย่างเนื้อเพลง — กรุณาใส่เนื้อเพลงจริง)
              </p>
            </div>

            {/* Audio Player Placeholder */}
            <div className="bg-gradient-to-r from-rose-50 to-rose-100/50 rounded-xl p-4 border border-rose-100">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow flex-shrink-0">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-rose-200 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-sarabun text-[10px] text-rose-400">0:00</span>
                    <span className="font-sarabun text-[10px] text-rose-400">3:45</span>
                  </div>
                </div>
              </div>
              <p className="font-sarabun text-[10px] text-rose-400 mt-2 text-center">
                Audio Placeholder — ใส่ไฟล์เสียงเพลงมาร์ชที่นี่
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
