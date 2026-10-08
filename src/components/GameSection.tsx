import React, { useState, useEffect, useRef } from 'react';
import { GameRoom, Player, GameCard, CheoRole, GameEvent } from '../types';
import { CHEO_ROLES, GAME_SCENARIOS, GAME_CARDS } from '../data/cheoData';
import { audioSystem } from '../utils/audioSystem';
import { FanGestureModal } from './FanGestureModal';
import { 
  Users, Play, Sparkles, MessageCircle, Trophy, Volume2, 
  HelpCircle, Shield, Award, RotateCcw, Send, Compass, Eye, CheckCircle2, AlertCircle
} from 'lucide-react';

interface GameSectionProps {
  onGameFinish?: (pointsEarned: number) => void;
  onExploreMuseum?: () => void;
  preselectedRole?: CheoRole | null;
}

export const GameSection: React.FC<GameSectionProps> = ({
  onGameFinish,
  onExploreMuseum,
  preselectedRole
}) => {
  // Setup States
  const [playerName, setPlayerName] = useState('Đào Kép Trẻ');
  const [selectedAvatar, setSelectedAvatar] = useState('🎭');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [activeTabMode, setActiveTabMode] = useState<'create' | 'join' | 'solo'>('solo');

  // Game Room State
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);

  // Active turn & card interaction states
  const [activeCard, setActiveCard] = useState<GameCard | null>(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isFanModalOpen, setIsFanModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showCluesBag, setShowCluesBag] = useState(false);

  const eventFeedEndRef = useRef<HTMLDivElement>(null);

  // Avatars options
  const avatars = ['🎭', '🌸', '🪷', '🎋', '📜', '🪘', '🪭', '🏮'];

  // Scroll event feed to bottom
  useEffect(() => {
    if (eventFeedEndRef.current) {
      eventFeedEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gameRoom?.events]);

  // Handle Create / Start Solo Game
  const handleStartGame = (mode: 'create' | 'solo') => {
    audioSystem.playDrum('tung');
    const scenario = GAME_SCENARIOS[selectedScenarioIdx];
    const generatedCode = 'CHEO' + Math.floor(100 + Math.random() * 900);

    // Roles assignment
    const shuffledRoles = [...CHEO_ROLES].sort(() => 0.5 - Math.random());
    const myRole = preselectedRole || shuffledRoles[0];

    // Players setup
    const hostPlayer: Player = {
      id: 'p_me',
      name: playerName.trim() || 'Đào Kép Trẻ',
      avatar: selectedAvatar,
      role: myRole,
      prestige: 10,
      stagePresence: 5,
      cluesCollected: [],
      isHost: true,
      isReady: true,
      isBot: false
    };

    // Bot companions
    const botNames = [
      { name: 'Anh Hai Xóm Đình', avatar: '🎋' },
      { name: 'Chị Ba Thôn Đoài', avatar: '🌸' },
      { name: 'Cụ Từ Canh Mõ', avatar: '🪘' }
    ];

    const players: Player[] = [hostPlayer];
    const otherRoles = shuffledRoles.filter((r) => r.id !== myRole.id);

    botNames.forEach((bot, i) => {
      players.push({
        id: `p_bot_${i}`,
        name: bot.name,
        avatar: bot.avatar,
        role: otherRoles[i % otherRoles.length],
        prestige: 8 + Math.floor(Math.random() * 5),
        stagePresence: 4 + Math.floor(Math.random() * 4),
        cluesCollected: [],
        isHost: false,
        isReady: true,
        isBot: true
      });
    });

    const initialEvents: GameEvent[] = [
      {
        id: 'e_0',
        timestamp: 'Mở màn',
        text: `Đêm hội chèo khai mở! Vở diễn: "${scenario.name}" bắt đầu.`,
        type: 'system'
      },
      {
        id: 'e_1',
        timestamp: 'Xưng danh',
        text: `${hostPlayer.name} bước lên chiếu chèo nhập vai ${myRole.name} (${myRole.categoryLabel}).`,
        type: 'action'
      }
    ];

    const newRoom: GameRoom = {
      code: generatedCode,
      name: `Chiếu Chèo ${scenario.name.split(':')[0]}`,
      scenarioName: scenario.name,
      scenarioDescription: scenario.description,
      scenarioMystery: scenario.mystery,
      maxPlayers: 4,
      round: 1,
      maxRounds: 5,
      turnPlayerIndex: 0,
      turnTimeLeft: 45,
      phase: 'playing',
      players,
      drawnCards: [],
      events: initialEvents,
      solvedCluesCount: 0,
      totalCluesNeeded: scenario.cluesTarget
    };

    setGameRoom(newRoom);
    audioSystem.playMelodicPhrase('he_moi');
  };

  // Handle Join Room
  const handleJoinGame = () => {
    if (!roomCodeInput.trim()) {
      alert('Vui lòng nhập mã phòng (Ví dụ: CHEO123)');
      return;
    }
    // Simulate joining
    handleStartGame('solo');
  };

  // Draw Card action
  const handleDrawCard = () => {
    if (!gameRoom || activeCard) return;

    audioSystem.playDrum('roll');

    // Pick random card from available cards
    const availableCards = GAME_CARDS;
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

    setActiveCard(randomCard);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);

    if (randomCard.type === 'melody' && randomCard.audioKey) {
      audioSystem.playMelodicPhrase(randomCard.audioKey as 'he_moi' | 'dao_lieu');
    }

    // Add event to log
    addGameEvent({
      id: `e_${Date.now()}`,
      timestamp: `Vòng ${gameRoom.round}`,
      text: `${gameRoom.players[gameRoom.turnPlayerIndex].name} vừa rút thẻ: "${randomCard.title}" (${randomCard.subtitle}).`,
      type: randomCard.type === 'quiz' ? 'quiz' : 'clue'
    });
  };

  // Add event helper
  const addGameEvent = (newEvent: GameEvent) => {
    if (!gameRoom) return;
    setGameRoom((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        events: [...prev.events, newEvent]
      };
    });
  };

  // Resolve Active Card
  const handleResolveCard = (pointsWon: number, isClue: boolean = false) => {
    if (!gameRoom || !activeCard) return;

    const currentPlayer = gameRoom.players[gameRoom.turnPlayerIndex];
    let newSolvedClues = gameRoom.solvedCluesCount;

    const updatedPlayers = gameRoom.players.map((p) => {
      if (p.id === currentPlayer.id) {
        const newClues = isClue ? [...p.cluesCollected, activeCard.title] : p.cluesCollected;
        return {
          ...p,
          prestige: p.prestige + pointsWon,
          stagePresence: p.stagePresence + 2,
          cluesCollected: newClues
        };
      }
      return p;
    });

    if (isClue) {
      newSolvedClues += 1;
    }

    setActiveCard(null);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);

    // Check victory condition or advance turn
    if (newSolvedClues >= gameRoom.totalCluesNeeded || gameRoom.round >= gameRoom.maxRounds) {
      // Trigger Game Over / Hạ Màn
      triggerGameOver(updatedPlayers, newSolvedClues);
    } else {
      advanceTurn(updatedPlayers, newSolvedClues);
    }
  };

  // Trigger Tiếng Đế Audience reaction
  const handleTriggerDeCheo = (phrase: string) => {
    audioSystem.playDeCheo(phrase);
    if (!gameRoom) return;

    addGameEvent({
      id: `de_${Date.now()}`,
      timestamp: 'Tiếng Đế',
      text: `🗣️ Khán giả & dàn nhạc đồng thanh đế: “${phrase}”`,
      type: 'de_cheo'
    });
  };

  // Use Role Skill
  const handleUseRoleSkill = () => {
    if (!gameRoom) return;
    const myPlayer = gameRoom.players[0];
    if (!myPlayer.role) return;

    audioSystem.playDrum('boong');

    addGameEvent({
      id: `skill_${Date.now()}`,
      timestamp: 'Kỹ Năng',
      text: `✨ ${myPlayer.name} thi triển tuyệt kỹ "${myPlayer.role.gameAbility.name}": ${myPlayer.role.gameAbility.description}`,
      type: 'action'
    });

    // Award bonus prestige
    setGameRoom((prev) => {
      if (!prev) return null;
      const updated = prev.players.map((p, idx) =>
        idx === 0 ? { ...p, stagePresence: p.stagePresence + 3, prestige: p.prestige + 5 } : p
      );
      return { ...prev, players: updated };
    });
  };

  // Advance turn to next player (Simulate bot turns seamlessly)
  const advanceTurn = (currentPlayers: Player[], solvedClues: number) => {
    if (!gameRoom) return;

    const nextIndex = (gameRoom.turnPlayerIndex + 1) % currentPlayers.length;
    const nextRound = nextIndex === 0 ? gameRoom.round + 1 : gameRoom.round;

    setGameRoom((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        players: currentPlayers,
        turnPlayerIndex: nextIndex,
        round: nextRound,
        solvedCluesCount: solvedClues
      };
    });

    // If next player is bot, trigger automated pleasant action after brief delay
    if (currentPlayers[nextIndex].isBot) {
      setTimeout(() => {
        simulateBotTurn(nextIndex, currentPlayers, nextRound, solvedClues);
      }, 1200);
    }
  };

  // Bot Turn Simulation
  const simulateBotTurn = (botIdx: number, playersList: Player[], round: number, solvedClues: number) => {
    audioSystem.playBambooClack();
    const bot = playersList[botIdx];
    const actions = [
      `hát câu xưng danh và nhận được tràng pháo tay của thôn hạ (+5 uy tín)`,
      `tìm thấy một manh mối quan trọng về vụ án (+1 manh mối)`,
      `đối đáp sắc sảo với Xã Trưởng làm sáng tỏ một góc khuất (+7 uy tín)`
    ];
    const chosenAction = actions[Math.floor(Math.random() * actions.length)];

    const isFindingClue = chosenAction.includes('manh mối');
    const newCluesCount = isFindingClue ? solvedClues + 1 : solvedClues;

    const updatedPlayers = playersList.map((p, idx) => {
      if (idx === botIdx) {
        return {
          ...p,
          prestige: p.prestige + 6,
          stagePresence: p.stagePresence + 2,
          cluesCollected: isFindingClue ? [...p.cluesCollected, 'Manh mối của ' + bot.name] : p.cluesCollected
        };
      }
      return p;
    });

    addGameEvent({
      id: `bot_${Date.now()}`,
      timestamp: `Vòng ${round}`,
      text: `🎭 ${bot.name} (${bot.role?.name}) ${chosenAction}`,
      type: 'action'
    });

    // Check game over or continue to next player
    if (newCluesCount >= (gameRoom?.totalCluesNeeded || 4) || round >= 5) {
      triggerGameOver(updatedPlayers, newCluesCount);
    } else {
      const nextIdx = (botIdx + 1) % updatedPlayers.length;
      const nextR = nextIdx === 0 ? round + 1 : round;

      setGameRoom((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          players: updatedPlayers,
          turnPlayerIndex: nextIdx,
          round: nextR,
          solvedCluesCount: newCluesCount
        };
      });

      if (updatedPlayers[nextIdx].isBot) {
        setTimeout(() => {
          simulateBotTurn(nextIdx, updatedPlayers, nextR, newCluesCount);
        }, 1200);
      }
    }
  };

  // Trigger Hạ Màn (Game Over)
  const triggerGameOver = (finalPlayers: Player[], cluesSolved: number) => {
    audioSystem.playDrum('roll');
    audioSystem.playMelodicPhrase('victory');

    // Find MVP
    const sorted = [...finalPlayers].sort((a, b) => (b.prestige + b.stagePresence * 2) - (a.prestige + a.stagePresence * 2));
    const winner = sorted[0];

    setGameRoom((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        players: finalPlayers,
        phase: 'game_over',
        solvedCluesCount: cluesSolved,
        winnerPlayerId: winner.id,
        events: [
          ...prev.events,
          {
            id: `gov_${Date.now()}`,
            timestamp: 'HẠ MÀN',
            text: `Rèm sân khấu hạ xuống! Vở diễn kết thúc vẻ vang. Đào Kép Xuất Sắc Nhất: ${winner.name} (${winner.role?.name}).`,
            type: 'system'
          }
        ]
      };
    });

    if (onGameFinish) {
      onGameFinish(winner.prestige * 2);
    }
  };

  // Reset Game
  const handleRestart = () => {
    audioSystem.playDrum('tung');
    setGameRoom(null);
    setActiveCard(null);
  };

  // Send stage chat message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !gameRoom) return;

    addGameEvent({
      id: `chat_${Date.now()}`,
      timestamp: 'Thoại',
      text: `💬 ${playerName}: "${chatMessage.trim()}"`,
      type: 'action'
    });
    setChatMessage('');
  };

  // ==========================================
  // VIEW 1: LOBBY & SETUP
  // ==========================================
  if (!gameRoom || gameRoom.phase === 'landing' || gameRoom.phase === 'lobby') {
    return (
      <section id="game-lobby-section" className="relative border-b border-amber-900/30 bg-[#0a0b13] px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="rounded-full bg-red-950 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800/50">
              Chiếu Chèo Sân Đình
            </span>
            <h2 className="mt-3 font-theatre text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
              BẮT ĐẦU VỞ DIỄN
            </h2>
            <p className="mt-2 text-stone-300/80 text-sm">
              Chọn kịch bản, đặt tên nghệ danh và bước lên chiếu cói cùng các đào kép làng chèo.
            </p>
          </div>

          {/* Lobby Card Container */}
          <div className="rounded-2xl border-2 border-amber-700/60 bg-gradient-to-b from-[#181316] to-[#0e101b] p-6 sm:p-8 shadow-2xl">
            {/* Mode Tabs */}
            <div className="flex border-b border-amber-900/40 pb-4 mb-6 gap-2">
              <button
                onClick={() => setActiveTabMode('solo')}
                className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTabMode === 'solo'
                    ? 'bg-amber-900/80 text-amber-100 border border-amber-600 shadow'
                    : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
                }`}
              >
                🏮 Chơi Ngay (Có Bạn Diễn AI)
              </button>
              <button
                onClick={() => setActiveTabMode('create')}
                className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTabMode === 'create'
                    ? 'bg-amber-900/80 text-amber-100 border border-amber-600 shadow'
                    : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
                }`}
              >
                👥 Tạo Phòng Riêng
              </button>
              <button
                onClick={() => setActiveTabMode('join')}
                className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTabMode === 'join'
                    ? 'bg-amber-900/80 text-amber-100 border border-amber-600 shadow'
                    : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
                }`}
              >
                🔑 Nhập Mã Phòng
              </button>
            </div>

            {/* Inputs: Player Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  Nghệ Danh Của Bạn (Tên người chơi)
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ví dụ: Đào Kép Trẻ, Thị Kính 2K8..."
                  maxLength={24}
                  className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  Chọn Mặt Nạ / Biểu Tượng Sân Khấu
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all border ${
                        selectedAvatar === av
                          ? 'border-amber-400 bg-amber-900/80 shadow-md scale-105'
                          : 'border-stone-800 bg-stone-900/50 hover:bg-stone-800'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Join Room Code input if active */}
            {activeTabMode === 'join' && (
              <div className="mb-6 rounded-xl border border-amber-800/50 bg-stone-950/60 p-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  Nhập Mã Phòng (Ví dụ: CHEO789)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={roomCodeInput}
                    onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                    placeholder="MÃ PHÒNG"
                    className="flex-1 rounded-xl border border-amber-800 bg-stone-900 px-4 py-2.5 font-mono text-base uppercase text-amber-200 focus:outline-none"
                  />
                  <button
                    onClick={handleJoinGame}
                    className="rounded-xl border border-amber-400 bg-red-800 px-6 py-2.5 font-bold text-amber-100 hover:brightness-110"
                  >
                    Tham Gia
                  </button>
                </div>
              </div>
            )}

            {/* Scenarios Carousel / Selection */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
                Chọn Vở Diễn / Vụ Án Chiếu Chèo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GAME_SCENARIOS.map((scen, idx) => (
                  <div
                    key={scen.id}
                    onClick={() => {
                      setSelectedScenarioIdx(idx);
                      audioSystem.playBambooClack();
                    }}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      selectedScenarioIdx === idx
                        ? 'border-amber-400 bg-gradient-to-b from-red-950/70 to-amber-950/50 shadow-lg'
                        : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-200 line-clamp-1 mb-1">
                      {scen.name}
                    </div>
                    <p className="text-[11px] text-stone-300/80 line-clamp-2 leading-relaxed">
                      {scen.description}
                    </p>
                    <div className="mt-2 text-[10px] text-amber-400/90 font-semibold">
                      Cần tìm: {scen.cluesTarget} manh mối
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preselected Role info */}
            {preselectedRole && (
              <div className="mb-6 rounded-xl border border-amber-600/50 bg-amber-950/30 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{preselectedRole.icon}</span>
                  <div>
                    <span className="text-xs text-amber-400 font-semibold block">Vai Diễn Đã Chọn Trước:</span>
                    <strong className="text-stone-100 text-sm">{preselectedRole.name} ({preselectedRole.categoryLabel})</strong>
                  </div>
                </div>
                <span className="text-xs text-amber-300/80 italic">{preselectedRole.gameAbility.name}</span>
              </div>
            )}

            {/* Start Button */}
            <div className="flex items-center justify-center pt-4 border-t border-amber-900/40">
              <button
                onClick={() => handleStartGame(activeTabMode === 'join' ? 'solo' : activeTabMode)}
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto rounded-xl border border-amber-400/60 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 px-10 py-4 text-lg font-bold text-amber-100 shadow-xl shadow-red-950/70 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              >
                <Play className="h-5 w-5 fill-current text-amber-300 group-hover:scale-110 transition-transform" />
                <span>MỞ MÀN KHAI CHIẾU</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE GAME THEATRE ("CHIẾU CHÈO")
  // ==========================================
  const currentPlayer = gameRoom.players[gameRoom.turnPlayerIndex];
  const isMyTurn = gameRoom.turnPlayerIndex === 0;

  return (
    <section className="relative min-h-screen bg-[#07080f] px-2 sm:px-4 py-4 md:py-6 text-stone-100 flex flex-col justify-between">
      {/* ================= TOP BAR ================= */}
      <div className="rounded-xl border border-amber-900/50 bg-[#12131d]/90 p-3 md:p-4 backdrop-blur-md mb-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Room & Scenario */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-theatre text-base md:text-lg font-bold text-amber-200">
                {gameRoom.scenarioName}
              </span>
              <span className="rounded bg-red-950/90 px-2 py-0.5 font-mono text-xs font-bold text-amber-400 border border-amber-800/40">
                Mã: {gameRoom.code}
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Bí ẩn: {gameRoom.scenarioMystery}
            </p>
          </div>

          {/* Round & Clues Progress */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-800/50 bg-stone-900/80 px-3 py-1.5">
              <span className="text-amber-400 font-semibold">Vòng Chơi:</span>
              <span className="font-mono font-bold text-amber-200">{gameRoom.round} / {gameRoom.maxRounds}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-red-800/50 bg-red-950/60 px-3 py-1.5">
              <span className="text-red-300 font-semibold">Manh Mối:</span>
              <span className="font-mono font-bold text-amber-300">
                {gameRoom.solvedCluesCount} / {gameRoom.totalCluesNeeded}
              </span>
            </div>

            {/* Quick Fan Gesture tool */}
            <button
              onClick={() => setIsFanModalOpen(true)}
              className="flex items-center gap-1 rounded-lg border border-amber-600 bg-amber-900/60 px-2.5 py-1.5 text-xs text-amber-200 hover:bg-amber-800 transition-colors"
            >
              <span>🪭</span>
              <span className="hidden sm:inline">Quạt Chèo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN THEATRE BOARD ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* LEFT PANEL: Đào Kép Roster (Cols 3) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="rounded-xl border border-amber-900/40 bg-[#12131d]/90 p-4 shadow">
            <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Đào Kép Lên Chiếu
              </span>
              <span className="text-xs text-stone-400">{gameRoom.players.length} Diễn viên</span>
            </div>

            <div className="space-y-2.5">
              {gameRoom.players.map((p, idx) => {
                const isActing = idx === gameRoom.turnPlayerIndex;
                return (
                  <div
                    key={p.id}
                    className={`rounded-xl border p-3 transition-all ${
                      isActing
                        ? 'border-amber-400 bg-gradient-to-r from-red-950/80 to-amber-950/60 shadow-md ring-1 ring-amber-400/40'
                        : 'border-stone-800/80 bg-stone-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.avatar}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-stone-100">{p.name}</span>
                            {idx === 0 && (
                              <span className="text-[10px] text-amber-400 font-semibold">(Bạn)</span>
                            )}
                          </div>
                          <span className="text-[11px] text-amber-300/80 font-serif">
                            {p.role?.name} ({p.role?.categoryLabel})
                          </span>
                        </div>
                      </div>

                      {isActing && (
                        <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-stone-900 animate-pulse">
                          Lên Chiếu
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1.5 border-t border-stone-800/60">
                      <span>Uy Tín: <strong className="text-amber-300 font-mono">{p.prestige}</strong></span>
                      <span>Tâm Điểm: <strong className="text-red-300 font-mono">{'★'.repeat(Math.min(5, p.stagePresence))}</strong></span>
                      <span>Vật Chứng: <strong className="text-emerald-400 font-mono">{p.cluesCollected.length}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Player's Secret Role Dossier */}
          {gameRoom.players[0].role && (
            <div className="rounded-xl border border-red-900/40 bg-gradient-to-b from-[#1a1215] to-[#11121d] p-4 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                <Shield className="h-4 w-4" />
                <span>Mục Tiêu Bí Mật Của Bạn:</span>
              </div>
              <p className="text-stone-300 leading-relaxed mb-3">
                {gameRoom.players[0].role.secretObjective}
              </p>
              <button
                onClick={handleUseRoleSkill}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/60 bg-gradient-to-r from-red-900 to-amber-800 py-2 font-semibold text-amber-200 hover:brightness-110 transition-all active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Dùng Tuyệt Kỹ: {gameRoom.players[0].role.gameAbility.name}</span>
              </button>
            </div>
          )}
        </div>

        {/* CENTER STAGE: Chiếu Cói Sân Đình (Cols 6) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="relative rounded-2xl border-4 border-amber-800/80 bg-gradient-to-b from-[#1f1510] via-[#15131c] to-[#0d0f18] p-4 sm:p-6 shadow-2xl flex-1 flex flex-col justify-between overflow-hidden">
            {/* Theatrical Mat Pattern Border */}
            <div className="absolute inset-2 border border-dashed border-amber-600/30 rounded-xl pointer-events-none" />

            {/* Spotlight Banner on top of the stage */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/60 px-4 py-1 text-xs text-amber-200 font-semibold shadow">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>Lượt diễn: {currentPlayer.name} ({currentPlayer.role?.name})</span>
              </div>
            </div>

            {/* Center Deck & Interaction Area */}
            <div className="my-auto py-6 text-center">
              {!activeCard ? (
                <div className="max-w-md mx-auto">
                  {/* Visual Mat Deck of Cards */}
                  <div className="relative mx-auto w-44 h-60 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-red-900 via-amber-950 to-stone-900 p-4 shadow-2xl flex flex-col items-center justify-between transition-transform hover:scale-105">
                    <span className="text-4xl mt-3">📜</span>
                    <div className="text-center">
                      <div className="font-theatre text-base font-bold text-amber-200">
                        CỌC BÀI ĐÌNH TRUNG
                      </div>
                      <p className="text-[10px] text-amber-300/70 mt-1">
                        Manh Mối · Làn Điệu · Câu Đố
                      </p>
                    </div>
                    <div className="w-full text-center py-1 bg-black/40 rounded border border-amber-600/30 text-[10px] text-amber-400 font-mono">
                      ✦ SÂN ĐÌNH CHÈO ✦
                    </div>
                  </div>

                  {/* Draw Action Button */}
                  <div className="mt-6">
                    {isMyTurn ? (
                      <button
                        onClick={handleDrawCard}
                        className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 px-8 py-3.5 text-base font-bold text-amber-100 shadow-xl shadow-red-950/70 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
                      >
                        <Sparkles className="h-5 w-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                        <span>RÚT THẺ SÂN ĐÌNH</span>
                      </button>
                    ) : (
                      <div className="text-xs text-stone-400 italic">
                        Đang đợi đào kép {currentPlayer.name} diễn xuất...
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ACTIVE CARD MODAL / REVEAL */
                <div className="max-w-lg mx-auto rounded-2xl border-2 border-amber-500 bg-gradient-to-b from-[#211516] via-[#171522] to-[#0f101c] p-6 text-left shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between mb-3 border-b border-amber-900/40 pb-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      activeCard.type === 'clue' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                      activeCard.type === 'melody' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                      activeCard.type === 'quiz' ? 'bg-purple-950 text-purple-300 border border-purple-700' :
                      'bg-red-950 text-red-300 border border-red-700'
                    }`}>
                      {activeCard.type === 'clue' ? '🔍 Thẻ Manh Mối' :
                       activeCard.type === 'melody' ? '🎶 Thẻ Làn Điệu Chèo' :
                       activeCard.type === 'quiz' ? '❓ Thẻ Thách Thức Văn Hóa' : '⚡ Biến Cố Đình Làng'}
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-400">
                      +{activeCard.points} Điểm
                    </span>
                  </div>

                  <h3 className="font-theatre text-xl font-bold text-amber-100 mb-1">
                    {activeCard.title}
                  </h3>
                  <p className="text-xs text-amber-300/70 italic mb-3 font-serif">
                    {activeCard.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-3">
                    {activeCard.description}
                  </p>

                  {/* LORE BOX */}
                  <div className="rounded-xl border border-stone-800 bg-stone-950/70 p-3 mb-4 text-xs text-stone-300/90 leading-relaxed">
                    <strong className="text-amber-400 block mb-0.5">Ý nghĩa văn hóa:</strong>
                    {activeCard.lore}
                  </div>

                  {/* SPECIFIC CARD TYPE INTERACTIONS */}
                  {/* Case 1: Quiz */}
                  {activeCard.type === 'quiz' && activeCard.quizQuestion && (
                    <div className="my-4 space-y-2">
                      <div className="font-semibold text-xs sm:text-sm text-amber-200 mb-2">
                        {activeCard.quizQuestion.question}
                      </div>

                      {activeCard.quizQuestion.options.map((opt, oIdx) => {
                        let btnStyle = 'border-stone-800 bg-stone-900/80 text-stone-300 hover:bg-stone-800';
                        if (quizSubmitted) {
                          if (oIdx === activeCard.quizQuestion?.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold';
                          } else if (quizSelectedOption === oIdx) {
                            btnStyle = 'border-red-500 bg-red-950/80 text-red-300';
                          }
                        } else if (quizSelectedOption === oIdx) {
                          btnStyle = 'border-amber-400 bg-amber-950/80 text-amber-200';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizSelectedOption(oIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all ${btnStyle}`}
                          >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}

                      {quizSubmitted && (
                        <div className="mt-3 p-3 rounded-xl border border-amber-800/60 bg-amber-950/40 text-xs text-stone-200 leading-relaxed">
                          <strong className="text-amber-300 block mb-1">
                            {quizSelectedOption === activeCard.quizQuestion.correctIndex
                              ? '🎉 Xuất sắc! Trả lời chính xác!'
                              : '💡 Lời giải thích:'}
                          </strong>
                          {activeCard.quizQuestion.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Case 2: Melody Card */}
                  {activeCard.type === 'melody' && activeCard.melodyInfo && (
                    <div className="my-3 rounded-xl border border-emerald-800/50 bg-emerald-950/30 p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-300 text-sm">
                          {activeCard.melodyInfo.melodyName}
                        </strong>
                        <button
                          onClick={() => activeCard.audioKey && audioSystem.playMelodicPhrase(activeCard.audioKey as 'he_moi' | 'dao_lieu')}
                          className="flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-900/60 px-2.5 py-1 text-emerald-200 hover:bg-emerald-800"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>Nghe Làn Điệu</span>
                        </button>
                      </div>
                      <p className="text-stone-300 italic font-serif">
                        Lời mẫu: {activeCard.melodyInfo.sampleLyrics}
                      </p>
                      <div className="text-[11px] text-stone-400">
                        Cảm xúc: <span className="text-amber-300">{activeCard.melodyInfo.emotion}</span> · Nhịp: {activeCard.melodyInfo.tempo}
                      </div>
                    </div>
                  )}

                  {/* Resolve Card Buttons */}
                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                    {activeCard.type === 'quiz' && !quizSubmitted ? (
                      <button
                        disabled={quizSelectedOption === null}
                        onClick={() => {
                          setQuizSubmitted(true);
                          const isCorrect = quizSelectedOption === activeCard.quizQuestion?.correctIndex;
                          if (isCorrect) {
                            audioSystem.playMelodicPhrase('victory');
                          } else {
                            audioSystem.playDrum('cac');
                          }
                        }}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                          quizSelectedOption !== null
                            ? 'border border-amber-400 bg-red-800 text-amber-100 hover:brightness-110'
                            : 'opacity-50 cursor-not-allowed bg-stone-800 text-stone-500'
                        }`}
                      >
                        Nộp Câu Trả Lời
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const pts = activeCard.type === 'quiz'
                            ? (quizSelectedOption === activeCard.quizQuestion?.correctIndex ? activeCard.points : 5)
                            : activeCard.points;
                          handleResolveCard(pts, activeCard.type === 'clue');
                        }}
                        className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl border border-amber-400 bg-gradient-to-r from-red-800 to-amber-700 text-xs font-bold text-amber-100 hover:brightness-110"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Tiếp Tục Lên Chiếu &rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Chiếu Chèo Status */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-amber-900/30">
              <span>Chiếu cói làng Đông · Hội trăng rằm</span>
              <button
                onClick={() => setShowCluesBag(!showCluesBag)}
                className="text-amber-400 hover:underline font-medium"
              >
                🎒 Xem túi manh mối ({gameRoom.players[0].cluesCollected.length})
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Tiếng Đế & Game Events Log (Cols 3) */}
        <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
          {/* Interactive Tiếng Đế Soundboard */}
          <div className="rounded-xl border border-amber-900/40 bg-[#12131d]/90 p-3.5 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                🗣️ Tiếng Đế Dân Gian
              </span>
              <span className="text-[10px] text-stone-400">Tương tác trực tiếp</span>
            </div>
            <p className="text-[11px] text-stone-400 mb-2.5 leading-relaxed">
              Bấm để hưởng ứng hoặc bắt lời cùng đào kép trên chiếu:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTriggerDeCheo('Ai đấy?')}
                className="rounded-lg border border-red-800/60 bg-red-950/40 py-2 text-xs font-semibold text-amber-200 hover:bg-red-900/60 transition-colors"
              >
                “Ai đấy?!”
              </button>
              <button
                onClick={() => handleTriggerDeCheo('Phải đấy!')}
                className="rounded-lg border border-amber-800/60 bg-amber-950/40 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-900/60 transition-colors"
              >
                “Phải đấy!”
              </button>
              <button
                onClick={() => handleTriggerDeCheo('Kính cẩn!')}
                className="rounded-lg border border-emerald-800/60 bg-emerald-950/40 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/60 transition-colors"
              >
                “Kính cẩn!”
              </button>
              <button
                onClick={() => handleTriggerDeCheo('Bớ làng nước ơi!')}
                className="rounded-lg border border-purple-800/60 bg-purple-950/40 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-900/60 transition-colors"
              >
                “Bớ làng nước!”
              </button>
            </div>
          </div>

          {/* Event Diary (Timeline) */}
          <div className="rounded-xl border border-amber-900/40 bg-[#12131d]/90 p-3.5 shadow flex-1 flex flex-col justify-between max-h-[360px]">
            <div className="flex items-center justify-between mb-2 border-b border-stone-800 pb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Nhật Ký Chiếu Chèo
              </span>
              <span className="text-[10px] text-stone-500 font-mono">{gameRoom.events.length} sự kiện</span>
            </div>

            <div className="overflow-y-auto space-y-2 pr-1 flex-1 text-xs max-h-[240px]">
              {gameRoom.events.map((ev) => (
                <div
                  key={ev.id}
                  className={`p-2 rounded-lg border text-[11px] leading-relaxed ${
                    ev.type === 'de_cheo' ? 'border-amber-700/50 bg-amber-950/30 text-amber-200' :
                    ev.type === 'clue' ? 'border-emerald-800/50 bg-emerald-950/30 text-emerald-200' :
                    ev.type === 'quiz' ? 'border-purple-800/50 bg-purple-950/30 text-purple-200' :
                    ev.type === 'system' ? 'border-red-900/50 bg-red-950/30 text-amber-300 font-semibold' :
                    'border-stone-800 bg-stone-900/60 text-stone-300'
                  }`}
                >
                  <span className="font-mono text-[9px] text-stone-500 mr-1.5">[{ev.timestamp}]</span>
                  {ev.text}
                </div>
              ))}
              <div ref={eventFeedEndRef} />
            </div>

            {/* Quick Dialogue Input */}
            <form onSubmit={handleSendChat} className="mt-3 flex gap-1.5 pt-2 border-t border-stone-800">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Nói câu thoại xưng danh..."
                className="flex-1 rounded-lg border border-stone-800 bg-stone-900 px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-700 bg-amber-900/70 text-amber-200 hover:bg-amber-800"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Clues Pouch Modal */}
      {showCluesBag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border-2 border-amber-600 bg-gradient-to-b from-[#1c1214] to-[#0c0d16] p-6 shadow-2xl">
            <h3 className="font-theatre text-xl font-bold text-amber-100 mb-3 flex items-center gap-2">
              <span>🎒</span> Túi Manh Mối Của Bạn
            </h3>
            {gameRoom.players[0].cluesCollected.length === 0 ? (
              <p className="text-xs text-stone-400 py-4">Bạn chưa thu thập được manh mối nào. Hãy rút thẻ sân đình!</p>
            ) : (
              <div className="space-y-2 my-4">
                {gameRoom.players[0].cluesCollected.map((clue, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-amber-800/50 bg-stone-900/70 text-xs text-amber-200 flex items-center gap-2">
                    <span className="text-amber-400">✦</span>
                    <span>{clue}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowCluesBag(false)}
              className="mt-2 w-full py-2 rounded-xl border border-stone-700 bg-stone-900 text-xs text-stone-300 hover:bg-stone-800"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Interactive Quạt Chèo Modal */}
      <FanGestureModal
        isOpen={isFanModalOpen}
        onClose={() => setIsFanModalOpen(false)}
      />

      {/* ========================================== */}
      {/* VIEW 3: HẠ MÀN (RESULT SCREEN MODAL) */}
      {/* ========================================== */}
      {gameRoom.phase === 'game_over' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-4 border-amber-500 bg-gradient-to-b from-[#241316] via-[#141525] to-[#0a0b14] p-6 sm:p-10 shadow-2xl text-center">
            {/* Theatrical Curtain Header */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-amber-600 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xl mb-4">
              🏮
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/60 px-4 py-1 text-xs text-amber-300 uppercase tracking-widest font-semibold mb-2">
              Vở Diễn Kết Thúc · Rèm Nhung Đã Khép
            </div>

            <h2 className="font-theatre text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
              HẠ MÀN SÂN ĐÌNH
            </h2>

            {/* Mystery Resolution */}
            <div className="my-6 rounded-2xl border border-amber-700/60 bg-gradient-to-r from-red-950/60 to-amber-950/60 p-4 text-xs sm:text-sm text-stone-200 leading-relaxed text-left">
              <strong className="text-amber-300 block mb-1 text-sm">
                Chân tướng vụ án:
              </strong>
              {gameRoom.scenarioMystery}
              <p className="mt-2 text-stone-300/90 italic font-serif">
                Nhờ vào tài năng phán đoán, sự thấu hiểu các làn điệu và tinh thần đồng sáng tạo của các đào kép, bí mật sân đình đã được soi tỏ dưới ánh trăng rằm!
              </p>
            </div>

            {/* Winner spotlight */}
            <div className="my-6 rounded-2xl border-2 border-amber-400 bg-stone-900/80 p-5">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                🏆 Đào Kép Xuất Sắc Nhất Đêm Diễn (MVP)
              </span>
              <div className="font-theatre text-2xl font-bold text-amber-100">
                {gameRoom.players.find((p) => p.id === gameRoom.winnerPlayerId)?.name}
              </div>
              <p className="text-xs text-amber-300/80 font-serif">
                Hóa thân: {gameRoom.players.find((p) => p.id === gameRoom.winnerPlayerId)?.role?.name}
              </p>
            </div>

            {/* Leaderboard Table */}
            <div className="space-y-2 mb-8 text-left text-xs">
              <div className="text-stone-400 text-[11px] uppercase tracking-wider mb-1 font-semibold">
                Bảng Điểm Uy Tín Cả Vở Diễn:
              </div>
              {gameRoom.players
                .slice()
                .sort((a, b) => b.prestige - a.prestige)
                .map((p, rank) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 w-5">#{rank + 1}</span>
                      <span className="text-base">{p.avatar}</span>
                      <div>
                        <strong className="text-stone-200 block">{p.name}</strong>
                        <span className="text-[10px] text-stone-400">{p.role?.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-amber-300 text-sm">{p.prestige} Điểm</span>
                      <span className="text-[10px] text-stone-400 block">{p.cluesCollected.length} manh mối</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 rounded-xl border border-amber-400 bg-gradient-to-r from-red-800 to-amber-700 px-6 py-3 font-bold text-amber-100 shadow-lg hover:brightness-110"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Diễn Ván Mới</span>
              </button>

              <button
                onClick={() => {
                  handleRestart();
                  if (onExploreMuseum) onExploreMuseum();
                }}
                className="flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-800"
              >
                <Compass className="h-4 w-4 text-amber-400" />
                <span>Vào Bảo Tàng Khám Phá Chèo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
