/**
 * 16 — Peter's Mind
 * Interactive mind-map with floating words.
 */

import { PeterMind } from '../components/PeterMind.js';

export function initPeterMindSection() {
  const section = document.getElementById('section-mind');
  if (!section) return;

  section.innerHTML = `
    <!-- Title -->
    <div style="
      position:absolute;top:var(--space-xl);left:50%;
      transform:translateX(-50%);z-index:5;text-align:center;
      width: 90%;
    " aria-hidden="true">
      <p class="label" style="letter-spacing:0.4em;color:rgba(168,168,168,0.3);margin-bottom:8px;">
        INSIDE PETER'S MIND
      </p>
      <p style="font-size:12px;color:rgba(255,255,255,0.65);margin:0;letter-spacing:0.1em;text-transform:uppercase;">
        His thoughts are fractured. Tap the fragments to explore what remains of his memories.
      </p>
    </div>

    <p style="
      position:absolute;bottom:var(--space-xl);left:50%;
      transform:translateX(-50%);z-index:5;
      font-size:10px;letter-spacing:0.25em;text-transform:uppercase;
      color:rgba(168,168,168,0.2);white-space:nowrap;
    " aria-label="Click any word to explore Peter's memories">
      CLICK ANY WORD TO EXPLORE
    </p>

    <!-- Mind container -->
    <div class="mind-container" id="mind-container" role="region" aria-label="Peter's mind — interactive memory map">
    </div>

    <!-- Memory viewer (inside section, managed by PeterMind) -->
  `;

  section.classList.add('section--full-vh');

  const container = document.getElementById('mind-container');
  if (container) {
    new PeterMind(container);
  }
}
