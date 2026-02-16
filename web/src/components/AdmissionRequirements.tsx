"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  FileText,
  User,
  Camera,
  CreditCard,
  Stethoscope,
  ScrollText,
  AlertCircle,
} from 'lucide-react';

const documentChecklist = [
  { icon: FileText, label: 'สำเนาทะเบียนบ้านของนักเรียน (1 ฉบับ)', required: true },
  { icon: CreditCard, label: 'สำเนาบัตรประชาชนของนักเรียน (1 ฉบับ)', required: true },
  { icon: ScrollText, label: 'ใบรับรองผลการเรียน (ปพ.1) หรือสมุดพก', required: true },
  { icon: User, label: 'สำเนาบัตรประชาชนของบิดา-มารดา (อย่างละ 1 ฉบับ)', required: true },
  { icon: Camera, label: 'รูปถ่ายหน้าตรง ขนาด 1.5 นิ้ว (3 รูป)', required: true },
  { icon: Stethoscope, label: 'ใบรับรองแพทย์ (ไม่เกิน 1 เดือน)', required: true },
  { icon: FileText, label: 'หลักฐานการเปลี่ยนชื่อ-สกุล (ถ้ามี)', required: false },
  { icon: ScrollText, label: 'เอกสารอื่น ๆ ตามที่โรงเรียนกำหนด', required: false },
];

const eligibility = [
  {
    level: 'ระดับมัธยมศึกษาปีที่ 1',
    levelEn: 'Matthayom 1 (Grade 7)',
    criteria: [
      'สำเร็จการศึกษาชั้นประถมศึกษาปีที่ 6 หรือเทียบเท่า',
      'อายุไม่เกิน 15 ปี นับถึงวันเปิดภาคเรียน',
      'มีสุขภาพแข็งแรง ไม่เป็นโรคติดต่อร้ายแรง',
    ],
    color: 'border-blue-200 bg-blue-50/50',
    dotColor: 'bg-blue-500',
  },
  {
    level: 'ระดับมัธยมศึกษาปีที่ 4',
    levelEn: 'Matthayom 4 (Grade 10)',
    criteria: [
      'สำเร็จการศึกษาชั้นมัธยมศึกษาปีที่ 3 หรือเทียบเท่า',
      'มีผลการเรียนเฉลี่ยสะสม (GPA) ไม่ต่ำกว่า 2.00',
      'มีสุขภาพแข็งแรง ไม่เป็นโรคติดต่อร้ายแรง',
      'ผ่านการสอบคัดเลือกของโรงเรียน',
    ],
    color: 'border-emerald-200 bg-emerald-50/50',
    dotColor: 'bg-emerald-500',
  },
];

export default function AdmissionRequirements() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary-50/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />

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
            <CheckSquare className="w-4 h-4" />
            คุณสมบัติและเอกสาร
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            คุณสมบัติ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ผู้สมัคร
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            เกณฑ์การรับสมัครและเอกสารที่ต้องเตรียม
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Eligibility Criteria */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-kanit text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" />
              เกณฑ์การรับสมัคร
            </h3>

            <div className="space-y-5">
              {eligibility.map((item, idx) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`glass-card p-6 border ${item.color}`}
                >
                  <h4 className="font-kanit text-base font-bold text-gray-900 mb-0.5">
                    {item.level}
                  </h4>
                  <p className="font-sarabun text-xs text-gray-400 mb-4">{item.levelEn}</p>

                  <ul className="space-y-3">
                    {item.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full ${item.dotColor} mt-1.5 flex-shrink-0`} />
                        <span className="font-sarabun text-sm text-gray-600">{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Document Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-kanit text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-500" />
              เอกสารประกอบการสมัคร
            </h3>

            <div className="glass-card p-6 border border-gray-100">
              <ul className="space-y-4">
                {documentChecklist.map((doc, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 group"
                  >
                    {/* Checkbox style */}
                    <div className="w-6 h-6 rounded-lg border-2 border-primary-300 bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-100 transition-colors">
                      <CheckSquare className="w-3.5 h-3.5 text-primary-500" />
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <span className="font-sarabun text-sm text-gray-700">{doc.label}</span>
                      {doc.required ? (
                        <span className="ml-2 inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                          จำเป็น
                        </span>
                      ) : (
                        <span className="ml-2 inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-100">
                          ถ้ามี
                        </span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Note */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-kanit text-sm font-semibold text-amber-700 mb-1">หมายเหตุ</p>
                  <p className="font-sarabun text-xs text-amber-600 leading-relaxed">
                    เอกสารทุกฉบับต้องรับรองสำเนาถูกต้อง กรุณาเตรียมเอกสารฉบับจริงมาแสดงในวันสมัครด้วย
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
