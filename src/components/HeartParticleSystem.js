/**
 * HeartParticleSystem — High-performance Canvas Heart & Memory Physics
 * Peter Parker: The Journey
 * Refined for Black × Deep Red Cinematic Theme
 */

export class HeartParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'heart-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.maxParticles = 40;
    this.mode = 'LOVE'; // 'LOVE', 'MEMORY', 'HEARTBREAK', 'SACRIFICE', 'VALENTINE', 'NONE'
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.raf = null;
    this.isRunning = false;

    this._resize();
    window.addEventListener('resize', () => this._resize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });

    this._initParticles();
    this.start();
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    if (mode === 'NONE') {
      this.particles = [];
    } else {
      this._initParticles();
    }
  }

  _initParticles() {
    this.particles = [];
    
    // Controlled particle density for each section type
    let count = this.maxParticles;
    if (this.mode === 'HEARTBREAK') {
      count = 12; // Dramatically reduced density for heartbreak
    } else if (this.mode === 'MEMORY') {
      count = 20; // Quiet, empty space
    } else if (this.mode === 'SACRIFICE') {
      count = 22; // Restrained, emotional density
    } else if (this.mode === 'VALENTINE') {
      count = 45; // Final cinematic transition density
    }

    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
  }

  _createParticle() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Cinematic theme coloring
    let color = '#E50914';       // Primary red
    let shadowColor = '#FF1E2D'; // Bright red glow

    if (this.mode === 'SACRIFICE') {
      color = '#7A0008';         // Deep blood red
      shadowColor = '#E50914';
    } else if (this.mode === 'HEARTBREAK') {
      color = '#550005';         // Very dark, desaturated red
      shadowColor = '#7A0008';
    } else if (this.mode === 'MEMORY') {
      color = '#7A0008';         // Soft dark red
      shadowColor = '#E50914';
    } else if (this.mode === 'VALENTINE') {
      color = '#FF1E2D';         // Bright crimson accent
      shadowColor = '#FF1E2D';
    }

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 8 + 4,
      vx: (Math.random() - 0.5) * 0.8,
      vy: this.mode === 'SACRIFICE' ? (Math.random() * 0.6 + 0.2) : -(Math.random() * 0.6 + 0.2),
      alpha: this.mode === 'HEARTBREAK' ? Math.random() * 0.35 + 0.1 : Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      color,
      shadowColor,
      isCracked: this.mode === 'HEARTBREAK',
    };
  }

  _drawHeart(ctx, x, y, size, rotation, alpha, isCracked, color, shadowColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size / 15, size / 15);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
    ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = isCracked ? 4 : 12;
    ctx.fill();

    if (isCracked) {
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-2, 2);
      ctx.lineTo(2, 6);
      ctx.strokeStyle = '#050505';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this._loop();
  }

  stop() {
    this.isRunning = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  _loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.mode !== 'NONE') {
      const w = this.canvas.width;
      const h = this.canvas.height;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Cursor interaction (subtle attraction in love, repulsion in heartbreak)
        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 10) {
          const force = (180 - dist) / 180;
          if (this.mode === 'HEARTBREAK') {
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          } else {
            p.x += (dx / dist) * force * 0.6;
            p.y += (dy / dist) * force * 0.6;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around bounds
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        // Fade out in the middle 50% of the screen width to avoid overlapping text/photos/videos
        const centerX = w / 2;
        const distFromCenter = Math.abs(p.x - centerX);
        let centerFade = 1;
        
        const fadeBoundary = w * 0.25;
        if (distFromCenter < fadeBoundary) {
          centerFade = Math.max(0, distFromCenter / fadeBoundary);
        }

        this._drawHeart(
          this.ctx, 
          p.x, 
          p.y, 
          p.size, 
          p.rotation, 
          p.alpha * centerFade, 
          p.isCracked, 
          p.color, 
          p.shadowColor
        );
      }
    }

    this.raf = requestAnimationFrame(() => this._loop());
  }
}

export const heartParticles = new HeartParticleSystem();
