import { useEffect, useRef } from 'react';

/**
 * FALLING STARS — a fixed, full-viewport canvas sitting behind the page
 * content. Shooting stars streak diagonally down across the screen,
 * coloured from the `--text` design token so they adapt to light and
 * dark themes automatically. Skipped entirely for reduced motion.
 */

const MAX_STARS = 12;

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
    let spawnTimer = 0;
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
      const angle = ((25 + Math.random() * 30) * Math.PI) / 180; // 25–55° below horizontal
      const dir = Math.random() < 0.5 ? -1 : 1;
      const speed = 260 + Math.random() * 320;
      return {
        angle,
        dir,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        len: 80 + Math.random() * 140,
        width: 0.8 + Math.random() * 1.4,
        life: 0,
        maxLife: 1.4 + Math.random() * 1.8,
        rgb: starColor(),
        x: Math.random() * (width * 1.3) - width * 0.15,
        y: seeded ? Math.random() * height * 0.6 : -20 - Math.random() * 60,
      };
    };

    // A few stars already mid-flight so the sky is alive on first paint.
    for (let i = 0; i < 3; i += 1) {
      const s = spawnStar(true);
      s.life = Math.random() * s.maxLife * 0.5;
      stars.push(s);
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        if (stars.length < MAX_STARS) stars.push(spawnStar());
        spawnTimer = 0.3 + Math.random() * 0.9;
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

        // Fade in quickly, fade out towards the end of its life.
        const fadeIn = Math.min(s.life / (s.maxLife * 0.15), 1);
        const fadeOut = Math.min((s.maxLife - s.life) / (s.maxLife * 0.3), 1);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut));
        if (alpha <= 0) continue;

        const [r, g, b] = s.rgb;
        const tailX = s.x - Math.cos(s.angle) * s.len * s.dir;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const trail = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        trail.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        trail.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${0.8 * alpha})`);

        ctx.strokeStyle = trail;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Glowing head
        ctx.save();
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.4, 0, Math.PI * 2);
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
