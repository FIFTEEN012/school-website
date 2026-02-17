'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Phone, MapPin, Clock, UserPlus } from 'lucide-react';
import AdmissionSteps from '@/components/AdmissionSteps';
import AdmissionRequirements from '@/components/AdmissionRequirements';
import TuitionFees from '@/components/TuitionFees';



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

        {/* Admission Steps (Synced with Homepage) */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <AdmissionSteps />
        </div>

        {/* Admission Requirements (Synced with Homepage) */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <AdmissionRequirements />
        </div>

        {/* Tuition Fees (Synced with Homepage) */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <TuitionFees />
        </div>

        {/* Timeline (Page Specific) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-4xl mx-auto"
        >
            <h3 className="font-kanit text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
              กำหนดการรับสมัคร (โดยประมาณ)
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                  <div className="w-28 flex-shrink-0 text-right">
                    <span className="text-sm font-semibold font-kanit text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-gray-700 font-sarabun text-lg">{item.event}</span>
                </div>
              ))}
            </div>
        </motion.div>

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
