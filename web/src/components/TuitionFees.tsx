"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  ShieldCheck,
  Info,
  CheckCircle,
} from 'lucide-react';

const feeData = [
  {
    curriculum: 'แผนวิทย์-คณิต',
    curriculumEn: 'Science-Math',
    color: 'bg-blue-500',
    items: [
      { label: 'ค่าบำรุงการศึกษา', amount: '3,500' },
      { label: 'ค่ากิจกรรมพัฒนาผู้เรียน', amount: '1,200' },
      { label: 'ค่าอุปกรณ์การเรียน', amount: '1,800' },
      { label: 'ค่าประกันอุบัติเหตุ', amount: '450' },
      { label: 'ค่าเรียนเสริมวิชาเฉพาะ', amount: '2,000' },
    ],
    total: '8,950',
  },
  {
    curriculum: 'แผนศิลป์-ภาษา',
    curriculumEn: 'Language-Arts',
    color: 'bg-violet-500',
    items: [
      { label: 'ค่าบำรุงการศึกษา', amount: '3,500' },
      { label: 'ค่ากิจกรรมพัฒนาผู้เรียน', amount: '1,200' },
      { label: 'ค่าอุปกรณ์การเรียน', amount: '1,500' },
      { label: 'ค่าประกันอุบัติเหตุ', amount: '450' },
      { label: 'ค่าเรียนภาษาต่างประเทศเสริม', amount: '2,500' },
    ],
    total: '9,150',
  },
  {
    curriculum: 'แผนศิลป์-สังคม',
    curriculumEn: 'Arts-Social',
    color: 'bg-rose-500',
    items: [
      { label: 'ค่าบำรุงการศึกษา', amount: '3,500' },
      { label: 'ค่ากิจกรรมพัฒนาผู้เรียน', amount: '1,200' },
      { label: 'ค่าอุปกรณ์การเรียน', amount: '1,500' },
      { label: 'ค่าประกันอุบัติเหตุ', amount: '450' },
      { label: 'ค่าอุปกรณ์ศิลปะ/ดนตรี', amount: '1,800' },
    ],
    total: '8,450',
  },
  {
    curriculum: 'แผนคอมพิวเตอร์',
    curriculumEn: 'Computer & Tech',
    color: 'bg-emerald-500',
    items: [
      { label: 'ค่าบำรุงการศึกษา', amount: '3,500' },
      { label: 'ค่ากิจกรรมพัฒนาผู้เรียน', amount: '1,200' },
      { label: 'ค่าอุปกรณ์การเรียน', amount: '1,800' },
      { label: 'ค่าประกันอุบัติเหตุ', amount: '450' },
      { label: 'ค่าเรียน STEM / Coding', amount: '2,500' },
    ],
    total: '9,450',
  },
];

const inclusions = [
  'หนังสือเรียนตามหลักสูตร',
  'ชุดพลศึกษา 1 ชุด',
  'ประกันอุบัติเหตุตลอดปี',
  'กิจกรรมเสริมหลักสูตร',
];

export default function TuitionFees() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary-50/30 rounded-full blur-3xl -translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-4 font-sarabun">
            <Wallet className="w-4 h-4" />
            ค่าใช้จ่ายการศึกษา
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ค่าเทอมและ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ค่าธรรมเนียม
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            รายละเอียดค่าใช้จ่ายแต่ละแผนการเรียน แสดงอย่างโปร่งใสและชัดเจน
          </p>
        </motion.div>

        {/* Transparency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-14"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <p className="font-sarabun text-sm text-emerald-600 font-medium">
            ข้อมูลค่าใช้จ่ายเปิดเผยอย่างโปร่งใส ตรวจสอบได้
          </p>
        </motion.div>

        {/* Fee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {feeData.map((plan, index) => (
            <motion.div
              key={plan.curriculum}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden border border-gray-100 hover:shadow-glass-lg transition-all duration-300"
            >
              {/* Card Header */}
              <div className={`${plan.color} px-6 py-4 flex items-center justify-between`}>
                <div>
                  <h3 className="font-kanit text-lg font-bold text-white">{plan.curriculum}</h3>
                  <p className="font-sarabun text-xs text-white/70">{plan.curriculumEn}</p>
                </div>
                <div className="text-right">
                  <p className="font-sarabun text-[10px] text-white/60 uppercase tracking-wider">ต่อภาคเรียน</p>
                  <p className="font-kanit text-xl font-bold text-white">฿{plan.total}</p>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="p-6">
                <table className="w-full">
                  <tbody>
                    {plan.items.map((item, i) => (
                      <tr
                        key={item.label}
                        className={`${i < plan.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                      >
                        <td className="py-3 font-sarabun text-sm text-gray-600">{item.label}</td>
                        <td className="py-3 font-kanit text-sm font-semibold text-gray-900 text-right whitespace-nowrap">
                          ฿{item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-100">
                      <td className="pt-4 font-kanit text-sm font-bold text-gray-900">รวมทั้งสิ้น</td>
                      <td className="pt-4 font-kanit text-lg font-bold text-primary-600 text-right">
                        ฿{plan.total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inclusions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 border border-gray-100 max-w-3xl mx-auto"
        >
          <h4 className="font-kanit text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            สิ่งที่รวมอยู่ในค่าเทอม
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inclusions.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="font-sarabun text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="font-sarabun text-xs text-blue-600 leading-relaxed">
              ค่าใช้จ่ายข้างต้นเป็นอัตราโดยประมาณสำหรับปีการศึกษาปัจจุบัน อาจมีการเปลี่ยนแปลงตามประกาศของโรงเรียน
              สอบถามรายละเอียดเพิ่มเติมได้ที่ฝ่ายธุรการ โทร. 0-2XXX-XXXX
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
