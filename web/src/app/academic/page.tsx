'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Award, GraduationCap, Target, CheckCircle } from 'lucide-react';
import CurriculumCards from '@/components/CurriculumCards';
import AcademicCalendar from '@/components/AcademicCalendar';

const educationLevels = [
  {
    level: 'ระดับมัธยมศึกษาตอนต้น',
    grades: 'ม.1 – ม.3',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    description: 'หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน เน้นพัฒนาทักษะการคิดวิเคราะห์และพื้นฐานวิชาการ',
    subjects: ['ภาษาไทย', 'คณิตศาสตร์', 'วิทยาศาสตร์และเทคโนโลยี', 'สังคมศึกษา', 'ภาษาอังกฤษ', 'สุขศึกษาและพลศึกษา', 'ศิลปะ', 'การงานอาชีพ'],
  },
  {
    level: 'ระดับมัธยมศึกษาตอนปลาย',
    grades: 'ม.4 – ม.6',
    icon: GraduationCap,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    description: 'หลักสูตรเตรียมความพร้อมสู่อุดมศึกษา เปิดสอนทั้งสายวิทย์-คณิต และสายศิลป์-ภาษา',
    subjects: ['ภาษาไทย', 'คณิตศาสตร์', 'ฟิสิกส์ / เคมี / ชีววิทยา', 'สังคมศึกษา', 'ภาษาอังกฤษ', 'ภาษาจีน (เลือก)', 'คอมพิวเตอร์', 'กิจกรรมชุมนุม'],
  },
];

const highlights = [
  { icon: Users, label: 'นักเรียนทั้งหมด', value: '450+', desc: 'คน' },
  { icon: Award, label: 'ครูผู้สอน', value: '35', desc: 'คน' },
  { icon: Clock, label: 'ชั่วโมงเรียน/ปี', value: '1,000+', desc: 'ชม.' },
  { icon: Target, label: 'อัตราสอบผ่าน O-NET', value: '92%', desc: '' },
];

const programs = [
  {
    title: 'โครงการส่งเสริมความเป็นเลิศทางวิชาการ',
    description: 'ติวเข้มเตรียมสอบ O-NET, PAT และสอบเข้ามหาวิทยาลัย พร้อมแนะแนวอาชีพ',
  },
  {
    title: 'โครงการพัฒนาทักษะ ICT',
    description: 'ส่งเสริมการเรียนรู้เทคโนโลยีสารสนเทศ การเขียนโปรแกรม และ Coding สำหรับนักเรียน',
  },
  {
    title: 'โครงการภาษาอังกฤษเพื่อการสื่อสาร',
    description: 'เน้นทักษะการสื่อสารภาษาอังกฤษเชิงปฏิบัติ ฟัง-พูด-อ่าน-เขียน',
  },
  {
    title: 'โครงการ STEM Education',
    description: 'บูรณาการวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์ และคณิตศาสตร์ เข้ากับการเรียนรู้',
  },
];

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24 font-sarabun">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              งานวิชาการ
            </span>
            <h1 className="font-kanit text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              หลักสูตรและ
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                งานวิชาการ
              </span>
            </h1>
            <p className="font-sarabun text-lg text-gray-600 max-w-2xl mx-auto">
              โรงเรียนจัดการเรียนการสอนตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน
              มุ่งเน้นพัฒนาผู้เรียนให้มีคุณภาพรอบด้าน ทั้งความรู้ ทักษะ และคุณธรรม
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold font-kanit text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Education Levels */}
        <div className="space-y-8">
          <h2 className="font-kanit text-2xl font-bold text-gray-900 text-center">ระดับชั้นที่เปิดสอน</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {educationLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${level.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <level.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-kanit text-xl font-bold">{level.level}</h3>
                      <p className="text-white/80 text-sm">{level.grades}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-5">{level.description}</p>
                  <h4 className="font-kanit font-semibold text-gray-800 mb-3">กลุ่มสาระการเรียนรู้:</h4>
                  <div className="flex flex-wrap gap-2">
                    {level.subjects.map((subject, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${level.bgColor} ${level.textColor}`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Curriculum Cards (Synced with Homepage) */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <CurriculumCards />
        </div>

        {/* Academic Calendar (Synced with Homepage) */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <AcademicCalendar />
        </div>

        {/* Special Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-kanit text-2xl font-bold text-gray-900 text-center mb-8">โครงการพิเศษ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                <div className="mt-1">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-kanit font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
