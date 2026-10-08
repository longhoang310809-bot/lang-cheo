import React from 'react';
import { Users, UserCheck, Sparkles, MessageCircle, Trophy, ArrowRight } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface HowToPlayProps {
  onStartPlaying: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ onStartPlaying }) => {
  const steps = [
    {
      step: '01',
      title: 'Tạo Phòng Hoặc Chơi Nhanh',
      desc: 'Tạo phòng riêng mời bạn bè cùng lớp qua mã phòng 6 ký tự, hoặc nhấn "Chơi Nhanh" để ghép ngay với dàn bạn diễn AI làng chèo dí dỏm.',
      icon: Users,
      badge: 'Bắt đầu',
      color: 'from-amber-900/60 to-red-950/60'
    },
    {
      step: '02',
      title: 'Nhận Thân Phận & Bí Mật',
      desc: 'Bốc ngẫu nhiên một trong các vai kinh điển: Thị Mầu, Thị Kính, Hề Gậy, Xã Trưởng, Mẹ Đốp... Mỗi vai sở hữu kỹ năng chèo độc nhất và một mục tiêu bí mật cần hoàn thành.',
      icon: UserCheck,
      badge: 'Nhập vai',
      color: 'from-red-900/60 to-amber-950/60'
    },
    {
      step: '03',
      title: 'Lên Chiếu & Rút Thẻ',
      desc: 'Theo vòng chơi, mỗi đào kép rút các thẻ bài từ cọc bài sân đình: Thẻ Manh Mối (vật chứng), Thẻ Làn Điệu (nghe điệu hát chèo), Thẻ Thách Đố (câu hỏi văn hóa) hoặc Biến Cố.',
      icon: Sparkles,
      badge: 'Chiếu cói',
      color: 'from-emerald-950/60 to-stone-900/80'
    },
    {
      step: '04',
      title: 'Đấu Trí & Hô Tiếng “Đế”',
      desc: 'Sử dụng kỹ năng của nhân vật, suy luận tìm ra chân tướng vụ án, và tự do bấm nút "Tiếng Đế" (Ai đấy?, Phải chăng?, Bớ làng nước!) để hưởng ứng hoặc bắt lỗi bạn diễn.',
      icon: MessageCircle,
      badge: 'Tương tác',
      color: 'from-purple-950/60 to-indigo-950/60'
    },
    {
      step: '05',
      title: 'Hạ Màn & Vinh Danh',
      desc: 'Khi đủ số manh mối hoặc hết 5 round, màn nhung hạ xuống. Hệ thống công bố chân tướng vụ án, tính điểm Uy Tín (Prestige) và trao danh hiệu Đào Kép Xuất Sắc!',
      icon: Trophy,
      badge: 'Kết thúc',
      color: 'from-amber-950/80 to-yellow-950/60'
    }
  ];

  return (
    <section className="relative border-b border-amber-900/30 bg-[#0c0d17] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Luật Chơi Đơn Giản · Trải Nghiệm Sâu Sắc
          </div>
          <h2 className="mt-3 font-theatre text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
            CÁCH CHƠI LÀNG CHÈO
          </h2>
          <p className="mt-3 text-stone-300/80 text-sm sm:text-base">
            Không cần học thuộc lý thuyết khô cứng. Luật chơi được thiết kế trực quan theo từng bước biểu diễn của một đêm hội chèo truyền thống.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className={`group relative rounded-2xl border border-amber-800/30 bg-gradient-to-b ${item.color} p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-600/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30`}
              >
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-theatre text-2xl font-bold text-amber-400/90 tracking-wider">
                    {item.step}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-600/40 bg-stone-900/60 text-amber-300 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400/70 mb-1">
                  {item.badge}
                </div>
                <h3 className="font-theatre text-lg sm:text-xl font-bold text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed">
                  {item.desc}
                </p>

                {/* Subtle corner detail */}
                <div className="absolute top-2 right-2 text-[10px] text-amber-500/20 font-serif">
                  ✦
                </div>
              </div>
            );
          })}

          {/* Quick CTA Card */}
          <div className="rounded-2xl border-2 border-dashed border-amber-600/50 bg-gradient-to-br from-red-950/40 to-amber-950/30 p-6 flex flex-col justify-between items-center text-center">
            <div>
              <span className="text-3xl mb-2 block">🪘</span>
              <h3 className="font-theatre text-lg font-bold text-amber-200">
                Sẵn Sàng Bước Lên Chiếu?
              </h3>
              <p className="text-xs text-stone-300/80 mt-2">
                Trải nghiệm ngay một ván chơi thử kéo dài 5-7 phút để hiểu trọn vẹn không khí kịch tính của sân đình!
              </p>
            </div>
            <button
              onClick={() => {
                audioSystem.playDrum('tung');
                onStartPlaying();
              }}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-gradient-to-r from-red-800 to-amber-700 py-3 text-sm font-bold text-amber-100 shadow-lg hover:brightness-110 transition-all"
            >
              <span>Vào Chơi Ngay</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
