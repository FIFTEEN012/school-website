import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  Globe,
  ExternalLink,
  Heart,
} from 'lucide-react';

const quickLinks = [
  { label: 'เกี่ยวกับเรา', href: '#about' },
  { label: 'หลักสูตร', href: '#academic' },
  { label: 'การรับสมัคร', href: '#admissions' },
  { label: 'ข่าวสาร', href: '#news' },
  { label: 'ติดต่อเรา', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', color: 'hover:bg-blue-600' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com', color: 'hover:bg-red-600' },
  { icon: Globe, label: 'Website', href: '#', color: 'hover:bg-green-600' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Column 1: School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-kanit text-white text-sm font-semibold leading-tight">
                  โรงเรียนประชาราษฎร์พัฒนาศึกษา
                </h3>
                <p className="text-xs text-gray-500">
                  Pracharath Phatthanasueksa School
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              สถานศึกษาที่มุ่งมั่นพัฒนาผู้เรียนให้มีคุณภาพ ทั้งด้านวิชาการ คุณธรรม และทักษะชีวิต เพื่อเตรียมความพร้อมสู่อนาคต
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-kanit text-white text-base font-semibold mb-5">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-kanit text-white text-base font-semibold mb-5">
              ข้อมูลติดต่อ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  123 ถ.ตัวอย่าง ต.ตัวอย่าง อ.ตัวอย่าง จ.ตัวอย่าง 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:0-2xxx-xxxx" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  0-2XXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@pracharath.ac.th" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  info@pracharath.ac.th
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  จันทร์ – ศุกร์: 07:30 – 16:30 น.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Internal Portal */}
          <div>
            <h4 className="font-kanit text-white text-base font-semibold mb-5">
              ระบบภายใน
            </h4>
            <div className="space-y-3">
              <a
                href="#sgs"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    SGS ระบบจัดการโรงเรียน
                  </p>
                  <p className="text-xs text-gray-500">School Grading System</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href="#checkin"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    ระบบเช็คชื่อ
                  </p>
                  <p className="text-xs text-gray-500">Check-in System</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href="#staff"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    ระบบบุคลากร
                  </p>
                  <p className="text-xs text-gray-500">Staff Portal</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} โรงเรียนประชาราษฎร์พัฒนาศึกษา — สงวนลิขสิทธิ์ทุกประการ
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            สร้างด้วย <Heart className="w-3 h-3 text-red-500" /> เพื่อการศึกษาไทย
          </p>
        </div>
      </div>
    </footer>
  );
}
