// ==========================================================================
// SEASON PARTICLES (petals, fireflies, leaves, snow)
// Drawn as square pixels to match the UI. Skipped entirely when the user
// prefers reduced motion.
// ==========================================================================

const PALETTES = {
  spring: ['#ffb7c5', '#ffd6e0'],
  summer: ['#ffe066', '#f9ca24'],
  fall: ['#e67e22', '#d35400', '#c0392b'],
  winter: ['#ffffff', '#dff3ff']
};

export function startSeasonParticles(canvas, getSeason) {
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.hidden = true;
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 38 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: 0.8 + Math.random() * 1.6,
    // Snap sizes to a 3px grid so every particle reads as chunky pixels
    size: 3 * (1 + Math.floor(Math.random() * 3)),
    opacity: 0.35 + Math.random() * 0.55,
    // Fixed per particle; picking a colour every frame made fall leaves flicker
    tone: Math.random()
  }));

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    const palette = PALETTES[getSeason()] || PALETTES.spring;

    for (const p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = palette[Math.floor(p.tone * palette.length)];
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
    requestAnimationFrame(animate);
  };
  animate();
}
