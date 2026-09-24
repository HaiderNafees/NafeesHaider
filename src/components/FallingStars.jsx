import { useEffect, useRef } from 'react';

/**
 * FALLING STARS — a fixed, full-viewport canvas sitting behind the page
 * content. A sparse handful of shooting stars drift slowly diagonally
 * down the screen with soft, glowing tails — subtle and aesthetic rather
 * than busy. Coloured from the `--text` design token so they adapt to
 * light and dark themes automatically. Skipped for reduced motion.
 */

const MAX_STARS = 8;

function hexToRgb(hex) {
  const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
  return match
    ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
    : [255, 255, 255];
}

export default function FallingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let spawnTimer = 0.8;
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const starColor = () =>
      hexToRgb(
        getComputedStyle(document.documentElement).getPropertyValue('--text') ||
          '#ffffff'
      );

    const spawnStar = (seeded = false) => {
      const angle = ((20 + Math.random() * 25) * Math.PI) / 180; // gentle 20–45° descent
      const dir = Math.random() < 0.5 ? -1 : 1;
      const speed = 70 + Math.random() * 90; // slow, dreamy drift
      return {
        angle,
        dir,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        len: 60 + Math.random() * 90,
        width: 0.4 + Math.random() * 0.6,
        life: 0,
        maxLife: 3 + Math.random() * 3,
        peak: 0.35 + Math.random() * 0.4, // some stars fainter than others
        twinkleFreq: 1.5 + Math.random() * 2,
        rgb: starColor(),
        x: Math.random() * (width * 1.3) - width * 0.15,
        y: seeded ? Math.random() * height * 0.6 : -30 - Math.random() * 60,
      };
    };

    // A few stars already mid-flight so the sky is alive on first paint.
    for (let i = 0; i < 3; i += 1) {
      const s = spawnStar(true);
      s.life = Math.random() * s.maxLife * 0.4;
      stars.push(s);
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        if (stars.length < MAX_STARS) stars.push(spawnStar());
        spawnTimer = 0.7 + Math.random() * 1.1;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';

      stars = stars.filter(
        (s) =>
          s.life < s.maxLife &&
          s.y < height + s.len &&
          s.x > -s.len - 40 &&
          s.x < width + s.len + 40
      );

      for (const s of stars) {
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // Fade in gently, linger, then fade out; plus a subtle twinkle.
        const fadeIn = Math.min(s.life / (s.maxLife * 0.15), 1);
        const fadeOut = Math.min((s.maxLife - s.life) / (s.maxLife * 0.35), 1);
        const twinkle = 0.85 + 0.15 * Math.sin(s.life * s.twinkleFreq * 2 * Math.PI);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * s.peak * twinkle;
        if (alpha <= 0.01) continue;

        const [r, g, b] = s.rgb;
        const tailX = s.x - Math.cos(s.angle) * s.len * s.dir;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        // Soft wide halo pass under a thin bright core — an elegant glow.
        const trail = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        trail.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        trail.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${0.25 * alpha})`);
        trail.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${0.7 * alpha})`);

        ctx.strokeStyle = trail;
        ctx.lineWidth = s.width * 2.5;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.lineWidth = s.width;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Small glowing head
        ctx.save();
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.width * 1.2, 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="falling-stars" aria-hidden="true" />;
}
