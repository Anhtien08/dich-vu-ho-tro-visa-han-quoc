import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/visaData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F3F5FF] border-b border-[#E2E8F0]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-[#30359A] tracking-wider uppercase mb-2">
            GIẢI ĐÁP PHÁP LÝ & KINH NGHIỆM
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161984] tracking-tight mb-3">
            Những Câu Hỏi Thường Gặp Về Visa Hàn Quốc
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tổng hợp các thắc mắc phổ biến nhất về thủ tục chứng minh tài chính, điều kiện cấp visa và quy chế KVAC.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi (ví dụ: hộ chiếu trắng, tài chính, phỏng vấn...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 text-xs sm:text-sm text-[#25283D] focus:outline-none focus:border-[#454BC0]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'general', label: 'Quy định chung' },
              { id: 'financial', label: 'Tài chính' },
              { id: 'kvac', label: 'Nộp KVAC' },
              { id: 'interview', label: 'Phỏng vấn' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#30359A] text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:text-[#30359A] border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions matching spec:
            "Inactive state features #F3F5FF background with flush hidden borders.
             Active state features white background, 1px solid #30359A, and smooth height expansion." */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border border-[#30359A] shadow-sm'
                    : 'bg-[#EAEFFF] hover:bg-[#E3E8FC] border border-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-[#161984]' : 'text-slate-800'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#30359A]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
