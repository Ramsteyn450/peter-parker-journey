/**
 * 25 — Spider-Man: Brand New Day Section
 * Peter Parker: The Journey
 */

import { musicController } from '../components/MusicController.js';

export function initBrandNewDaySection() {
  const section = document.getElementById('section-brand-new-day');
  if (!section) return;

  section.style.minHeight = '100vh';
  section.style.background = '#050505';
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.style.display = 'flex';
  section.style.alignItems = 'center';
  section.style.justifyContent = 'center';
  section.style.padding = 'var(--space-2xl) 0';

  section.innerHTML = `
    <!-- Subtle Red Glow Atmospheric Backplate -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 1;
    " aria-hidden="true"></div>

    <div class="bnd-container" style="
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    ">
      <!-- Title Section -->
      <div class="bnd-header" style="text-align: center; margin-bottom: 20px;">
        <span class="bnd-chapter" style="
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.35em;
          color: rgba(255, 255, 255, 0.35);
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(15px);
          transition: transform 0.8s ease, opacity 0.8s ease;
        ">Chapter 10</span>
        
        <h2 class="bnd-title-main" style="
          font-family: var(--font-display);
          font-size: clamp(38px, 6vw, 72px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.8s ease 0.2s, opacity 0.8s ease 0.2s;
        ">
          SPIDER-MAN<br>
          <span style="color: var(--spider-red); text-shadow: 0 0 25px rgba(229, 9, 20, 0.45);">BRAND NEW DAY</span>
        </h2>
      </div>

      <!-- Main Layout: Grid on desktop, stack on mobile -->
      <div class="bnd-layout" style="display: flex; gap: var(--space-2xl); align-items: center; justify-content: center; width: 100%;">
        
        <!-- Left: Cinematic Video Player Frame -->
        <div class="bnd-video-wrapper cinematic-video-frame" style="
          flex: 1.2;
          width: 100%;
          max-width: 680px;
          opacity: 0;
          transform: scale(0.97);
          filter: blur(10px);
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.4s, opacity 0.8s ease 0.4s, filter 0.8s ease 0.4s;
        ">
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

          <video 
            id="bnd-video"
            src="Brand new day.mp4" 
            autoplay 
            loop 
            muted 
            playsinline 
            style="width: 100%; display: block; object-fit: contain; position: relative; z-index: 2;"
          ></video>
          <!-- Audio Toggle overlay button -->
          <button id="bnd-audio-toggle" style="
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(5, 5, 5, 0.85);
            border: 1px solid var(--dark-red);
            color: var(--white);
            padding: 8px 16px;
            font-family: var(--font-display);
            font-size: 11px;
            letter-spacing: 0.15em;
            border-radius: 4px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            pointer-events: auto;
          ">
            <span id="bnd-audio-icon">🔇</span>
            <span id="bnd-audio-text">SOUND OFF</span>
          </button>
        </div>

        <!-- Right: Story Notes -->
        <div class="bnd-notes-wrapper" style="
          flex: 0.8;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          text-align: left;
          max-width: 420px;
        ">
          <div class="bnd-note bnd-note-1" style="
            opacity: 0;
            transform: translateX(25px);
            transition: transform 0.8s ease 0.6s, opacity 0.8s ease 0.6s;
          ">
            <h4 style="
              font-family: var(--font-display);
              font-size: 13px;
              letter-spacing: 0.2em;
              color: var(--spider-red);
              margin: 0 0 10px 0;
              text-transform: uppercase;
            ">The Next Chapter</h4>
            <p style="
              font-size: 15px;
              line-height: 1.7;
              color: var(--muted-white);
              margin: 0;
              font-weight: 500;
            ">
              Peter Parker's story didn't end when the world forgot him. It became a new beginning.
            </p>
          </div>

          <div class="bnd-note bnd-note-2" style="
            opacity: 0;
            transform: translateX(25px);
            transition: transform 0.8s ease 1s, opacity 0.8s ease 1s;
            border-left: 2px solid var(--dark-red);
            padding-left: 16px;
          ">
            <p style="
              font-family: var(--font-display);
              font-size: 14px;
              letter-spacing: 0.1em;
              color: var(--white);
              margin: 0 0 6px 0;
              text-transform: uppercase;
              font-weight: 700;
            ">A New York. A new suit. A new day.</p>
            <p style="
              font-size: 13px;
              line-height: 1.6;
              color: var(--muted-gray);
              margin: 0;
            ">
              But the responsibility remains.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;

  // Inject responsive layout styles into document head
  if (!document.getElementById('bnd-layout-styles')) {
    const style = document.createElement('style');
    style.id = 'bnd-layout-styles';
    style.textContent = `
      @media (max-width: 768px) {
        .bnd-layout {
          flex-direction: column !important;
          gap: var(--space-lg) !important;
        }
        .bnd-notes-wrapper {
          text-align: center !important;
          align-items: center !important;
          max-width: 100% !important;
        }
        .bnd-note-2 {
          border-left: none !important;
          border-top: 1px solid var(--dark-red) !important;
          padding-left: 0 !important;
          padding-top: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const video = section.querySelector('#bnd-video');
  const audioToggle = section.querySelector('#bnd-audio-toggle');
  const audioIcon = section.querySelector('#bnd-audio-icon');
  const audioText = section.querySelector('#bnd-audio-text');

  let userWantsSound = false;

  if (audioToggle && video) {
    audioToggle.addEventListener('click', () => {
      userWantsSound = video.muted; // Set target value based on current mute status
      
      if (userWantsSound) {
        video.muted = false;
        if (audioIcon) audioIcon.textContent = '🔊';
        if (audioText) audioText.textContent = 'SOUND ON';
        audioToggle.style.borderColor = 'var(--spider-red)';
        audioToggle.style.boxShadow = '0 0 15px rgba(229, 9, 20, 0.65)';
        musicController.duckVolume();
      } else {
        video.muted = true;
        if (audioIcon) audioIcon.textContent = '🔇';
        if (audioText) audioText.textContent = 'SOUND OFF';
        audioToggle.style.borderColor = 'var(--dark-red)';
        audioToggle.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        musicController.restoreVolume();
      }
    });
  }

  // Scroll triggers using IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger entrance animations
        section.querySelector('.bnd-chapter').style.opacity = '1';
        section.querySelector('.bnd-chapter').style.transform = 'translateY(0)';
        
        section.querySelector('.bnd-title-main').style.opacity = '1';
        section.querySelector('.bnd-title-main').style.transform = 'translateY(0)';
        
        const videoWrap = section.querySelector('.bnd-video-wrapper');
        videoWrap.style.opacity = '1';
        videoWrap.style.transform = 'scale(1)';
        videoWrap.style.filter = 'blur(0)';

        section.querySelector('.bnd-note-1').style.opacity = '1';
        section.querySelector('.bnd-note-1').style.transform = 'translateX(0)';

        section.querySelector('.bnd-note-2').style.opacity = '1';
        section.querySelector('.bnd-note-2').style.transform = 'translateX(0)';

        revealObserver.unobserve(section);
      }
    });
  }, { threshold: 0.15 });

  revealObserver.observe(section);

  // Active status IntersectionObserver to manage pause/play, duck/restore
  const activeObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      if (video) {
        video.play().catch(() => {});
        if (userWantsSound) {
          video.muted = false;
          if (audioIcon) audioIcon.textContent = '🔊';
          if (audioText) audioText.textContent = 'SOUND ON';
          if (audioToggle) {
            audioToggle.style.borderColor = 'var(--spider-red)';
            audioToggle.style.boxShadow = '0 0 15px rgba(229, 9, 20, 0.65)';
          }
          musicController.duckVolume();
        }
      }
    } else {
      if (video) {
        video.muted = true;
        if (audioIcon) audioIcon.textContent = '🔇';
        if (audioText) audioText.textContent = 'SOUND OFF';
        if (audioToggle) {
          audioToggle.style.borderColor = 'var(--dark-red)';
          audioToggle.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        }
      }
      musicController.restoreVolume();
    }
  }, { threshold: 0.1 });

  activeObserver.observe(section);
}
