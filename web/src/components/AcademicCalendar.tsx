"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, PartyPopper, PenTool, Flag } from 'lucide-react';

const calendarEvents = [
  {
    date: '16 พ.ค.',
    title: 'เปิดภาคเรียนที่ 1',
    titleEn: 'Term 1 Starts',
    type: 'term',
    icon: Flag,
    color: 'bg-emerald-500',
  },
  {
    date: '1–5 ก.ค.',
    title: 'สอบกลางภาคเรียนที่ 1',
    titleEn: 'Midterm Exam 1',
    type: 'exam',
    icon: PenTool,
    color: 'bg-amber-500',
  },
  {
    date: '15–30 ก.ย.',
    title: 'สอบปลายภาคเรียนที่ 1',
    titleEn: 'Final Exam 1',
    type: 'exam',
    icon: PenTool,
    color: 'bg-amber-500',
  },
  {
    date: '1–31 ต.ค.',
    title: 'ปิดภาคเรียนที่ 1',
    titleEn: 'Term 1 Break',
    type: 'holiday',
    icon: PartyPopper,
    color: 'bg-rose-500',
  },
  {
    date: '1 พ.ย.',
    title: 'เปิดภาคเรียนที่ 2',
    titleEn: 'Term 2 Starts',
    type: 'term',
    icon: Flag,
    color: 'bg-emerald-500',
  },
  {
    date: '6–10 ม.ค.',
    title: 'สอบกลางภาคเรียนที่ 2',
    titleEn: 'Midterm Exam 2',
    type: 'exam',
    icon: PenTool,
    color: 'bg-amber-500',
  },
  {
    date: '1–15 มี.ค.',
    title: 'สอบปลายภาคเรียนที่ 2',
    titleEn: 'Final Exam 2',
    type: 'exam',
    icon: PenTool,
    color: 'bg-amber-500',
  },
  {
    date: '1 เม.ย. – 15 พ.ค.',
    title: 'ปิดภาคเรียนที่ 2 (ปิดเทอมใหญ่)',
    titleEn: 'Summer Break',
    type: 'holiday',
    icon: PartyPopper,
    color: 'bg-rose-500',
  },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  term: { label: 'เปิด/ปิดเทอม', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  exam: { label: 'สอบ', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  holiday: { label: 'วันหยุด', color: 'bg-rose-50 text-rose-600 border-rose-100' },
};

export default function AcademicCalendar() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary-50/40 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2" />

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
            <Calendar className="w-4 h-4" />
            ปฏิทินการศึกษา
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ปฏิทิน
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              วิชาการ
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            วันสำคัญและกำหนดการต่าง ๆ ตลอดปีการศึกษา
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {Object.values(typeLabels).map((t) => (
            <span
              key={t.label}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${t.color} font-sarabun`}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-100 to-transparent" />

            <div className="space-y-6">
              {calendarEvents.map((event, index) => (
                <motion.div
                  key={`${event.title}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="relative flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-10 h-10 sm:w-14 sm:h-14 rounded-xl ${event.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <event.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card p-4 sm:p-5 border border-gray-100 hover:shadow-glass-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h4 className="font-kanit text-base font-bold text-gray-900">
                        {event.title}
                      </h4>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeLabels[event.type].color} font-sarabun w-fit`}>
                        <Clock className="w-3 h-3" />
                        {event.date}
                      </span>
                    </div>
                    <p className="font-sarabun text-xs text-gray-400">{event.titleEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
