// Web Audio procedural synthesizer for traditional Vietnamese Chèo sounds
// Simulates Trống Chèo (cắc, tùng, boong), Phách tre, Thanh la, and Pentatonic Melodic Riffs

class CheoAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Play Drum sound (Trống Chèo - Tùng / Cắc / Boong / Rù)
  public playDrum(type: 'tung' | 'cac' | 'boong' | 'roll' = 'tung') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'tung') {
        // Deep warm drum skin hit
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);

        // Add subtle leather resonance punch
        const punch = this.ctx.createOscillator();
        const punchGain = this.ctx.createGain();
        punch.type = 'triangle';
        punch.frequency.setValueAtTime(180, now);
        punch.frequency.exponentialRampToValueAtTime(60, now + 0.12);
        punchGain.gain.setValueAtTime(0.4, now);
        punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        punch.connect(punchGain);
        punchGain.connect(this.ctx.destination);
        punch.start(now);
        punch.stop(now + 0.2);

      } else if (type === 'cac') {
        // Crisp drum rim wood strike (Tiếng Cắc của trống đế)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        // Highpass filter for crisp snap
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(600, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);

      } else if (type === 'boong') {
        // Boong - resonant bronze gong / metallic rim strike
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.8);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.95);

      } else if (type === 'roll') {
        // Rù tùng tùng roll
        const beats = [0, 0.08, 0.15, 0.22, 0.32, 0.45];
        beats.forEach((t, i) => {
          setTimeout(() => {
            this.playDrum(i === beats.length - 1 ? 'tung' : 'cac');
          }, t * 1000);
        });
      }
    } catch {
      // Audio context error fallback silently
    }
  }

  // Phách tre (Bamboo clapper)
  public playBambooClack() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio fallback
    }
  }

  // Play traditional pentatonic scale melodic riff (Hò - Xự - Xang - Xê - Cống)
  public playMelodicPhrase(theme: 'he_moi' | 'dao_lieu' | 'victory' | 'clue' = 'he_moi') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const pentatonicNotes: Record<string, { f: number; dur: number }[]> = {
        he_moi: [
          { f: 293.66, dur: 0.18 }, // D4
          { f: 329.63, dur: 0.15 }, // E4
          { f: 392.00, dur: 0.22 }, // G4
          { f: 440.00, dur: 0.20 }, // A4
          { f: 392.00, dur: 0.15 }, // G4
          { f: 587.33, dur: 0.45 }, // D5
        ],
        dao_lieu: [
          { f: 440.00, dur: 0.25 }, // A4
          { f: 392.00, dur: 0.20 }, // G4
          { f: 329.63, dur: 0.22 }, // E4
          { f: 293.66, dur: 0.35 }, // D4
          { f: 392.00, dur: 0.50 }, // G4
        ],
        victory: [
          { f: 261.63, dur: 0.15 }, // C4
          { f: 329.63, dur: 0.15 }, // E4
          { f: 392.00, dur: 0.18 }, // G4
          { f: 523.25, dur: 0.25 }, // C5
          { f: 659.25, dur: 0.60 }, // E5
        ],
        clue: [
          { f: 523.25, dur: 0.12 },
          { f: 587.33, dur: 0.14 },
          { f: 783.99, dur: 0.35 },
        ]
      };

      const notes = pentatonicNotes[theme] || pentatonicNotes.he_moi;
      let accumTime = this.ctx.currentTime + 0.05;

      notes.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm erhu / đàn nguyệt overtone blend
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, accumTime);

        // Lowpass filter for traditional silky timbre
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, accumTime);

        gain.gain.setValueAtTime(0, accumTime);
        gain.gain.linearRampToValueAtTime(0.25, accumTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, accumTime + note.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(accumTime);
        osc.stop(accumTime + note.dur + 0.05);

        accumTime += note.dur * 0.95;
      });

      // Synchronize drum beat with the phrase climax
      setTimeout(() => {
        this.playDrum('tung');
      }, (notes.length * 150));
    } catch {
      // Audio fallback
    }
  }

  // Play Tiếng Đế (Dân làng đế: "Ai đấy?!", "Phải đấy!", "Ơ kìa!")
  public playDeCheo(phrase: string = 'Ai đấy?') {
    this.playDrum('cac');
    if ('speechSynthesis' in window && !this.isMuted) {
      try {
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = 'vi-VN';
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      } catch {
        // speech synthesis fallback
      }
    }
  }
}

export const audioSystem = new CheoAudioEngine();
