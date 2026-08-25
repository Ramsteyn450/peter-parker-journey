/**
 * CinematicMemoryViewer — Central Media Manager & Reusable Overlay Video Player
 * Peter Parker: The Journey
 */

import { musicController } from './MusicController.js';
import { soundSynth } from './SoundSynthesizer.js';

export class CinematicMemoryViewer {
  constructor() {
    this.overlay = null;
    this.videoEl = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.previousMusicVolume = 0.5;
    this.backgroundVideosState = new Map(); // Store background video elements and their playing states

    this._createDOM();
  }

  _createDOM() {
    // If already exists, return
    if (document.getElementById('cinematic-memory-viewer')) {
      this.overlay = document.getElementById('cinematic-memory-viewer');
      this.videoEl = this.overlay.querySelector('.memory-viewer-video');
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'cinematic-memory-viewer';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(5, 5, 5, 0.85);
      backdrop-filter: blur(12px) brightness(0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    `;

    overlay.innerHTML = `
      <div class="memory-viewer-container" style="
        position: relative;
        width: min(1000px, 90vw);
        background: #050505;
        border: 1px solid rgba(255, 46, 54, 0.35);
        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 46, 54, 0.15);
        border-radius: 12px;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex;
        flex-direction: column;
      ">
        <!-- Close Button -->
        <button class="memory-viewer-close" aria-label="Close memory" style="
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s ease;
        ">✕</button>

        <!-- Video Wrapper -->
        <div style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000;">
          <video class="memory-viewer-video" style="width: 100%; height: 100%; object-fit: contain; display: block;" playsinline></video>
          
          <!-- Cinematic Memory Label Overlay -->
          <div style="
            position: absolute;
            top: 20px;
            left: 20px;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.65);
            padding: 6px 14px;
            border-left: 3px solid #FF2E36;
            border-radius: 0 4px 4px 0;
            font-size: 11px;
            letter-spacing: 0.2em;
            color: #FF555A;
            text-transform: uppercase;
            font-weight: 700;
          ">CINEMATIC MEMORY</div>
        </div>

        <!-- Details Footer -->
        <div style="padding: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); background: linear-gradient(180deg, #090909 0%, #050505 100%);">
          <h3 class="memory-viewer-title" style="color: #FFF; font-family: var(--font-display); font-size: clamp(20px, 2.5vw, 28px); margin: 0 0 8px 0; letter-spacing: 0.05em; text-transform: uppercase;">MEMORY TITLE</h3>
          <p class="memory-viewer-caption" style="color: #C0C0C0; font-size: 14px; line-height: 1.5; margin: 0; font-family: var(--font-body);">Memory caption goes here...</p>

          <!-- Custom UI Controls -->
          <div style="display: flex; align-items: center; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
            <!-- Play/Pause -->
            <button class="viewer-play-btn" style="
              background: #FF2E36;
              border: none;
              color: #FFF;
              padding: 10px 24px;
              border-radius: 4px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">PAUSE</button>

            <!-- Progress Bar -->
            <div class="viewer-progress-container" style="
              flex-grow: 1;
              height: 4px;
              background: rgba(255, 255, 255, 0.15);
              border-radius: 2px;
              position: relative;
              cursor: pointer;
              min-width: 150px;
            ">
              <div class="viewer-progress-fill" style="
                width: 0%;
                height: 100%;
                background: #FF2E36;
                border-radius: 2px;
                transition: width 0.1s linear;
              "></div>
            </div>

            <!-- Mute/Unmute -->
            <button class="viewer-mute-btn" style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFF;
              padding: 10px 18px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">MUTE</button>

            <!-- Fullscreen -->
            <button class="viewer-fullscreen-btn" style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFF;
              padding: 10px 18px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">FULLSCREEN</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.videoEl = overlay.querySelector('.memory-viewer-video');

    this._bindEvents();
  }

