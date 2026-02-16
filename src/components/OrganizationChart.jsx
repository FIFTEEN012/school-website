import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Crown, Users, Building2, Loader2, AlertCircle } from 'lucide-react';
import { fetchPersonnel } from '../supabase';

// Static fallback data
const fallbackDirector = {
  name: 'นาย/นาง ชื่อ นามสกุล',
  position: 'ผู้อำนวยการโรงเรียน',
  positionEn: 'School Director',
};

const fallbackBoardMembers = [
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'ประธานกรรมการสถานศึกษา', positionEn: 'Chairman' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'กรรมการผู้ทรงคุณวุฒิ', positionEn: 'Expert Member' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนผู้ปกครอง', positionEn: 'Parent Rep.' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนครู', positionEn: 'Teacher Rep.' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนชุมชน', positionEn: 'Community Rep.' },
];

const fallbackExecutiveTeam = [
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายวิชาการ', positionEn: 'Deputy Dir. Academic', color: 'from-blue-500 to-blue-600' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายบริหาร', positionEn: 'Deputy Dir. Admin', color: 'from-emerald-500 to-emerald-600' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายบุคคล', positionEn: 'Deputy Dir. Personnel', color: 'from-violet-500 to-violet-600' },
  { name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายงบประมาณ', positionEn: 'Deputy Dir. Budget', color: 'from-amber-500 to-amber-600' },
];

function PersonCard({ name, position, positionEn, isDirector, color, photoUrl }) {
  const gradientColor = color || 'from-primary-500 to-primary-700';
  return (
    <div
      className={`glass-card p-5 text-center hover:shadow-glass-lg transition-all duration-300 group ${
        isDirector ? 'border-2 border-primary-200' : 'border border-gray-100'
      }`}
    >
      {/* Photo */}
      <div
        className={`w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden shadow-md ${
          isDirector
            ? 'ring-4 ring-primary-100'
            : ''
        } group-hover:scale-105 transition-transform duration-300`}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
            {isDirector ? (
              <Crown className="w-7 h-7 text-white" />
            ) : (
              <User className="w-7 h-7 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <p className="font-kanit text-sm font-bold text-gray-900 mb-0.5 leading-tight">
        {name}
      </p>
      <p className="font-sarabun text-xs text-primary-600 font-medium mb-0.5">
        {position}
      </p>
      <p className="font-sarabun text-[10px] text-gray-400">
        {positionEn}
      </p>
    </div>
  );
}

export default function OrganizationChart() {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPersonnel = async () => {
      try {
        const data = await fetchPersonnel();
        setPersonnel(data);
      } catch (err) {
        console.error('Error fetching personnel:', err);
        setError('ไม่สามารถโหลดข้อมูลบุคลากรได้');
      } finally {
        setLoading(false);
      }
    };

    loadPersonnel();
  }, []);

  // Process personnel data
  const director = personnel.find(p => p.position.toLowerCase().includes('ผู้อำนวยการ')) || fallbackDirector;
  const boardMembers = personnel.filter(p => 
    p.position.toLowerCase().includes('กรรมการ') || 
    p.position.toLowerCase().includes('ประธาน')
  ).slice(0, 5) || fallbackBoardMembers;
  const executiveTeam = personnel.filter(p => 
    p.position.toLowerCase().includes('รองผู้อำนวยการ')
  ).slice(0, 4) || fallbackExecutiveTeam;
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-50/30 rounded-full blur-3xl" />

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
            <Building2 className="w-4 h-4" />
            โครงสร้างองค์กร
          </span>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            โครงสร้าง
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              การบริหาร
            </span>
          </h2>
          <p className="font-sarabun text-gray-500 max-w-xl mx-auto">
            คณะกรรมการสถานศึกษาและทีมบริหารที่ขับเคลื่อนโรงเรียนสู่ความสำเร็จ
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            <span className="ml-2 text-gray-500 font-sarabun">กำลังโหลดข้อมูลบุคลากร...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-16">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="ml-2 text-red-500 font-sarabun">{error}</span>
          </div>
        )}

        {/* Organization Content */}
        {!loading && !error && (
          <>
            {/* Director — Top of Tree */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <div className="w-full max-w-xs">
                <PersonCard
                  name={director.name}
                  position={director.position}
                  positionEn={director.positionEn}
                  isDirector
                  photoUrl={director.photo_url}
                />
              </div>
            </motion.div>

        {/* Connector line */}
        <div className="flex justify-center mb-4">
          <div className="w-px h-10 bg-gradient-to-b from-primary-300 to-primary-100" />
        </div>

        {/* Split into two branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Branch — School Board */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Branch Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-kanit text-lg font-bold text-gray-900">
                  คณะกรรมการสถานศึกษา
                </h3>
                <p className="font-sarabun text-xs text-gray-500">School Board Committee</p>
              </div>
            </div>

            {/* Board Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={`board-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                >
                  <PersonCard
                    name={member.name}
                    position={member.position}
                    positionEn={member.position_en || member.positionEn}
                    color="from-indigo-400 to-indigo-500"
                    photoUrl={member.photo_url}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Branch — Executive Team */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Branch Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-kanit text-lg font-bold text-gray-900">
                  ทีมบริหาร
                </h3>
                <p className="font-sarabun text-xs text-gray-500">Executive Team</p>
              </div>
            </div>

            {/* Executive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {executiveTeam.map((member, index) => (
                <motion.div
                  key={`exec-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                >
                  <PersonCard
                    name={member.name}
                    position={member.position}
                    positionEn={member.position_en || member.positionEn}
                    color={member.color}
                    photoUrl={member.photo_url}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
          </>
        )}
      </div>
    </section>
  );
}
