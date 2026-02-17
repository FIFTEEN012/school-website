'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CalendarDays, CheckCircle2, Phone, MapPin, Clock, ChevronRight, UserPlus, ClipboardList, GraduationCap } from 'lucide-react';

const admissionSteps = [
  {
    step: 1,
    icon: ClipboardList,
    title: 'เตรียมเอกสาร',
    description: 'เตรียมเอกสารสมัครเรียนให้ครบถ้วน ได้แก่ สำเนาทะเบียนบ้าน บัตรประชาชน ใบ ปพ.1 และรูปถ่าย',
  },
  {
    step: 2,
    icon: UserPlus,
    title: 'สมัครเรียน',
    description: 'ยื่นใบสมัครพร้อมเอกสารที่ห้องธุรการโรงเรียน หรือสมัครผ่านระบบออนไลน์ในช่วงเปิดรับสมัคร',
  },
  {
    step: 3,
    icon: FileText,
    title: 'สอบคัดเลือก',
    description: 'เข้าสอบวัดความรู้พื้นฐานและสัมภาษณ์ตามวันเวลาที่กำหนด',
  },
  {
    step: 4,
    icon: GraduationCap,
    title: 'ประกาศผลและมอบตัว',
    description: 'ตรวจสอบผลการคัดเลือก และมามอบตัวพร้อมผู้ปกครองตามกำหนดการ',
  },
];

const requiredDocs = [
  'สำเนาทะเบียนบ้านนักเรียน (2 ฉบับ)',
  'สำเนาทะเบียนบ้านบิดา-มารดา (อย่างละ 1 ฉบับ)',
  'สำเนาบัตรประชาชนนักเรียน (2 ฉบับ)',
  'ใบรับรองผลการเรียน (ปพ.1) หรือใบรับรองสถานศึกษา',
  'รูปถ่ายขนาด 1.5 นิ้ว จำนวน 3 รูป',
  'สำเนาสูติบัตร (1 ฉบับ)',
];

const timeline = [
  { period: 'ม.ค. – ก.พ.', event: 'เปิดรับสมัคร ม.1', status: 'upcoming' },
  { period: 'มี.ค.', event: 'สอบคัดเลือก ม.1', status: 'upcoming' },
  { period: 'มี.ค.', event: 'ประกาศผล ม.1', status: 'upcoming' },
  { period: 'เม.ย.', event: 'มอบตัวนักเรียน ม.1', status: 'upcoming' },
  { period: 'ก.พ. – มี.ค.', event: 'เปิดรับสมัคร ม.4', status: 'upcoming' },
  { period: 'มี.ค.', event: 'สอบคัดเลือก ม.4', status: 'upcoming' },
];

export default function AdmissionsPage() {
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              รับสมัครนักเรียนใหม่
            </span>
            <h1 className="font-kanit text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ข้อมูล
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                การรับสมัคร
              </span>
            </h1>
            <p className="font-sarabun text-lg text-gray-600 max-w-2xl mx-auto">
              เปิดรับสมัครนักเรียนระดับมัธยมศึกษาปีที่ 1 และ มัธยมศึกษาปีที่ 4
              เพื่อเข้าศึกษาต่อในปีการศึกษาถัดไป
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Admission Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-kanit text-2xl font-bold text-gray-900 text-center mb-10">ขั้นตอนการสมัครเรียน</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {admissionSteps.map((item, index) => (
              <div key={index} className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-kanit font-bold text-lg">
                  {item.step}
                </div>
                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-kanit font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                {index < admissionSteps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 z-10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two Column: Documents + Timeline */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
          >
            <h3 className="font-kanit text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-600" />
              เอกสารที่ต้องเตรียม
            </h3>
            <ul className="space-y-4">
              {requiredDocs.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
          >
            <h3 className="font-kanit text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              กำหนดการรับสมัคร (โดยประมาณ)
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-sm font-semibold font-kanit text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {item.period}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-gray-700">{item.event}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="font-kanit text-2xl md:text-3xl font-bold mb-4">สนใจสมัครเรียน?</h2>
            <p className="text-emerald-100 max-w-xl mx-auto mb-8">
              สอบถามรายละเอียดเพิ่มเติมได้ที่ห้องธุรการโรงเรียน หรือติดต่อผ่านช่องทางด้านล่าง
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-emerald-100">
                <Phone className="w-5 h-5" />
                <span>037-536-430</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Clock className="w-5 h-5" />
                <span>จ-ศ 08:00 – 16:30 น.</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <MapPin className="w-5 h-5" />
                <span>จ.ปราจีนบุรี</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </motion.div>

      </div>
    </div>
  );
}
