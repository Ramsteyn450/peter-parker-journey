/**
 * MemoryWall + MemoryViewer — MJ photo wall with lightbox
 * Peter Parker: The Journey
 */

import { MEMORY_WALL } from '../assets.config.js';

export class MemoryViewer {
  constructor() {
    this.el       = document.getElementById('memory-viewer');
    this.imgEl    = this.el?.querySelector('.memory-viewer-img');
    this.captionEl = this.el?.querySelector('.memory-viewer-caption p');
    this.closeBtn = this.el?.querySelector('.memory-viewer-close');
    this.isOpen   = false;

    this._init();
  }

  _init() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.el?.addEventListener('click', (e) => {
      if (e.target === this.el) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open(src, caption) {
    if (!this.el) return;
    this.isOpen = true;
    if (this.imgEl) {
      this.imgEl.src = src;
      this.imgEl.alt = caption;
    }
    if (this.captionEl) this.captionEl.textContent = caption;
    this.el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.el) return;
    this.isOpen = false;
    this.el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export class MemoryWall {
  constructor(containerEl, viewer) {
    this.container = containerEl;
    this.viewer    = viewer;
    this.photos    = MEMORY_WALL;
    this._build();
  }

  _build() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.photos.forEach((photo, i) => {
      const el = document.createElement('div');
      el.className = 'memory-photo';
      el.setAttribute('data-reveal', '');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `Memory: ${photo.caption}`);

      // Apply position/size from config
      const s = photo.style;
      Object.assign(el.style, {
        top:       s.top,
        left:      s.left,
        width:     s.width,
        height:    s.height,
        transform: `rotate(${s.rotate})`,
      });

      // Stagger reveal
      el.style.transitionDelay = `${i * 0.15}s`;

      el.innerHTML = `
        <img
          src="${photo.src}"
          alt="${photo.caption}"
          loading="lazy"
          onerror="this.closest('.memory-photo').classList.add('placeholder-love')"
        />
        <div class="memory-caption">
          <div class="label">${photo.caption}</div>
          <div class="label-red" style="font-size:9px;letter-spacing:0.2em;margin-top:4px;">${photo.date}</div>
        </div>
      `;

      // Click → fullscreen viewer
      const open = () => this.viewer.open(photo.src, photo.caption);
      el.addEventListener('click', open);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') open();
      });

      this.container.appendChild(el);
    });

    // Fallback placeholder rendering (when image fails)
    this._addPlaceholderBgs();
  }

  _addPlaceholderBgs() {
    const photos = this.container.querySelectorAll('.memory-photo');
    const gradients = [
      'linear-gradient(135deg, #1a0508 0%, #2d0910 100%)',
      'linear-gradient(160deg, #0a0812 0%, #1a0508 100%)',
      'linear-gradient(120deg, #2d0910 0%, #1a0810 100%)',
      'linear-gradient(140deg, #0d0407 0%, #2d1015 100%)',
      'linear-gradient(150deg, #1a0508 0%, #0a0812 100%)',
    ];
    photos.forEach((photo, i) => {
      const img = photo.querySelector('img');
      img.addEventListener('error', () => {
        photo.style.background = gradients[i % gradients.length];
        // Add text label
        const label = document.createElement('div');
        label.style.cssText = `
          position:absolute; inset:0; display:flex; align-items:center;
          justify-content:center; font-size:9px; letter-spacing:0.2em;
          color:rgba(245,245,245,0.15); text-transform:uppercase; text-align:center;
          padding:8px;
        `;
        label.textContent = this.photos[i]?.caption || 'MJ MEMORY';
        photo.appendChild(label);
      });
    });
  }
}
