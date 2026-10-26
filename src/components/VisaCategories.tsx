import React, { useState } from 'react';
import { VISA_CATEGORIES } from '../data/visaData';
import { VisaCategory, VisaCategoryCode } from '../types/visa';
import { Plane, GraduationCap, Briefcase, HeartHandshake, Building2, Clock, CheckCircle2, ChevronRight, FileCheck } from 'lucide-react';

interface VisaCategoriesProps {
  onSelectCategory: (category: VisaCategory) => void;
  onOpenConsultationWithCategory: (code: VisaCategoryCode) => void;
}

export const VisaCategories: React.FC<VisaCategoriesProps> = ({
  onSelectCategory,
  onOpenConsultationWithCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getCategoryIcon = (code: VisaCategoryCode) => {
    switch (code) {
      case 'C-3-9':
        return <Plane className="w-6 h-6 text-[#454BC0]" />;
      case 'D-2':
        return <GraduationCap className="w-6 h-6 text-[#454BC0]" />;
      case 'C-3-4':
        return <Building2 className="w-6 h-6 text-[#454BC0]" />;
      default:
        return <FileCheck className="w-6 h-6 text-[#454BC0]" />;
    }
  };

  const filteredCategories = VISA_CATEGORIES.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'travel') return cat.code === 'C-3-9';
    if (activeFilter === 'study') return cat.code === 'D-2';
    if (activeFilter === 'business') return cat.code === 'C-3-4';
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E2E8F0] gap-4">
          <div>
            <div className="text-xs font-bold text-[#30359A] tracking-wider uppercase mb-2">
              DANH MỤC THỊ THỰC HÀN QUỐC
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161984] tracking-tight">
              Dịch Vụ Tư Vấn Visa Hàn Quốc Trọng Điểm
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Tập trung chuyên sâu vào các diện Visa du lịch, du học và thương mại công tác với tỉ lệ hồ sơ đạt phê duyệt cao nhất.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F3F5FF] rounded-xl mb-8 overflow-x-auto scrollbar-none max-w-full">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#30359A] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#30359A]'
            }`}
          >
            Tất Cả ({VISA_CATEGORIES.length})
          </button>
          <button
            onClick={() => setActiveFilter('travel')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'travel'
                ? 'bg-[#30359A] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#30359A]'
            }`}
          >
            C-3-9 Du Lịch Tự Túc
          </button>
          <button
            onClick={() => setActiveFilter('study')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'study'
                ? 'bg-[#30359A] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#30359A]'
            }`}
          >
            D-2 / D-4 Du Học Chính Quy
          </button>
          <button
            onClick={() => setActiveFilter('business')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'business'
                ? 'bg-[#30359A] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#30359A]'
            }`}
          >
            C-3-4 Thương Mại & Công Tác
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#454BC0] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_24px_-6px_rgba(48,53,154,0.09)] flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon Well + Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-xl bg-[#F3F5FF] flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(category.code)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F3F5FF] text-[#30359A] border border-[#454BC0]/20 font-mono">
                      Mã: {category.code}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#ED1B36]/10 text-[#ED1B36] border border-[#ED1B36]/20">
                      Đậu {category.passRate}
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-bold text-[#161984] group-hover:text-[#30359A] transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {category.shortDesc}
                </p>

                {/* Metadata details */}
                <div className="bg-[#F8F9FE] rounded-xl p-3.5 border border-slate-100 mb-4 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#30359A]" /> Thời gian xét duyệt:
                    </span>
                    <span className="font-semibold text-slate-800">{category.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500">Thời hạn visa:</span>
                    <span className="font-medium text-slate-800 text-right">{category.duration}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {category.highlights.slice(0, 2).map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#30359A] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectCategory(category)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F3F5FF] hover:bg-[#30359A] text-[#30359A] hover:text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Chi Tiết & Checklist</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenConsultationWithCategory(category.code)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#30359A] text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  Tư Vấn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
