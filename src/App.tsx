import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowToPlay } from './components/HowToPlay';
import { CharacterGallery } from './components/CharacterGallery';
import { GameSection } from './components/GameSection';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { AchievementsModal } from './components/AchievementsModal';
import { Footer } from './components/Footer';
import { ACHIEVEMENTS } from './data/cheoData';
import { CheoRole, Achievement } from './types';
import { audioSystem } from './utils/audioSystem';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [playerScore, setPlayerScore] = useState<number>(() => {
    const saved = localStorage.getItem('lang_cheo_score');
    return saved ? parseInt(saved, 10) : 15;
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('lang_cheo_achievements');
    return saved ? JSON.parse(saved) : ACHIEVEMENTS;
  });
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [preselectedRole, setPreselectedRole] = useState<CheoRole | null>(null);

  // Save score to local storage
  useEffect(() => {
    localStorage.setItem('lang_cheo_score', playerScore.toString());
  }, [playerScore]);

  // Handle Game Completion
  const handleGameFinish = (pointsEarned: number) => {
    setPlayerScore((prev) => prev + pointsEarned);
    // Unlock first achievement if not already
    setAchievements((prev) =>
      prev.map((a, i) => (i === 0 ? { ...a, unlocked: true } : a))
    );
  };

  // Select role from character gallery to start game
  const handleSelectRoleForGame = (role: CheoRole) => {
    setPreselectedRole(role);
    setCurrentTab('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080f] text-[#f7f3e8] flex flex-col font-sans selection:bg-red-900 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onStartGameDirectly={() => {
          handleNavigate('game');
        }}
        playerScore={playerScore}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero
              onPlayClick={() => handleNavigate('game')}
              onExploreClick={() => handleNavigate('museum')}
              onRoleClick={() => handleNavigate('roles')}
            />
            <HowToPlay onStartPlaying={() => handleNavigate('game')} />
            <CharacterGallery onSelectRoleForGame={handleSelectRoleForGame} />
            <KnowledgeLibrary />
          </>
        )}

        {currentTab === 'game' && (
          <GameSection
            onGameFinish={handleGameFinish}
            onExploreMuseum={() => handleNavigate('museum')}
            preselectedRole={preselectedRole}
          />
        )}

        {currentTab === 'how_to_play' && (
          <div className="py-8">
            <HowToPlay onStartPlaying={() => handleNavigate('game')} />
          </div>
        )}

        {currentTab === 'roles' && (
          <div className="py-8">
            <CharacterGallery onSelectRoleForGame={handleSelectRoleForGame} />
          </div>
        )}

        {currentTab === 'museum' && (
          <div className="py-8">
            <KnowledgeLibrary />
          </div>
        )}
      </main>

      {/* Achievements / Profile Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
        playerScore={playerScore}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
