'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FileText, Download, ShieldCheck, TrendingUp } from 'lucide-react';

const budgetData = [
  { name: 'วิชาการ & การเรียนการสอน', value: 40, color: '#4F46E5' }, // Indigo
  { name: 'อาคารสถานที่ & สาธารณูปโภค', value: 30, color: '#10B981' }, // Emerald
  { name: 'กิจกรรมพัฒนาผู้เรียน', value: 20, color: '#F59E0B' }, // Amber
  { name: 'บริหารจัดการ & บุคลากร', value: 10, color: '#EF4444' }, // Red
];

const documents = [
  { id: 1, title: 'รายงานงบประมาณประจำปี 2567', date: '15/01/2567', size: '2.4 MB' },
  { id: 2, title: 'สรุปการจัดซื้อจัดจ้าง ไตรมาส 1/2567', date: '10/01/2567', size: '1.8 MB' },
  { id: 3, title: 'แผนปฏิบัติการประจำปี 2567', date: '05/01/2567', size: '3.5 MB' },
  { id: 4, title: 'รายงานการเงิน ปี 2566', date: '20/12/2566', size: '4.2 MB' },
  { id: 5, title: 'นโยบายความโปร่งใสและตรวจสอบได้', date: '01/12/2566', size: '1.2 MB' },
];

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24 font-sarabun">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              ความโปร่งใสและการตรวจสอบ
            </span>
            <h1 className="font-kanit text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              งบประมาณและ
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ความโปร่งใส
              </span>
            </h1>
            <p className="font-sarabun text-lg text-gray-600 max-w-2xl mx-auto">
              โรงเรียนประชารัฐมุ่งเน้นการบริหารงานที่โปร่งใส ตรวจสอบได้
              และเปิดเผยข้อมูลการใช้งบประมาณอย่างตรงไปตรงมาเพื่อประโยชน์สูงสุดของผู้เรียน
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Budget Allocation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Chart */}
              <div className="w-full lg:w-1/2 h-[400px]">
                <h3 className="font-kanit text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-indigo-500" />
                  สัดส่วนงบประมาณประจำปี 2567
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => `${value}%`}
                    />
                    <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ fontFamily: 'Sarabun', fontSize: '14px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Cards */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {budgetData.map((item, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-3 h-12 rounded-full" style={{ backgroundColor: item.color }} />
                            <div>
                                <span className="text-3xl font-bold font-kanit text-gray-900">{item.value}%</span>
                                <p className="text-sm text-gray-500">งบประมาณ</p>
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-700">{item.name}</h4>
                    </div>
                 ))}
              </div>
            </div>
            
            {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Downloads Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h3 className="font-kanit text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                เอกสารเผยแพร่และดาวน์โหลด
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                        <div key={doc.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{doc.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span>อัพเดท: {doc.date}</span>
                                        <span>•</span>
                                        <span>ขนาด: {doc.size}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-600 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                ดาวน์โหลด
                            </button>
                        </div>
                    ))}
                </div>
                 <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-primary-600 text-sm font-medium hover:underline">
                        ดูเอกสารย้อนหลังทั้งหมด &rarr;
                    </button>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
