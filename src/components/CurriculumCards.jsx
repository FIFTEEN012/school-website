import React from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  Languages,
  Palette,
  Monitor,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const curricula = [
  {
    icon: FlaskConical,
    title: 'แผนวิทย์-คณิต',
    titleEn: 'Science-Mathematics',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-100',
    tagColor: 'bg-blue-50 text-blue-600',
    subjects: ['คณิตศาสตร์เพิ่มเติม', 'ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'ภาษาอังกฤษเข้มข้น'],
    highlights: ['เตรียมสอบเข้ามหาวิทยาลัย', 'ห้องปฏิบัติการวิทยาศาสตร์', 'ค่ายวิชาการ'],
  },
  {
    icon: Languages,
    title: 'แผนศิลป์-ภาษา',
    titleEn: 'Language-Arts',
    color: 'from-violet-500 to-violet-600',
    borderColor: 'border-violet-100',
    tagColor: 'bg-violet-50 text-violet-600',
    subjects: ['ภาษาอังกฤษเชิงลึก', 'ภาษาจีน/ญี่ปุ่น', 'สังคมศึกษา', 'ภาษาไทย', 'ประวัติศาสตร์'],
    highlights: ['แลกเปลี่ยนวัฒนธรรม', 'สอบวัดระดับภาษา', 'ทัศนศึกษาต่างประเทศ'],
  },
  {
    icon: Palette,
    title: 'แผนศิลป์-สังคม',
    titleEn: 'Arts-Social Studies',
    color: 'from-rose-500 to-rose-600',
    borderColor: 'border-rose-100',
    tagColor: 'bg-rose-50 text-rose-600',
    subjects: ['ศิลปะ', 'ดนตรี-นาฏศิลป์', 'สังคมศึกษา', 'ภาษาไทย', 'พลศึกษา'],
    highlights: ['ประกวดศิลปะระดับชาติ', 'ชมรมดนตรี-การแสดง', 'โครงงานชุมชน'],
  },
  {
    icon: Monitor,
    title: 'แผนคอมพิวเตอร์',
    titleEn: 'Computer & Technology',
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-100',
    tagColor: 'bg-emerald-50 text-emerald-600',
    subjects: ['วิทยาการคำนวณ', 'การเขียนโปรแกรม', 'คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาอังกฤษ'],
    highlights: ['ห้อง STEM Lab', 'แข่งขันหุ่นยนต์', 'โครงงานนวัตกรรม'],
  },
];

export default function CurriculumCards() {
  return (
    <section id="academic" className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50/30 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

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
            <BookOpen className="w-4 h-4" />
            หลักสูตรการเรียนการสอน
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            แผนการเรียน
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ที่หลากหลาย
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-2xl mx-auto">
            เลือกแผนการเรียนที่เหมาะสมกับความสนใจและเป้าหมายของนักเรียน
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {curricula.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-7 hover:shadow-glass-lg transition-all duration-300 group border ${item.borderColor}`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-kanit text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="font-sarabun text-xs text-gray-400">{item.titleEn}</p>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-5">
                <p className="font-kanit text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  รายวิชาหลัก
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${item.tagColor} font-sarabun`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-5">
                <p className="font-kanit text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  จุดเด่น
                </p>
                <ul className="space-y-2">
                  {item.highlights.map((hl) => (
                    <li key={hl} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="font-sarabun text-sm text-gray-600">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#admissions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 font-sarabun group/link"
              >
                ดูรายละเอียด
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
