import React, { useState } from 'react';
import { CHEO_KNOWLEDGE_BASE, CHEO_INSTRUMENTS } from '../data/cheoData';
import { CheoKnowledgeItem, CheoInstrument } from '../types';
import { Search, Volume2, BookOpen, Sparkles, X, Music, Play, Layers } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export const KnowledgeLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CheoKnowledgeItem | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<CheoInstrument | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'art', label: 'Nghệ Thuật Sân Đình' },
    { id: 'characters', label: 'Hệ Thống Vai Diễn' },
    { id: 'melodies', label: 'Làn Điệu Kinh Điển' },
    { id: 'instruments', label: 'Dàn Nhạc & Nhạc Cụ' },
    { id: 'costume', label: 'Đạo Cụ & Ước Lệ' },
    { id: 'plays', label: 'Vở Chèo Mẫu Mực' }
  ];

  const filteredItems = CHEO_KNOWLEDGE_BASE.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const playInstrumentSound = (inst: CheoInstrument) => {
    if (inst.soundType === 'drum') {
      audioSystem.playDrum('roll');
    } else if (inst.soundType === 'erhu') {
      audioSystem.playMelodicPhrase('dao_lieu');
    } else if (inst.soundType === 'moon') {
      audioSystem.playMelodicPhrase('he_moi');
    } else if (inst.soundType === 'wood' || inst.soundType === 'bell') {
      audioSystem.playDrum('boong');
    } else {
      audioSystem.playMelodicPhrase('victory');
    }
  };

  return (
    <section className="relative border-b border-amber-900/30 bg-[#080911] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Bảo Tàng Số Chèo Cổ Bắc Bộ
          </div>
          <h2 className="mt-3 font-theatre text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
            KHÁM PHÁ DI SẢN CHÈO
          </h2>
          <p className="mt-3 text-stone-300/80 text-sm sm:text-base">
            Không gian trưng bày tương tác sống động về nghệ thuật kịch hát dân gian. Tìm hiểu từ nguồn gốc sân đình, làn điệu, âm vang dàn nhạc cho đến kỹ pháp ước lệ độc đáo.
          </p>
        </div>

        {/* ================= SPECIAL EXHIBIT: DÀN NHẠC CỤ TƯƠNG TÁC ================= */}
        <div className="mb-14 rounded-3xl border-2 border-amber-700/50 bg-gradient-to-br from-[#1b1216] via-[#12131f] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-900/40">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Khu Trưng Bày Đặc Biệt
              </span>
              <h3 className="font-theatre text-2xl font-bold text-amber-100 mt-1">
                Dàn Nhạc Chèo Cổ & Thanh Âm Sân Đình
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Chạm vào từng nhạc cụ để lắng nghe âm sắc và thấu hiểu vai trò chỉ huy trên chiếu chèo
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-800">
              <Volume2 className="h-4 w-4" />
              <span>Tương tác âm thanh trực tiếp</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHEO_INSTRUMENTS.map((inst) => (
              <div
                key={inst.id}
                onClick={() => {
                  setSelectedInstrument(inst);
                  playInstrumentSound(inst);
                }}
                className="group cursor-pointer rounded-2xl border border-amber-900/50 bg-stone-900/60 p-4 transition-all duration-300 hover:border-amber-400 hover:bg-stone-850 hover:shadow-xl hover:shadow-red-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded bg-red-950 px-2 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-800/60">
                    Bộ {inst.type}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playInstrumentSound(inst);
                    }}
                    title="Nghe tiếng đàn/trống"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-700 bg-amber-900/60 text-amber-200 hover:bg-amber-800 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>

                <h4 className="font-theatre text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                  {inst.name}
                </h4>

                <p className="text-xs text-stone-300/80 line-clamp-2 my-2 leading-relaxed">
                  {inst.description}
                </p>

                <div className="text-[11px] text-amber-400/80 font-serif italic pt-2 border-t border-stone-800/80">
                  {inst.roleInOrchestra}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SEARCH & CATEGORY FILTERS ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  audioSystem.playBambooClack();
                  setActiveCategory(c.id);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-amber-900/80 text-amber-100 border border-amber-600 shadow'
                    : 'bg-stone-900/60 text-stone-300 hover:text-amber-200 hover:bg-stone-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm kiến thức chèo..."
              className="w-full rounded-xl border border-stone-800 bg-stone-900/80 pl-9 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* ================= MUSEUM EXHIBITS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                audioSystem.playBambooClack();
                setSelectedItem(item);
              }}
              className="group cursor-pointer rounded-2xl border border-amber-900/40 bg-gradient-to-b from-[#171418] to-[#0e101b] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="rounded bg-amber-950/80 px-2 py-0.5 text-amber-300 font-medium border border-amber-800/40">
                    {item.highlightTag}
                  </span>
                  <span className="text-[11px] text-stone-400 font-serif">Chuyên đề</span>
                </div>

                <h3 className="font-theatre text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-300/70 italic font-serif mb-3">
                  {item.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-stone-300/85 leading-relaxed line-clamp-3 mb-4">
                  {item.summary}
                </p>

                {item.keyQuote && (
                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-3 text-xs text-amber-200/90 italic font-serif leading-relaxed my-2">
                    {item.keyQuote}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-800/80 mt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400 line-clamp-1 max-w-[200px]">
                  💡 {item.trivia}
                </span>
                <span className="text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                  Đọc thêm &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DETAIL EXHIBIT MODAL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-[#1e1317] via-[#141523] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-amber-800 bg-stone-900 text-stone-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="rounded bg-red-950 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-800 mb-2 inline-block">
              {selectedItem.highlightTag}
            </span>

            <h3 className="font-theatre text-2xl sm:text-3xl font-black text-amber-100 mt-2">
              {selectedItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300/80 italic font-serif mb-4">
              {selectedItem.subtitle}
            </p>

            <div className="my-4 rounded-xl border border-amber-700/50 bg-amber-950/30 p-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-serif italic">
              {selectedItem.summary}
            </div>

            {selectedItem.keyQuote && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 my-4 text-xs sm:text-sm text-amber-200 font-serif italic">
                {selectedItem.keyQuote}
              </div>
            )}

            <div className="space-y-3 my-5 text-xs sm:text-sm text-stone-300/90 leading-relaxed">
              <strong className="text-amber-300 block text-xs uppercase tracking-wider">
                Nội Dung Chi Tiết:
              </strong>
              {selectedItem.content.map((para, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-serif text-base">•</span>
                  <span>{para}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-4 mt-6 text-xs text-stone-300">
              <strong className="text-amber-400 block mb-1">Kiến thức bên lề thú vị:</strong>
              {selectedItem.trivia}
            </div>

            <div className="mt-6 flex justify-end pt-4 border-t border-stone-800">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl border border-amber-600 bg-amber-900/80 text-xs font-bold text-amber-100 hover:bg-amber-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INSTRUMENT DETAIL MODAL ================= */}
      {selectedInstrument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-[#1b1216] to-[#0c0d16] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedInstrument(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-amber-800 bg-stone-900 text-stone-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="rounded bg-red-950 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-800 mb-2 inline-block">
              Nhạc cụ truyền thống: Bộ {selectedInstrument.type}
            </span>

            <h3 className="font-theatre text-2xl font-bold text-amber-100 mt-2">
              {selectedInstrument.name}
            </h3>

            <p className="text-xs sm:text-sm text-stone-200 my-4 leading-relaxed">
              {selectedInstrument.description}
            </p>

            <div className="space-y-3 rounded-2xl border border-amber-900/40 bg-stone-950/80 p-4 text-xs">
              <div>
                <strong className="text-amber-400 block mb-0.5">Vai trò trong dàn nhạc:</strong>
                <p className="text-stone-300">{selectedInstrument.roleInOrchestra}</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <strong className="text-amber-400 block mb-0.5">Ý nghĩa văn hóa & phong tục:</strong>
                <p className="text-stone-300">{selectedInstrument.culturalNote}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={() => playInstrumentSound(selectedInstrument)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500 bg-amber-900 text-xs font-bold text-amber-100 hover:bg-amber-800"
              >
                <Volume2 className="h-4 w-4" />
                <span>Gõ / Kéo Âm Sắc Lần Nữa</span>
              </button>

              <button
                onClick={() => setSelectedInstrument(null)}
                className="px-4 py-2 rounded-xl border border-stone-700 bg-stone-900 text-xs text-stone-300 hover:bg-stone-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
