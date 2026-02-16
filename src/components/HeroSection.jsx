import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

const stats = [
  { icon: Users, value: '1,200+', label: 'นักเรียน', color: 'from-blue-500 to-blue-600' },
  { icon: BookOpen, value: '50+', label: 'หลักสูตร', color: 'from-emerald-500 to-emerald-600' },
  { icon: Trophy, value: '98%', label: 'ผลสัมฤทธิ์', color: 'from-amber-500 to-amber-600' },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-100/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 border border-primary-200/50 text-primary-700 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-sarabun">ยินดีต้อนรับสู่โรงเรียนของเรา</span>
            </div>

            {/* Headline */}
            <h1 className="font-kanit text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-4">
              โรงเรียน
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                ประชารัฐ
              </span>
              <br />
              พัฒนศึกษา
            </h1>

            {/* Sub-headline */}
            <p className="font-kanit text-xl sm:text-2xl text-primary-600/80 font-medium mb-4">
              สร้างคน สร้างปัญญา พัฒนาสู่อนาคต
            </p>
            <p className="font-sarabun text-base sm:text-lg text-gray-500 max-w-lg mb-8 leading-relaxed">
              Building People, Building Wisdom, Developing for the Future — สถานศึกษาที่มุ่งมั่นพัฒนาผู้เรียนให้มีคุณภาพรอบด้าน
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl hover:from-primary-600 hover:to-primary-800 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 font-sarabun group"
              >
                สมัครเรียน
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#academic"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 font-sarabun group"
              >
                <BookOpen className="w-5 h-5 text-primary-500" />
                ดูหลักสูตร
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-kanit text-xl font-bold text-gray-900 leading-none">{stat.value}</p>
                    <p className="font-sarabun text-xs text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            {/* Main Image Card */}
            <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
              {/* Decorative ring behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/40 to-accent-200/30 rounded-3xl blur-2xl" />

              {/* Image placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 aspect-[4/5] bg-gradient-to-br from-primary-100 to-primary-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg">
                    <GraduationCap className="w-10 h-10 text-primary-600" />
                  </div>
                  <p className="font-kanit text-primary-700 text-lg font-semibold mb-1">
                    ภาพโรงเรียน
                  </p>
                  <p className="font-sarabun text-primary-500/70 text-sm">
                    School Image Placeholder
                  </p>
                  <p className="font-sarabun text-primary-400/60 text-xs mt-2">
                    แนะนำขนาด 800 × 1000 px
                  </p>
                </div>
              </div>

              {/* Floating card — Students */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 sm:-left-8 glass-card px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-kanit text-sm font-bold text-gray-900">นักเรียนมากกว่า</p>
                  <p className="font-sarabun text-xs text-gray-500">1,200 คน ในปีการศึกษานี้</p>
                </div>
              </motion.div>

              {/* Floating card — Achievement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -top-4 -right-4 sm:-right-8 glass-card px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-kanit text-sm font-bold text-gray-900">ผลงานดีเด่น</p>
                  <p className="font-sarabun text-xs text-gray-500">รางวัลระดับประเทศ</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
