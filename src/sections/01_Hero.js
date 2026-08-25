/**
 * 01 — Hero Section
 * Uses: peter.png (Peter on rooftop with MJ sunset sky)
 * Transforms background into a layered 3D parallax composition with floating web strands.
 */

import { musicController } from '../components/MusicController.js';

export function initHero() {
  const section = document.getElementById('section-hero');
  if (!section) return;

  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.style.transformStyle = 'preserve-3d';
  section.style.perspective = '1000px';

  section.innerHTML = `
    <!-- Layered 3D Camera Parallax Scene (z-index: 0) -->
    <div class="hero-3d-scene" style="
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      will-change: transform;
      background: #0d0508;
      z-index: 0;
    ">
      <!-- LAYER 1: Deep Sky Backplate (slowest, recedes in depth) -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: -12%;
        transform: translateZ(-160px) scale(1.22);
        opacity: 0.85;
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(0.9) contrast(1.1) saturate(0.9);" />
      </div>

      <!-- LAYER 2: Sky Clouds & Far City Skyline -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: -8%;
        transform: translateZ(-90px) scale(1.12);
        opacity: 0.95;
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(1.05) contrast(1.05) hue-rotate(-2deg);" />
      </div>

      <!-- LAYER 3: Main Peter + MJ mid-ground composition -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: 0;
        transform: translateZ(0px) scale(1);
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(1.15) contrast(1.1);" />
      </div>

      <!-- LAYER 4: Foreground Depth framing web strands -->
      <svg class="hero-web-strand top-left" viewBox="0 0 100 100" style="
        position: absolute;
        top: -20px;
        left: -20px;
        width: 320px;
        height: 320px;
        pointer-events: none;
        stroke: var(--spider-red);
        fill: none;
        opacity: 0.28;
        transform: translateZ(60px) scale(0.85);
      ">
        <path d="M 0 0 C 30 12, 70 24, 100 36 M 0 0 C 12 30, 24 70, 36 100 M 10 10 C 20 20, 30 20, 40 10 M 20 20 C 30 30, 30 30, 45 20" stroke-width="0.35" />
      </svg>

      <svg class="hero-web-strand bottom-right" viewBox="0 0 100 100" style="
        position: absolute;
        bottom: -20px;
        right: -20px;
        width: 320px;
        height: 320px;
        pointer-events: none;
        stroke: var(--spider-red);
        fill: none;
        opacity: 0.22;
        transform: translateZ(-60px) scale(1.18);
      ">
        <path d="M 100 100 C 70 88, 32 78, 0 66 M 100 100 C 88 70, 78 32, 66 0 M 90 90 C 80 80, 70 80, 60 90" stroke-width="0.35" />
      </svg>
    </div>

    <!-- Hero Local Overlay Layer (z-index: 1) -->
    <div class="hero-local-overlay" style="
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(122,0,8,0.1) 45%, rgba(5,5,5,0.85) 100%);
    "></div>

    <!-- Hero Content Layer (z-index: 2, slightly pushed forward in 3D space) -->
    <div class="hero-content" id="hero-content" style="
      position: relative;
      z-index: 2;
      text-align: center;
      padding: var(--space-lg);
      max-width: 900px;
      margin: 0 auto;
      transform-style: preserve-3d;
      transform: translateZ(40px);
    ">
      <p class="hero-eyebrow" id="hero-eyebrow" style="font-size:clamp(12px, 1.2vw, 15px); letter-spacing:0.4em; text-transform:uppercase; color:#FFD700; font-weight:700; margin-bottom:var(--space-xs); text-shadow:0 0 12px rgba(255,215,0,0.6);">
        EVERY HERO HAS A STORY.
      </p>
      
      <p class="hero-tagline" id="hero-tagline" style="font-family:var(--font-quote); font-style:italic; font-size:clamp(22px,3.5vw,36px); color:#FFFFFF; margin-bottom:var(--space-md); text-shadow:0 2px 15px rgba(0,0,0,0.9); font-weight:600;">
        THIS IS HIS.
      </p>

      <h1 class="hero-main-title" id="hero-main-title" style="font-family:var(--font-display); font-size:clamp(64px,11vw,140px); line-height:0.9; letter-spacing:0.06em; text-transform:uppercase; color:#FFFFFF; text-shadow:0 0 40px rgba(255,255,255,0.4), 0 8px 30px rgba(0,0,0,0.95);">
        PETER <span style="color:#FF2E36; text-shadow:0 0 40px rgba(255,46,54,0.9), 0 0 80px rgba(255,46,54,0.5);">PARKER</span>
      </h1>

      <p class="hero-subtitle" id="hero-subtitle" style="font-size:clamp(12px,1.1vw,16px); letter-spacing:0.35em; text-transform:uppercase; color:#FFFFFF; font-weight:600; margin-top:var(--space-sm); margin-bottom:var(--space-xl); text-shadow:0 2px 10px rgba(0,0,0,0.9);">
        THE BOY BEHIND THE MASK
      </p>

      <div class="hero-cta" id="hero-cta" style="transform: translateZ(15px);">
        <button class="btn-cinematic" id="hero-enter-btn" aria-label="Enter the journey" style="
          padding: 20px 52px;
          border-radius: 4px;
        ">
          ENTER THE JOURNEY &nbsp;➔
        </button>
      </div>
    </div>
  `;

  _bindHeroButton();
}

