/**
 * 06 — MJ Memory Wall
 * "The moments that mattered."
 */

import { MemoryWall, MemoryViewer } from '../components/MemoryWall.js';

export function initMJMemoryWall(viewer) {
  const section = document.getElementById('section-memory-wall');
  if (!section) return;

  section.innerHTML = `
    <div class="container" style="text-align:center;">
      <p class="label label-red" data-reveal>PETER & MJ</p>
      <h2 class="memory-wall-title" data-reveal style="transition-delay:0.1s">
        THE MEMORIES
      </h2>
      <p class="body-lg" data-reveal style="transition-delay:0.2s;max-width:500px;margin:0 auto var(--space-xl)">
        Not all love stories are told in words. Some live in photographs,
        in glances, in ordinary moments that felt extraordinary.
      </p>
    </div>

    <div class="memory-wall-grid" id="memory-wall-grid" role="list" aria-label="MJ and Peter memories"></div>

    <p class="label" style="
      text-align:center;margin-top:var(--space-xl);
      color:rgba(168,168,168,0.3);letter-spacing:0.3em;
    " data-reveal>
      CLICK A MEMORY TO REMEMBER
    </p>
  `;

  const gridEl = document.getElementById('memory-wall-grid');
  if (gridEl && viewer) {
    new MemoryWall(gridEl, viewer);
  }
}
