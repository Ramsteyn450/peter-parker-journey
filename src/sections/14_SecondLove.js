/**
 * 14 — Second Love Section
 * "Love Was Still There."
 */

import { VideoPlayer } from '../components/VideoPlayer.js';
import { VIDEOS } from '../assets.config.js';

export function initSecondLove() {
  const section = document.getElementById('section-second-love');
  if (!section) return;

  section.innerHTML = `
    <div class="second-love-content container" style="text-align:center;">
      <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);">
        EVEN IN THE CHAOS
      </p>
      <h2 class="chapter-title" data-reveal style="transition-delay:0.1s">
        LOVE WAS<br/>STILL THERE.
      </h2>

      <!-- MJ memory video or image -->
      <div style="
        margin:var(--space-xl) auto;
        max-width:700px;
      " data-reveal style="transition-delay:0.2s">
        <div id="mj-memory-video"></div>
      </div>

      <p class="body-lg" data-reveal style="
        transition-delay:0.3s;
        font-family:var(--font-quote);font-style:italic;
        max-width:600px;margin:0 auto;
      ">
        Even though everything around him was collapsing — the multiverse,
        his identity, his world — his feelings for MJ never wavered.
      </p>

      <div style="
        margin-top:var(--space-xl);
        padding:var(--space-lg);
        border:1px solid rgba(230,36,41,0.1);
        max-width:500px;margin-left:auto;margin-right:auto;
      " data-reveal style="transition-delay:0.4s">
        <p class="cinematic-quote" style="font-size:clamp(18px,2.5vw,26px);">
          He could lose the multiverse.<br/>
          He could lose his identity.<br/>
          He could not lose her.
        </p>
      </div>

      <div style="
        display:flex;gap:var(--space-xl);justify-content:center;
        margin-top:var(--space-xl);
        flex-wrap:wrap;
      " data-reveal style="transition-delay:0.5s">
        ${['PROTECTION', 'FEAR', 'MEMORIES', 'LOVE'].map(word => `
          <div style="text-align:center;">
            <p class="chapter-title" style="font-size:clamp(28px,4vw,56px);color:rgba(230,36,41,0.4);">${word}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  section.classList.add('section--full-vh');
  section.style.padding = 'var(--space-section) 0';

  // MJ Memory video
  const videoEl = document.getElementById('mj-memory-video');
  if (videoEl) {
    new VideoPlayer(videoEl, {
      src:     VIDEOS.mjMemory,
      poster:  VIDEOS.posters.mjMemory,
      ratio:   '16-9',
      label:   'MJ Memory — DUMMY VIDEO PLACEHOLDER',
    });
  }
}
