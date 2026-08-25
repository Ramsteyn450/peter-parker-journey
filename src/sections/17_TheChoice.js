/**
 * 17 — The Choice
 * "EVERYONE MUST FORGET PETER PARKER. EVEN MJ."
 */

import { ScrollManager } from '../components/ScrollManager.js';

export function initTheChoice() {
  const section = document.getElementById('section-choice');
  if (!section) return;

  const lines = [
    { text: 'THERE IS ONLY ONE WAY.',   class: '' },
    { text: null,                        class: 'choice-pause' }, // pause
    { text: 'EVERYONE MUST FORGET',     class: '' },
    { text: 'PETER PARKER.',            class: 'choice-line--emphasis' },
    { text: null,                        class: 'choice-pause' },
    { text: 'EVEN MJ.',                 class: 'choice-line--emphasis', extra: 'color:var(--spider-red)' },
  ];

  section.innerHTML = `
    <div class="choice-content" id="choice-content">
      ${lines.map((line, i) => {
        if (!line.text) {
          return `<div class="${line.class}" aria-hidden="true"></div>`;
        }
        return `<p
          class="choice-line ${line.class}"
          data-choice-line
          style="transition-delay:${i * 0.3}s;${line.extra || ''}"
        >${line.text}</p>`;
      }).join('')}
    </div>
  `;

  section.classList.add('section--full-vh');

  ScrollManager.initSequentialReveal(section, '[data-choice-line]', 0.4);
}
