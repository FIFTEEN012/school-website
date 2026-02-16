"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Target,
  BookOpen,
  Lightbulb,
  Star,
  Compass,
  Flag,
  Map,
  Heart,
  Users,
  Award,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function VisionMissionPhilosophy() {
  const [data, setData] = useState({
    vision_content: 'โรงเรียนประชารัฐพัฒนศึกษามุ่งจัดการศึกษา เพื่อพัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษา มีความรู้ คู่คุณธรรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
    mission_content: 'พัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษาขั้นพื้นฐาน มีทักษะในศตวรรษที่ 21 และมีความพร้อมสู่อาชีพ ดำรงตนตามหลักปรัชญาของเศรษฐกิจพอเพียง\nพัฒนาหลักสูตรสถานศึกษาเพื่อสนองต่อความแตกต่างระหว่างบุคคล\nพัฒนาการจัดกระบวนการการเรียนรู้เชิงรุก การวัดและประเมินผลที่หลากหลายอย่างมีคุณภาพ\nส่งเสริมครูและบุคลากรทางการศึกษาให้มีความรู้ความสามารถ มีคุณภาพตามมาตรฐานวิชาชีพ\nพัฒนาสื่อเทคโนโลยีและนวัตกรรมทางการศึกษาเพื่อพัฒนาคุณภาพทางการศึกษา\nพัฒนาสถานศึกษาให้เป็นแหล่งเรียนรู้และมีสภาพแวดล้อมที่เอื้อต่อการเรียนรู้อย่างมีคุณภาพ\nพัฒนาระบบการบริหารจัดการศึกษาอย่างมีคุณภาพตามหลักธรรมาภิบาลและกระบวนการบริหาร OBECQA\nสร้างภาคีเครือข่ายที่หลากหลายเพื่อสนับสนุนการจัดการศึกษาและพัฒนาคุณภาพการศึกษา\nส่งเสริมและพัฒนาระบบการสื่อสารประชาสัมพันธ์',
    goal_content: 'ผู้เรียนได้รับการพัฒนาอย่างรอบด้าน วางรากฐานสู่อาชีพ\nผู้เรียนมีความรู้ คุณธรรม จริยธรรม และมีคุณลักษณะอันพึงประสงค์ ดำรงตนตามหลักปรัชญาของเศรษฐกิจพอเพียง\nผู้เรียนมีจิตสำนึกต่อสิ่งแวดล้อม\nครูมีคุณภาพตามมาตรฐานวิชาชีพ\nโรงเรียนมีระบบบริหารจัดการที่มีคุณภาพ',
    strategy_content: 'ส่งเสริมและพัฒนานักเรียนให้เป็นบุคคลแห่งการเรียนรู้ มีสมรรถนะและมีทักษะในศตวรรษที่ 21\nน้อมนำหลักปรัชญาของเศรษฐกิจพอเพียง ในการส่งเสริมพัฒนานักเรียน ให้มีคุณธรรม จริยธรรม มีคุณลักษณะอันพึงประสงค์\nพัฒนาการบริหารจัดการด้วยระบบคุณภาพ\nพัฒนากระบวนการจัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญและจัดการเรียนรู้เชิงรุก (Active Learning)\nพัฒนาสภาพแวดล้อม แหล่งเรียนรู้ สื่อ เทคโนโลยีที่เอื้อต่อการเรียนรู้อย่างมีคุณภาพ',
    philosophy_quote: 'ทนโต เสฏโฐ มนุสเสสุ',
    philosophy_desc: 'ผู้ฝึกตนดีแล้ว ย่อมประเสริฐ ในหมู่มนุษย์',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      try {
        const { data: fetchedData, error } = await supabase
          .from('school_profile')
          .select('*')
          .single();
        
        if (fetchedData) {
          setData({
             vision_content: fetchedData.vision_content || data.vision_content,
             mission_content: fetchedData.mission_content || data.mission_content,
             goal_content: fetchedData.goal_content || data.goal_content,
             strategy_content: fetchedData.strategy_content || data.strategy_content,
             philosophy_quote: fetchedData.philosophy_quote || data.philosophy_quote,
             philosophy_desc: fetchedData.philosophy_desc || data.philosophy_desc,
          });
        }
      } catch (error) {
        console.error("Error fetching vision mission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseList = (content: string) => {
    return (
      <ul className="list-disc list-outside pl-4 space-y-1 text-left">
        {content.split('\n').map((item, index) => (
          item.trim() && <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  const pillars = [
    {
      icon: Eye,
      title: 'วิสัยทัศน์',
      titleEn: 'Vision',
      content: (
        <p>{data.vision_content}</p>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      textColor: 'text-blue-600',
    },
    {
      icon: Target,
      title: 'พันธกิจ',
      titleEn: 'Mission',
      content: parseList(data.mission_content),
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      textColor: 'text-emerald-600',
    },
    {
      icon: Flag,
      title: 'เป้าประสงค์',
      titleEn: 'Goals',
      content: parseList(data.goal_content),
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
      textColor: 'text-rose-600',
    },
    {
      icon: Map,
      title: 'กลยุทธ์',
      titleEn: 'Strategies',
      content: parseList(data.strategy_content),
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-100',
      textColor: 'text-violet-600',
    },
    {
      icon: BookOpen,
      title: 'ปรัชญา',
      titleEn: 'Philosophy',
      content: (
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800 mb-2">"{data.philosophy_quote}"</p>
          <p>{data.philosophy_desc}</p>
        </div>
      ),
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      textColor: 'text-amber-600',
    },
  ];

  const identities = [
    { icon: Heart, label: 'คำขวัญ', text: 'สามัคคี มีวินัย ใจอาสา' },
    { icon: Lightbulb, label: 'คติพจน์', text: 'สร้างสรรค์การศึกษา พัฒนาคุณธรรม หนุนนำชุมชน' },
    { icon: Star, label: 'เอกลักษณ์', text: 'กิจกรรมเด่น เน้นคุณธรรม' },
    { icon: Users, label: 'อัตลักษณ์', text: 'ไหว้งาม ตามมารยาทไทย' },
    { icon: Award, label: 'อักษรย่อ', text: 'ป.ร.ศ.' },
  ];

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
              เป้าหมาย
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-2xl mx-auto">
            แนวทางที่เรายึดมั่นในการจัดการศึกษาเพื่อพัฒนาผู้เรียนอย่างรอบด้าน
            ตามมาตรฐานสากลและหลักปรัชญาของเศรษฐกิจพอเพียง
          </p>
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 items-start">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Identities Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {identities.map((item, i) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-kanit text-sm font-bold text-gray-900 mb-1">{item.label}</p>
                  <p className="font-sarabun text-sm text-gray-600 leading-tight">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: any; index: number }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass-card p-6 md:p-8 hover:shadow-glass-lg transition-all duration-300 group border h-full flex flex-col ${pillar.borderColor} ${pillar.colSpan || ''}`}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
          <pillar.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          {/* Title */}
          <h3 className="font-kanit text-xl font-bold text-gray-900 leading-tight">
            {pillar.title}
          </h3>
          <p className={`font-sarabun text-xs ${pillar.textColor} font-medium uppercase tracking-wider`}>
            {pillar.titleEn}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-grow relative">
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '120px' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`font-sarabun text-sm text-gray-600 leading-relaxed pl-1 overflow-hidden relative`}
        >
          {pillar.content}
        </motion.div>
        
        {/* Gradient Mask (only when not expanded) */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-4 text-xs font-medium underline-offset-4 hover:underline focus:outline-none transition-colors ${pillar.textColor}`}
      >
        {isExpanded ? 'ย่อลง (Show Less)' : 'อ่านเพิ่มเติม (Read More)'}
      </button>

      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${pillar.bgColor} rounded-bl-3xl rounded-tr-2xl opacity-50 -z-10`} />
    </motion.div>
  );
}
