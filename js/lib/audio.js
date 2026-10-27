// ==========================================================================
// WEB AUDIO SYNTHESIZER (STARDEW SFX)
// The AudioContext is created on the first sound, i.e. inside a user gesture,
// so browsers never log an autoplay warning on page load.
// ==========================================================================

import { KEYS } from './storage.js';

export class Sfx {
  constructor() {
    this.enabled = localStorage.getItem(KEYS.audio) !== 'false';
    this.ctx = null;
  }

  setEnabled(on) {
    this.enabled = on;
    localStorage.setItem(KEYS.audio, on);
  }

  play(type = 'click') {
    if (!this.enabled) return;
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'complete') {
      // Junimo pickup chime: C5 E5 G5 C6
      osc.type = 'sine';
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => osc.frequency.setValueAtTime(f, now + i * 0.08));
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (type === 'uncheck') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.11);
    } else {
      // Wood block clack
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  }
}
