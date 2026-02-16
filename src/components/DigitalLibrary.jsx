import React from 'react';
import { motion } from 'framer-motion';
import {
  MonitorPlay,
  FileText,
  Library,
  Globe,
  Download,
  ExternalLink,
  Laptop,
} from 'lucide-react';

const resources = [
  {
    icon: MonitorPlay,
    title: 'E-Learning',
    titleEn: 'Online Learning Platform',
    desc: 'แพลตฟอร์มเรียนออนไลน์ บทเรียนวิดีโอ แบบฝึกหัด และสื่อการเรียนรู้ดิจิทัล',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    links: [
      { label: 'เข้าสู่ระบบ E-Learning', href: '#', icon: ExternalLink },
      { label: 'คู่มือการใช้งาน', href: '#', icon: Download },
    ],
  },
  {
    icon: FileText,
    title: 'ข้อสอบย้อนหลัง',
    titleEn: 'Past Examination Papers',
    desc: 'รวมข้อสอบกลางภาค ปลายภาค และข้อสอบเข้ามหาวิทยาลัยย้อนหลัง พร้อมเฉลย',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    links: [
      { label: 'ข้อสอบกลางภาค', href: '#', icon: Download },
      { label: 'ข้อสอบปลายภาค', href: '#', icon: Download },
    ],
  },
  {
    icon: Library,
    title: 'ห้องสมุดออนไลน์',
    titleEn: 'Digital Library',
    desc: 'ค้นหาหนังสือ วารสาร สื่อสิ่งพิมพ์ และฐานข้อมูลออนไลน์ของห้องสมุดโรงเรียน',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    links: [
      { label: 'สืบค้นหนังสือ', href: '#', icon: ExternalLink },
      { label: 'ฐานข้อมูลออนไลน์', href: '#', icon: Globe },
    ],
  },
];

export default function DigitalLibrary() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-50/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

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
            <Laptop className="w-4 h-4" />
            แหล่งเรียนรู้ดิจิทัล
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ห้องสมุดและ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              สื่อดิจิทัล
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            แหล่งเรียนรู้ออนไลน์สำหรับนักเรียนและบุคลากร
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((res, index) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`glass-card p-7 hover:shadow-glass-lg transition-all duration-300 group border ${res.borderColor} flex flex-col`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${res.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <res.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="font-kanit text-xl font-bold text-gray-900 mb-1">{res.title}</h3>
              <p className="font-sarabun text-xs text-gray-400 mb-4">{res.titleEn}</p>

              {/* Description */}
              <p className="font-sarabun text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                {res.desc}
              </p>

              {/* Links */}
              <div className="space-y-2">
                {res.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`flex items-center justify-between p-3 rounded-xl ${res.bgColor} border ${res.borderColor} hover:shadow-md transition-all duration-200 group/link`}
                  >
                    <span className="font-sarabun text-sm font-medium text-gray-700">
                      {link.label}
                    </span>
                    <link.icon className="w-4 h-4 text-gray-400 group-hover/link:text-primary-500 transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
