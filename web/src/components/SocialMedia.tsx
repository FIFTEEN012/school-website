"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

const socials = [
  {
    name: 'Facebook',
    handle: '@PracharathSchool',
    desc: 'ติดตามข่าวสาร กิจกรรม และประกาศต่าง ๆ',
    href: 'https://facebook.com',
    color: 'from-[#1877F2] to-[#0C63D4]',
    hoverShadow: 'hover:shadow-[#1877F2]/30',
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@PracharathSchool',
    desc: 'รับชมวิดีโอกิจกรรม ผลงานนักเรียน และสื่อการเรียนรู้',
    href: 'https://youtube.com',
    color: 'from-[#FF0000] to-[#CC0000]',
    hoverShadow: 'hover:shadow-[#FF0000]/30',
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@PracharathSchool',
    desc: 'คลิปสั้น ๆ บรรยากาศโรงเรียน กิจกรรมสนุก ๆ',
    href: 'https://tiktok.com',
    color: 'from-[#000000] to-[#25F4EE]',
    hoverShadow: 'hover:shadow-[#25F4EE]/30',
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function SocialMedia() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent-50/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-4 font-sarabun">
            <Share2 className="w-4 h-4" />
            โซเชียลมีเดีย
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ติดตาม
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              เราได้ที่
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ติดตามข่าวสารและกิจกรรมผ่านช่องทางโซเชียลมีเดียของโรงเรียน
          </p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-7 text-center border border-gray-100 hover:shadow-glass-lg ${social.hoverShadow} transition-all duration-300 group`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center mx-auto mb-5 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                {social.icon}
              </div>

              {/* Name */}
              <h3 className="font-kanit text-xl font-bold text-gray-900 mb-0.5">{social.name}</h3>
              <p className="font-sarabun text-xs text-primary-500 font-medium mb-3">{social.handle}</p>

              {/* Description */}
              <p className="font-sarabun text-sm text-gray-500 leading-relaxed mb-5">
                {social.desc}
              </p>

              {/* Button */}
              <span className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r ${social.color} rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 font-sarabun`}>
                ติดตามเลย
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
