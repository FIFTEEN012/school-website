"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, User, Eye, Shield, Heart } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function DirectorMessage() {
  const [directorData, setDirectorData] = useState({
    director_name: 'นางชนัฎฎา จำเริญสรรพ์',
    director_message: 'โรงเรียนประชารัฐพัฒนศึกษามุ่งมั่นที่จะเป็นสถานศึกษาที่มีคุณภาพ บริหารงานด้วยความโปร่งใส ตรวจสอบได้ เน้นการพัฒนาผู้เรียนให้มีความรู้ คู่คุณธรรม มีทักษะที่จำเป็นในศตวรรษที่ 21 พร้อมก้าวสู่สังคมอย่างมีคุณภาพ เราเชื่อว่าการศึกษาที่ดีคือรากฐานของการพัฒนาที่ยั่งยืน',
    director_image_url: '/images/director.jpg',
    vision_title: 'วิสัยทัศน์ที่ชัดเจน',
    vision_desc: 'มุ่งสู่ความเป็นเลิศทางวิชาการ ควบคู่คุณธรรม',
    management_title: 'บริหารโปร่งใส',
    management_desc: 'ยึดหลักธรรมาภิบาล ตรวจสอบได้ทุกขั้นตอน',
    student_title: 'ใส่ใจผู้เรียน',
    student_desc: 'พัฒนาศักยภาพนักเรียนทุกคนอย่างเท่าเทียม',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('school_profile')
          .select('*')
          .single();
        
        if (data) {
          setDirectorData({
             director_name: data.director_name || 'นางชนัฎฎา จำเริญสรรพ์',
             director_message: data.director_message || 'โรงเรียนประชารัฐพัฒนศึกษามุ่งมั่นที่จะเป็นสถานศึกษาที่มีคุณภาพ...',
             director_image_url: data.director_image_url || '/images/director.jpg',
             vision_title: data.vision_title || 'วิสัยทัศน์ที่ชัดเจน',
             vision_desc: data.vision_desc || 'มุ่งสู่ความเป็นเลิศทางวิชาการ ควบคู่คุณธรรม',
             management_title: data.management_title || 'บริหารโปร่งใส',
             management_desc: data.management_desc || 'ยึดหลักธรรมาภิบาล ตรวจสอบได้ทุกขั้นตอน',
             student_title: data.student_title || 'ใส่ใจผู้เรียน',
             student_desc: data.student_desc || 'พัฒนาศักยภาพนักเรียนทุกคนอย่างเท่าเทียม',
          });
        }
      } catch (error) {
        console.error("Error fetching director data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const visionPoints = [
    {
      icon: Eye,
      title: directorData.vision_title,
      desc: directorData.vision_desc,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: directorData.management_title,
      desc: directorData.management_desc,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Heart,
      title: directorData.student_title,
      desc: directorData.student_desc,
      color: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

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
            <Quote className="w-4 h-4" />
            สารจากผู้บริหาร
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            สารจาก
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ผู้อำนวยการ
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            วิสัยทัศน์และแนวทางการบริหารโรงเรียนด้วยความโปร่งใสและมุ่งมั่น
          </p>
        </motion.div>

        {/* Main Content — Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Left — Director Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary-200/50 to-accent-200/30 rounded-3xl blur-xl" />

              {/* Photo card */}
                <div className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={directorData.director_image_url}
                    alt="ผู้อำนวยการโรงเรียน"
                    className="w-full h-full object-cover"
                  />
                </div>

              {/* Name badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-card px-5 py-3 text-center whitespace-nowrap">
                <p className="font-kanit text-sm font-bold text-gray-900">
                  {directorData.director_name}
                </p>
                <p className="font-sarabun text-xs text-primary-600">
                  ผู้อำนวยการโรงเรียน
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Quote & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {/* Quote Card */}
            <div className="relative glass-card p-8 sm:p-10 mb-8">
              {/* Large quote mark */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary-200" />
              </div>

              <blockquote className="relative z-10 pt-8 sm:pt-6">
                <p className="font-sarabun text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  "{directorData.director_message}"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full" />
                  <div>
                    <p className="font-kanit text-sm font-semibold text-gray-900">
                      ผู้อำนวยการโรงเรียน
                    </p>
                    <p className="font-sarabun text-xs text-gray-500">
                      โรงเรียนประชารัฐพัฒนศึกษา
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Vision Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {visionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-5 text-center hover:shadow-glass-lg transition-shadow duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <point.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-kanit text-sm font-semibold text-gray-900 mb-1">
                    {point.title}
                  </p>
                  <p className="font-sarabun text-xs text-gray-500 leading-relaxed">
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
