import React from 'react';
import { Play, Compass, Sparkles, Volume2 } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface HeroProps {
  onPlayClick: () => void;
  onExploreClick: () => void;
  onRoleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlayClick,
  onExploreClick,
  onRoleClick
}) => {
  const triggerAudioSample = (type: 'tung' | 'cac' | 'boong' | 'he_moi' | 'de') => {
    if (type === 'he_moi') {
      audioSystem.playMelodicPhrase('he_moi');
    } else if (type === 'de') {
      audioSystem.playDeCheo('Ai đấy?');
    } else {
      audioSystem.playDrum(type);
    }
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b border-amber-900/30 bg-[#090b14] px-4 py-12 md:py-20 lg:py-28 flex items-center justify-center">
      {/* Background Night Sky & Đình Pagoda Silhouette */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Full Moon with soft lunar glow */}
        <div className="absolute top-10 right-10 md:top-16 md:right-32 w-28 h-28 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 opacity-90 shadow-[0_0_90px_rgba(253,224,71,0.35)] animate-moon-pulse">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_30%,transparent_40%,rgba(180,83,9,0.3)_90%)]" />
        </div>

        {/* Pagoda roof eaves SVG silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 md:h-72 opacity-25 text-stone-900"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,208C840,203,960,149,1080,149.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>

        {/* Swaying Red Lanterns */}
        <div className="absolute top-0 left-8 md:left-24 animate-lantern-sway">
          <div className="w-1 h-14 md:h-24 bg-stone-700 mx-auto" />
          <div className="w-10 h-14 md:w-14 md:h-20 rounded-full bg-gradient-to-b from-red-600 to-amber-700 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center justify-center">
            <span className="text-amber-200 text-xs font-serif font-bold">Chèo</span>
          </div>
          <div className="w-1.5 h-6 bg-red-800 mx-auto rounded-b" />
        </div>

        <div className="absolute top-0 right-12 md:right-64 animate-lantern-sway [animation-delay:1.5s]">
          <div className="w-1 h-10 md:h-16 bg-stone-700 mx-auto" />
          <div className="w-8 h-12 md:w-12 md:h-16 rounded-full bg-gradient-to-b from-amber-600 to-red-800 border-2 border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
            <span className="text-amber-100 text-[10px] font-serif font-bold">Hội</span>
          </div>
          <div className="w-1 h-5 bg-red-800 mx-auto rounded-b" />
        </div>

        {/* Stage Curtain Glow from Top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-red-950/70 to-transparent" />
        
        {/* Subtle grid of Dó paper fibers */}
        <div className="absolute inset-0 pattern-do-paper opacity-40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Theatrical Kicker */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-4 py-1.5 backdrop-blur-sm mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-amber-300">
            Chiếu Chèo Đêm Trăng · Boardgame Văn Hóa Dân Gian
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="font-theatre text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-stone-100 drop-shadow-md">
          <span className="block text-amber-100">LÀNG CHÈO</span>
        </h1>

        {/* Subtitle & Poetic hook */}
        <p className="mt-4 font-theatre text-lg sm:text-2xl md:text-3xl font-medium italic text-amber-200/90 max-w-3xl mx-auto">
          “Mỗi vai một thân phận. Mỗi lượt chơi một câu chuyện.”
        </p>

        <p className="mt-4 text-sm sm:text-base text-stone-300/90 max-w-2xl mx-auto leading-relaxed">
          Bước vào chiếc chiếu cói giữa sân đình làng Bắc Bộ. Hóa thân thành Thị Mầu, Thị Kính, Hề Gậy hay Xã Trưởng; 
          đối đáp qua <strong className="text-amber-300 font-semibold">tiếng đế</strong>, 
          khám phá manh mối bí mật và thưởng thức <strong className="text-amber-300 font-semibold">làn điệu chèo cổ</strong> sống động.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              audioSystem.playDrum('tung');
              onPlayClick();
            }}
            className="group relative flex items-center gap-3 rounded-xl border border-amber-300/40 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 px-7 py-3.5 text-base sm:text-lg font-bold text-amber-100 shadow-xl shadow-red-950/60 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
          >
            <Play className="h-5 w-5 fill-current text-amber-300 group-hover:scale-110 transition-transform" />
            <span>CHƠI NGAY (MỞ MÀN)</span>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              audioSystem.playBambooClack();
              onExploreClick();
            }}
            className="flex items-center gap-2.5 rounded-xl border border-amber-700/60 bg-stone-900/80 px-6 py-3.5 text-base sm:text-lg font-medium text-amber-200 backdrop-blur-sm transition-all hover:bg-stone-800/90 hover:border-amber-500"
          >
            <Compass className="h-5 w-5 text-amber-400" />
            <span>KHÁM PHÁ CHÈO</span>
          </button>

          <button
            onClick={() => {
              audioSystem.playDrum('cac');
              onRoleClick();
            }}
            className="flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-900/50 px-5 py-3.5 text-sm sm:text-base text-stone-300 hover:text-amber-300 hover:border-stone-700 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Xem 7 Vai Diễn</span>
          </button>
        </div>

        {/* Interactive Tactile Instrument Bar - Immediate sensory hook */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-amber-900/30 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-wider text-amber-400/80 font-medium">
            <Volume2 className="h-3.5 w-3.5" />
            <span>Thanh Âm Sân Đình (Chạm để gõ trống & nghe điệu)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => triggerAudioSample('tung')}
              className="px-3 py-1.5 rounded-lg border border-red-800/60 bg-red-950/40 text-xs font-medium text-amber-200 hover:bg-red-900/60 transition-colors active:scale-95"
            >
              🥁 Trống Tùng!
            </button>
            <button
              onClick={() => triggerAudioSample('cac')}
              className="px-3 py-1.5 rounded-lg border border-amber-800/60 bg-amber-950/40 text-xs font-medium text-amber-200 hover:bg-amber-900/60 transition-colors active:scale-95"
            >
              🪘 Trống Cắc!
            </button>
            <button
              onClick={() => triggerAudioSample('boong')}
              className="px-3 py-1.5 rounded-lg border border-amber-800/60 bg-stone-900/60 text-xs font-medium text-amber-300 hover:bg-stone-800 transition-colors active:scale-95"
            >
              🔔 Thanh La Boong!
            </button>
            <button
              onClick={() => triggerAudioSample('he_moi')}
              className="px-3 py-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/40 text-xs font-medium text-emerald-200 hover:bg-emerald-900/60 transition-colors active:scale-95"
            >
              🎶 Điệu Hề Mồi
            </button>
            <button
              onClick={() => triggerAudioSample('de')}
              className="px-3 py-1.5 rounded-lg border border-purple-800/60 bg-purple-950/40 text-xs font-medium text-purple-200 hover:bg-purple-900/60 transition-colors active:scale-95"
            >
              🗣️ Tiếng Đế: &quot;Ai đấy?&quot;
            </button>
          </div>
        </div>

        {/* Illuminated Chiếu Chèo Preview Feature Mat */}
        <div className="mt-12 relative mx-auto max-w-3xl rounded-2xl border-2 border-amber-700/40 bg-gradient-to-b from-[#1b120c] to-[#0f101a] p-4 sm:p-6 shadow-2xl shadow-red-950/40">
          <div className="flex flex-wrap items-center justify-around gap-4 text-left text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-950 border border-red-800/60 text-xl">
                🎭
              </span>
              <div>
                <strong className="block text-amber-200">Nhập Vai Kinh Điển</strong>
                <span className="text-stone-400 text-xs">Mục tiêu bí mật & kỹ năng riêng</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-950 border border-amber-800/60 text-xl">
                📜
              </span>
              <div>
                <strong className="block text-amber-200">Luận Giải Bí Ẩn</strong>
                <span className="text-stone-400 text-xs">Thẻ manh mối & câu đố văn hóa</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800/60 text-xl">
                🏮
              </span>
              <div>
                <strong className="block text-amber-200">Học Bằng Chơi Chèo</strong>
                <span className="text-stone-400 text-xs">Trải nghiệm di sản sống động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
