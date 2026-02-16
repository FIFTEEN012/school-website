import React from 'react';
import { motion } from 'framer-motion';
import {
  FileEdit,
  PenTool,
  Users,
  CheckCircle,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileEdit,
    title: 'ยื่นใบสมัคร',
    titleEn: 'Application',
    desc: 'กรอกใบสมัครออนไลน์หรือรับใบสมัครที่โรงเรียน พร้อมแนบเอกสารประกอบ',
    color: 'from-blue-500 to-blue-600',
    dotColor: 'bg-blue-500',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'สอบคัดเลือก',
    titleEn: 'Entrance Exam',
    desc: 'สอบวัดความรู้พื้นฐาน ภาษาไทย คณิตศาสตร์ ภาษาอังกฤษ และวิทยาศาสตร์',
    color: 'from-amber-500 to-amber-600',
    dotColor: 'bg-amber-500',
  },
  {
    number: '03',
    icon: Users,
    title: 'สัมภาษณ์',
    titleEn: 'Interview',
    desc: 'สัมภาษณ์นักเรียนและผู้ปกครอง เพื่อทำความรู้จักและประเมินความพร้อม',
    color: 'from-violet-500 to-violet-600',
    dotColor: 'bg-violet-500',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'ประกาศผล',
    titleEn: 'Result',
    desc: 'ประกาศผลการคัดเลือกผ่านเว็บไซต์โรงเรียน และแจ้งกำหนดการมอบตัว',
    color: 'from-emerald-500 to-emerald-600',
    dotColor: 'bg-emerald-500',
  },
];

export default function AdmissionSteps() {
  return (
    <section id="admissions" className="relative py-24 bg-white overflow-hidden">
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
            <ClipboardList className="w-4 h-4" />
            ขั้นตอนการรับสมัคร
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            สมัครเรียน
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ง่าย ๆ 4 ขั้นตอน
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            กระบวนการรับสมัครที่โปร่งใส ชัดเจน ทุกขั้นตอน
          </p>
        </motion.div>

        {/* Horizontal Stepper — Desktop */}
        <div className="hidden md:block mb-8">
          {/* Progress line */}
          <div className="relative max-w-4xl mx-auto mb-10">
            <div className="absolute top-6 left-[12%] right-[12%] h-1 bg-gray-100 rounded-full" />
            <div className="absolute top-6 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blue-500 via-amber-500 via-violet-500 to-emerald-500 rounded-full opacity-30" />

            <div className="relative grid grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-5 ring-4 ring-white`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Step number */}
                  <span className={`font-kanit text-xs font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-1`}>
                    STEP {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-kanit text-base font-bold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sarabun text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                    {step.titleEn}
                  </p>

                  {/* Description */}
                  <p className="font-sarabun text-xs text-gray-500 leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Stepper — Mobile */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-amber-200 via-violet-200 to-emerald-200" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex items-start gap-5"
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0 ring-4 ring-white`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="glass-card p-5 flex-1 border border-gray-100">
                    <span className={`font-kanit text-[10px] font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      STEP {step.number}
                    </span>
                    <h3 className="font-kanit text-base font-bold text-gray-900 mt-0.5">
                      {step.title}
                    </h3>
                    <p className="font-sarabun text-xs text-gray-400 mb-2">{step.titleEn}</p>
                    <p className="font-sarabun text-sm text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-14"
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl hover:from-primary-600 hover:to-primary-800 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 font-sarabun group cursor-pointer"
          >
            สมัครเรียนออนไลน์
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-sarabun text-xs text-gray-400 mt-3">
            เปิดรับสมัครตลอดปีการศึกษา
          </p>
        </motion.div>
      </div>
    </section>
  );
}
