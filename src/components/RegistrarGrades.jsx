import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  ClipboardCheck,
  FileSearch,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const actions = [
  {
    icon: ClipboardCheck,
    title: 'ตรวจสอบผลการเรียน',
    titleEn: 'Check Grades Online',
    desc: 'เข้าสู่ระบบเพื่อตรวจสอบผลการเรียน เกรดเฉลี่ย และรายงานผลการเรียนรายภาค',
    buttonLabel: 'เข้าสู่ระบบตรวจผลการเรียน',
    href: '#sgs',
    color: 'from-primary-500 to-primary-700',
    hoverColor: 'hover:from-primary-600 hover:to-primary-800',
    shadowColor: 'shadow-primary-500/25 hover:shadow-primary-500/40',
  },
  {
    icon: FileSearch,
    title: 'ระเบียบการวัดผลประเมินผล',
    titleEn: 'Evaluation Rules & Regulations',
    desc: 'ศึกษาระเบียบการวัดผล เกณฑ์การประเมิน และแนวปฏิบัติในการจบหลักสูตร',
    buttonLabel: 'ดูระเบียบการวัดผล',
    href: '#',
    color: 'from-emerald-500 to-emerald-600',
    hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
    shadowColor: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
  },
];

export default function RegistrarGrades() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-50/30 rounded-full blur-3xl -translate-y-1/3" />

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
            <GraduationCap className="w-4 h-4" />
            งานทะเบียนและวัดผล
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ทะเบียนและ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              วัดผล
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ตรวจสอบผลการเรียนและศึกษาระเบียบการวัดผลประเมินผล
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-8 text-center hover:shadow-glass-lg transition-all duration-300 group border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="font-kanit text-xl font-bold text-gray-900 mb-1">{action.title}</h3>
              <p className="font-sarabun text-xs text-gray-400 mb-4">{action.titleEn}</p>

              {/* Description */}
              <p className="font-sarabun text-sm text-gray-600 leading-relaxed mb-6">
                {action.desc}
              </p>

              {/* CTA Button */}
              <a
                href={action.href}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r ${action.color} ${action.hoverColor} rounded-xl shadow-lg ${action.shadowColor} transition-all duration-300 font-sarabun group/btn`}
              >
                {action.buttonLabel}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-10 text-gray-400"
        >
          <ShieldCheck className="w-4 h-4" />
          <p className="font-sarabun text-xs">
            ข้อมูลผลการเรียนเป็นความลับ เข้าถึงได้เฉพาะผู้มีสิทธิ์เท่านั้น
          </p>
        </motion.div>
      </div>
    </section>
  );
}
