/**
 * 18 — The Sacrifice
 * Emotional climax. Minimalist. Nav hidden. Music ducked.
 * Includes Peter & MJ Leaving scene (peter mj.mp4).
 */

import { musicController } from '../components/MusicController.js';
import { heartParticles } from '../components/HeartParticleSystem.js';

export function initSacrifice() {
  const section = document.getElementById('section-sacrifice');
  if (!section) return;

  section.style.minHeight = 'auto';
  section.style.padding = 'var(--space-3xl) 0';
  section.style.background = '#020202';

  const lines = [
    { text: 'PETER CHOOSES EVERYONE.',   class: 'sacrifice-quote-sub' },
    { text: 'HE CHOOSES RESPONSIBILITY.', class: 'sacrifice-quote-sub' },
    { text: 'HE CHOOSES TO BE FORGOTTEN.', class: 'sacrifice-quote-sub' },
    { text: null, class: 'sacrifice-silence' },
    { text: 'HE CHOOSES TO LOSE MJ.',    class: 'sacrifice-line--mj' },
    { text: '“SOME CHOICES DON\'T FEEL LIKE HEROISM.”', class: 'sacrifice-quote-final' },
    { text: '“THEY FEEL LIKE LOSING EVERYTHING.”', class: 'sacrifice-quote-final-red' }
  ];

  section.innerHTML = `
    <!-- Minimal pitch black background -->
    <div style="
      position:absolute;inset:0;
      background: #010101;
    " aria-hidden="true"></div>

    <div class="sacrifice-content" id="sacrifice-content" style="
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 var(--space-lg);
    ">
      ${lines.map((line, i) => {
        if (!line.text) return `<div class="${line.class}" aria-hidden="true" style="height: 20px;"></div>`;
        
        let style = '';
        if (line.class === 'sacrifice-quote-sub') {
          style = 'color: #555; font-size: 16px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; opacity: 0;';
        } else if (line.class === 'sacrifice-line--mj') {
          style = 'color: #FFF; font-size: clamp(24px, 3.5vw, 44px); letter-spacing: 0.1em; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; opacity: 0;';
        } else if (line.class === 'sacrifice-quote-final') {
          style = 'color: #A0A0A0; font-family: var(--font-quote); font-style: italic; font-size: clamp(20px, 2.5vw, 30px); opacity: 0;';
        } else if (line.class === 'sacrifice-quote-final-red') {
          style = 'color: #C62828; font-family: var(--font-quote); font-style: italic; font-size: clamp(20px, 2.5vw, 30px); margin-bottom: 30px; text-shadow: 0 0 15px rgba(198, 40, 40, 0.4); opacity: 0;';
        }

        return `<p
          class="sacrifice-line ${line.class}"
          data-sacrifice-line
          style="${style} transition: opacity 0.8s ease, transform 0.8s ease; transform: translateY(15px);"
        >${line.text}</p>`;
      }).join('')}

      <!-- Soft Desaturated Cinematic Memory Window with subtle red heart edge glow -->
      <div class="cinematic-memory-window" 
           id="mj-leave-window"
           data-sacrifice-line
           data-video-src="/peter mj.mp4"
           data-poster="/peter4.jpg"
           data-title="Leaving Her"
           data-caption="Peter Parker makes the ultimate sacrifice. He leaves MJ to live her life in peace, letting go of his last connection to love."
           data-chapter="SACRIFICE"
           style="
             width: 440px; 
             max-width: 95%; 
             transform: rotate(-1deg) translateY(15px);
             opacity: 0;
             transition: opacity 0.8s ease, transform 0.8s ease;
             border-color: rgba(198, 40, 40, 0.35);
             box-shadow: 0 20px 60px rgba(0,0,0,0.95), 0 0 35px rgba(198, 40, 40, 0.08);
           ">
      </div>
    </div>
  `;

  // Custom desaturated/lowered volume intersection observer
  let revealed = false;
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Quiet down music for emotional scene
      musicController.setVolume(0.08);
      
      // Stop/Reduce floating particles
      heartParticles.setMode('NONE');

      if (!revealed) {
        revealed = true;
        // Add revealed class sequentially
        const els = section.querySelectorAll('[data-sacrifice-line]');
        els.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = el.id === 'mj-leave-window' 
              ? 'rotate(-1deg) translateY(0)' 
              : 'translateY(0)';
          }, i * 700); // Slower, emotional reveal timing
        });
      }
    } else {
      // Restore music volume when scrolling away
      musicController.setVolume(0.5);
    }
  }, { threshold: 0.15 });

  observer.observe(section);
}
