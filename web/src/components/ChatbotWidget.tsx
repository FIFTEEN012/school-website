'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  type?: 'text' | 'link';
  href?: string;
}

const FAQ_CHIPS = [
  { label: 'ค่าเทอม', value: 'tuition' },
  { label: 'ติดต่อธุรการ', value: 'contact' },
  { label: 'แผนที่โรงเรียน', value: 'map' },
  { label: 'การรับสมัคร', value: 'admission' },
  { label: 'ปฏิทินวิชาการ', value: 'calendar' },
];

const KEYWORD_RESPONSES: Record<string, { text: string; href?: string }> = {
  tuition: {
    text: 'ท่านสามารถดูรายละเอียดค่าธรรมเนียมการศึกษาได้ที่หน้า "ค่าธรรมเนียม" ครับ',
    href: '/#tuition',
  },
  contact: {
    text: 'สามารถติดต่อห้องธุรการได้ที่เบอร์ 02-XXX-XXXX หรือดูข้อมูลเพิ่มเติมที่หน้า "ติดต่อเรา" ครับ',
    href: '/#contact',
  },
  map: {
    text: 'โรงเรียนของเราตั้งอยู่ที่ ... สามารถดูแผนที่ Google Maps ได้ที่หน้า "ติดต่อเรา" ครับ',
    href: '/#contact',
  },
  admission: {
    text: 'สำหรับการรับสมัครนักเรียนใหม่ ดูขั้นตอนและระเบียบการได้ที่หน้า "การรับสมัคร" ครับ',
    href: '/#admission',
  },
  calendar: {
    text: 'ปฏิทินกิจกรรมและการสอบ สามารถดูได้ที่ส่วน "ปฏิทินวิชาการ" ครับ',
    href: '/#calendar',
  },
  recruit: {
    text: 'กำลังมองหาข้อมูลการรับสมัครใช่ไหมครับ? ดูรายละเอียดได้ที่นี่เลยครับ',
    href: '/#admission',
  },
  hello: {
    text: 'สวัสดีครับ! มีอะไรให้ผมช่วยไหมครับ? เลือกหัวข้อด้านล่างหรือพิมพ์คำถามได้เลยครับ',
  },
  hi: {
    text: 'สวัสดีครับ! ยินดีต้อนรับสู่เว็บไซต์โรงเรียนประชารัฐครับ',
  },
  default: {
    text: 'ขออภัยครับ ผมไม่แน่ใจว่าเข้าใจคำถามของท่านถูกต้องไหม ท่านสามารถดูข้อมูลเพิ่มเติมหรือส่งข้อความหาเจ้าหน้าที่ได้ที่หน้า "ติดต่อเรา" ครับ',
    href: '/#contact',
  },
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'สวัสดีครับ 🙏 ผมเป็นน้องบอทผู้ช่วยอัจฉริยะ ยินดีให้บริการครับ! มีอะไรให้ช่วยสอบถามได้เลยนะครับ',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate Bot Response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseKey = 'default';

      // Simple keyword matching
      if (lowerText.includes('ค่าเทอม') || lowerText.includes('ราคา') || lowerText.includes('จ่ายเงิน')) responseKey = 'tuition';
      else if (lowerText.includes('ติดต่อ') || lowerText.includes('โทร') || lowerText.includes('เบอร์')) responseKey = 'contact';
      else if (lowerText.includes('แผนที่') || lowerText.includes('ที่ตั้ง') || lowerText.includes('ทางไป')) responseKey = 'map';
      else if (lowerText.includes('สมัคร') || lowerText.includes('เข้าเรียน') || lowerText.includes('admission')) responseKey = 'admission';
      else if (lowerText.includes('ปฏิทิน') || lowerText.includes('สอบ') || lowerText.includes('ปิดเทอม')) responseKey = 'calendar';
      else if (lowerText.includes('สวัสดี') || lowerText.includes('หวัดดี') || lowerText.includes('hi') || lowerText.includes('hello')) responseKey = 'hello';
      else if (KEYWORD_RESPONSES[lowerText]) responseKey = lowerText;

      const response = KEYWORD_RESPONSES[responseKey] || KEYWORD_RESPONSES['default'];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        type: response.href ? 'link' : 'text',
        href: response.href,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden font-sarabun"
          >
            {/* Header */}
            <div className="bg-primary-600 p-4 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-kanit font-bold text-lg">น้องบอทผู้ช่วย</h3>
                  <p className="text-xs text-primary-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    ออนไลน์พร้อมตอบคำถาม
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-accent-100 text-accent-600'}`}>
                      {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.type === 'link' && msg.href && (
                        <Link
                          href={msg.href}
                          className="mt-2 inline-block px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-semibold underline decoration-dotted underline-offset-2 transition-colors"
                        >
                          ไปที่หน้านี้ &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chips & Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Quick Suggestion Chips */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar fading-edge">
                {FAQ_CHIPS.map((chip) => (
                  <button
                    key={chip.value}
                    onClick={() => handleSendMessage(chip.label)}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-600 text-xs rounded-full border border-gray-200 transition-colors"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Input Field */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="พิมพ์คำถามของคุณ..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-primary-300 focus:ring-0 rounded-xl text-sm transition-all"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-colors ${
          isOpen ? 'bg-gray-200 text-gray-600' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/30'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>
    </>
  );
}
