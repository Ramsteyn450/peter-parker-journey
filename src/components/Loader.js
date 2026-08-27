/**
 * Loader — Critical Asset Preloader & Interactive Spider-Man Intro Screen
 * Peter Parker: The Journey
 * Handles the cinematic zoom transition on click (optimized for maximum 60FPS performance)
 */

import { musicController } from './MusicController.js';

export class Loader {
  constructor(onComplete) {
    this.loaderEl   = document.getElementById('loader');
    this.fillEl     = document.getElementById('loader-fill');
    this.percentEl  = document.getElementById('loader-percent');
    this.onComplete = onComplete;
    this.progress   = 0;
    this.isDone     = false;

    // ─── PERFORMANCE: Pre-render and decode transition assets in advance ───
    this._prepareTransitionOverlay();
  }

  _prepareTransitionOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'cinematic-zoom-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 10002;
      background: #050505;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
      pointer-events: none;
      transition: opacity 0.08s linear;
      will-change: opacity;
    `;

    // GPU-friendly red glow backplate (prevents rasterizing heavy filter/blur during scale)
    this.glowBackplate = document.createElement('div');
    this.glowBackplate.style.cssText = `
      position: absolute;
      inset: -50%;
      background: radial-gradient(circle at center, rgba(230, 36, 41, 0.95) 0%, rgba(230, 36, 41, 0.3) 40%, rgba(5, 5, 5, 0) 70%);
      opacity: 0;
      pointer-events: none;
      will-change: opacity;
    `;

    // Decoded logo image (no filters to maintain locked 60FPS during scale)
    this.logoImg = document.createElement('img');
    this.logoImg.src = 'spider-logo.png';
    this.logoImg.alt = 'Spider-Man Logo';
    this.logoImg.style.cssText = `
      width: auto;
      height: 60vh;
      max-width: 80vw;
      object-fit: contain;
      opacity: 0;
      transform: scale(0.65) translate3d(0, 0, 0);
      will-change: transform;
    `;

    // Force browser to decode the image in the background before user clicks Explore
    this.logoImg.decode()
      .then(() => console.log('[LOADER] Cinematic transition image pre-decoded'))
      .catch((e) => console.warn('[LOADER] Image pre-decoding failed:', e));

    this.overlay.appendChild(this.glowBackplate);
    this.overlay.appendChild(this.logoImg);
    document.body.appendChild(this.overlay);
  }

  start() {
    console.log('[LOADER] Critical assets started');

    if (!this.loaderEl) {
      this._finish();
      return;
    }

    this._setProgress(15);

    // Failsafe timer (3.5 seconds max)
    const failsafe = setTimeout(() => {
      if (!this.isDone) {
        console.warn('[LOADER] Failsafe timer reached');
        this._setProgress(100);
        this._showExploreButton();
      }
    }, 3500);

    const criticalImages = [
      { name: 'logo', src: 'spider-logo.png' },
      { name: 'hero', src: 'peter.png' },
    ];

    let loadedCount = 0;
    const total = criticalImages.length;

    const promises = criticalImages.map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          console.log(`[LOADER] ${item.name} loaded`);
          const target = 15 + Math.floor((loadedCount / total) * 85);
          this._setProgress(target);
          resolve(item.src);
        };
        img.onerror = () => {
          loadedCount++;
          console.warn(`[LOADER] Asset failed: ${item.src}`);
          const target = 15 + Math.floor((loadedCount / total) * 85);
          this._setProgress(target);
          resolve(null);
        };
        img.src = item.src;
      });
    });

    Promise.allSettled(promises).then(() => {
      clearTimeout(failsafe);
      console.log('[LOADER] Critical loading complete');
      this._setProgress(100);
      setTimeout(() => this._showExploreButton(), 300);
    });
  }

  _setProgress(target) {
    if (this.isDone) return;
    this.progress = target;
    if (this.fillEl)    this.fillEl.style.width = `${target}%`;
    if (this.percentEl) this.percentEl.textContent = `${target}%`;
  }

  _showExploreButton() {
    if (this.isDone) return;

    const subtitle = this.loaderEl.querySelector('.loader-subtitle');
    const track = this.loaderEl.querySelector('.loader-progress-track');
    const percent = this.loaderEl.querySelector('.loader-percent');

    if (subtitle) { subtitle.style.opacity = '0'; subtitle.style.transition = 'opacity 0.4s ease'; }
    if (track)    { track.style.opacity = '0';    track.style.transition = 'opacity 0.4s ease'; }
    if (percent)  { percent.style.opacity = '0';  percent.style.transition = 'opacity 0.4s ease'; }

    setTimeout(() => {
      if (subtitle) subtitle.style.display = 'none';
      if (track)    track.style.display = 'none';
      if (percent)  percent.style.display = 'none';

      this._createExploreButton();
    }, 450);
  }

  _createExploreButton() {
    const textContainer = this.loaderEl.querySelector('.loader-text');
    if (!textContainer) return;

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'explore-btn-wrapper';
    btnWrapper.style.cssText = `
      position: relative;
      margin-top: 20px;
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    `;

    btnWrapper.innerHTML = `
      <!-- Expand pulse circle -->
      <div class="explore-btn-pulse" style="
        position: absolute;
        inset: -12px;
        border: 1px solid rgba(255, 46, 54, 0.4);
        border-radius: 50px;
        opacity: 0;
        transform: scale(0.85);
        pointer-events: none;
        transition: transform 0.5s ease, opacity 0.5s ease;
      "></div>

