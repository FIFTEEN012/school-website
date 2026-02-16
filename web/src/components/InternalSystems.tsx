"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  LogIn,
  ClipboardList,
  Settings,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const portals = [
  {
    icon: LogIn,
    title: 'ระบบ SGS',
    titleEn: 'Student Grading System',
    desc: 'ตรวจสอบผลการเรียน เกรดเฉลี่ย และรายงานผลรายภาค',
    href: '#sgs',
    color: 'from-primary-500 to-primary-600',
    tag: 'นักเรียน / ผู้ปกครอง',
  },
  {
    icon: UserCheck,
    title: 'ระบบ Check-in',
    titleEn: 'Attendance System',
    desc: 'ระบบลงเวลาเข้า-ออก สำหรับบุคลากรและนักเรียน',
    href: '#checkin',
    color: 'from-emerald-500 to-emerald-600',
    tag: 'บุคลากร',
  },
  {
    icon: ClipboardList,
    title: 'แจ้งซ่อมบำรุง',
    titleEn: 'Maintenance Request',
    desc: 'แจ้งปัญหาอุปกรณ์ อาคารสถานที่ และระบบสาธารณูปโภค',
    href: '#maintenance',
    color: 'from-amber-500 to-amber-600',
    tag: 'บุคลากร',
  },
  {
    icon: Settings,
    title: 'ระบบบริหารจัดการ',
    titleEn: 'Admin Portal',
    desc: 'ระบบจัดการข้อมูลภายในสำหรับฝ่ายบริหาร',
    href: '#admin',
    color: 'from-violet-500 to-violet-600',
    tag: 'ผู้บริหาร',
  },
];

export default function InternalSystems() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium mb-4 font-sarabun">
            <Lock className="w-4 h-4" />
            ระบบภายใน
          </span>
          <h2 className="font-kanit text-2xl md:text-3xl font-bold text-white mb-2">
            Internal
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              {' '}Portal
            </span>
          </h2>
          <p className="font-sarabun text-sm text-gray-500 max-w-md mx-auto">
            ระบบสารสนเทศภายในสำหรับบุคลากร นักเรียน และผู้ปกครอง
          </p>
        </motion.div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {portals.map((portal, index) => (
            <motion.a
              key={portal.title}
              href={portal.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Tag */}
              <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-gray-500 font-sarabun mb-3">
                {portal.tag}
              </span>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <portal.icon className="w-5 h-5 text-white" />
              </div>

              {/* Title */}
              <h4 className="font-kanit text-sm font-bold text-white mb-0.5">{portal.title}</h4>
              <p className="font-sarabun text-[10px] text-gray-500 mb-2">{portal.titleEn}</p>

              {/* Description */}
              <p className="font-sarabun text-xs text-gray-400 leading-relaxed mb-3">
                {portal.desc}
              </p>

              {/* Arrow */}
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-white transition-colors font-sarabun">
                เข้าสู่ระบบ
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Security note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500/60" />
          <p className="font-sarabun text-xs text-gray-600">
            ระบบมีการเข้ารหัสข้อมูล เข้าถึงได้เฉพาะผู้มีสิทธิ์เท่านั้น
          </p>
        </motion.div>
      </div>
    </section>
  );
}
