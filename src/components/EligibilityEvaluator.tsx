import React, { useState } from 'react';
import { EligibilityInputs, EligibilityEvaluationResult, VisaCategoryCode } from '../types/visa';
import { Sparkles, CheckCircle2, AlertTriangle, FileText, ArrowRight, RotateCcw, Send, ShieldAlert, Award } from 'lucide-react';

interface EligibilityEvaluatorProps {
  onDirectConsultation: (data: { visaType: VisaCategoryCode; score: number; phone: string; name: string }) => void;
}

const initialInputs: EligibilityInputs = {
  visaType: 'C-3-9',
  employmentType: 'fulltime_insured',
  monthlyIncome: '15m_30m',
  travelHistory: 'asean_only',
  savingsAmount: '100m_200m',
  hometownRegion: 'big_city',
  hasPriorRefusal: false,
};

export const EligibilityEvaluator: React.FC<EligibilityEvaluatorProps> = ({ onDirectConsultation }) => {
  const [inputs, setInputs] = useState<EligibilityInputs>(initialInputs);
  const [result, setResult] = useState<EligibilityEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [submittedReport, setSubmittedReport] = useState<boolean>(false);

  const calculateEvaluation = () => {
    setIsEvaluating(true);

    setTimeout(() => {
      let baseScore = 70;
      const strengths: string[] = [];
      const riskFactors: string[] = [];
      const actionRecommendations: string[] = [];
      const recommendedDocs: string[] = [];

      // Visa type context
      if (inputs.visaType === 'C-3-9') {
        recommendedDocs.push('Hộ chiếu gốc còn hạn trên 6 tháng', 'CCCD gắn chip', 'Đơn xin visa dán ảnh chuẩn 3.5x4.5');
      } else if (inputs.visaType === 'D-2') {
        recommendedDocs.push('Thư mời nhập học của trường', 'Bằng cấp và học bạ hợp pháp hóa', 'Chứng chỉ ngoại ngữ TOPIK/IELTS');
      } else if (inputs.visaType === 'C-3-4') {
        recommendedDocs.push('Thư mời công tác từ đối tác Hàn Quốc', 'Quyết định cử đi công tác', 'Hợp đồng lao động & ĐKKD công ty Việt Nam');
      }

      // Employment
      if (inputs.employmentType === 'fulltime_insured') {
        baseScore += 12;
        strengths.push('Hợp đồng lao động và quá trình đóng BHXH (VssID) là điểm cộng rất lớn chứng minh sự ràng buộc tại Việt Nam.');
        recommendedDocs.push('Hợp đồng lao động + Đơn xin nghỉ phép có dấu mộc', 'Bản sao quá trình đóng BHXH trên ứng dụng VssID');
      } else if (inputs.employmentType === 'business_owner') {
        baseScore += 14;
        strengths.push('Chủ doanh nghiệp / Hộ kinh doanh cá thể có năng lực tài chính và trách nhiệm pháp lý cao.');
        recommendedDocs.push('Giấy đăng ký kinh doanh & Tờ khai nộp thuế 3 tháng gần nhất');
      } else if (inputs.employmentType === 'freelancer') {
        baseScore -= 6;
        riskFactors.push('Nghề nghiệp tự do không có HĐLĐ thường bị Đại sứ quán xếp vào nhóm cần kiểm tra kỹ dòng tiền.');
        actionRecommendations.push('Cần bổ sung sao kê tài khoản nhận tiền thù lao từ đối tác tối thiểu 6 tháng liên tục kèm hợp đồng dự án.');
        recommendedDocs.push('Sao kê tài khoản ngân hàng nhận tiền dịch vụ freelance', 'Hợp đồng cộng tác hoặc sản phẩm truyền thông');
      } else if (inputs.employmentType === 'student') {
        baseScore += 5;
        strengths.push('Đối tượng học sinh/sinh viên được hỗ trợ xét theo hồ sơ tài chính của bố mẹ.');
        recommendedDocs.push('Thẻ sinh viên / Giấy xác nhận sinh viên', 'Hồ sơ công việc và tài chính của người giám hộ');
      } else if (inputs.employmentType === 'retired') {
        baseScore += 8;
        strengths.push('Người nghỉ hưu có lương hưu ổn định có tỉ lệ đậu visa cao.');
        recommendedDocs.push('Sổ hưu trí hoặc quyết định nghỉ hưu', 'Sao kê tài khoản nhận lương hưu');
      }

      // Income
      if (inputs.monthlyIncome === 'over_50m') {
        baseScore += 10;
        strengths.push('Thu nhập trên 50 triệu/tháng khẳng định năng lực chi trả chuyến đi vượt trội.');
      } else if (inputs.monthlyIncome === '30m_50m') {
        baseScore += 7;
        strengths.push('Mức thu nhập từ 30 - 50 triệu/tháng rất lý tưởng để nộp visa Hàn Quốc.');
      } else if (inputs.monthlyIncome === '15m_30m') {
        baseScore += 4;
        strengths.push('Thu nhập phổ thông ổn định, đáp ứng tốt yêu cầu du lịch hoặc du học.');
      } else {
        baseScore -= 4;
        riskFactors.push('Thu nhập dưới 15 triệu/tháng cần bổ sung thêm tài sản tích lũy khác để tăng độ tin cậy.');
        actionRecommendations.push('Nên có sổ tiết kiệm đứng tên tối thiểu 100 triệu gửi trên 1 tháng.');
      }

      // Travel History
      if (inputs.travelHistory === 'developed_oecd' || inputs.travelHistory === 'korea_visited') {
        baseScore += 12;
        strengths.push('Lịch sử đã từng đi các nước phát triển (Mỹ, Châu Âu, Nhật, Hàn) chứng minh lịch sử xuất cảnh uy tín.');
      } else if (inputs.travelHistory === 'asean_only') {
        baseScore += 4;
        strengths.push('Đã từng xuất cảnh các nước Đông Nam Á (Thái Lan, Singapore...) giúp hộ chiếu có lịch sử di chuyển hợp lệ.');
      } else {
        baseScore -= 5;
        riskFactors.push('Hộ chiếu trắng (chưa từng đi nước ngoài).');
        actionRecommendations.push('Cần làm đẹp hồ sơ công việc thật chuẩn xác và viết thư giải trình mục đích chuyến đi minh bạch.');
      }

      // Savings
      if (inputs.savingsAmount === 'over_500m_assets') {
        baseScore += 10;
        strengths.push('Sở hữu tài sản lớn (sổ tiết kiệm >500 triệu, nhà đất, ô tô) thể hiện sự gắn bó mật thiết tại Việt Nam.');
        recommendedDocs.push('Giấy chứng nhận quyền sở hữu nhà đất (Sổ hồng/Sổ đỏ) hoặc Đăng ký ô tô');
      } else if (inputs.savingsAmount === '200m_500m') {
        baseScore += 7;
        strengths.push('Số dư tiết kiệm 200 - 500 triệu vượt chuẩn yêu cầu tối thiểu.');
        recommendedDocs.push('Sổ tiết kiệm gốc và Giấy xác nhận số dư song ngữ');
      } else if (inputs.savingsAmount === '100m_200m') {
        baseScore += 4;
        strengths.push('Số dư tiết kiệm đạt mức yêu cầu cơ bản của Lãnh sự quán.');
        recommendedDocs.push('Sổ tiết kiệm tối thiểu 100 - 120 triệu gửi từ 1 tháng');
      } else if (inputs.savingsAmount === 'need_support') {
        baseScore -= 8;
        riskFactors.push('Chưa có sổ tiết kiệm sẵn có thể là trở ngại lớn khi nộp hồ sơ.');
        actionRecommendations.push('Visa5S có gói hỗ trợ chứng minh tài chính pháp lý chuẩn theo quy định ngân hàng.');
      }

      // Hometown Region
      if (inputs.hometownRegion === 'big_city') {
        baseScore += 8;
        strengths.push('Hộ khẩu Hà Nội / Đà Nẵng / TP.HCM có cơ hội được xem xét cấp visa 5 năm nhiều lần.');
        recommendedDocs.push('Giấy xác nhận cư trú CT07 hoặc CCCD thường trú 3 thành phố lớn');
      } else if (inputs.hometownRegion === 'caution_province') {
        baseScore -= 12;
        riskFactors.push('Hộ khẩu thuộc tỉnh có tỉ lệ cư trú bất hợp pháp cao theo thông báo của KVAC.');
        actionRecommendations.push('Bắt buộc phải có hợp đồng lao động chính thức + BHXH lâu năm hoặc tài sản nhà đất đứng tên để hóa giải yếu tố vùng miền.');
      }

      // Prior refusal
      if (inputs.hasPriorRefusal) {
        baseScore -= 15;
        riskFactors.push('Từng có tiền sử bị từ chối visa Hàn Quốc hoặc nước khác.');
        actionRecommendations.push('Cần thư giải trình sai sót của lần nộp trước và bằng chứng khắc phục hoàn toàn lý do bị từ chối.');
      }

      const finalScore = Math.max(35, Math.min(99, baseScore));
      let level: EligibilityEvaluationResult['level'] = 'Rất Cao (95%+)';
      let levelColor = '#161984';

      if (finalScore >= 90) {
        level = 'Rất Cao (95%+)';
        levelColor = '#161984';
      } else if (finalScore >= 80) {
        level = 'Tốt (85-94%)';
        levelColor = '#30359A';
      } else if (finalScore >= 68) {
        level = 'Trung Bình (70-84%)';
        levelColor = '#D97706';
      } else {
        level = 'Cần Cải Thiện (<70%)';
        levelColor = '#ED1B36';
      }

      setResult({
        score: finalScore,
        level,
        levelColor,
        summary:
          finalScore >= 85
            ? 'Hồ sơ của bạn thuộc nhóm rất tiềm năng. Các tiêu chí pháp lý chính đã tương đối đầy đủ. Chỉ cần hoàn thiện biểu mẫu và dịch thuật chuẩn xác là có thể tự tin nộp visa.'
            : finalScore >= 70
            ? 'Hồ sơ đạt mức khá, tuy nhiên vẫn còn 1-2 điểm yếu cần xử lý khéo léo (về tài chính hoặc công việc) để tránh bị Lãnh sự quán yêu cầu bổ sung hoặc nghi vấn.'
            : 'Hồ sơ có nguy cơ bị từ chối cao nếu tự nộp mà không có phương án giải trình pháp lý và bổ sung chứng từ ràng buộc. Khuyến nghị bạn nên tham vấn chuyên gia Visa5S trước khi nộp.',
        strengths,
        riskFactors,
        actionRecommendations,
        recommendedDocs,
      });

      setIsEvaluating(false);
    }, 400);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone || !contactName) return;
    onDirectConsultation({
      visaType: inputs.visaType,
      score: result?.score || 85,
      phone: contactPhone,
      name: contactName,
    });
    setSubmittedReport(true);
  };

  return (
    <section id="evaluator" className="py-16 sm:py-20 bg-[#F3F5FF] border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#454BC0]/20 text-[#30359A] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ED1B36]" />
            CÔNG CỤ ĐÁNH GIÁ TỈ LỆ ĐẬU THỊ THỰC TRỰC TUYẾN
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161984] tracking-tight mb-3">
            Kiểm Tra Độ Mạnh Hồ Sơ Của Bạn Trong 60 Giây
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hệ thống phân tích dựa trên tiêu chuẩn thực tế của Đại sứ quán Hàn Quốc và dữ liệu từ 15.000+ bộ hồ sơ đã xử lý thành công tại Visa5S.
          </p>
        </div>

        {/* Main Grid: Form Inputs (Left) and Live Assessment Result (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Form Elements adhering to spec (height 48px, 1.5px border, rounded-lg) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-bold text-[#161984] mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Thông Tin Tự Khai Báo</span>
              <span className="text-xs font-normal text-slate-500">Bảo mật thông tin 100%</span>
            </h3>

            <div className="space-y-5">
              {/* Field 1: Loại visa */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Diện Visa Bạn Dự Định Xin
                </label>
                <select
                  value={inputs.visaType}
                  onChange={(e) => setInputs({ ...inputs, visaType: e.target.value as VisaCategoryCode })}
                  className="w-full h-12 bg-white border-1.5 border-[#E2E8F0] rounded-lg px-3.5 text-sm font-medium text-[#25283D] focus:outline-none focus:border-[#454BC0] transition-colors"
                >
                  <option value="C-3-9">C-3-9: Du Lịch Tự Túc, Thăm Thân Ngắn Hạn</option>
                  <option value="D-2">D-2 / D-4: Du Học Đại Học, Thạc Sĩ, Học Tiếng</option>
                  <option value="C-3-4">C-3-4: Thương Mại, Công Tác & Khảo Sát Thị Trường</option>
                </select>
              </div>

              {/* Field 2: Tình trạng công việc */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Tình Trạng Công Việc Hiện Tại
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { val: 'fulltime_insured', label: 'Đi làm có HĐLĐ & BHXH đầy đủ' },
                    { val: 'business_owner', label: 'Chủ Doanh Nghiệp / Hộ Kinh Doanh' },
                    { val: 'freelancer', label: 'Làm Tự Do / Kinh Doanh Online' },
                    { val: 'student', label: 'Học sinh / Sinh viên đại học' },
                    { val: 'retired', label: 'Cán bộ hưu trí / Có sổ hưu' },
                  ].map((item) => (
                    <label
                      key={item.val}
                      onClick={() => setInputs({ ...inputs, employmentType: item.val as any })}
                      className={`flex items-center gap-3 p-3 rounded-lg border-1.5 cursor-pointer text-xs font-medium transition-all ${
                        inputs.employmentType === item.val
                          ? 'border-[#30359A] bg-[#F3F5FF] text-[#161984] font-semibold'
                          : 'border-[#E2E8F0] hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="employmentType"
                        checked={inputs.employmentType === item.val}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#30359A] focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 3: Thu nhập trung bình */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Thu Nhập Trung Bình Hàng Tháng
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'under_15m', label: '< 15 triệu' },
                    { val: '15m_30m', label: '15 - 30 triệu' },
                    { val: '30m_50m', label: '30 - 50 triệu' },
                    { val: 'over_50m', label: '> 50 triệu' },
                  ].map((inc) => (
                    <button
                      key={inc.val}
                      type="button"
                      onClick={() => setInputs({ ...inputs, monthlyIncome: inc.val as any })}
                      className={`h-11 rounded-lg border-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        inputs.monthlyIncome === inc.val
                          ? 'border-[#30359A] bg-[#30359A] text-white shadow-xs'
                          : 'border-[#E2E8F0] bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {inc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 4: Lịch sử du lịch */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. Lịch Sử Xuất Cảnh Đã Từng Đi Nước Nào?
                </label>
                <select
                  value={inputs.travelHistory}
                  onChange={(e) => setInputs({ ...inputs, travelHistory: e.target.value as any })}
                  className="w-full h-12 bg-white border-1.5 border-[#E2E8F0] rounded-lg px-3.5 text-sm font-medium text-[#25283D] focus:outline-none focus:border-[#454BC0] transition-colors"
                >
                  <option value="none">Hộ chiếu trắng (Chưa từng xuất cảnh nước nào)</option>
                  <option value="asean_only">Đã đi các nước Đông Nam Á (Thái Lan, Singapore, Malaysia...)</option>
                  <option value="developed_oecd">Đã đi các nước phát triển (Mỹ, Châu Âu, Nhật Bản, Úc, Canada)</option>
                  <option value="korea_visited">Đã từng nhập cảnh Hàn Quốc hợp pháp trước đây</option>
                </select>
              </div>

              {/* Field 5: Sổ tiết kiệm & Tài chính */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  5. Năng Lực Tài Chính & Sổ Tiết Kiệm
                </label>
                <select
                  value={inputs.savingsAmount}
                  onChange={(e) => setInputs({ ...inputs, savingsAmount: e.target.value as any })}
                  className="w-full h-12 bg-white border-1.5 border-[#E2E8F0] rounded-lg px-3.5 text-sm font-medium text-[#25283D] focus:outline-none focus:border-[#454BC0] transition-colors"
                >
                  <option value="100m_200m">Có sổ tiết kiệm 100 - 200 triệu đồng (gửi trên 1 tháng)</option>
                  <option value="200m_500m">Có sổ tiết kiệm 200 - 500 triệu đồng</option>
                  <option value="over_500m_assets">Sổ &gt; 500 triệu + Có tài sản nhà đất / Ô tô đứng tên</option>
                  <option value="under_100m">Có dưới 100 triệu hoặc tiền gửi ngắn hạn</option>
                  <option value="need_support">Chưa có sổ tiết kiệm (Cần Visa5S tư vấn giải pháp)</option>
                </select>
              </div>

              {/* Field 6: Hộ khẩu thường trú */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  6. Hộ Khẩu Thường Trú & Yếu Tố Rủi Ro
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  {[
                    { val: 'big_city', label: 'Hà Nội / TP.HCM / Đà Nẵng' },
                    { val: 'standard_province', label: 'Các tỉnh thành thông thường' },
                    { val: 'caution_province', label: 'Vùng lưu ý (Nghệ An, Hà Tĩnh...)' },
                  ].map((hk) => (
                    <button
                      key={hk.val}
                      type="button"
                      onClick={() => setInputs({ ...inputs, hometownRegion: hk.val as any })}
                      className={`p-2.5 rounded-lg border-1.5 text-xs font-medium transition-all text-center cursor-pointer ${
                        inputs.hometownRegion === hk.val
                          ? 'border-[#30359A] bg-[#F3F5FF] text-[#161984] font-semibold'
                          : 'border-[#E2E8F0] bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {hk.label}
                    </button>
                  ))}
                </div>

                {/* Prior refusal checkbox */}
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                  <input
                    type="checkbox"
                    checked={inputs.hasPriorRefusal}
                    onChange={(e) => setInputs({ ...inputs, hasPriorRefusal: e.target.checked })}
                    className="w-4 h-4 text-[#ED1B36] rounded focus:ring-0"
                  />
                  <span className="font-medium text-amber-950">
                    Tôi đã từng bị từ chối visa Hàn Quốc hoặc nước khác trong quá khứ
                  </span>
                </label>
              </div>

              {/* Evaluate Trigger Button */}
              <button
                type="button"
                onClick={calculateEvaluation}
                className="w-full bg-[#30359A] hover:bg-[#454BC0] text-white font-semibold text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{isEvaluating ? 'Đang Phân Tích Dữ Liệu...' : 'Xem Kết Quả Đánh Giá Ngay'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Assessment Card & Recommendations */}
          <div className="lg:col-span-5">
            {!result ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm text-center flex flex-col items-center justify-center min-h-[460px]">
                <div className="w-16 h-16 rounded-2xl bg-[#F3F5FF] flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-[#30359A]" />
                </div>
                <h4 className="text-lg font-bold text-[#161984] mb-2">
                  Báo Cáo Thẩm Định Sẽ Xuất Hiện Tại Đây
                </h4>
                <p className="text-slate-500 text-sm max-w-sm mb-6">
                  Vui lòng chọn thông tin hồ sơ của bạn bên cạnh và nhấn nút &ldquo;Xem Kết Quả Đánh Giá Ngay&rdquo; để nhận phân tích chi tiết.
                </p>
                <button
                  onClick={calculateEvaluation}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#30359A] bg-[#F3F5FF] hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Chạy thử với hồ sơ mẫu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#30359A]/30 shadow-md animate-in fade-in duration-300">
                {/* Score Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Tỉ Lệ Đậu Dự Đoán
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Xác thực tiêu chuẩn Lãnh sự</span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight"
                      style={{ color: result.levelColor }}
                    >
                      {result.score}%
                    </span>
                    <span className="text-xs font-bold text-slate-500">Điểm</span>
                  </div>
                </div>

                {/* Score Status Badge & Summary */}
                <div className="mb-5 bg-[#F3F5FF] rounded-xl p-4 border border-[#454BC0]/15">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Xếp hạng hồ sơ:
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white shadow-2xs"
                      style={{ color: result.levelColor }}
                    >
                      {result.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {result.summary}
                  </p>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="space-y-4 mb-5 text-xs">
                  {result.strengths.length > 0 && (
                    <div>
                      <div className="font-bold text-[#161984] flex items-center gap-1.5 mb-1.5 uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Điểm Mạnh Của Hồ Sơ
                      </div>
                      <ul className="space-y-1.5 pl-5 text-slate-700 list-disc">
                        {result.strengths.map((str, idx) => (
                          <li key={idx} className="leading-snug">
                            {str}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.riskFactors.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="font-bold text-amber-700 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Điểm Cần Khắc Phục & Tối Ưu
                      </div>
                      <ul className="space-y-1.5 pl-5 text-slate-700 list-disc">
                        {result.riskFactors.map((rf, idx) => (
                          <li key={idx} className="leading-snug text-slate-600">
                            {rf}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.actionRecommendations.length > 0 && (
                    <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200">
                      <div className="font-bold text-[#161984] text-[11px] uppercase tracking-wider mb-1">
                        Khuyến nghị từ chuyên gia Visa5S:
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {result.actionRecommendations.map((ar, idx) => (
                          <li key={idx} className="leading-snug flex items-start gap-1.5">
                            <span className="text-[#30359A] font-bold">→</span>
                            <span>{ar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Consultant Booking / Follow-up */}
                {!submittedReport ? (
                  <form onSubmit={handleSendReport} className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#161984] mb-2">
                      Nhận Báo Cáo Thẩm Định Chi Tiết & Checklist Tài Liệu Qua Điện Thoại:
                    </p>
                    <div className="flex flex-col gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Họ và tên của bạn"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-3 text-xs text-[#25283D] focus:outline-none focus:border-[#30359A] focus:bg-white"
                      />
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          placeholder="Số điện thoại / Zalo"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          required
                          className="flex-1 h-10 bg-slate-50 border border-slate-300 rounded-lg px-3 text-xs text-[#25283D] focus:outline-none focus:border-[#30359A] focus:bg-white"
                        />
                        <button
                          type="submit"
                          className="bg-[#ED1B36] hover:bg-[#D6142E] text-white text-xs font-semibold px-4 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Gửi Nhận Ngay</span>
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Chuyên viên thẩm định Visa5S sẽ liên hệ hỗ trợ trong 30 phút. Miễn phí hoàn toàn.
                    </span>
                  </form>
                ) : (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-900">
                      Đã gửi thông tin thẩm định thành công!
                    </p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Chuyên viên sẽ gọi điện thoại hoặc gửi Zalo tới số {contactPhone} trong ít phút.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
