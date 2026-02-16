"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Download,
  Calendar,
  FileText,
} from 'lucide-react';

const journals = [
  {
    id: 1,
    title: 'วารสารประชารัฐ ฉบับที่ 12',
    subtitle: 'ปีการศึกษา 2568 ภาคเรียนที่ 1',
    date: 'มิถุนายน 2568',
    pages: 32,
    color: 'from-primary-500 to-primary-700',
    accentColor: 'from-primary-100 to-primary-50',
  },
  {
    id: 2,
    title: 'วารสารประชารัฐ ฉบับที่ 11',
    subtitle: 'ปีการศึกษา 2567 ภาคเรียนที่ 2',
    date: 'พฤศจิกายน 2567',
    pages: 28,
    color: 'from-violet-500 to-violet-700',
    accentColor: 'from-violet-100 to-violet-50',
  },
  {
    id: 3,
    title: 'วารสารประชารัฐ ฉบับที่ 10',
    subtitle: 'ปีการศึกษา 2567 ภาคเรียนที่ 1',
    date: 'มิถุนายน 2567',
    pages: 30,
    color: 'from-emerald-500 to-emerald-700',
    accentColor: 'from-emerald-100 to-emerald-50',
  },
  {
    id: 4,
    title: 'วารสารประชารัฐ ฉบับที่ 9',
    subtitle: 'ปีการศึกษา 2566 ภาคเรียนที่ 2',
    date: 'พฤศจิกายน 2566',
    pages: 26,
    color: 'from-rose-500 to-rose-700',
    accentColor: 'from-rose-100 to-rose-50',
  },
];

export default function EJournal() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

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
            วารสารโรงเรียน
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            วารสาร
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              อิเล็กทรอนิกส์
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ดาวน์โหลดวารสารโรงเรียนย้อนหลัง รวมข่าวสาร กิจกรรม และผลงานนักเรียน
          </p>
        </motion.div>

        {/* Journal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {journals.map((journal, index) => (
            <motion.div
              key={journal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden border border-gray-100 hover:shadow-glass-lg transition-all duration-300 group"
            >
              {/* Cover placeholder */}
              <div className={`relative h-56 bg-gradient-to-br ${journal.accentColor} flex flex-col items-center justify-center p-6`}>
                {/* Decorative book shape */}
                <div className={`w-32 h-40 rounded-lg bg-gradient-to-br ${journal.color} shadow-xl flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300`}>
                  <BookOpen className="w-8 h-8 text-white/80 mb-2" />
                  <div className="w-12 h-px bg-white/40 mb-2" />
                  <p className="font-kanit text-[8px] text-white/70 text-center leading-tight">
                    วารสารประชารัฐ
                  </p>
                  <p className="font-kanit text-lg font-bold text-white">
                    #{journal.id + 8}
                  </p>
                </div>

                {/* Latest badge for first item */}
                {index === 0 && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-semibold font-sarabun shadow-md">
                    ล่าสุด
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-kanit text-base font-bold text-gray-900 mb-1 line-clamp-1">
                  {journal.title}
                </h3>
                <p className="font-sarabun text-xs text-gray-400 mb-3">{journal.subtitle}</p>

                <div className="flex items-center justify-between text-gray-400 text-xs font-sarabun mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {journal.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {journal.pages} หน้า
                  </span>
                </div>

                {/* Download Button */}
                <button
                  type="button"
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r ${journal.color} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-sarabun group/btn`}
                >
                  <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
                  ดาวน์โหลด PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
