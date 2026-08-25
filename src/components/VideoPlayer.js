/**
 * VideoPlayer — Reusable cinematic video component
 * Peter Parker: The Journey
 *
 * Usage:
 *   const player = new VideoPlayer(containerEl, {
 *     src:    '/assets/videos/intro.mp4',
 *     poster: '/assets/images/poster-intro.jpg',
 *     ratio:  '16-9' | '21-9' | 'full',
 *     autoplay: true,
 *   });
 */

import { musicController } from './MusicController.js';

export class VideoPlayer {
  constructor(container, options = {}) {
    this.container = container;
    this.options   = {
      src:      options.src      || '',
      poster:   options.poster   || '',
      ratio:    options.ratio    || '16-9',
      autoplay: options.autoplay !== undefined ? options.autoplay : false,
      muted:    options.muted    !== undefined ? options.muted    : false,
      label:    options.label    || 'DUMMY VIDEO PLACEHOLDER',
    };

    this.isPlaying = false;
    this.isMuted   = this.options.muted;
    this._build();
    this._bindEvents();
    this._observeViewport();
  }

  _build() {
    this.container.className += ` video-wrapper video-wrapper--${this.options.ratio}`;
    this.container.setAttribute('data-cursor-hover', '');

    // Cinematic placeholder background (shown when no real src)
    const hasRealSrc = this.options.src && !this.options.src.includes('/assets/videos/');
    const placeholderBg = hasRealSrc
      ? ''
      : `background: linear-gradient(160deg, #0D0D0D 0%, #0B3D91 40%, #050505 100%);`;

    this.container.innerHTML = `
      <!-- DUMMY VIDEO: Replace src with real video path -->
      <video
        class="video-element"
        src="${this.options.src}"
        ${this.options.poster ? `poster="${this.options.poster}"` : ''}
        ${this.options.muted ? 'muted' : ''}
        playsinline
        preload="none"
        aria-label="${this.options.label}"
      ></video>

      ${this.options.poster
        ? `<img class="video-poster" src="${this.options.poster}" alt="${this.options.label} poster" />`
        : `<div class="video-poster placeholder-city" style="${placeholderBg}" aria-label="${this.options.label} — ${this.options.label}"></div>`
      }

      <div class="video-controls" role="toolbar" aria-label="Video controls">
        <button class="video-btn video-play-btn" aria-label="Play or pause video">
          <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        </button>

        <div class="video-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="video-progress-fill"></div>
        </div>

        <button class="video-btn video-mute-btn" aria-label="Toggle mute">
          <svg class="mute-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <svg class="mute-on-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        </button>

        <button class="video-btn video-fullscreen-btn" aria-label="Toggle fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/>
            <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>
      </div>
    `;

    this.videoEl      = this.container.querySelector('.video-element');
    this.posterEl     = this.container.querySelector('.video-poster');
    this.playBtn      = this.container.querySelector('.video-play-btn');
    this.muteBtn      = this.container.querySelector('.video-mute-btn');
    this.fullscreenBtn = this.container.querySelector('.video-fullscreen-btn');
    this.progressBar  = this.container.querySelector('.video-progress');
    this.progressFill = this.container.querySelector('.video-progress-fill');
    this.playIcon     = this.container.querySelector('.play-icon');
    this.pauseIcon    = this.container.querySelector('.pause-icon');
    this.muteOffIcon  = this.container.querySelector('.mute-off-icon');
    this.muteOnIcon   = this.container.querySelector('.mute-on-icon');
  }

  _bindEvents() {
    if (!this.videoEl) return;

    // Play/pause button
    this.playBtn?.addEventListener('click', () => this.togglePlay());

    // Video click to play/pause
    this.videoEl.addEventListener('click', () => this.togglePlay());

    // Mute
    this.muteBtn?.addEventListener('click', () => this.toggleMute());

    // Fullscreen
    this.fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());

    // Progress
    this.videoEl.addEventListener('timeupdate', () => {
      if (!this.videoEl.duration) return;
      const pct = (this.videoEl.currentTime / this.videoEl.duration) * 100;
      if (this.progressFill) this.progressFill.style.width = `${pct}%`;
      if (this.progressBar)  this.progressBar.setAttribute('aria-valuenow', Math.round(pct));
    });

    // Seek on progress bar click
    this.progressBar?.addEventListener('click', (e) => {
      const rect = this.progressBar.getBoundingClientRect();
      const pct  = (e.clientX - rect.left) / rect.width;
      this.videoEl.currentTime = pct * this.videoEl.duration;
    });

    // Video loaded
    this.videoEl.addEventListener('canplay', () => {
      this.videoEl.classList.add('loaded');
      if (this.posterEl) this.posterEl.style.opacity = '0';
    });

    // Video ended
    this.videoEl.addEventListener('ended', () => {
      this.isPlaying = false;
      this._updatePlayUI();
      musicController.restoreAfterVideo();
    });

    // Video play/pause events
    this.videoEl.addEventListener('play',  () => { this.isPlaying = true;  this._updatePlayUI(); });
    this.videoEl.addEventListener('pause', () => { this.isPlaying = false; this._updatePlayUI(); });
  }

  _observeViewport() {
    if (!this.videoEl || !this.options.autoplay) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.play();
        } else {
          this.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.container);
  }

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  play() {
    if (!this.videoEl) return;
    this.videoEl.play().catch(() => {});
    musicController.duckForVideo();
  }

  pause() {
    if (!this.videoEl) return;
    this.videoEl.pause();
    musicController.restoreAfterVideo();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.videoEl) this.videoEl.muted = this.isMuted;
    if (this.muteOffIcon) this.muteOffIcon.style.display = this.isMuted ? 'none'  : '';
    if (this.muteOnIcon)  this.muteOnIcon.style.display  = this.isMuted ? ''      : 'none';
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  _updatePlayUI() {
    if (this.playIcon)  this.playIcon.style.display  = this.isPlaying ? 'none' : '';
    if (this.pauseIcon) this.pauseIcon.style.display  = this.isPlaying ? ''    : 'none';
  }
}
