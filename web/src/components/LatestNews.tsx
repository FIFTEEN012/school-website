"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  date: string;
  category: string;
  image_url: string;
  created_at: string;
}

interface LatestNewsProps {
  news: NewsItem[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  const featured = news.slice(0, 2);
  const regular = news.slice(2, 3);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: 'ทั่วไป',
      announcement: 'ประกาศ',
      event: 'กิจกรรม',
      academic: 'วิชาการ',
      sports: 'กีฬา',
    };
    return labels[category] || 'ทั่วไป';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: 'bg-blue-50 text-blue-600 border-blue-100',
      announcement: 'bg-amber-50 text-amber-600 border-amber-100',
      event: 'bg-blue-50 text-blue-600 border-blue-100',
      academic: 'bg-violet-50 text-violet-600 border-violet-100',
      sports: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    };
    return colors[category] || 'bg-blue-50 text-blue-600 border-blue-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="news" className="relative py-24 bg-gray-50 overflow-hidden">
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
            <Newspaper className="w-4 h-4" />
            ข่าวสารและกิจกรรม
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ข่าวสาร
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              ล่าสุด
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ติดตามข่าวสาร กิจกรรม และผลงานของโรงเรียน
          </p>
        </motion.div>

        {/* News Content */}
        {news.length > 0 ? (
          <>
            {/* Featured News — 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {featured.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card overflow-hidden border border-gray-100 hover:shadow-glass-lg transition-all duration-300 group cursor-pointer"
                >
                  <Link href={`/news/${item.id}`} className="block h-full">
                    {/* Thumbnail placeholder */}
                    <div className="relative h-52 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="w-16 h-16 text-primary-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Category badge */}
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)} font-sarabun backdrop-blur-sm`}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="font-sarabun">{formatDate(item.date)}</span>
                      </div>
                      <h3 className="font-kanit text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sarabun text-gray-600 mb-4 line-clamp-2">
                        {item.content || item.excerpt}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                        <span className="font-sarabun text-sm">อ่านเพิ่มเติม</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Regular News — 1 column */}
            {regular.length > 0 && (
              <div className="space-y-6">
                {regular.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 border border-gray-100 hover:shadow-glass-lg transition-all duration-300 group cursor-pointer"
                  >
                     <Link href={`/news/${item.id}`} className="block h-full">
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        <div className="w-32 h-32 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 rounded-xl overflow-hidden flex-shrink-0">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Newspaper className="w-8 h-8 text-primary-200" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)} font-sarabun`}>
                              {getCategoryLabel(item.category)}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span className="font-sarabun">{formatDate(item.date)}</span>
                            </div>
                          </div>
                          <h3 className="font-kanit text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="font-sarabun text-gray-600 mb-3 line-clamp-2">
                            {item.content || item.excerpt}
                          </p>
                          <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                            <span className="font-sarabun text-sm">อ่านเพิ่มเติม</span>
                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 font-sarabun">ไม่พบข่าวสาร</p>
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-600 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-all duration-300 font-sarabun group"
          >
            ดูข่าวทั้งหมด
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