function _bindHeroButton() {
  const btn = document.getElementById('hero-enter-btn');
  const next = document.getElementById('section-origin');

  btn?.addEventListener('click', () => {
    musicController.unlock();

    // ─── STUNNING 3D SPIDER LOGO ZOOM TRANSITION OVERLAY ───
    const transitionOverlay = document.createElement('div');
    transitionOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #050505;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    `;
    
    // Glowing SVG Spider Logo
    transitionOverlay.innerHTML = `
      <svg id="transition-spider" viewBox="0 0 100 100" style="
        width: 140px;
        height: 140px;
        fill: var(--spider-red);
        filter: drop-shadow(0 0 25px rgba(229, 9, 20, 0.85));
        transform: translateZ(-250px) scale(0.4);
        opacity: 0;
        transition: transform 0.75s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.4s ease;
      ">
        <path d="M 50 15 C 47 25, 45 35, 45 42 C 45 48, 47 50, 50 50 C 53 50, 55 48, 55 42 C 55 35, 53 25, 50 15 Z M 50 50 C 42 55, 38 65, 38 72 C 38 82, 45 85, 50 85 C 55 85, 62 82, 62 72 C 62 65, 58 55, 50 50 Z M 45 42 C 30 35, 20 20, 15 10 C 18 22, 30 35, 43 40 M 55 42 C 70 35, 80 20, 85 10 C 82 22, 70 35, 57 40 M 44 48 C 25 50, 15 52, 5 55 C 15 58, 30 55, 43 52 M 56 48 C 75 50, 85 52, 95 55 C 85 58, 70 55, 57 52 M 45 55 C 28 65, 18 78, 8 90 C 18 82, 32 72, 45 62 M 55 55 C 72 65, 82 78, 92 90 C 82 82, 68 72, 55 62"/>
      </svg>
    `;
    document.body.appendChild(transitionOverlay);

    // Zoom background scene into deep depth
    const heroScene = document.querySelector('.hero-3d-scene');
    if (heroScene) {
      heroScene.style.transition = 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)';
      heroScene.style.transform = 'translateZ(-150px) scale(0.82) rotateX(4deg)';
    }

    // Trigger overlay slide and logo zoom expansion
    requestAnimationFrame(() => {
      transitionOverlay.style.opacity = '1';
      const spider = transitionOverlay.querySelector('#transition-spider');
      if (spider) {
        spider.style.opacity = '1';
        spider.style.transform = 'translateZ(250px) scale(15)';
      }
    });

    // Scroll to Chapter 01 at peak zoom (~800ms)
    setTimeout(() => {
      next?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 780);

    // Clean dissolve overlay
    setTimeout(() => {
      transitionOverlay.style.opacity = '0';
      setTimeout(() => transitionOverlay.remove(), 400);
      if (heroScene) {
        heroScene.style.transition = '';
        heroScene.style.transform = '';
      }
    }, 1100);
  });
}
