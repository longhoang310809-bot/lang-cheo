import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Award, Menu, X, Play } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAchievements: () => void;
  onStartGameDirectly: () => void;
  playerScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAchievements,
  onStartGameDirectly,
  playerScore
}) => {
  const [isMuted, setIsMuted] = useState(audioSystem.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMute = () => {
    const muted = audioSystem.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioSystem.playDrum('cac');
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'game', label: 'Chiếu Chèo' },
    { id: 'how_to_play', label: 'Cách Chơi' },
    { id: 'roles', label: 'Vai Diễn' },
    { id: 'museum', label: 'Khám Phá Chèo' }
  ];

  const handleNavClick = (id: string) => {
    audioSystem.playBambooClack();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/40 bg-[#0c0d16]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left transition-transform hover:scale-[1.02] focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-gradient-to-br from-amber-900 via-red-950 to-amber-950 shadow-md shadow-red-950/50">
            <span className="text-xl">🏮</span>
            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-theatre text-xl font-bold tracking-wider text-amber-200">
                LÀNG CHÈO
              </span>
              <span className="hidden rounded bg-red-950/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-amber-400 border border-amber-800/40 sm:inline">
                CHIẾU CHÈO ĐÊM TRĂNG
              </span>
            </div>
            <p className="hidden text-xs text-amber-300/70 md:block">
              Trải nghiệm nghệ thuật chèo bằng trò chơi tương tác
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? 'text-amber-300 bg-amber-950/60 border border-amber-700/50 shadow-inner'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/50 bg-stone-900/70 text-amber-300 transition-colors hover:bg-stone-800 hover:text-amber-100"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-stone-500" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Achievements / Points button */}
          <button
            onClick={() => {
              audioSystem.playDrum('cac');
              onOpenAchievements();
            }}
            className="flex items-center gap-1.5 rounded-lg border border-amber-800/60 bg-gradient-to-r from-stone-900 to-amber-950/40 px-2.5 py-1.5 text-xs font-medium text-amber-200 hover:border-amber-600 transition-all"
          >
            <Award className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline font-mono text-amber-300 font-bold">{playerScore}</span>
            <span className="hidden sm:inline text-amber-400/80">Điểm</span>
          </button>

          {/* CTA Play Now */}
          <button
            onClick={() => {
              audioSystem.playDrum('tung');
              onStartGameDirectly();
            }}
            className="flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 px-3.5 py-1.5 text-sm font-semibold text-amber-100 shadow-md shadow-red-950/50 transition-all hover:scale-[1.03] hover:brightness-110 active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>LÊN CHIẾU</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/50 bg-stone-900/70 text-stone-300 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-amber-900/40 bg-[#0d0e19] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium ${
                  currentTab === item.id
                    ? 'bg-amber-950/70 text-amber-200 border border-amber-800/40'
                    : 'text-stone-300 hover:bg-stone-900/80'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && <Sparkles className="h-3.5 w-3.5 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