      <!-- Button element -->
      <button class="explore-journey-btn" style="
        position: relative;
        background: linear-gradient(135deg, #FF2E36 0%, #8A0B10 100%);
        border: 2px solid #FF555A;
        color: #FFFFFF;
        padding: 18px 48px;
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        border-radius: 50px;
        cursor: pointer;
        outline: none;
        box-shadow: 0 10px 30px rgba(255, 46, 54, 0.4), 0 0 10px rgba(255, 46, 54, 0.2);
        transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
      ">EXPLORE THE JOURNEY</button>
    `;

    textContainer.appendChild(btnWrapper);

    requestAnimationFrame(() => {
      btnWrapper.style.opacity = '1';
      btnWrapper.style.transform = 'translateY(0)';
    });

    const btn = btnWrapper.querySelector('.explore-journey-btn');
    const pulse = btnWrapper.querySelector('.explore-btn-pulse');

    // Magnetic pull and hover events
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      pulse.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.1)`;
    });

    btn.addEventListener('mouseenter', () => {
      pulse.style.opacity = '1';
      pulse.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 15px 40px rgba(255, 46, 54, 0.7), 0 0 25px rgba(255, 46, 54, 0.4)';
    });

    btn.addEventListener('mouseleave', () => {
      pulse.style.opacity = '0';
      pulse.style.transform = 'scale(0.85)';
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.boxShadow = '0 10px 30px rgba(255, 46, 54, 0.4), 0 0 10px rgba(255, 46, 54, 0.2)';
    });

    // Zoom transition trigger on click (instantly triggers audio and animation together at 0.00s)
    btn.addEventListener('click', () => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';

      // ─── START AUDIO PLAYBACK IMMEDIATELY (0.00s) ─────────
      // Run audio initialization independently to avoid thread blockages
      setTimeout(() => {
        try {
          musicController.pause();
        } catch (e) {}

        const startAudio = new Audio('/start.mp3');
        startAudio.volume = 0.85;
        startAudio.currentTime = 0;
        startAudio.play().catch(err => {
          console.log('[LOADER] start.mp3 play failed:', err.message);
          const fallbackAudio = new Audio('/start.mpeg');
          fallbackAudio.volume = 0.85;
          fallbackAudio.play().catch(() => {});
        });
      }, 0);

      // ─── START LOGO ANIMATION IMMEDIATELY (0.00s) ─────────
      this._triggerCinematicZoom();
    });
  }

  _triggerCinematicZoom() {
    if (!this.overlay || !this.logoImg) return;

    // Show overlay instantly
    this.overlay.style.visibility = 'visible';
    this.overlay.style.opacity = '1';
    this.overlay.style.pointerEvents = 'all';

    // Show logo image instantly
    this.logoImg.style.opacity = '1';

    // Timeline Sequence (TOTAL: EXACTLY 1.0 SECOND)

    // 0.15s: Zoom begins (warp speed acceleration)
    // cubic-bezier(0.85, 0, 1, 1) provides pure accelerating force (velocity is maximum at the end, 0.95s)
    setTimeout(() => {
      // Animate ONLY scale (GPU-accelerated) and glow backplate opacity. No heavy filter rendering.
      this.logoImg.style.transition = 'transform 0.80s cubic-bezier(0.85, 0, 1, 1)';
      this.logoImg.style.transform = 'scale(45) translate3d(0, 0, 0)';

      this.glowBackplate.style.transition = 'opacity 0.80s cubic-bezier(0.85, 0, 1, 1)';
      this.glowBackplate.style.opacity = '1';
    }, 150);

    // 0.95s: Zoom peaks and logo completely fills screen, trigger instant dissolve and page load
    setTimeout(() => {
      if (this.loaderEl) {
        this.loaderEl.style.transition = 'opacity 0.05s linear';
        this.loaderEl.style.opacity = '0';
      }
      this._finish();

      // Fast dissolve overlay
      this.overlay.style.transition = 'opacity 0.05s linear';
      this.overlay.style.opacity = '0';
    }, 950);

    // 1.00s: Clean up overlay from DOM and remove will-change values
    setTimeout(() => {
      this.overlay.remove();
      if (this.loaderEl) {
        this.loaderEl.remove();
      }
    }, 1000);
  }

  _finish() {
    if (this.isDone) return;
    this.isDone = true;

    console.log('[LOADER] Entering experience');

    try {
      this.onComplete?.();
    } catch (err) {
      console.error('[LOADER] Error in onComplete callback:', err);
    }
  }
}
