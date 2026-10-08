import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-amber-900/40 bg-[#06070c] px-4 py-12 text-stone-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-stone-800/80">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-800 to-amber-700 border border-amber-400/50 text-lg">
                🏮
              </span>
              <div>
                <span className="font-theatre text-xl font-bold tracking-wider text-amber-200">
                  LÀNG CHÈO
                </span>
                <span className="block text-[11px] text-amber-400 font-serif">
                  Chiếu Chèo Đêm Trăng
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              Dự án website game giáo dục văn hóa ứng dụng công nghệ hiện đại nhằm đưa nghệ thuật chèo truyền thống Bắc Bộ đến gần gũi hơn với học sinh THPT và thế hệ trẻ Việt Nam.
            </p>
            <div className="text-xs text-amber-300/80 italic font-serif">
              “Học chèo bằng cách chơi chèo. Mỗi vai một thân phận, mỗi lượt chơi một câu chuyện.”
            </div>
          </div>

          {/* Canonical Heritage Links */}
          <div className="space-y-2 text-xs">
            <strong className="text-amber-300 uppercase tracking-wider block font-semibold">
              Bảy Vở Chèo Cổ Mẫu Mực
            </strong>
            <ul className="space-y-1.5 text-stone-400">
              <li>• Quan Âm Thị Kính</li>
              <li>• Kim Nham (Súy Vân giả dại)</li>
              <li>• Lưu Bình Dương Lễ</li>
              <li>• Tuần Ty Đào Huế</li>
              <li>• Xã Trưởng - Mẹ Đốp</li>
              <li>• Trương Viên</li>
            </ul>
          </div>

          {/* Cultural Principles */}
          <div className="space-y-2 text-xs">
            <strong className="text-amber-300 uppercase tracking-wider block font-semibold">
              Đặc Trưng Nghệ Thuật
            </strong>
            <ul className="space-y-1.5 text-stone-400">
              <li>• Chiếu cói sân đình 3 mặt</li>
              <li>• Tính ước lệ & cách điệu</li>
              <li>• Tiếng trống đế & xưng danh</li>
              <li>• Nghệ thuật múa quạt chèo</li>
              <li>• Tiếng cười trào lộng của chú hề</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Dự án Làng Chèo · Tôn vinh và phát huy Di sản Văn hóa Nghệ thuật Chèo Dân tộc</p>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Thiết kế vì tình yêu di sản văn hóa Việt Nam</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
