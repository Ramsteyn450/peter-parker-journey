/**
 * PeterMind — Interactive psychological mind section
 * Floating words with mouse parallax + memory panels
 * Peter Parker: The Journey
 */

import { MIND_WORDS } from '../assets.config.js';

export class PeterMind {
  constructor(containerEl) {
    this.container   = containerEl;
    this.words       = MIND_WORDS;
    this.activePanel = null;
    this.wordEls     = [];
    this.mouseX      = 0;
    this.mouseY      = 0;
    this.raf         = null;
    this.isActive    = false;

    // Positions for each word (% of container)
    this.positions = [
      { x: 50,  y: 22 },  // MJ
      { x: 30,  y: 45 },  // MAY
      { x: 70,  y: 38 },  // TONY
      { x: 18,  y: 65 },  // NED
      { x: 65,  y: 70 },  // LOVE
      { x: 40,  y: 80 },  // LOSS
      { x: 82,  y: 58 },  // FEAR
      { x: 12,  y: 32 },  // RESPONSIBILITY
      { x: 55,  y: 55 },  // FAILURE
      { x: 78,  y: 80 },  // SACRIFICE
    ];

    this._build();
  }

  _build() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="mind-center-figure" aria-hidden="true">
        <div style="width:80px;height:200px;background:linear-gradient(180deg,#1a1a1a 0%,#050505 100%);opacity:0.3;"></div>
      </div>
      <div id="mind-words-layer"></div>
      <div class="mind-memory-panel" id="mind-panel" role="dialog" aria-modal="true">
        <button class="mind-memory-close" id="mind-panel-close" aria-label="Close memory">✕</button>
        <p class="label label-red" id="mind-panel-title" style="margin-bottom:16px;"></p>
        <p id="mind-panel-body" style="font-size:16px;line-height:1.7;color:var(--muted-white);"></p>
      </div>
    `;

    const layer     = this.container.querySelector('#mind-words-layer');
    this.panel      = this.container.querySelector('#mind-panel');
    this.panelTitle = this.container.querySelector('#mind-panel-title');
    this.panelBody  = this.container.querySelector('#mind-panel-body');

    document.getElementById('mind-panel-close')?.addEventListener('click', () => this.closePanel());

    this.words.forEach((w, i) => {
      const el = document.createElement('div');
      el.className = 'mind-word';
      el.textContent = w.word;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `Think about: ${w.word}`);

      const pos = this.positions[i] || { x: 50, y: 50 };
      el.style.cssText = `
        left: ${pos.x}%;
        top: ${pos.y}%;
        font-size: ${w.size}px;
        color: ${w.color};
        transform: translate(-50%, -50%);
        animation: mind-float ${8 + i * 1.2}s ease-in-out ${i * 0.5}s infinite;
        opacity: 0.7;
      `;

      el.style.willChange = 'transform';

      el.addEventListener('click', () => this.openPanel(w, i));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') this.openPanel(w, i);
      });

      layer.appendChild(el);
      this.wordEls.push({ el, baseX: pos.x, baseY: pos.y, speed: 0.3 + (i % 3) * 0.15 });
    });

    this._bindMouseMove();
    this._observeActivation();
  }

  _bindMouseMove() {
    this.container.addEventListener('mousemove', (e) => {
      const rect  = this.container.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      this.mouseY = (e.clientY - rect.top)  / rect.height - 0.5;
    }, { passive: true });

    this.container.addEventListener('mouseleave', () => {
      this.mouseX = 0;
      this.mouseY = 0;
    });
  }

  _observeActivation() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isActive = true;
        this._startParallax();
      } else {
        this.isActive = false;
        cancelAnimationFrame(this.raf);
      }
    }, { threshold: 0.2 });

    observer.observe(this.container);
  }

  _startParallax() {
    const tick = () => {
      if (!this.isActive) return;
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!pref) {
        this.wordEls.forEach(({ el, baseX, baseY, speed }) => {
          const dx = this.mouseX * 30 * speed;
          const dy = this.mouseY * 20 * speed;
          el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        });
      }

      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  openPanel(wordData, index) {
    if (!this.panel) return;
    if (this.panelTitle) this.panelTitle.textContent = wordData.memory.title;
    if (this.panelBody)  this.panelBody.textContent  = wordData.memory.body;

    this.panel.classList.add('open');
    this.panel.removeAttribute('hidden');
    this.panel.focus?.();
  }

  closePanel() {
    this.panel?.classList.remove('open');
  }
}
