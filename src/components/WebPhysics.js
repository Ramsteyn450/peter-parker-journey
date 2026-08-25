/**
 * WebPhysics — Interactive Web Springs, Web-to-Heart Morph, and Swing Transitions
 * Peter Parker: The Journey
 */

import { soundSynth } from './SoundSynthesizer.js';

export class WebPhysics {
  constructor() {
    this._initWebMorphs();
    this._initElasticWebClicks();
  }

  // Elastic Web click interaction
  _initElasticWebClicks() {
    const webSvgs = document.querySelectorAll('.hero-web-svg, .loader-web');
    webSvgs.forEach((svg) => {
      svg.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      svg.addEventListener('click', () => {
        soundSynth.playWebShoot();
        svg.style.transform = 'scale(1.12) rotate(4deg)';
        setTimeout(() => {
          svg.style.transform = 'scale(1) rotate(0deg)';
        }, 400);
      });
    });
  }

  // Web-to-Heart Morph transition helper
  _initWebMorphs() {
    const loveSection = document.getElementById('section-love');
    if (!loveSection) return;

    const webHeart = document.createElement('div');
    webHeart.className = 'web-heart-symbol';
    webHeart.style.cssText = `
      position: absolute;
      top: 20px;
      right: 40px;
      width: 44px;
      height: 44px;
      pointer-events: none;
      z-index: 2;
      opacity: 0.8;
      filter: drop-shadow(0 0 10px #FF2E36);
    `;
    webHeart.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M 50 30 C 35 10, 10 25, 10 50 C 10 70, 50 95, 50 95 C 50 95, 90 70, 90 50 C 90 25, 65 10, 50 30 Z" fill="none" stroke="#FF2E36" stroke-width="3" stroke-dasharray="200" stroke-dashoffset="0"/>
        <line x1="50" y1="30" x2="50" y2="95" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <line x1="20" y1="45" x2="80" y2="45" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      </svg>
    `;
    loveSection.appendChild(webHeart);
  }
}
