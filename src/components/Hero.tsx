import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Sparkles, ArrowRight, Search, FileText } from 'lucide-react';

interface HeroProps {
  onStartEvaluation: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartEvaluation,
  onOpenConsultation,
}) => {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-white via-[#F3F5FF] to-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Authoritative Copy & Direct CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Category text kicker (anti-slop unboxed metadata) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#30359A] uppercase tracking-wider mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ED1B36]" />
              <span>Tiêu Chuẩn Lãnh Sự & KVAC 2026</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 font-normal">Hà Nội & TP. Hồ Chí Minh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#161984] leading-[1.2] tracking-tight mb-4 text-balance">
              Dịch Vụ Tư Vấn & Thẩm Định Hồ Sơ Visa Hàn Quốc Uy Tín Hàng Đầu
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-2xl font-normal">
              Chuyên trị các ca hồ sơ khó, hộ khẩu vùng rủi ro xét duyệt, freelancer tự do tài chính, chứng minh công việc phức tạp hoặc từng bị từ chối visa. Xử lý hồ sơ chuẩn xác theo quy định mới nhất từ Đại sứ quán và Trung tâm KVAC.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4">
              <button
                onClick={onStartEvaluation}
                className="inline-flex items-center justify-center gap-2.5 bg-[#30359A] hover:bg-[#454BC0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Đánh Giá Tỉ Lệ Đậu Online (Miễn Phí)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 border-1.5 border-[#30359A] hover:bg-[#F3F5FF] text-[#30359A] font-semibold text-[15px] px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Nhận Tư Vấn Trực Tiếp 1-1</span>
              </button>
            </div>

            {/* Direct Hotline Quick Links */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mb-8 flex-wrap">
              <span className="font-medium text-slate-500">Tư vấn khẩn 24/7:</span>
              <a
                href="tel:0911909686"
                className="font-bold text-[#161984] hover:text-[#ED1B36] transition-colors underline decoration-slate-300"
              >
                0911 909 686 (Hà Nội)
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="tel:0967686101"
                className="font-bold text-[#161984] hover:text-[#ED1B36] transition-colors underline decoration-slate-300"
              >
                0967 686 101 (TP.HCM)
              </a>
            </div>

            {/* Adjacency Proof Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#161984] tabular-nums">
                  99.2<span className="text-[#ED1B36] text-xl font-bold">%</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Tỉ lệ được cấp visa</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#161984] tabular-nums">
                  15.800<span className="text-slate-400 text-lg font-bold">+</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Hồ sơ đã hoàn tất</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#161984] tabular-nums">
                  30<span className="text-blue-600 text-lg font-bold">p</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Thẩm định phản hồi</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#161984] tabular-nums">
                  10<span className="text-slate-400 text-lg font-bold">+</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Năm kinh nghiệm KVAC</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset + Quick Tracker Widget */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 group bg-slate-900 aspect-[16/10] sm:aspect-[16/10]">
         <img
          src={heroImage}
          alt="Trung tâm tư vấn Visa Hàn Quốc Visa5S - Toàn cảnh Seoul hiện đại"
          className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
        />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161984]/90 via-[#161984]/30 to-transparent pointer-events-none" />

              {/* Inset Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#30359A]" />
                <span className="text-xs font-bold text-[#161984]">Bảo Hiểm Trượt Visa 100%</span>
              </div>

              {/* Bottom Inset Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium text-slate-200 line-clamp-1 mb-1">
                  Đại diện ủy thác nộp hồ sơ trực tiếp tại KVAC Hà Nội & TP. Hồ Chí Minh
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hồ sơ thẩm định đúng hạn
                  </span>
                  <span className="font-mono text-amber-300 font-semibold">KVAC Certified Partner</span>
                </div>
              </div>
            </div>

            {/* Direct Consultation Assistance Strip */}
            <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F3F5FF] text-[#30359A] flex items-center justify-center font-bold text-xs shrink-0">
                  24/7
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#161984]">
                    Cần thẩm định hồ sơ gấp trong 30 phút?
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Hotline: 0911 909 686 (Hà Nội) · 0967 686 101 (TP.HCM)
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenConsultation}
                className="bg-[#ED1B36] hover:bg-[#D6142E] text-white px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0"
              >
                Gửi Hồ Sơ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
