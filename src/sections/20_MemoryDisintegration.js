/**
 * 20 — Memory Disintegration
 * Photos fade away one by one.
 */

import { ScrollManager } from '../components/ScrollManager.js';
import { IMAGES } from '../assets.config.js';

export function initMemoryDisintegration() {
  const section = document.getElementById('section-disintegration');
  if (!section) return;

  const photos = [
    { src: IMAGES.disintegration01, caption: 'Queens' },
    { src: IMAGES.disintegration02, caption: 'Aunt May' },
    { src: IMAGES.disintegration03, caption: 'Ned' },
    { src: IMAGES.disintegration04, caption: 'MJ' },
    { src: IMAGES.disintegration05, caption: 'Tony' },
    { src: IMAGES.disintegration06, caption: 'Peter Parker' },
  ];

  const loveBgs = [
    'linear-gradient(135deg,#1a0408 0%,#2d0910 100%)',
    'linear-gradient(135deg,#1a1a1a 0%,#0D0D0D 100%)',
    'linear-gradient(135deg,#07152E 0%,#050505 100%)',
    'linear-gradient(135deg,#2d0910 0%,#1a0508 100%)',
    'linear-gradient(135deg,#1a0406 0%,#0D0D0D 100%)',
    'linear-gradient(135deg,#0D0D0D 0%,#050505 100%)',
  ];

  section.innerHTML = `
    <div style="text-align:center;margin-bottom:var(--space-xl);" data-reveal>
      <p class="label label-red" style="margin-bottom:var(--space-md);">THE MEMORIES FADING</p>
      <h2 class="chapter-title">EVERYTHING HE KNEW</h2>
    </div>

    <div class="disintegration-grid" id="disintegration-grid" role="list" aria-label="Fading memories">
      ${photos.map((photo, i) => `
        <div
          class="disintegration-photo"
          role="listitem"
          aria-label="${photo.caption} — fading memory"
          style="background:${loveBgs[i]};transition-delay:${i*0.6}s;"
        >
          <!-- DUMMY IMAGE: Replace src with ${photo.src} -->
          <img
            src="${photo.src}"
            alt="${photo.caption}"
            loading="lazy"
            style="width:100%;height:100%;object-fit:cover;opacity:0.6;"
            onerror="this.style.display='none'"
          />
          <div style="
            position:absolute;inset:0;display:flex;align-items:center;
            justify-content:center;flex-direction:column;gap:8px;
          ">
            <p style="font-size:var(--fs-small);letter-spacing:0.2em;
              color:rgba(245,245,245,0.15);text-transform:uppercase;">${photo.caption}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <p class="body-lg" style="
      text-align:center;margin-top:var(--space-xl);
      font-family:var(--font-quote);font-style:italic;
      color:var(--muted-white);max-width:500px;margin-left:auto;margin-right:auto;
    " data-reveal>
      One by one. The memories. Fading.
    </p>
  `;

  section.style.padding = 'var(--space-section) var(--space-md)';
  section.style.minHeight = '100vh';
  section.style.flexDirection = 'column';

  ScrollManager.initDisintegration(section);
}
