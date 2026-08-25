/**
 * ThreeDEngine — Cinematic 3D Camera, Parallax, and Atmospheric Particle Handler
 * Peter Parker: The Journey
 *
 * Implements:
 * - Dynamic 3D ambient particle system Canvas with viewport auto-pause.
 * - Hardware-accelerated CSS 3D mouse camera tilt and scroll forward push.
 * - Section-specific atmospheric changes (Love, Sacrifice, Forget, Alone, Future).
 * - Interactive 3D tilt layers for video cards and images.
 * - Low-end device auto-fallback (reduces counts and disables rotations).
 */

export class ThreeDEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrameId = null;
    
    this.mouse = { x: null, y: null, targetX: 0, targetY: 0 };
    this.scrollZ = 0;
    this.activeSection = '#section-hero';
    this.isLowEnd = false;
    
    // Ambient color settings for active sections
    this.atmosphereSettings = {
      '#section-hero': { speed: 0.5, density: 45, opacity: 0.22, color: '255, 46, 54' },
      '#section-origin': { speed: 0.45, density: 35, opacity: 0.18, color: '255, 46, 54' },
      '#section-becoming': { speed: 0.6, density: 40, opacity: 0.2, color: '255, 46, 54' },
      '#section-homecoming': { speed: 0.5, density: 35, opacity: 0.18, color: '255, 46, 54' },
      '#section-love': { speed: 0.2, density: 50, opacity: 0.35, color: '255, 90, 95' }, // Love: slower, warm red
      '#section-love-scroll': { speed: 0.2, density: 50, opacity: 0.35, color: '255, 90, 95' },
      '#section-infinity-war': { speed: 0.35, density: 35, opacity: 0.18, color: '180, 20, 20' },
      '#section-sacrifice': { speed: 0.15, density: 45, opacity: 0.28, color: '140, 0, 8' },
      '#section-mj-forgets': { speed: 0.05, density: 15, opacity: 0.06, color: '100, 100, 100' }, // Forget: almost still, cold
      '#section-alone': { speed: 0.15, density: 15, opacity: 0.08, color: '255, 46, 54' }, // Alone: sparse
      '#section-new-spiderman': { speed: 0.7, density: 50, opacity: 0.25, color: '255, 46, 54' },
      '#section-brand-new-day': { speed: 0.6, density: 40, opacity: 0.2, color: '255, 46, 54' },
      '#section-valentine': { speed: 0.35, density: 45, opacity: 0.3, color: '255, 90, 95' },
      '#section-fan-challenge': { speed: 0.45, density: 35, opacity: 0.2, color: '255, 46, 54' }
    };

    this._detectPerformance();
    this._createCanvas();
    this._bindEvents();
    this._startLoop();
  }

  _detectPerformance() {
    // Detect lower-end devices or mobile viewports
    const isMobile = window.innerWidth < 768;
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    this.isLowEnd = isMobile || lowCores;
    
    console.log(`[3D ENGINE] Low-end mode: ${this.isLowEnd}`);
  }

  _createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'global-3d-particles';
    this.canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
  }

  _resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._populateParticles();
  }

  _populateParticles() {
    this.particles = [];
    const settings = this.atmosphereSettings[this.activeSection] || this.atmosphereSettings['#section-hero'];
    let count = this.isLowEnd ? Math.floor(settings.density * 0.4) : settings.density;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 800 + 100, // Depth axis
        size: Math.random() * 2 + 0.8,
        speedFactor: Math.random() * 0.5 + 0.5
      });
    }
  }

  _bindEvents() {
    window.addEventListener('resize', () => this._resizeCanvas());

    // Mouse coordinate parallax triggers
    window.addEventListener('mousemove', (e) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      this.mouse.targetX = (e.clientX / window.innerWidth) - 0.5;
      this.mouse.targetY = (e.clientY / window.innerHeight) - 0.5;
    }, { passive: true });

    // Page Scroll camera push trigger
    window.addEventListener('scroll', () => {
      this.scrollZ = window.scrollY * 0.14; // depth coefficient
    }, { passive: true });

    // Pause canvas animation loop when window is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this._stopLoop();
      } else {
        this._startLoop();
      }
    });

    // 3D Hover tilt trigger for dynamically created/loaded media cards and videos
    document.addEventListener('mouseover', (e) => {
      const frame = e.target.closest('.cinematic-video-frame');
      if (frame && !frame.dataset.tiltBound) {
        this._bindTiltCard(frame);
      }
    });
  }

  _bindTiltCard(frame) {
    frame.dataset.tiltBound = 'true';

    frame.addEventListener('mousemove', (e) => {
      if (this.isLowEnd) return; // Disable hover tilt on low end devices
      
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const rx = -(y / (rect.height / 2)) * 2; // Max 2 degrees rotation
      const ry = (x / (rect.width / 2)) * 2;
      
      frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;

      const glass = frame.querySelector('.video-glass-layer');
      const glow = frame.querySelector('.video-glow-layer');
      if (glass) glass.style.transform = `translate3d(${x * 0.035}px, ${y * 0.035}px, 15px)`;
      if (glow) glow.style.transform = `translate3d(${-x * 0.045}px, ${-y * 0.045}px, -20px)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'none';
      const glass = frame.querySelector('.video-glass-layer');
      const glow = frame.querySelector('.video-glow-layer');
      if (glass) glass.style.transform = 'translateZ(15px)';
      if (glow) glow.style.transform = 'translateZ(-20px)';
    });
  }

  // Set active section to shift atmosphere settings
  setSection(selector) {
    if (this.activeSection === selector) return;
    this.activeSection = selector;
    this._populateParticles();
  }

  _startLoop() {
    if (this.animationFrameId) return;

    const tick = () => {
      this._updateParticles();
      this._updateTransforms();
      this.animationFrameId = requestAnimationFrame(tick);
    };

    this.animationFrameId = requestAnimationFrame(tick);
  }

  _stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  _updateParticles() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const settings = this.atmosphereSettings[this.activeSection] || this.atmosphereSettings['#section-hero'];
    
    // Slow interpolation of mouse coordinates for fluid drift inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    this.particles.forEach(p => {
      // 3D forward drift calculation
      p.z -= settings.speed * p.speedFactor * 3.5;
      
      // Reset particle if it slips past screen plane (Z < 10px)
      if (p.z < 10) {
        p.z = Math.random() * 800 + 600;
        p.x = Math.random() * this.canvas.width;
        p.y = Math.random() * this.canvas.height;
      }

      // Project 3D coordinate onto 2D screen plane using basic focal perspective division
      const focalLength = 320;
      const scale = focalLength / (focalLength + p.z);
      
      // Calculate position relative to center of screen with mouse parallax drift
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;

      // Mouse attraction shifts coordinate offsets
      const mouseParallaxX = -this.mouse.x * (focalLength - p.z) * 0.15;
      const mouseParallaxY = -this.mouse.y * (focalLength - p.z) * 0.15;

      const px = (p.x - cx) * scale + cx + mouseParallaxX;
      const py = (p.y - cy) * scale + cy + mouseParallaxY;
      const pr = p.size * scale * 3.8;

      // Render glowing particle node
      this.ctx.beginPath();
      this.ctx.arc(px, py, pr, 0, Math.PI * 2);
      
      // Calculate opacity fade based on depth (fades into background depth fog)
      const depthOpacity = Math.max(0, Math.min(1, (1 - p.z / 900) * settings.opacity));
      this.ctx.fillStyle = `rgba(${settings.color}, ${depthOpacity})`;
      this.ctx.fill();
    });
  }

  _updateTransforms() {
    // Perform camera rotates and scroll pushes
    if (this.isLowEnd) return; // Skip rotations on low end

    const heroScene = document.querySelector('.hero-3d-scene');
    if (heroScene) {
      const rx = -this.mouse.y * 3.8; // max 1.9 degrees tilt
      const ry = this.mouse.x * 3.8;
      
      // Forward push on scroll
      const pushZ = Math.min(this.scrollZ, 80);
      heroScene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${pushZ}px)`;
    }
  }
}
