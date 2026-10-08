export type GamePhase = 'landing' | 'lobby' | 'playing' | 'round_end' | 'game_over';

export type RoleCategory = 'dao' | 'kep' | 'he' | 'lao' | 'mu';

export interface CheoRole {
  id: string;
  name: string;
  alias: string;
  category: RoleCategory;
  categoryLabel: string;
  archetype: string; // e.g., Đào lẳng, Đào thương, Hề mồi, Hề gậy, Xã trưởng...
  description: string;
  personality: string;
  signaturePhrase: string;
  signatureMelody: string;
  playExcerpt: string; // Tác phẩm tiêu biểu (Quan Âm Thị Kính, Suý Vân giả dại...)
  avatarColor: string;
  icon: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Thử thách';
  gameAbility: {
    name: string;
    description: string;
    cooldownRounds: number;
  };
  secretObjective: string;
  culturalInsight: string;
}

export type CardType = 'clue' | 'melody' | 'quiz' | 'event';

export interface GameCard {
  id: string;
  type: CardType;
  title: string;
  subtitle: string;
  description: string;
  lore: string;
  points: number;
  audioKey?: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  melodyInfo?: {
    melodyName: string;
    tempo: string;
    emotion: string;
    sampleLyrics: string;
  };
  actionType?: 'prestige_boost' | 'reveal_clue' | 'swap_seat' | 'block_rival';
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  role?: CheoRole;
  prestige: number; // Điểm Uy Tín
  stagePresence: number; // Điểm Tâm Điểm
  cluesCollected: string[];
  isHost: boolean;
  isReady: boolean;
  isBot: boolean;
  lastAction?: string;
}

export interface GameEvent {
  id: string;
  timestamp: string;
  text: string;
  type: 'system' | 'action' | 'quiz' | 'de_cheo' | 'clue';
  author?: string;
}

export interface GameRoom {
  code: string;
  name: string;
  scenarioName: string;
  scenarioDescription: string;
  scenarioMystery: string;
  maxPlayers: number;
  round: number;
  maxRounds: number;
  turnPlayerIndex: number;
  turnTimeLeft: number;
  phase: GamePhase;
  players: Player[];
  drawnCards: GameCard[];
  events: GameEvent[];
  solvedCluesCount: number;
  totalCluesNeeded: number;
  winnerPlayerId?: string;
}

export interface CheoInstrument {
  id: string;
  name: string;
  type: 'Gõ' | 'Dây' | 'Hơi';
  description: string;
  roleInOrchestra: string;
  culturalNote: string;
  soundType: 'drum' | 'bell' | 'erhu' | 'moon' | 'flute' | 'wood';
}

export interface CheoKnowledgeItem {
  id: string;
  category: 'art' | 'characters' | 'melodies' | 'instruments' | 'costume' | 'plays';
  title: string;
  subtitle: string;
  summary: string;
  content: string[];
  keyQuote?: string;
  highlightTag: string;
  trivia: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}
