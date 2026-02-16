import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Metadata } from 'next';

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: news } = await supabase
    .from('news_announcements')
    .select('title, content')
    .eq('id', id)
    .single();

  if (!news) {
    return {
      title: 'News Not Found',
    };
  }

  return {
    title: `${news.title} - Your School Name`,
    description: news.content?.substring(0, 160) || '',
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: news } = await supabase
    .from('news_announcements')
    .select('*')
    .eq('id', id)
    .single();

  if (!news) {
    notFound();
  }

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

  return (
    <article className="min-h-screen bg-white pb-20 pt-24 font-sarabun">
      {/* Hero Image / Banner */}
      {news.image_url && (
        <div className="w-full h-[400px] relative mb-8 bg-gray-100">
           <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Back Link */}
          <Link 
            href="/#news" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้าข่าวสาร
          </Link>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(news.category)} flex items-center gap-1`}>
              <Tag className="w-3 h-3" />
              {getCategoryLabel(news.category)}
            </span>
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(news.date).toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {news.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-600 font-sarabun leading-relaxed whitespace-pre-wrap">
            {news.content}
          </div>

          {/* Share / Footer Section could go here */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
             <Link 
                href="/#news" 
                className="text-gray-500 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                &larr; กลับไปอ่านข่าวอื่น
             </Link>
          </div>

        </div>
      </div>
    </article>
  );
}
