"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';

const navLinks = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'เกี่ยวกับเรา', href: '/about' },
  { label: 'วิชาการ', href: '/academic' },
  { label: 'ITA', href: '/ita' },
  { label: 'การรับสมัคร', href: '/admissions' },
  { label: 'ข่าวสาร', href: '/news' },
  { label: 'ติดต่อ', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-glass border-b border-white/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300 overflow-hidden">
              <img src="/images/logo.jpg" alt="School Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-kanit text-sm md:text-base font-semibold text-gray-900 leading-tight">
                โรงเรียนประชารัฐพัฒนศึกษา
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 font-sarabun">
                Pracharath Phatthanasueksa School
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50/50 transition-all duration-200 font-sarabun"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://sgs.bopp-obec.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl hover:from-primary-600 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 font-sarabun"
            >
              ระบบภายใน
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/90 backdrop-blur-xl border-t border-white/30"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-xl transition-all duration-200 font-sarabun"
                    >
                      {link.label}
                    </Link>
                </motion.div>
              ))}
              <div className="pt-2">
                <a
                  href="https://sgs.bopp-obec.info/"
                   target="_blank"
                   rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl shadow-lg font-sarabun"
                >
                  ระบบภายใน (SGS / Check-in)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
