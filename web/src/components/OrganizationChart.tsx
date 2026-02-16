"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Crown, Users, Building2, Loader2, AlertCircle } from 'lucide-react';

interface Personnel {
  id: string;
  name: string;
  position: string;
  position_en?: string;
  rank?: number;
  photo_url?: string;
  is_active?: boolean;
  color?: string;
  department?: string; // Added department field
}

interface OrganizationChartProps {
  personnel: Personnel[];
}

// Static fallback data
// Static fallback data
const fallbackDirector = {
  id: 'director-fallback',
  name: 'นาย/นาง ชื่อ นามสกุล',
  position: 'ผู้อำนวยการโรงเรียน',
  positionEn: 'School Director',
};

const fallbackBoardMembers = [
  { id: 'board-1', name: 'นาย/นาง ชื่อ นามสกุล', position: 'ประธานกรรมการสถานศึกษา', positionEn: 'Chairman' },
  { id: 'board-2', name: 'นาย/นาง ชื่อ นามสกุล', position: 'กรรมการผู้ทรงคุณวุฒิ', positionEn: 'Expert Member' },
  { id: 'board-3', name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนผู้ปกครอง', positionEn: 'Parent Rep.' },
  { id: 'board-4', name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนครู', positionEn: 'Teacher Rep.' },
  { id: 'board-5', name: 'นาย/นาง ชื่อ นามสกุล', position: 'ผู้แทนชุมชน', positionEn: 'Community Rep.' },
];

const fallbackExecutiveTeam = [
  { id: 'exec-1', name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายวิชาการ', positionEn: 'Deputy Dir. Academic', color: 'from-blue-500 to-blue-600' },
  { id: 'exec-2', name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายบริหาร', positionEn: 'Deputy Dir. Admin', color: 'from-emerald-500 to-emerald-600' },
  { id: 'exec-3', name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายบุคคล', positionEn: 'Deputy Dir. Personnel', color: 'from-violet-500 to-violet-600' },
  { id: 'exec-4', name: 'นาย/นาง ชื่อ นามสกุล', position: 'รองผู้อำนวยการฝ่ายงบประมาณ', positionEn: 'Deputy Dir. Budget', color: 'from-amber-500 to-amber-600' },
];

function PersonCard({ id, name, position, positionEn, isDirector, color, photoUrl }: any) {
  const gradientColor = color || 'from-primary-500 to-primary-700';
  
  return (
    <div
      className={`glass-card p-5 text-center hover:shadow-glass-lg transition-all duration-300 group relative ${
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

export default function OrganizationChart({ personnel }: OrganizationChartProps) {
  // Process personnel data
  
  // 1. Find Director (Admin department, contains "Director" but not "Deputy" - or explicitly by Rank 1/Head)
  // We keep the string check for safety, but prioritize department 'admin'
  const director = personnel.find(p => 
    p.department === 'admin' && 
    p.position.includes('ผู้อำนวยการ') && 
    !p.position.includes('รอง')
  ) || personnel.find(p => p.rank === 0) || fallbackDirector;
  
  // 2. Board Members (Department = 'board')
  const boardMembers = personnel.filter(p => p.department === 'board');
  const displayBoardMembers = boardMembers.length > 0 ? boardMembers : fallbackBoardMembers;

  // 3. Executive Team (Department = 'admin', excluding the Director found above)
  const executiveTeam = personnel.filter(p => 
    p.department === 'admin' && 
    p.id !== director.id
  );
  const displayExecutiveTeam = executiveTeam.length > 0 ? executiveTeam : fallbackExecutiveTeam;

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

        {/* Organization Content */}
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
                    // @ts-ignore
                    positionEn={director.position_en || director.positionEn}
                    isDirector
                    // @ts-ignore
                    photoUrl={director.photo_url}
                    id={director.id}
                  />
              </div>
            </motion.div>

        {/* Connector line */}
        <div className="flex justify-center mb-4">
          <div className="w-px h-10 bg-gradient-to-b from-primary-300 to-primary-100" />
        </div>

        {/* Executive Team - Second Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          {/* Section Header */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-kanit text-xl font-bold text-gray-900">
                ทีมบริหาร
              </h3>
              <p className="font-sarabun text-sm text-gray-500">Executive Team</p>
            </div>
          </div>

          {/* Executive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {displayExecutiveTeam.map((member, index) => (
              <motion.div
                key={`exec-${index}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
              >
                <PersonCard
                  name={member.name}
                  position={member.position}
                  // @ts-ignore
                  positionEn={member.position_en || member.positionEn}
                  // @ts-ignore
                  color={member.color}
                  // @ts-ignore
                  photoUrl={member.photo_url}
                  id={member.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connector line */}
        <div className="flex justify-center mb-4">
          <div className="w-px h-10 bg-gradient-to-b from-primary-100 to-indigo-200" />
        </div>

        {/* School Board - Third Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-kanit text-xl font-bold text-gray-900">
                คณะกรรมการสถานศึกษา
              </h3>
              <p className="font-sarabun text-sm text-gray-500">School Board Committee</p>
            </div>
          </div>

          {/* Board Chairman */}
          {(() => {
            const chairmanIndex = displayBoardMembers.findIndex(p => p.position.includes('ประธาน'));
            const chairman = chairmanIndex !== -1 ? displayBoardMembers[chairmanIndex] : null;
            const otherMembers = chairmanIndex !== -1 
              ? displayBoardMembers.filter((_, i) => i !== chairmanIndex)
              : displayBoardMembers;

            return (
              <>
                {chairman && (
                  <div className="flex justify-center mb-8">
                    <div className="w-full max-w-xs">
                      <PersonCard
                        name={chairman.name}
                        position={chairman.position}
                        // @ts-ignore
                        positionEn={chairman.position_en || chairman.positionEn}
                        color="from-indigo-500 to-indigo-700"
                        // @ts-ignore
                        photoUrl={chairman.photo_url}
                        id={chairman.id}
                        isDirector={true} // Re-use director styling for prominence
                      />
                    </div>
                  </div>
                )}

                {/* Board Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 justify-center">
                  {otherMembers.map((member, index) => (
                    <motion.div
                      key={`board-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                    >
                      <PersonCard
                        name={member.name}
                        position={member.position}
                        // @ts-ignore
                        positionEn={member.position_en || member.positionEn}
                        color="from-indigo-400 to-indigo-500"
                        // @ts-ignore
                        photoUrl={member.photo_url}
                        id={member.id}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            );
          })()}
        </motion.div>
        </>
      </div>
    </section>
  );
}
