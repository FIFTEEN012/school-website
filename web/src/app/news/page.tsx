import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';

export const metadata = {
  title: 'ข่าวสารและประกาศ | โรงเรียนประชารัฐพัฒนศึกษา',
  description: 'ข่าวสาร ประกาศ และกิจกรรมล่าสุดของโรงเรียนประชารัฐพัฒนศึกษา',
};

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from('news_announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const allNews = news || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24 font-sarabun">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            ข่าวและประกาศ
          </span>
          <h1 className="font-kanit text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ข่าวสารและ
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              ประกาศ
            </span>
          </h1>
          <p className="font-sarabun text-lg text-gray-600 max-w-2xl mx-auto">
            ติดตามข่าวสาร กิจกรรม และประกาศล่าสุดจากโรงเรียนประชารัฐพัฒนศึกษา
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {allNews.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-kanit text-xl font-semibold text-gray-500">ยังไม่มีข่าวสารในขณะนี้</h3>
            <p className="text-gray-400 mt-2">กรุณากลับมาเยี่ยมชมอีกครั้ง</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <Newspaper className="w-12 h-12 text-orange-200" />
                    </div>
                  )}
                  {item.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-orange-600 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-kanit font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{item.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.publish_date || item.created_at
                        ? new Date(item.publish_date || item.created_at).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'ไม่ระบุวันที่'}
                    </div>
                    <span className="text-xs font-medium text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                      อ่านเพิ่มเติม
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
