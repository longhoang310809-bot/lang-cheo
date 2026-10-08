import React, { useState } from 'react';
import { CHEO_ROLES } from '../data/cheoData';
import { CheoRole } from '../types';
import { Sparkles, Shield, Target, BookOpen, X, Volume2, Music, CheckCircle } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface CharacterGalleryProps {
  onSelectRoleForGame?: (role: CheoRole) => void;
}

export const CharacterGallery: React.FC<CharacterGalleryProps> = ({ onSelectRoleForGame }) => {
  const [selectedRole, setSelectedRole] = useState<CheoRole | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả 7 Vai' },
    { id: 'dao', label: 'Vai Đào (Nữ chính/phụ)' },
    { id: 'he', label: 'Vai Hề (Tiếng cười)' },
    { id: 'lao', label: 'Vai Lão (Chức sắc)' },
    { id: 'mu', label: 'Vai Mụ (Lão bà/Nữ sắc)' }
  ];

  const filteredRoles = activeCategoryFilter === 'all'
    ? CHEO_ROLES
    : CHEO_ROLES.filter((r) => r.category === activeCategoryFilter);

  const handleOpenRole = (role: CheoRole) => {
    audioSystem.playBambooClack();
    setSelectedRole(role);
  };

  const playVoiceSnippet = (phrase: string) => {
    audioSystem.playDeCheo(phrase);
  };

  return (
    <section className="relative border-b border-amber-900/30 bg-[#090a12] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-700/40 bg-red-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Hệ Thống Nhân Vật Điển Hình
          </div>
          <h2 className="mt-3 font-theatre text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
            CÁC VAI DIỄN TRÊN CHIẾU CHÈO
          </h2>
          <p className="mt-3 text-stone-300/80 text-sm sm:text-base">
            “Mỗi vai một thân phận, mỗi tính cách một ước lệ.” Khám phá kho tàng tính cách độc nhất vô nhị của sân khấu kịch hát dân tộc Việt Nam.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                audioSystem.playDrum('cac');
                setActiveCategoryFilter(cat.id);
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeCategoryFilter === cat.id
                  ? 'bg-amber-900/80 text-amber-100 border border-amber-600 shadow-md'
                  : 'bg-stone-900/60 text-stone-300 hover:text-amber-200 hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleOpenRole(role)}
              className="group relative cursor-pointer rounded-2xl border border-amber-900/40 bg-gradient-to-b from-[#181315] to-[#101119] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-2xl hover:shadow-red-950/50 flex flex-col justify-between"
            >
              {/* Top info badge */}
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="rounded bg-amber-950/90 px-2 py-0.5 font-medium text-amber-300 border border-amber-800/40">
                    {role.categoryLabel}
                  </span>
                  <span className={`text-[11px] font-semibold ${
                    role.difficulty === 'Dễ' ? 'text-emerald-400' :
                    role.difficulty === 'Trung bình' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    Độ khó: {role.difficulty}
                  </span>
                </div>

                {/* Avatar / Icon circle */}
                <div className="flex items-center gap-3.5 my-3">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${role.avatarColor} border border-amber-500/40 text-2xl shadow-inner group-hover:scale-105 transition-transform`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="font-theatre text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {role.name}
                    </h3>
                    <p className="text-xs text-amber-300/70 italic font-serif">
                      {role.alias}
                    </p>
                  </div>
                </div>

                {/* Short description */}
                <p className="text-xs text-stone-300/85 line-clamp-2 my-2 leading-relaxed">
                  {role.description}
                </p>

                {/* Signature quote teaser */}
                <div className="rounded-lg bg-stone-900/60 p-2.5 my-3 border border-stone-800 text-[11px] text-amber-200/90 italic font-serif">
                  {role.signaturePhrase}
                </div>
              </div>

              {/* Bottom skill & view more */}
              <div className="pt-3 border-t border-stone-800/80 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[140px]">{role.gameAbility.name}</span>
                  </span>
                  <span className="text-[11px] text-stone-400 group-hover:text-amber-300 transition-colors">
                    Chi tiết &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Modal Character Profile */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-amber-600 bg-gradient-to-b from-[#1a1215] via-[#12131c] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-amber-800 bg-stone-900 text-stone-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-amber-900/40">
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedRole.avatarColor} border-2 border-amber-400 text-4xl shadow-xl`}>
                {selectedRole.icon}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="rounded bg-red-950 px-2 py-0.5 text-xs font-semibold text-amber-300 border border-amber-800">
                    {selectedRole.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-400">
                    Độ khó: <strong className="text-amber-300">{selectedRole.difficulty}</strong>
                  </span>
                </div>
                <h3 className="font-theatre text-2xl sm:text-3xl font-black text-amber-100">
                  {selectedRole.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300/80 italic font-serif">
                  {selectedRole.alias} · {selectedRole.archetype}
                </p>
                <div className="mt-2 text-xs text-stone-400">
                  Tác phẩm mẫu mực: <strong className="text-amber-200">{selectedRole.playExcerpt}</strong>
                </div>
              </div>
            </div>

            {/* Quote with voice button */}
            <div className="my-5 rounded-xl border border-amber-700/50 bg-amber-950/30 p-4 flex items-center justify-between gap-3">
              <p className="font-theatre text-sm sm:text-base italic text-amber-200">
                {selectedRole.signaturePhrase}
              </p>
              <button
                onClick={() => playVoiceSnippet(selectedRole.signaturePhrase)}
                title="Nghe câu thoại xưng danh"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-600 bg-amber-900/60 text-amber-200 hover:bg-amber-800 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* Grid of Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 text-xs sm:text-sm">
              <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Kỹ Năng Chiếu Chèo</span>
                </div>
                <strong className="block text-amber-200 text-sm mb-1">{selectedRole.gameAbility.name}</strong>
                <p className="text-stone-300 text-xs leading-relaxed">{selectedRole.gameAbility.description}</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-4">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <Target className="h-4 w-4" />
                  <span>Mục Tiêu Bí Mật</span>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">{selectedRole.secretObjective}</p>
              </div>
            </div>

            {/* Signature Melody & Cultural Lore */}
            <div className="space-y-3 rounded-xl border border-amber-900/30 bg-stone-950/80 p-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Music className="h-4 w-4" />
                <span>Làn Điệu Ruột:</span>
                <span className="text-amber-200 font-normal">{selectedRole.signatureMelody}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-300">
                <BookOpen className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <p className="text-xs leading-relaxed text-stone-300/90">
                  <strong className="text-amber-300">Góc nhìn văn hóa chèo: </strong>
                  {selectedRole.culturalInsight}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={() => setSelectedRole(null)}
                className="px-4 py-2 rounded-lg border border-stone-700 bg-stone-900 text-xs font-medium text-stone-300 hover:bg-stone-800"
              >
                Đóng
              </button>
              {onSelectRoleForGame && (
                <button
                  onClick={() => {
                    onSelectRoleForGame(selectedRole);
                    setSelectedRole(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-amber-400 bg-gradient-to-r from-red-800 to-amber-700 text-xs font-bold text-amber-100 hover:brightness-110"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Chọn Vai Này Cho Ván Chơi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
