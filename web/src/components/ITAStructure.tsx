'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Users, 
  Briefcase, 
  DollarSign, 
  Search,
  BookOpen,
  Award,
  X,
  ChevronRight
} from 'lucide-react';

const itaTopics = [
  {
    title: 'การบริหารงานและการใช้จ่ายงบประมาณ',
    titleEn: 'Administration and Budget',
    icon: DollarSign,
    color: 'bg-blue-100 text-blue-600',
    description: 'ข้อมูลเกี่ยวกับการวางแผนและการใช้จ่ายงบประมาณประจำปี',
    items: [
        { name: 'แผนกลยุทธ์หรือแผนพัฒนาคุณภาพการศึกษาของสถานศึกษา', url: '/ita/แผน.pdf' },
        { name: 'แผนปฏิบัติและความก้าวหน้าในการดำเนินงานและการใช้งบประมาณประจำปี', url: '/ita/แผน68.pdf' },
        { name: 'คู่มือหรือแนวทางการปฏิบัติงานของครูและบุคลากรทางการศึกษา', url: '/ita/คู่มือครู.pdf' },
    ]
  },
  {
    title: 'การจัดซื้อจัดจ้าง',
    titleEn: 'Procurement',
    icon: Briefcase,
    color: 'bg-emerald-100 text-emerald-600',
    description: 'ประกาศและผลการจัดซื้อจัดจ้างของสถานศึกษา',
    items: [
        { name: 'รายการการจัดซื้อจัดจ้างหรือการจัดหาพัสดุและความก้าวหน้า ประจำปีงบประมาณ พ.ศ.2568', url: '/ita/example.pdf' },
        { name: 'รายงานผลการจัดซื้อจัดจ้างหรือการจัดหาพัสดุประจำปีงบประมาณ พ.ศ.2567', url: '/ita/example.pdf' },
    ]
  },
  {
    title: 'การบริหารและพัฒนาทรัพยากรบุคคล',
    titleEn: 'HR Management',
    icon: Users,
    color: 'bg-violet-100 text-violet-600',
    description: 'นโยบายและหลักเกณฑ์การบริหารทรัพยากรบุคคล',
    items: [
        { name: 'แผนการบริหารและพัฒนาทรัพยากรบุคคล', url: '/ita/example.pdf' },
        { name: 'ประมวลจริยธรรมและการขับเคลื่อนจริยธรรม', url: '/ita/example.pdf' },
    ]
  },
  {
    title: 'การส่งเสริมความโปร่งใส',
    titleEn: 'Promoting Transparency',
    icon: Search,
    color: 'bg-amber-100 text-amber-600',
    description: 'แนวทางและมาตรการส่งเสริมความโปร่งใสในหน่วยงาน',
    items: [
        { name: 'แนวปฏิบัติการจัดการเรื่องร้องเรียนการทุจริตและประพฤติมิชอบ', url: '/ita/example.pdf' },
        { name: 'ช่องทางแจ้งเรื่องร้องเรียนการทุจริตและประพฤติมิชอบ', url: '/ita/example.pdf' },
    ]
  },
  {
    title: 'การดำเนินการเพื่อป้องกันการทุจริตในประเด็นสินบน',
    titleEn: 'Bribery Prevention',
    icon: Shield,
    color: 'bg-rose-100 text-rose-600',
    description: 'มาตรการป้องกันการทุจริตและประพฤติมิชอบ',
    items: [
        { name: 'ประกาศเจตนารมณ์และการสร้างวัฒนธรรม ตามนโยบาย No Gift Policy จากการปฏิบัติหน้าที่', url: '/ita/example.pdf' },
        { name: 'การประเมินความเสี่ยงที่อาจเกิดการให้หรือรับสินบนจากการดำเนินงานตามภารกิจของสถานศึกษา ประจำปีงบประมาณ พ.ศ.2568', url: '/ita/example.pdf' },
    ]
  },
  {
    title: 'การส่งเสริมคุณธรรมและความโปร่งใส',
    titleEn: 'Integrity Promotion',
    icon: Award,
    color: 'bg-cyan-100 text-cyan-600',
    description: 'กิจกรรมส่งเสริมคุณธรรม จริยธรรม และความโปร่งใส',
    items: [
        { name: 'แนวทาง/โครงการ/กิจกรรมการป้องกันการทุจริต', url: '/ita/example.pdf' },
        { name: 'มาตรการส่งเสริมคุณธรรมและความโปร่งใสภายในหน่วยงาน', url: '/ita/example.pdf' },
    ]
  },
];

export default function ITAStructure() {
  const [selectedPdf, setSelectedPdf] = React.useState<string | null>(null);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-3 font-sarabun">
             ความโปร่งใสและคุณธรรม
          </span>
          <h2 className="text-3xl font-bold font-kanit text-gray-900 mb-4">
            การประเมินคุณธรรมและความโปร่งใส (ITA)
          </h2>
          <p className="text-gray-500 font-sarabun max-w-2xl mx-auto">
            โครงสร้างข้อมูลการเปิดเผยข้อมูลสาธารณะตามเกณฑ์การประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของสถานศึกษา
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itaTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center flex-shrink-0`}>
                    <topic.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold font-kanit text-gray-900 leading-tight">
                        {topic.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mt-1">
                        {topic.titleEn}
                    </p>
                </div>
              </div>
              
              <div className="flex-grow space-y-3 mt-2">
                {topic.items.map((item, idx) => (
                    <a 
                        key={idx}
                        href={item.url}
                        target={item.url === '#' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                        onClick={(e) => {
                            if (item.url === '#') {
                                e.preventDefault();
                            } else if (item.url.endsWith('.pdf')) {
                                e.preventDefault();
                                setSelectedPdf(item.url);
                            }
                        }}
                    >
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-sarabun leading-relaxed">
                            {item.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                <h3 className="text-lg font-bold font-kanit text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  เอกสารแนบ
                </h3>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-grow bg-gray-100 p-1">
                <iframe
                  src={`${selectedPdf}#toolbar=0`}
                  className="w-full h-full rounded-b-xl"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
