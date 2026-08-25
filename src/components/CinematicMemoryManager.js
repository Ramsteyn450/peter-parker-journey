/**
 * CinematicMemoryManager — Inline Video Autoplay, Priority & Custom UI Controller
 * Peter Parker: The Journey
 */

import { musicController } from './MusicController.js';
import { memoryViewerInstance } from './CinematicMemoryViewer.js';

export class CinematicMemoryManager {
  constructor() {
    this.windows = [];
    this.activeVideo = null;
    this.musicDucked = false;

    // Wait for DOM to register windows
    setTimeout(() => this.init(), 100);
  }

  init() {
    const els = document.querySelectorAll('.cinematic-memory-window');
    els.forEach((el, index) => {
      this._setupWindow(el, index + 1);
    });

    this._setupIntersectionObserver();
  }

  _setupWindow(el, number) {
    const videoSrc = el.getAttribute('data-video-src') || '';
    const poster = el.getAttribute('data-poster') || '';
    const title = el.getAttribute('data-title') || 'Memory';
    const caption = el.getAttribute('data-caption') || '';
    const chapter = el.getAttribute('data-chapter') || 'CH';
    const isPhoto = el.hasAttribute('data-is-photo');

    el.style.cssText = `
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border: 1px solid rgba(122, 0, 8, 0.4);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(122, 0, 8, 0.15);
      cursor: pointer;
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: border-color 0.4s ease, box-shadow 0.4s ease;
    `;

    // Internal Markup for Cinematic Memory Window
    el.innerHTML = `
      <!-- Glow background layer -->
      <div class="video-glow-layer" style="
        position: absolute;
        inset: -5%;
        z-index: 1;
        background: radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%);
        pointer-events: none;
        transform: translateZ(-20px);
        transition: transform 0.4s ease;
      "></div>
      
      <!-- Glass reflection layer -->
      <div class="video-glass-layer" style="
        position: absolute;
        inset: 0;
        z-index: 5;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.02) 100%);
        pointer-events: none;
        transform: translateZ(15px);
        transition: transform 0.4s ease;
        border-radius: 8px;
      "></div>

      <!-- Web Detail Overlay -->
      <div class="web-strand-overlay" style="
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        background-image: radial-gradient(circle at 10% 10%, rgba(255, 46, 54, 0.1) 0%, transparent 60%);
        opacity: 0.7;
      "></div>

      <!-- Reflection sweep -->
      <div class="reflection-sweep" style="
        position: absolute;
        inset: 0;
        z-index: 4;
        pointer-events: none;
        background: linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.08) 50%, transparent 55%);
        transform: translateX(-100%);
        transition: transform 0.8s ease;
      "></div>

      <!-- Media element -->
      ${isPhoto 
        ? `<img class="window-media" src="${poster}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95) contrast(1.05); transition: filter 0.4s ease, transform 0.4s ease; z-index: 2; position: relative;" />`
        : `<video class="window-media window-video" src="${videoSrc}" poster="${poster}" loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9) contrast(1.05); opacity: 0.85; transition: all 0.5s ease; z-index: 2; position: relative;"></video>`
      }

      <!-- Badge (Metal/Glass Edge) -->
      <div style="
        position: absolute;
        top: 14px;
        left: 14px;
        z-index: 6;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(13, 13, 13, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        padding: 5px 10px;
        backdrop-filter: blur(5px);
      ">
        <span style="
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${isPhoto ? '#C0C0C0' : '#FF2E36'};
          box-shadow: ${isPhoto ? 'none' : '0 0 8px #FF2E36'};
        "></span>
        <span style="
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #FFF;
          font-weight: 700;
          text-transform: uppercase;
        ">${isPhoto ? 'FROZEN MOMENT' : 'FILM MEMORY'}</span>
      </div>

      <!-- Metadata tag (Chapter & Number) -->
      <div style="
        position: absolute;
        bottom: 14px;
        right: 14px;
        z-index: 6;
        background: rgba(13, 13, 13, 0.75);
        border: 1px solid rgba(255, 46, 54, 0.3);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 9px;
        color: #FF555A;
        letter-spacing: 0.1em;
        font-weight: 700;
        backdrop-filter: blur(5px);
      ">
        ${chapter} • MEMORY #${String(number).padStart(2, '0')}
      </div>

      <!-- SOUND ON / SOUND OFF Toggle Button (for video) -->
      ${!isPhoto 
        ? `<button class="window-sound-toggle" style="
            position: absolute;
            bottom: 14px;
            left: 14px;
            z-index: 7;
            background: rgba(13, 13, 13, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFF;
            padding: 5px 12px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
          ">
            <span class="sound-toggle-icon">🔇</span> SOUND ON
          </button>`
        : ''
      }
    `;

    const videoEl = el.querySelector('.window-video');
    const sweep = el.querySelector('.reflection-sweep');
    const soundToggle = el.querySelector('.window-sound-toggle');

    // Hover 3D tilt interaction (Desktop only)
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      const rotateX = -(y / (rect.height / 2)) * 6;
      const rotateY = (x / (rect.width / 2)) * 6;

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
      el.style.borderColor = 'rgba(255, 46, 54, 0.6)';
      el.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 46, 54, 0.15)';
      
      if (sweep) {
        sweep.style.transform = `translateX(${(x / rect.width) * 100}%)`;
      }

      const glass = el.querySelector('.video-glass-layer');
      const glow = el.querySelector('.video-glow-layer');
      if (glass) glass.style.transform = `translate3d(${x * 0.03}px, ${y * 0.03}px, 15px)`;
      if (glow) glow.style.transform = `translate3d(${-x * 0.04}px, ${-y * 0.04}px, -20px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      el.style.borderColor = 'rgba(255, 46, 54, 0.3)';
      el.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 46, 54, 0.05)';
      
      if (sweep) {
        sweep.style.transform = 'translateX(-100%)';
      }

      const glass = el.querySelector('.video-glass-layer');
      const glow = el.querySelector('.video-glow-layer');
      if (glass) glass.style.transform = 'translateZ(15px)';
      if (glow) glow.style.transform = 'translateZ(-20px)';
    });

    // Handle clicking the window -> Expand to full screen lightbox
    el.addEventListener('click', (e) => {
      // Don't expand if click was on the sound toggle button
      if (e.target.closest('.window-sound-toggle')) return;
      
      // Pause inline video
      if (videoEl) videoEl.pause();

      memoryViewerInstance.show(isPhoto ? poster : videoSrc, title, caption);
    });

    // Sound toggle handling
    if (soundToggle && videoEl) {
      soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = soundToggle.querySelector('.sound-toggle-icon');
        
        if (videoEl.muted) {
          // Unmute video
          videoEl.muted = false;
          icon.textContent = '🔊';
          soundToggle.style.background = '#FF2E36';
          soundToggle.style.borderColor = '#FF555A';
          soundToggle.innerHTML = '<span class="sound-toggle-icon">🔊</span> SOUND OFF';
          
          // Duck global music
          musicController.setVolume(0.08);
          this.musicDucked = true;
        } else {
          // Mute video
          videoEl.muted = true;
          icon.textContent = '🔇';
          soundToggle.style.background = 'rgba(13, 13, 13, 0.8)';
          soundToggle.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          soundToggle.innerHTML = '<span class="sound-toggle-icon">🔇</span> SOUND ON';
          
          // Restore music
          musicController.setVolume(0.5);
          this.musicDucked = false;
        }
      });
    }

    if (videoEl) {
      this.windows.push({ el, videoEl, soundToggle });
    }
  }

  _setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const item = this.windows.find(w => w.el === entry.target);
        if (!item) return;

        if (entry.isIntersecting) {
          // Pause any other active video first
          this.windows.forEach(w => {
            if (w !== item && !w.videoEl.paused) {
              w.videoEl.pause();
              console.log('[CINEMATIC MANAGER] Pausing non-focused memory video.');
            }
          });

          // Play focused video
          item.videoEl.play().catch(e => console.log('Autoplay blocked:', e));
          item.videoEl.style.opacity = '1';
          item.videoEl.style.filter = 'brightness(1.05) contrast(1.1)';
          this.activeVideo = item.videoEl;
          console.log('[CINEMATIC MANAGER] Autoplaying memory video in viewport.');
        } else {
          // Pause when scrolling away
          item.videoEl.pause();
          item.videoEl.style.opacity = '0.85';
          item.videoEl.style.filter = 'brightness(0.9) contrast(1.05)';
          
          // Restore music volume if this was the unmuted video
          if (this.activeVideo === item.videoEl && this.musicDucked) {
            musicController.setVolume(0.5);
            this.musicDucked = false;
          }
        }
      });
    }, { threshold: 0.55 }); // Triggers when 55% of the memory window is visible

    this.windows.forEach(w => observer.observe(w.el));
  }
}

export const cinematicMemoryManager = new CinematicMemoryManager();
