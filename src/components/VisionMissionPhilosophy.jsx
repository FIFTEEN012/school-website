import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, BookOpen, Lightbulb, Star, Compass } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'วิสัยทัศน์',
    titleEn: 'Vision',
    content:
      'โรงเรียนประชารัฐพัฒนศึกษาเป็นสถานศึกษาชั้นนำที่มุ่งพัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานสากล มีคุณธรรม จริยธรรม และทักษะที่จำเป็นในศตวรรษที่ 21',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    icon: Target,
    title: 'พันธกิจ',
    titleEn: 'Mission',
    content:
      'จัดการศึกษาอย่างมีคุณภาพ ส่งเสริมผู้เรียนให้มีความรู้คู่คุณธรรม พัฒนาบุคลากรให้มีศักยภาพ บริหารจัดการด้วยหลักธรรมาภิบาล และสร้างเครือข่ายความร่วมมือกับชุมชน',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    iconBg: 'bg-emerald-100',
    textColor: 'text-emerald-600',
  },
  {
    icon: BookOpen,
    title: 'ปรัชญา',
    titleEn: 'Philosophy',
    content:
      '"การศึกษาคือรากฐานของการพัฒนา" — เราเชื่อมั่นว่าการศึกษาที่ดีจะสร้างพลเมืองที่มีคุณภาพ มีจิตสาธารณะ และพร้อมเป็นกำลังสำคัญในการพัฒนาประเทศ',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    iconBg: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
];

const coreValues = [
  { icon: Lightbulb, label: 'ความคิดสร้างสรรค์' },
  { icon: Star, label: 'ความเป็นเลิศ' },
  { icon: Compass, label: 'คุณธรรมนำทาง' },
];

export default function VisionMissionPhilosophy() {
  return (
    <section id="about" className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-3xl -translate-y-1/2" />

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
            เกี่ยวกับเรา
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            วิสัยทัศน์ พันธกิจ และ
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ปรัชญา
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-2xl mx-auto">
            แนวทางที่เรายึดมั่นในการจัดการศึกษาเพื่อพัฒนาผู้เรียนอย่างรอบด้าน
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative glass-card p-8 hover:shadow-glass-lg transition-all duration-300 group border ${pillar.borderColor}`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="font-kanit text-xl font-bold text-gray-900 mb-1">
                {pillar.title}
              </h3>
              <p className={`font-sarabun text-xs ${pillar.textColor} font-medium mb-4 uppercase tracking-wider`}>
                {pillar.titleEn}
              </p>

              {/* Content */}
              <p className="font-sarabun text-sm text-gray-600 leading-relaxed">
                {pillar.content}
              </p>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${pillar.bgColor} rounded-bl-3xl rounded-tr-2xl opacity-50`} />
            </motion.div>
          ))}
        </div>

        {/* Core Values Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          <p className="font-kanit text-sm font-semibold text-gray-400 uppercase tracking-widest">
            ค่านิยมหลัก
          </p>
          <div className="flex items-center gap-6">
            {coreValues.map((val, i) => (
              <div key={val.label} className="flex items-center gap-2">
                <val.icon className="w-4 h-4 text-primary-500" />
                <span className="font-sarabun text-sm text-gray-600 font-medium">{val.label}</span>
                {i < coreValues.length - 1 && (
                  <span className="ml-4 w-1 h-1 rounded-full bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
