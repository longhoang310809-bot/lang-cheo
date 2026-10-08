import React, { useState } from 'react';
import { X, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface FanGestureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FanGestureModal: React.FC<FanGestureModalProps> = ({ isOpen, onClose }) => {
  const [activeGestureIndex, setActiveGestureIndex] = useState(0);

  if (!isOpen) return null;

  const gestures = [
    {
      id: 'che_mat',
      name: 'Che Nửa Mặt Cười Lúng Liếng',
      symbolicRole: 'Vai Đào lẳng (Thị Mầu)',
      meaning: 'Chiếc quạt khép hờ che từ cằm đến ngang sống mũi, mắt lúng liếng nhìn trộm biểu thị sự phóng túng e lệ, khát khao tình yêu tuổi trẻ.',
      technique: 'Cổ tay mềm uốn vòng cung, nan quạt xòe 3/4, nhịp thở dồn dập theo tiếng trống đế.',
      icon: '🌸',
      audioTone: 'dao_lieu' as const
    },
    {
      id: 'doc_thu',
      name: 'Mở Quạt Làm Bức Thư Tình',
      symbolicRole: 'Vai Kép văn / Thư sinh (Lưu Bình, Thiện Sĩ)',
      meaning: 'Quạt mở rộng đặt ngang ngực như trang sách, ngón tay điểm từng nốt như đọc câu thơ hẹn ước.',
      technique: 'Thân người ngay ngắn đĩnh đạc, ánh mắt dõi theo từng nan quạt như chữ viết.',
      icon: '📜',
      audioTone: 'he_moi' as const
    },
    {
      id: 'roi_ngua',
      name: 'Gấp Quạt Làm Roi Ngựa / Mái Chèo',
      symbolicRole: 'Ước lệ không gian đường trường (Trương Viên)',
      meaning: 'Chiếc quạt xếp chặt vung lên cao tạo tiếng gió rít biểu thị việc giục ngựa phi nước đại hoặc chèo đò qua sông lớn.',
      technique: 'Động tác dứt khoát mạnh mẽ, bước chân chữ Đinh xoay vòng ước lệ ngàn dặm quan san.',
      icon: '🐎',
      audioTone: 'victory' as const
    },
    {
      id: 'guom_lenh',
      name: 'Chỉ Quạt Làm Quyền Trượng & Bản Án',
      symbolicRole: 'Vai Xã Trưởng / Quan tuần ty',
      meaning: 'Quạt trỏ thẳng vào mặt đối phương mang uy quyền phán xét hống hách, hoặc dùng gõ vào tang trống dọa nạt dân lành.',
      technique: 'Cánh tay gồng cứng, mắt trợn trừng, giọng rắp gằn từng tiếng.',
      icon: '⚖️',
      audioTone: 'clue' as const
    }
  ];

  const current = gestures[activeGestureIndex];

  const handleSelectGesture = (idx: number) => {
    setActiveGestureIndex(idx);
    audioSystem.playBambooClack();
    audioSystem.playMelodicPhrase(gestures[idx].audioTone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border-2 border-amber-600 bg-gradient-to-b from-[#1c1214] via-[#12131d] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-amber-800 bg-stone-900 text-stone-300 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-amber-900/40 pb-4">
          <span className="text-3xl">🪭</span>
          <div>
            <h3 className="font-theatre text-2xl font-bold text-amber-100">
              Bí Mật Đạo Cụ: Chiếc Quạt Chèo Vạn Năng
            </h3>
            <p className="text-xs text-amber-300/80">
              Khám phá ngôn ngữ ước lệ đỉnh cao: Một chiếc quạt tre hóa thành cả nhân gian
            </p>
          </div>
        </div>

        {/* Gesture Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {gestures.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => handleSelectGesture(idx)}
              className={`rounded-xl p-3 text-left transition-all border ${
                activeGestureIndex === idx
                  ? 'border-amber-400 bg-amber-950/70 shadow-lg text-amber-200'
                  : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <div className="text-xl mb-1">{g.icon}</div>
              <div className="text-xs font-semibold line-clamp-1">{g.name}</div>
            </button>
          ))}
        </div>

        {/* Current Gesture Interactive Canvas */}
        <div className="rounded-2xl border border-amber-700/50 bg-[#16131c] p-5 sm:p-6 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="rounded-full bg-red-950 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-800/60">
              {current.symbolicRole}
            </span>
            <button
              onClick={() => audioSystem.playMelodicPhrase(current.audioTone)}
              className="flex items-center gap-1.5 rounded-lg border border-amber-700 bg-amber-900/50 px-2.5 py-1 text-xs text-amber-200 hover:bg-amber-800"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Nghe Âm Điệu</span>
            </button>
          </div>

          <h4 className="font-theatre text-xl font-bold text-amber-100 mb-2">
            {current.name}
          </h4>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4">
            {current.meaning}
          </p>

          <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-3.5 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Kỹ Pháp Ước Lệ Sân Khấu:</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              {current.technique}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-800">
          <button
            onClick={() => {
              const next = (activeGestureIndex + 1) % gestures.length;
              handleSelectGesture(next);
            }}
            className="flex items-center gap-2 text-xs text-amber-300 hover:text-amber-100"
          >
            <span>Xem thế quạt kế tiếp</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-amber-600 bg-amber-900/80 text-xs font-semibold text-amber-100 hover:bg-amber-800"
          >
            Đã Hiểu (Đóng)
          </button>
        </div>
      </div>
    </div>
  );
};
