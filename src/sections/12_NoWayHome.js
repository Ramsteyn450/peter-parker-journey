/**
 * 12 — No Way Home
 * "The world broke open."
 * Uses: multiverse.jpg
 */

import { NWH_VILLAINS } from '../assets.config.js';

export function initNoWayHome() {
  const section = document.getElementById('section-no-way-home');
  if (!section) return;

  section.innerHTML = `
    <!-- Portal rings background -->
    <div class="portal-bg" aria-hidden="true">
      <div class="portal-ring portal-ring-1" style="border-color:rgba(11,61,145,0.4)"></div>
      <div class="portal-ring portal-ring-2" style="border-color:rgba(11,61,145,0.25)"></div>
      <div class="portal-ring portal-ring-3" style="border-color:rgba(11,61,145,0.15)"></div>
      <div class="portal-ring portal-ring-4" style="border-color:rgba(11,61,145,0.08)"></div>
    </div>

    <div class="nwh-content">
      <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);">
        NO WAY HOME
      </p>
      <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;text-align:center;">
        THE WORLD<br/>BROKE OPEN.
      </h2>
      <p class="body-lg" data-reveal style="
        transition-delay:0.2s;text-align:center;
        margin-top:var(--space-lg);max-width:500px;margin-left:auto;margin-right:auto;
      ">
        Doctor Strange attempted the impossible. The multiverse shattered.
        Every enemy who ever knew Peter Parker's name came through.
      </p>

      <!-- Villain tags -->
      <div class="nwh-villains" data-reveal style="transition-delay:0.3s" role="list" aria-label="Villains from the multiverse">
        ${NWH_VILLAINS.map(v => `<div class="nwh-villain" role="listitem">${v}</div>`).join('')}
      </div>

      <!-- Multiverse visual -->
      <div style="
        margin-top:var(--space-xl);
        width:min(500px,90vw);height:min(280px,50vw);
        border:1px solid rgba(11,61,145,0.25);
        border-radius:12px;
        position:relative;overflow:hidden;
        display:flex;align-items:center;justify-content:center;
        margin-left:auto;margin-right:auto;
        box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(11, 61, 145, 0.2);
      " data-reveal style="transition-delay:0.4s" aria-label="The Multiverse Shattered">
        <img src="/multiverse.jpg" alt="The Multiverse Shattered" style="width:100%;height:100%;object-fit:cover;filter:brightness(1.05) contrast(1.1);" />
      </div>
    </div>
  `;

  section.classList.add('section--full-vh');
  section.style.padding = 'var(--space-section) 0';
}
