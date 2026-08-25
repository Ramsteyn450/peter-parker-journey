/**
 * 07 — Love Story Scroll Sequence
 * 7 scenes, scroll-driven, cinematic transitions
 * Uses peter4.jpg (MJ hugging Spider-Man) as background
 */

import { LOVE_SCENES } from '../assets.config.js';
import { ScrollManager } from '../components/ScrollManager.js';

export function initLoveStory() {
  const section = document.getElementById('section-love-scroll');
  if (!section) return;

  const sceneBgs = [
    'linear-gradient(160deg,#2d0910 0%,#1a0508 100%)',
    'linear-gradient(160deg,#1a0508 0%,#3d0d15 100%)',
    'linear-gradient(160deg,#3d0d15 0%,#1a0810 100%)',
    'linear-gradient(160deg,#1a0810 0%,#2d0910 100%)',
    'linear-gradient(160deg,#2d1015 0%,#1a0508 100%)',
    'linear-gradient(160deg,#1a0810 0%,#3d0d15 100%)',
    'linear-gradient(160deg,#2d0910 0%,#1a0810 100%)',
  ];

  section.innerHTML = `
    <div class="love-scroll-sticky" id="love-scroll-sticky">
      ${LOVE_SCENES.map((scene, i) => `
        <div class="love-scene${i === 0 ? ' active' : ''}" id="love-scene-${i}" aria-label="${scene.scene}">
          <div style="
            position:absolute;inset:0;
            background:${sceneBgs[i]};
            transition:opacity 1s ease;
          " aria-hidden="true"></div>

          <div class="love-scene-content" style="position:relative;z-index:2;max-width:800px;text-align:center;padding:var(--space-lg);">
            <p class="love-scene-num" style="color:var(--spider-red);font-size:var(--fs-label);letter-spacing:0.4em;margin-bottom:var(--space-md);">${scene.scene}</p>

            <div class="love-scene-image" aria-label="${scene.scene} — image" style="max-width:550px;aspect-ratio:16/9;margin:0 auto var(--space-lg);border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(230,36,41,0.2);border:1px solid rgba(230,36,41,0.3);">
              <img src="/peter4.jpg" alt="Peter and MJ" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
            </div>

            <p class="love-scene-text" style="color:var(--white);font-family:var(--font-quote);font-style:italic;font-size:clamp(20px,3vw,32px);line-height:1.5;text-shadow:0 2px 20px rgba(0,0,0,0.9);">"${scene.text}"</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  ScrollManager.initLoveScroll(section);
}