  _bindEvents() {
    const closeBtn = this.overlay.querySelector('.memory-viewer-close');
    const playBtn = this.overlay.querySelector('.viewer-play-btn');
    const muteBtn = this.overlay.querySelector('.viewer-mute-btn');
    const fullscreenBtn = this.overlay.querySelector('.viewer-fullscreen-btn');
    const progressContainer = this.overlay.querySelector('.viewer-progress-container');
    const progressFill = this.overlay.querySelector('.viewer-progress-fill');

    // Close on button click
    closeBtn.addEventListener('click', () => {
      soundSynth.playClose();
      this.close();
    });

    // Close on backdrop click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        soundSynth.playClose();
        this.close();
      }
    });

    // Play/Pause button
    playBtn.addEventListener('click', () => {
      if (this.videoEl.paused) {
        this.videoEl.play().catch(() => {});
        playBtn.textContent = 'PAUSE';
      } else {
        this.videoEl.pause();
        playBtn.textContent = 'PLAY';
      }
    });

    // Mute/Unmute
    muteBtn.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      this.videoEl.muted = this.isMuted;
      muteBtn.textContent = this.isMuted ? 'UNMUTE' : 'MUTE';
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.videoEl.requestFullscreen?.().catch(() => {
          this.overlay.querySelector('.memory-viewer-container').requestFullscreen?.();
        });
      } else {
        document.exitFullscreen?.();
      }
    });

    // Time update progress bar
    this.videoEl.addEventListener('timeupdate', () => {
      if (this.videoEl.duration) {
        const pct = (this.videoEl.currentTime / this.videoEl.duration) * 100;
        progressFill.style.width = `${pct}%`;
      }
    });

    // Click on progress bar to seek
    progressContainer.addEventListener('click', (e) => {
      if (this.videoEl.duration) {
        const rect = progressContainer.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        this.videoEl.currentTime = pct * this.videoEl.duration;
      }
    });

    // Auto-close/restore when video ends naturally
    this.videoEl.addEventListener('ended', () => {
      console.log('[MEMORY VIEWER] Video finished naturally.');
      this.close();
    });

    // Safe escape key close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isPlaying) {
        this.close();
      }
    });
  }

  show(src, title, caption) {
    if (!this.overlay || !this.videoEl) return;
    this.isPlaying = true;

    // Pause all other video elements on the page (central media manager)
    this._pauseAllOtherVideos();

    // Duck the music controller volume for dialogue audio clarity
    this.previousMusicVolume = musicController.volume;
    musicController.setVolume(this.previousMusicVolume * 0.15);

    // Set attributes
    this.videoEl.src = src;
    this.videoEl.load();

    this.overlay.querySelector('.memory-viewer-title').textContent = title;
    this.overlay.querySelector('.memory-viewer-caption').textContent = caption;

    // Expand & Reveal
    this.overlay.style.opacity = '1';
    this.overlay.style.pointerEvents = 'all';

    const container = this.overlay.querySelector('.memory-viewer-container');
    container.style.transform = 'scale(1) translateY(0)';

    // Play video after short expansion delay
    setTimeout(() => {
      this.videoEl.play().then(() => {
        this.overlay.querySelector('.viewer-play-btn').textContent = 'PAUSE';
      }).catch((err) => {
        console.warn('[MEMORY VIEWER] Playblocked or failed:', err);
      });
    }, 450);
  }

  close() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    // Pause and reset video
    this.videoEl.pause();
    this.videoEl.src = '';

    // Restore music controller volume
    musicController.setVolume(this.previousMusicVolume);

    // Resume previous playing background videos (central media manager)
    this._resumeAllOtherVideos();

    // Contract & Hide
    this.overlay.style.opacity = '0';
    this.overlay.style.pointerEvents = 'none';

    const container = this.overlay.querySelector('.memory-viewer-container');
    container.style.transform = 'scale(0.9) translateY(20px)';
  }

  _pauseAllOtherVideos() {
    this.backgroundVideosState.clear();
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((vid) => {
      if (vid !== this.videoEl && !vid.paused) {
        this.backgroundVideosState.set(vid, true);
        vid.pause();
        console.log('[MEDIA MANAGER] Pausing active background video:', vid);
      }
    });
  }

  _resumeAllOtherVideos() {
    this.backgroundVideosState.forEach((wasPlaying, vid) => {
      if (wasPlaying && vid) {
        vid.play().catch((err) => {
          console.warn('[MEDIA MANAGER] Failed to resume background video:', err);
        });
        console.log('[MEDIA MANAGER] Resumed background video.');
      }
    });
    this.backgroundVideosState.clear();
  }
}

// Global single instance export
export const memoryViewerInstance = new CinematicMemoryViewer();
