import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Award, Clock } from 'lucide-react';
// Import hình ảnh đúng chuẩn Vite/React
import dossierImg from '../assets/images/dossier_consultation_1792985144950.jpg';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tiếp Nhận & Thẩm Định Sơ Bộ Trong 30 Phút',
      desc: 'Chuyên viên rà soát chi tiết giấy tờ nhân thân, tính pháp lý của hợp đồng lao động, sao kê tài khoản ngân hàng và lịch sử xuất cảnh.',
    },
    {
      num: '02',
      title: 'Xây Dựng Phương Án Tối Ưu Điểm Yếu',
      desc: 'Với các trường hợp kinh doanh tự do, hộ khẩu vùng lưu ý hoặc từng trượt visa, luật sư Visa5S soạn thảo thư giải trình chuẩn pháp lý gửi Lãnh sự.',
    },
    {
      num: '03',
      title: 'Dịch Thuật Công Chứng & Điền Đơn E-Form Chuẩn',
      desc: 'Dịch thuật tư pháp sang tiếng Hàn/Anh, xử lý ảnh hộ chiếu chuẩn ICAO và hoàn thiện tờ khai xin visa theo đúng biểu mẫu mới nhất của KVAC.',
    },
    {
      num: '04',
      title: 'Đặt Lịch Hẹn & Đồng Hành Nộp Tại KVAC',
      desc: 'Đặt lịch hẹn online tránh xếp hàng chờ đợi, chuyên viên trực tiếp có mặt tại trung tâm KVAC hướng dẫn lấy sinh trắc học và nộp hồ sơ.',
    },
    {
      num: '05',
      title: 'Theo Dõi Xét Duyệt & Bàn Giao Visa Tận Tay',
      desc: 'Cập nhật tiến độ hàng ngày qua SMS/Zalo, tiếp nhận kết quả từ Lãnh sự quán và chuyển phát hỏa tốc hộ chiếu có dán visa đến tận nhà khách hàng.',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Photographic Proof Asset */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src={dossierImg}
                alt="Thẩm định hồ sơ visa Hàn Quốc tại Visa5S"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161984]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Tiêu Chuẩn Soát Xét 2 Vòng
                </span>
                <p className="text-sm font-medium text-slate-100">
                  Mọi bộ hồ sơ đều được Trưởng ban Thẩm định & Luật sư chuyên trách ký duyệt trước khi nộp.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Human Editorial Numbered Process List */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="text-xs font-bold text-[#30359A] tracking-wider uppercase mb-2">
              QUY TRÌNH LÀM VIỆC MINH BẠCH
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161984] tracking-tight mb-4 text-balance">
              5 Bước Chuẩn Hóa Theo Quy Chuẩn Ngoại Giao
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 font-normal leading-relaxed">
              Quy trình khép kín giúp tiết kiệm tối đa thời gian, loại bỏ hoàn toàn các lỗi sai sót cơ bản thường dẫn đến việc bị trả hồ sơ hoặc từ chối visa.
            </p>

            <div className="space-y-4">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-[#454BC0]/30 hover:bg-[#F3F5FF]/60 transition-all group"
                >
                  <div className="text-lg font-black font-mono text-[#30359A] group-hover:text-[#454BC0] shrink-0 w-8">
                    {st.num}.
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#161984] mb-1">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
