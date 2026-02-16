import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
} from 'lucide-react';

const contactDetails = [
  {
    icon: MapPin,
    title: 'ที่อยู่',
    titleEn: 'Address',
    info: 'โรงเรียนประชารัฐพัฒนศึกษา เลขที่ 123 หมู่ 4 ต.ตำบล อ.อำเภอ จ.จังหวัด 12345',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: Phone,
    title: 'โทรศัพท์',
    titleEn: 'Phone',
    info: '0-2XXX-XXXX, 08X-XXX-XXXX',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  {
    icon: Mail,
    title: 'อีเมล',
    titleEn: 'Email',
    info: 'info@pracharath.ac.th',
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-100',
  },
  {
    icon: Clock,
    title: 'เวลาทำการ',
    titleEn: 'Office Hours',
    info: 'จันทร์ – ศุกร์ เวลา 07:30 – 16:30 น.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
];

export default function ContactInfo() {
  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden">
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
            <MessageCircle className="w-4 h-4" />
            ติดต่อเรา
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ช่องทาง
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              การติดต่อ
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            ติดต่อสอบถามข้อมูลเพิ่มเติมได้ตามช่องทางด้านล่าง
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left — Contact Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactDetails.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card p-5 border ${item.borderColor} hover:shadow-glass-lg transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-kanit text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="font-sarabun text-[10px] text-gray-400 mb-1">{item.titleEn}</p>
                    <p className="font-sarabun text-sm text-gray-600 leading-relaxed">{item.info}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Google Maps Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card overflow-hidden border border-gray-100 h-full min-h-[400px]">
              {/* Map placeholder — replace src with actual Google Maps embed URL */}
              <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-primary-50 via-gray-50 to-accent-50">
                {/* Placeholder overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl mb-4">
                    <Navigation className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-kanit text-lg font-bold text-gray-900 mb-1">
                    แผนที่โรงเรียน
                  </h4>
                  <p className="font-sarabun text-sm text-gray-500 mb-4 max-w-xs">
                    โรงเรียนประชารัฐพัฒนศึกษา
                  </p>
                  <p className="font-sarabun text-xs text-gray-400 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100">
                    แทนที่ด้วย Google Maps Embed iframe
                  </p>
                </div>

                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                </div>

                {/* Decorative pin markers */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-primary-400/40 animate-pulse" />
                <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-primary-300/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 rounded-full bg-accent-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
