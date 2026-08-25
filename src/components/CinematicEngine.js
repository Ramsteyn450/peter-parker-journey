/**
 * CinematicEngine — Core Interactive Storytelling & Motion Director
 * Combines Lenis smooth scrolling, GSAP ScrollTrigger, 2.5D Parallax,
 * Magnetic Buttons, 3D Photo Tilt, Spider-Sense, and Narrative Lighting.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundSynth } from './SoundSynthesizer.js';
import { heartParticles } from './HeartParticleSystem.js';

gsap.registerPlugin(ScrollTrigger);

export class CinematicEngine {
  constructor() {
    this.lenis = null;
    this._initLenis();
    this._initNarrativeLighting();
    this._initMagneticButtons();
    this._initPhoto3DTilt();
    this._initCharacterBreathing();
    this._initSectionScrollDirector();
    this._initSpiderSenseMoments();
  }

  // 1. Smooth Cinematic Camera Scroll (Lenis + GSAP)
  _initLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 2. Mouse-reactive Narrative Ambient Light
  _initNarrativeLighting() {
    const light = document.createElement('div');
    light.id = 'ambient-light';
    light.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 3;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(255, 46, 54, 0.12) 0%, transparent 70%);
      transition: background 1s ease, width 0.6s ease, height 0.6s ease;
      will-change: transform;
    `;
    document.body.appendChild(light);

    window.addEventListener('mousemove', (e) => {
      light.style.left = `${e.clientX}px`;
      light.style.top = `${e.clientY}px`;
    }, { passive: true });

    this.ambientLight = light;
  }

  setAmbientColor(colorRgba) {
    if (this.ambientLight) {
      this.ambientLight.style.background = `radial-gradient(circle, ${colorRgba} 0%, transparent 70%)`;
    }
  }

  // 3. Magnetic Interactive Buttons
  _initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-cinematic, .btn-valentine, .nav-menu-btn, .music-toggle-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  }

  // 4. 3D Photo Parallax Tilt & Specular Shine
  _initPhoto3DTilt() {
    const cards = document.querySelectorAll(
      '.origin-image-wrapper, .becoming-suit-placeholder, .aunt-may-img-side, .mj-forgets-img-side, .memory-photo'
    );

    cards.forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.style.perspective = '1000px';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const rotateX = -(y / (rect.height / 2)) * 10;
        const rotateY = (x / (rect.width / 2)) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      card.addEventListener('click', () => {
        soundSynth.playShutter();
      });
    });
  }

  // 5. Character Subtle Breathing-like Scale & Depth
  _initCharacterBreathing() {
    const characterImgs = document.querySelectorAll(
      '.hero-bg-image, .origin-img, .becoming-img-full, .mj-full-img, .aunt-may-img, .mj-forgets-img'
    );

    characterImgs.forEach((img) => {
      gsap.to(img, {
        scale: 1.04,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }

  // 6. Section Narrative Scroll Director (Lighting & Particle Mood Sync)
  _initSectionScrollDirector() {
    // 1. Origin: Action/Origin lighting & particles
    ScrollTrigger.create({
      trigger: '#section-hero',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(255, 46, 54, 0.15)');
        heartParticles.setMode('LOVE');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(255, 46, 54, 0.15)');
        heartParticles.setMode('LOVE');
      }
    });

    // 2. Peter & MJ / Memory Wall: Warm Love
    ScrollTrigger.create({
      trigger: '#section-love',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(255, 60, 100, 0.22)');
        heartParticles.setMode('LOVE');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(255, 60, 100, 0.22)');
        heartParticles.setMode('LOVE');
      }
    });

    // 3. Infinity War / Snap: Fear & Heartbreak
    ScrollTrigger.create({
      trigger: '#section-infinity-war',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(150, 20, 30, 0.25)');
        heartParticles.setMode('HEARTBREAK');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(150, 20, 30, 0.25)');
        heartParticles.setMode('HEARTBREAK');
      }
    });

    // 4. Aunt May / Sacrifice: Desaturated Loss & Falling Ash
    ScrollTrigger.create({
      trigger: '#section-aunt-may',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(100, 100, 120, 0.12)');
        heartParticles.setMode('SACRIFICE');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(100, 100, 120, 0.12)');
        heartParticles.setMode('SACRIFICE');
      }
    });

    // 5. Peter Alone: Intentional stillness (No particles, near-black)
    ScrollTrigger.create({
      trigger: '#section-alone',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(20, 30, 50, 0.1)');
        heartParticles.setMode('NONE');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(20, 30, 50, 0.1)');
        heartParticles.setMode('NONE');
      }
    });

    // 6. Valentine: Radiant Gold & Red Celebration
    ScrollTrigger.create({
      trigger: '#section-valentine',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        this.setAmbientColor('rgba(255, 46, 54, 0.25)');
        heartParticles.setMode('VALENTINE');
      },
      onEnterBack: () => {
        this.setAmbientColor('rgba(255, 46, 54, 0.25)');
        heartParticles.setMode('VALENTINE');
      }
    });
  }

  // 7. Spider-Sense Sensory Cue on Major Dramatic Turns
  _initSpiderSenseMoments() {
    const senseTriggers = ['#section-identity', '#section-aunt-may', '#section-sacrifice'];

    senseTriggers.forEach((selector) => {
      const el = document.querySelector(selector);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          soundSynth.playSpiderSense();
          this._triggerSpiderSenseVisual();
        },
      });
    });
  }

  _triggerSpiderSenseVisual() {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      box-shadow: inset 0 0 100px rgba(255, 46, 54, 0.6);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(flash);

    requestAnimationFrame(() => {
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 400);
      }, 500);
    });
  }
}
