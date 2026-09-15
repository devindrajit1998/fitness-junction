'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatWidgetProps {
  onOpenModal?: (context?: string) => void;
}

export default function ChatWidget({ onOpenModal }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Welcome to THE FITNESS JUNCTION Barasat! 👋 How can we help you with your fitness journey today?',
    },
  ]);
  const [customInput, setCustomInput] = useState('');

  const quickReplies = [
    { label: 'Gym Services', answer: 'We offer regular gym/strength training, CrossFit, personal training, cardio fitness, and diet counselling in Barasat!' },
    { label: 'Timings & Days', answer: 'THE FITNESS JUNCTION is open all 7 days from 06:00 AM to 10:00 PM.' },
    { label: 'Gym Location', answer: 'Beside Monorama Ultrascan Pvt. Ltd., C.B. Road, Lalpur, Barasat, West Bengal 741222. Call +91 82408 55067.' },
    { label: 'Book a Consultation', answer: 'Great! Click below to request a free fitness consultation or join.', isAction: true },
  ];

  const handleQuickReply = (item: typeof quickReplies[0]) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: item.label },
      { sender: 'bot', text: item.answer },
    ]);
    if (item.isAction && onOpenModal) {
      setTimeout(() => {
        onOpenModal('THE FITNESS JUNCTION Consultation Pass');
      }, 600);
    }
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const userText = customInput;
    setCustomInput('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'bot',
        text: "Thanks for reaching out! You can call us directly at +91 82408 55067 or drop your number and we'll connect with you.",
      },
    ]);
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="THE FITNESS JUNCTION Chat Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#6EFF8F] text-[#050505] shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 border-2 border-[#050505]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[360px] bg-[#050505] border border-[#6EFF8F]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-['Rubik',sans-serif]">
          {/* Chat Header */}
          <div className="bg-[#101520] p-4 border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#6EFF8F] animate-pulse" />
              <div>
                <h4 className="font-['Rajdhani',sans-serif] font-bold text-base text-white uppercase">
                  THE FITNESS JUNCTION Desk
                </h4>
                <p className="text-[11px] text-[#A3A3A3]">Barasat | 06:00 AM - 10:00 PM</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A3A3A3] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-1 max-h-[300px] overflow-y-auto space-y-3 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-xl ${
                    m.sender === 'user'
                      ? 'bg-[#6EFF8F] text-[#050505] font-medium rounded-tr-none'
                      : 'bg-[#1C2333] border border-[#242424] text-gray-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reply Chips */}
          <div className="p-3 bg-[#131824] border-t border-[#242424]/80 flex flex-wrap gap-1.5">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickReply(qr)}
                className="text-[11px] bg-[#1C2333] hover:bg-[#6EFF8F] hover:text-[#050505] text-[#A3A3A3] font-medium px-2.5 py-1.5 rounded-full border border-[#242424] transition-colors whitespace-nowrap"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendCustom} className="p-2.5 bg-[#101520] border-t border-[#242424] flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-[#050505] border border-[#242424] rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
            />
            <button
              type="submit"
              className="p-2 bg-[#6EFF8F] text-[#050505] rounded-lg hover:bg-[#50D878] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
