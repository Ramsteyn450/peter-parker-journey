/**
 * 13 — Three Spider-Men
 * "Three Worlds. One Choice. Three Spider-Men."
 * Uses: tobey.webp, andrew.webp, tom.jpg
 */

import { ScrollManager } from '../components/ScrollManager.js';

export function initThreeSpiderMen() {
  const section = document.getElementById('section-three-spidermen');
  if (!section) return;

  section.innerHTML = `
    <div class="three-sm-sticky" id="three-sm-sticky">
      <div class="three-worlds" id="three-worlds" style="display: grid; grid-template-columns: 1fr 1fr 1fr; height: 100vh;">

        <!-- World 1: Tobey -->
        <div class="world-1" role="region" aria-label="World 1: Tobey Maguire's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <div class="world-divider world-divider--right" aria-hidden="true" style="z-index:5;"></div>
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 1 — TOBEY</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="/tobey.webp" alt="Tobey Maguire's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.9); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>

        <!-- World 2: Andrew -->
        <div class="world-2" role="region" aria-label="World 2: Andrew Garfield's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 2 — ANDREW</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="/andrew.webp" alt="Andrew Garfield's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.95); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>

        <!-- World 3: Tom -->
        <div class="world-3" role="region" aria-label="World 3: Tom Holland's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <div class="world-divider world-divider--left" aria-hidden="true" style="z-index:5;"></div>
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 3 — TOM</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="/tom.jpg" alt="Tom Holland's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.9); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>
      </div>

      <!-- Final title overlay (appears after merge) -->
      <div class="three-sm-title-overlay" id="three-sm-overlay" aria-live="polite" style="z-index:10;">
        <div class="three-sm-final-title">
          <p class="line1">THREE WORLDS. &nbsp; ONE CHOICE.</p>
          <h2 class="line2">THREE <span>SPIDER-MEN.</span></h2>
        </div>
      </div>
    </div>
  `;

  // Set scrollable height for sticky
  section.style.minHeight = '230vh';

  ScrollManager.initThreeSpiderMen(section);

  // Add hover interactive overrides to light up the silhouettes
  const worlds = section.querySelectorAll('.world-1, .world-2, .world-3');
  worlds.forEach(w => {
    const img = w.querySelector('img');
    w.addEventListener('mouseenter', () => {
      if (img) {
        img.style.filter = 'grayscale(0%) brightness(1.1) contrast(1.05)';
        img.style.transform = 'scale(1.025)';
      }
    });
    w.addEventListener('mouseleave', () => {
      if (img) {
        img.style.filter = 'grayscale(60%) brightness(0.9)';
        img.style.transform = 'scale(1)';
      }
    });
  });
}
