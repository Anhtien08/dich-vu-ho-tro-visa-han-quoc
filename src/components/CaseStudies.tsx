import React from 'react';
import { CASE_STUDIES } from '../data/visaData';
import { ShieldCheck, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  return (
    <section id="cases" className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-[#30359A] tracking-wider uppercase mb-2">
              HỒ SƠ KHÓ ĐƯỢC GIẢI CỨU THÀNH CÔNG
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161984] tracking-tight">
              Kinh Nghiệm Thực Chiến Qua Hơn 15.000 Bộ Hồ Sơ
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Mỗi khách hàng là một câu chuyện riêng. Chúng tôi tìm ra giải pháp pháp lý vững chắc ngay cả khi hồ sơ có nhiều yếu tố bất lợi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-[#FBF8FF] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#454BC0] transition-all flex flex-col justify-between hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-[#30359A] bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {cs.visaType}
                  </span>
                  <span className="text-slate-500 font-medium tabular-nums">{cs.duration}</span>
                </div>

                <h3 className="text-base font-bold text-[#161984] mb-2 leading-snug">
                  {cs.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-[#ED1B36]" />
                  <span>{cs.hometown}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700">{cs.clientInitials}</span>
                </div>

                <div className="space-y-3 text-xs mb-6">
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Khó khăn ban đầu:</span>
                    <p className="text-slate-600 leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[#30359A] block mb-0.5">Giải pháp Visa5S:</span>
                    <p className="text-slate-600 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 bg-white -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết quả: Được cấp visa
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Verified Case</span>
              </div>
            </div>
          ))}
        </div>

        {/* Seoul travel editorial photo strip with quote */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[21/9] sm:aspect-[21/7]">
          <img
            src="/src/assets/images/seoul_lifestyle_travel_1792985143141.jpg"
            alt="Du lịch Hàn Quốc cùng Visa5S"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161984]/95 via-[#161984]/80 to-transparent flex items-center p-6 sm:p-10">
            <div className="max-w-xl text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                Hiện Thực Hóa Giấc Mơ Xứ Kim Chi
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug mb-3">
                Đừng để rào cản thủ tục ngăn bạn khám phá Hàn Quốc
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mb-5 leading-relaxed font-normal">
                Để đội ngũ chuyên viên pháp lý của Visa5S đồng hành trọn gói cùng bạn từ bước lập hồ sơ đến ngày nhận visa cầm tay.
              </p>
              <button
                onClick={onOpenConsultation}
                className="bg-[#ED1B36] hover:bg-[#D6142E] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Nhận Tư Vấn Hồ Sơ Của Bạn Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
