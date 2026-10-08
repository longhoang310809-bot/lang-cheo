import React from 'react';
import { Achievement } from '../types';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  playerScore: number;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
  playerScore
}) => {
  if (!isOpen) return null;

  // Determine Rank
  const getRank = (score: number) => {
    if (score >= 120) return { title: 'Bậc Thầy Chiếu Chèo', badge: '👑', next: 200 };
    if (score >= 60) return { title: 'Nghệ Nhân Đình Làng', badge: '🏮', next: 120 };
    if (score >= 25) return { title: 'Đào Kép Trẻ Vào Chiếu', badge: '🎭', next: 60 };
    return { title: 'Khán Giả Xem Hội', badge: '🎋', next: 25 };
  };

  const rank = getRank(playerScore);
  const unlockedCount = achievements.filter((a) => a.unlocked || playerScore > 20).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-[#1b1216] via-[#121422] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-amber-800 bg-stone-900 text-stone-300 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-700 to-red-800 border-2 border-amber-400 text-2xl shadow-lg mb-2">
            {rank.badge}
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Danh Hiệu Sân Đình
          </span>
          <h3 className="font-theatre text-2xl sm:text-3xl font-black text-amber-100">
            {rank.title}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Tổng Điểm Uy Tín: <strong className="text-amber-300 font-mono text-sm">{playerScore} Điểm</strong>
          </p>
        </div>

        {/* Score & Next Rank progress bar */}
        <div className="mb-6 rounded-2xl border border-amber-900/40 bg-stone-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
            <span>Tiến độ thăng hạng danh hiệu</span>
            <span className="font-mono text-amber-300">{playerScore} / {rank.next} Điểm</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${Math.min(100, (playerScore / rank.next) * 100)}%` }}
            />
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-400 px-1">
            <span>Các Huy Hiệu Đã Mở Khóa ({unlockedCount}/{achievements.length})</span>
            <Sparkles className="h-4 w-4" />
          </div>

          {achievements.map((ach, idx) => {
            const isUnlocked = ach.unlocked || (idx === 0 && playerScore >= 10) || (idx === 1 && playerScore >= 30) || (idx === 2 && playerScore >= 50);

            return (
              <div
                key={ach.id}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'border-amber-600/70 bg-gradient-to-r from-amber-950/40 to-stone-900/60 shadow-md'
                    : 'border-stone-800/80 bg-stone-950/40 opacity-60'
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl border ${
                  isUnlocked ? 'border-amber-400 bg-amber-900/60 shadow-inner' : 'border-stone-800 bg-stone-900'
                }`}>
                  {ach.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-theatre text-sm font-bold text-amber-100 truncate">
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Đã đạt</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-300/85 line-clamp-1 mt-0.5">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-amber-600 bg-amber-900/80 text-xs font-bold text-amber-100 hover:bg-amber-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
